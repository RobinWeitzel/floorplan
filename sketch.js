class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    getIntersection(line) {
        const x = (line.b - this.b) / (this.a - line.a);
        const y = this.a * x + this.b;

        return [x, y];
    }
}

class Corner {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.selected = false;
        this.type = "Corner";
    }

    draw() {
        stroke(this.selected ? 255 : 0);
        strokeWeight(this.selected ? this.width*2 : this.width);
        point(this.x, this.y);
    }

    checkCollision(tolerance) {
        if (Math.abs(this.x - mouseX) <= this.width / 2 && Math.abs(this.y - mouseY) <= (this.width / 2) * tolerance) {
            return true;
        }
    }
}

class Connection {
    constructor(corner1, corner2) {
        this.corner1 = corner1;
        this.corner2 = corner2;
        this.width = 5;
        this.selected = false;
        this.type = "Connection";
    }

    draw() {
        stroke(this.selected ? 255 : 0);
        strokeWeight(this.selected ? this.width*2 : this.width);
        line(this.corner1.x, this.corner1.y, this.corner2.x, this.corner2.y);
    }

    checkCollision(tolerance) {
        const distanceToCorner1 = Math.sqrt(Math.pow(this.corner1.x - mouseX, 2) + Math.pow(this.corner1.y - mouseY, 2));
        const distanceToCorner2 = Math.sqrt(Math.pow(this.corner2.x - mouseX, 2) + Math.pow(this.corner2.y - mouseY, 2));
        const distanceBetweenCorners = Math.sqrt(Math.pow(this.corner2.x - this.corner1.x, 2) + Math.pow(this.corner2.y - this.corner1.y, 2));
        return distanceToCorner1 + distanceToCorner2 - distanceBetweenCorners <= 0.5 * tolerance;
    }

    getSlope() {
        return (this.corner2.y - this.corner1.y) / (this.corner2.x - this.corner1.x);
    }

    getOtherCorner(corner) {
        if(corner === this.corner1) {
            return this.corner2;
        } else {
            return this.corner1;
        }
    }
}

class Button {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = 150;
        this.height = 50;
        this.type = "Button";
        this.selected = false;
    }

    draw() {
        stroke(0);
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.height);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        textSize(16);
        textFont('Georgia');
        text(this.text, this.x + this.width/2, this.y + this.height/2);
    }

    checkCollision(tolerance) {
        if(mouseX < this.x || mouseX > this.x + this.width)
            return false;

        if(mouseY < this.y || mouseY > this.y + this.height)
            return false;

        return true;
    }
}

const corner1 = new Corner(100, 100);
const corner2 = new Corner(100, 300);
const corner3 = new Corner(300, 100);
const corner4 = new Corner(300, 300);
const connection1 = new Connection(corner1, corner2);
const connection2 = new Connection(corner1, corner3);
const connection3 = new Connection(corner2, corner4);
const connection4 = new Connection(corner3, corner4);
const deleteButton = new Button(0, 0, "Delete Corner");
const objects = [corner1, corner2, corner3, corner4, connection1, connection2, connection3, connection4, deleteButton];

let selection = undefined;

let timeout = undefined;

let moved = false;
let startX;
let startY;

function setup() {
    createCanvas(displayWidth, displayHeight);
    frameRate(60);
}

function draw() {
    background(220);

    for (const object of objects) {
        object.draw();
    }

    strokeWeight(1);
    textAlign(LEFT, TOP);
    textSize(16);
    textFont('Georgia');
    text("Hold line pressed to create corner", 200, 20);
}

const selectFunction = (tolerance) => {
    const oldSelection = selection;
    selection = undefined;
    startX = mouseX;
    startY = mouseY;
    for (const object of objects) {
        if (!selection && object.checkCollision(tolerance)) {
            if(object.type === "Button") {
                deleteCorner(oldSelection);
            } else {
                object.selected = true;
                selection = object;

                if(selection.type === "Connection") {
                    timeout = setTimeout(() => {
                        if(!moved) {
                            const corner = new Corner(mouseX, mouseY);
                            const connection1 = new Connection(selection.corner1, corner);
                            const connection2 = new Connection(corner, selection.corner2);
                            objects.splice(objects.indexOf(selection), 1);
                            objects.push(corner);
                            objects.push(connection1);
                            objects.push(connection2);

                            corner.selected = true;
                            selection = corner;
                        }
                    }, 1000);
                }
            }
        }
    }

    objects.filter(o => o !== selection).forEach(o => o.selected = false);
}

const dragFunction = (tolerance) => {
    if(!moved && Math.abs(mouseX - startX) + Math.abs(mouseY - startY) > tolerance) {
        moved = true;
    }

    if (!selection) {
        return;
    }

    if (selection.type === "Corner") {
        selection.x = mouseX;
        selection.y = mouseY;
    } else if(selection.type === "Connection") {
        const m = selection.getSlope();

        if(Math.abs(m) === Infinity) {
            selection.corner1.x = mouseX;
            selection.corner2.x = mouseX;
        } else if(m === 0) {
            selection.corner1.y = mouseY;
            selection.corner2.y = mouseY;
        } else{
            const parallelLine = new Line(m, mouseY - m * mouseX);
            const perpendicularLine1 = new Line(-1/m, selection.corner1.y - (-1/m)*selection.corner1.x);
            const perpendicularLine2 = new Line(-1/m, selection.corner2.y - (-1/m)*selection.corner2.x);

            [selection.corner1.x, selection.corner1.y] = perpendicularLine1.getIntersection(parallelLine);
            [selection.corner2.x, selection.corner2.y] = perpendicularLine2.getIntersection(parallelLine);
        }
    }
}

const dragEnded = () => {
    moved = false;
    startX = undefined;
    startY = undefined;

    if(timeout) {
        clearTimeout(timeout);
    }
}

const deleteCorner = (corner) => {
    corner = corner || selection;
    if(!corner || corner.type !== "Corner") {
        return;
    }

    const connections = objects.filter(o => o.corner1 === corner || o.corner2 === corner);
    const connection1 = connections[0];
    const connection2 = connections[1];

    const newConnection = new Connection(connection1.getOtherCorner(corner), connection2.getOtherCorner(corner));

    objects.splice(objects.indexOf(corner), 1);
    objects.splice(objects.indexOf(connection1), 1);
    objects.splice(objects.indexOf(connection2), 1);
    objects.push(newConnection);

    selection = undefined;
}

function keyPressed() {
    if (key === 'Backspace') {
        deleteCorner();
    }

    return false;
}

function mousePressed() {
    selectFunction(1);
}

function touchStarted() {
    selectFunction(3);
}

function mouseDragged() {
    dragFunction(0);
}

function touchMoved() {
    dragFunction(5);
    return false;
}

function mouseReleased() {
    dragEnded();
}

function touchEnded() {
    dragEnded();
}