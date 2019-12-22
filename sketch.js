Array.prototype.first = function () {
    if (this.length > 0) {
        return this[0];
    } else {
        return null;
    }
};

const mobileAndTabletCheck = () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

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
        this.width = 5;
        this.selected = false;
        this.type = "Corner";
    }

    draw() {
        if (this.selected) {
            stroke(173, 216, 230);
        } else {
            stroke(0);
        }
        strokeWeight(this.selected ? this.width * 2 : this.width);
        point(this.x, this.y);
    }

    checkCollision(tolerance) {
        if (Math.abs(this.x - (mouseX/zoom - posX)) <= this.width && Math.abs(this.y - (mouseY/zoom - posY)) <= (this.width) * tolerance) {
            return true;
        }
    }

    setSelection(selected) {
        this.selected = selected;
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
        if (this.selected) {
            stroke(173, 216, 230);
        } else {
            stroke(0);
        }
        strokeWeight(this.selected ? this.width * 2 : this.width);
        line(this.corner1.x, this.corner1.y, this.corner2.x, this.corner2.y);

        if (this.corner1.selected || this.corner2.selected) {
            this.drawMeasurements();
        }
    }

    drawMeasurements() {
        const desiredDistance = 20;
        const width = this.selected ? this.width * 2 : this.width;
        let dx = this.corner1.x - this.corner2.x;
        let dy = this.corner1.y - this.corner2.y;
        const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        dx /= dist;
        dy /= dist;

        // Determine on which side to draw
        const x = (this.corner1.x + this.corner2.x) / 2;
        const y = (this.corner1.y + this.corner2.y) / 2;

        const color1 = get((x + (width / 2 + 1) * dy + posX)*zoom, (y - (width / 2 + 1) * dx+ posY)*zoom);

        strokeWeight(2);
        stroke(173, 216, 230);
        drawingContext.setLineDash([10, 10]);

        if (color1[0] === 255 && color1[1] === 255 && color1[2] === 255) {
            const x1 = this.corner1.x - desiredDistance * dy;
            const y1 = this.corner1.y + desiredDistance * dx;
            const x4 = this.corner2.x - desiredDistance * dy;
            const y4 = this.corner2.y + desiredDistance * dx;
            const x2 = x1 - (dist / 2 - 20) * dx;
            const y2 = y1 - (dist / 2 - 20) * dy;
            const x3 = x1 - (dist / 2 + 20) * dx;
            const y3 = y1 - (dist / 2 + 20) * dy;

            line(x1, y1, x2, y2);
            line(x3, y3, x4, y4);
            
            drawingContext.setLineDash([]);
            line(this.corner1.x, this.corner1.y, x1, y1);
            line(this.corner2.x, this.corner2.y, x4, y4);

            // text
            strokeWeight(0.5);
            fill(173, 216, 230);
            textAlign(CENTER, CENTER);
            textSize(12);
            textFont('Georgia');
            text(Math.round(dist/50*10)/10 + "m", x - desiredDistance * dy, y + desiredDistance * dx);
        } else {
            const x1 = this.corner1.x + desiredDistance * dy;
            const y1 = this.corner1.y - desiredDistance * dx;
            const x4 = this.corner2.x + desiredDistance * dy;
            const y4 = this.corner2.y - desiredDistance * dx;
            const x2 = x1 - (dist / 2 - 20) * dx;
            const y2 = y1 - (dist / 2 - 20) * dy;
            const x3 = x1 - (dist / 2 + 20) * dx;
            const y3 = y1 - (dist / 2 + 20) * dy;

            line(x1, y1, x2, y2);
            line(x3, y3, x4, y4);

            drawingContext.setLineDash([]);
            line(this.corner1.x, this.corner1.y, x1, y1);
            line(this.corner2.x, this.corner2.y, x4, y4);

            // text
            strokeWeight(0.5);
            fill(173, 216, 230);
            textAlign(CENTER, CENTER);
            textSize(12);
            textFont('Georgia');
            text(Math.round(dist/50*10)/10 + "m", x + desiredDistance * dy, y - desiredDistance * dx);
        }
    }

    checkCollision(tolerance) {
        const distanceToCorner1 = Math.sqrt(Math.pow(this.corner1.x - (mouseX/zoom - posX), 2) + Math.pow(this.corner1.y - (mouseY/zoom - posY), 2));
        const distanceToCorner2 = Math.sqrt(Math.pow(this.corner2.x - (mouseX/zoom - posX), 2) + Math.pow(this.corner2.y - (mouseY/zoom - posY), 2));
        const distanceBetweenCorners = Math.sqrt(Math.pow(this.corner2.x - this.corner1.x, 2) + Math.pow(this.corner2.y - this.corner1.y, 2));
        return distanceToCorner1 + distanceToCorner2 - distanceBetweenCorners <= 0.5 * tolerance;
    }

    getSlope() {
        return (this.corner2.y - this.corner1.y) / (this.corner2.x - this.corner1.x);
    }

    getOtherCorner(corner) {
        if (corner === this.corner1) {
            return this.corner2;
        } else {
            return this.corner1;
        }
    }

    setSelection(selected) {
        this.selected = selected;
        if (selected) {
            this.corner1.selected = selected;
            this.corner2.selected = selected;
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
        fill(255);
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.height);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        textSize(16);
        fill(0);
        textFont('Georgia');
        text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    checkCollision(tolerance) {
        if (mouseX < this.x || mouseX > this.x + this.width)
            return false;

        if (mouseY < this.y || mouseY > this.y + this.height)
            return false;

        return true;
    }

    setSelection(selected) {
        this.selected = selected;
    }
}

