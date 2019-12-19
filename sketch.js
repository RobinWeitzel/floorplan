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

const corner1 = new Corner(100, 100);
const corner2 = new Corner(100, 300);
const corner3 = new Corner(300, 100);
const corner4 = new Corner(300, 300);
const connection1 = new Connection(corner1, corner2);
const connection2 = new Connection(corner1, corner3);
const connection3 = new Connection(corner2, corner4);
const connection4 = new Connection(corner3, corner4);
const objects = [corner1, corner2, corner3, corner4, connection1, connection2, connection3, connection4];

let selection = undefined;
let moved = false;

let timeout = undefined;

function setup() {
    createCanvas(displayWidth, displayHeight);
    frameRate(60);
}

function draw() {
    background(220);

    for (const object of objects) {
        object.draw();
    }
}

const selectFunction = (tolerance) => {
    selection = undefined;
    for (const object of objects) {
        if (!selection && object.checkCollision(tolerance)) {
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
        } else {
            object.selected = false;
        }
    }
}

const dragFunction = () => {
    moved = true;
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

    if(timeout) {
        clearTimeout(timeout);
    }
}

const deleteCorner = () => {
    if(!selection || selection.type !== "Corner") {
        return;
    }

    const connections = objects.filter(o => o.corner1 === selection || o.corner2 === selection);
    const connection1 = connections[0];
    const connection2 = connections[1];

    const newConnection = new Connection(connection1.getOtherCorner(selection), connection2.getOtherCorner(selection));

    objects.splice(objects.indexOf(selection), 1);
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
    dragFunction();
}

function touchMoved() {
    dragFunction();
    return false;
}

function mouseReleased() {
    dragEnded();
}

function touchEnded() {
    dragEnded();
}