const onTouchDevice = mobileAndTabletCheck();

const corner1 = new Corner(100, 100);
const corner2 = new Corner(100, 350);
const corner3 = new Corner(350, 100);
const corner4 = new Corner(350, 350);
const connection1 = new Connection(corner1, corner2);
const connection2 = new Connection(corner1, corner3);
const connection3 = new Connection(corner2, corner4);
const connection4 = new Connection(corner3, corner4);
const deleteButton = new Button(0, 0, "Delete Corner");
const corners = [corner1, corner2, corner3, corner4];
const connections = [connection1, connection2, connection3, connection4];

let selection = undefined;

let timeout = undefined;

let moved = false;
let startX;
let startY;
let posX = 0;
let posY = 0;

function setup() {
    createCanvas(displayWidth, displayHeight);
    frameRate(60);

    var hammer = new Hammer(document.body, {preventDefault: true});
    hammer.get('pinch').set({ enable: true });
    hammer.on("pinch", e => {
        zoom = e.scale;
    });
}

let zoom = 1;

function draw() {
    background(240);

    scale(zoom);
    translate(posX, posY);

    // Fill
    drawInFill();

    // Lines
    for (const connection of connections.filter(connection => connection !== selection)) {
        connection.draw();
    }

    for (const corner of corners.filter(corner => corner !== selection)) {
        corner.draw();
    }

    if (selection) {
        selection.draw();
    }

    translate(-posX, -posY);
    scale(1/zoom);
    deleteButton.draw();

    // Text
    stroke(0);
    fill(0);
    strokeWeight(1);
    textAlign(LEFT, TOP);
    textSize(16);
    textFont('Georgia');
    text("Hold line pressed to\ncreate corner", 200, 20);
}

const drawInFill = () => {
    const cornersVisited = [];
    const connectionsVisited = [];

    if (corners.length < 3) {
        return;
    }

    noStroke();
    fill(255);
    beginShape();

    let area = 0;
    let start = corners[0];

    let nextConnection = connections.filter(connection => (connection.corner1 === start || connection.corner2 === start) && connectionsVisited.indexOf(connection) < 0).first();

    while (nextConnection) {
        cornersVisited.push(start);
        connectionsVisited.push(nextConnection);
        const other = nextConnection.getOtherCorner(start);

        area += (start.x * other.y) - (other.x * start.y);

        start = other;
        vertex(start.x, start.y);
        nextConnection = connections.filter(connection => (connection.corner1 === start || connection.corner2 === start) && connectionsVisited.indexOf(connection) < 0).first();

    }
    endShape(CLOSE);

    area += (start.x * corners[0].y) - (corners[0].x * start.y);
    area /= 2;
    area = Math.round(area / Math.pow(50, 2) * 10) / 10;
    if(area < 0)
        area *= -1;

    stroke(0);
    fill(0);
    strokeWeight(1);
    textAlign(LEFT, TOP);
    textSize(16);
    textFont('Georgia');
    
    const [x, y] = polylabel([cornersVisited.map(c => [c.x, c.y])], 1.0);
    text(area + "m" + char(178), x, y);
}

const selectFunction = (tolerance) => {
    const oldSelection = selection;
    selection = undefined;
    startX = (mouseX/zoom - posX);
    startY = (mouseY/zoom - posY);
    for (const object of corners) {
        if (!selection && object.checkCollision(tolerance)) {
            object.setSelection(true);
            selection = object;
        }
    }

    for (const object of connections) {
        if (!selection && object.checkCollision(tolerance)) {
            object.setSelection(true);
            selection = object;
            timeout = setTimeout(() => {
                if (!moved) {
                    const corner = new Corner((mouseX/zoom - posX), (mouseY/zoom - posY));
                    const connection1 = new Connection(selection.corner1, corner);
                    const connection2 = new Connection(corner, selection.corner2);
                    connections.splice(connections.indexOf(object), 1);
                    corners.push(corner);
                    connections.push(connection1);
                    connections.push(connection2);

                    corner.setSelection(true);
                    selection = corner;
                }
            }, 1000);

        }
    }

    if (!selection && deleteButton.checkCollision(tolerance)) {
        deleteCorner(oldSelection);
    }

    corners.filter(o => selection === undefined || (o !== selection && o !== selection.corner1 && o !== selection.corner2)).forEach(o => o.setSelection(false));
    connections.filter(o => o !== selection).forEach(o => o.setSelection(false));
}

const dragFunction = (tolerance) => {
    if (!selection) {
        if(!isNaN((mouseX/zoom - posX) - startX)) {
            posX += (mouseX/zoom - posX) - startX;
        }

        if(!isNaN((mouseY/zoom - posY) - startY)) {
            posY += (mouseY/zoom - posY) - startY;
        }

        startX = (mouseX/zoom - posX);
        startY = (mouseY/zoom - posY);

        return;
    }

    if (!moved && Math.abs((mouseX/zoom - posX) - startX) + Math.abs((mouseY/zoom - posY) - startY) > tolerance) {
        moved = true;
    }

    if (selection.type === "Corner") {
        selection.x = (mouseX/zoom - posX);
        selection.y = (mouseY/zoom - posY);
    } else if (selection.type === "Connection") {
        const m = selection.getSlope();

        if (Math.abs(m) === Infinity) {
            selection.corner1.x = (mouseX/zoom - posX);
            selection.corner2.x = (mouseX/zoom - posX);
        } else if (m === 0) {
            selection.corner1.y = (mouseY/zoom - posY);
            selection.corner2.y = (mouseY/zoom - posY);
        } else {
            const parallelLine = new Line(m, (mouseY/zoom - posY) - m * (mouseX/zoom - posX));
            const perpendicularLine1 = new Line(-1 / m, selection.corner1.y - (-1 / m) * selection.corner1.x);
            const perpendicularLine2 = new Line(-1 / m, selection.corner2.y - (-1 / m) * selection.corner2.x);

            [selection.corner1.x, selection.corner1.y] = perpendicularLine1.getIntersection(parallelLine);
            [selection.corner2.x, selection.corner2.y] = perpendicularLine2.getIntersection(parallelLine);
        }
    }
}

const dragEnded = () => {
    moved = false;
    startX = undefined;
    startY = undefined;

    if (timeout) {
        clearTimeout(timeout);
    }
}

const deleteCorner = (corner) => {
    corner = corner || selection;
    if (!corner || corner.type !== "Corner") {
        return;
    }

    const viableConnections = connections.filter(o => o.corner1 === corner || o.corner2 === corner);
    const connection1 = viableConnections[0];
    const connection2 = viableConnections[1];

    const newConnection = new Connection(connection1.getOtherCorner(corner), connection2.getOtherCorner(corner));

    corners.splice(corners.indexOf(corner), 1);
    connections.splice(connections.indexOf(connection1), 1);
    connections.splice(connections.indexOf(connection2), 1);
    connections.push(newConnection);

    selection = undefined;
}

function keyPressed() {
    if (key === 'Backspace') {
        deleteCorner();
    }

    return false;
}

function mousePressed() {
    selectFunction(onTouchDevice ? 3 : 1);
}

function touchStarted() {
    selectFunction(3);
}

function mouseDragged() {
    dragFunction(onTouchDevice ? 25 : 5);
}

function touchMoved() {
    dragFunction(25);
    return false;
}

function mouseReleased() {
    dragEnded();
}

function touchEnded() {
    dragEnded();
}

function mouseWheel(event) {
    if(event.delta < 0) {
        zoom *= 1.1;
    } else {
        zoom /= 1.1;
    }

    return false;
}
