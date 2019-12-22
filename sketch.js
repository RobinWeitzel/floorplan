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



class Controls {
    static move(controls) {
        function mousePressed(e) {
            controls.viewPos.isDragging = true;
            controls.viewPos.prevX = e.clientX;
            controls.viewPos.prevY = e.clientY;
        }

        function mouseDragged(e) {
            const { prevX, prevY, isDragging } = controls.viewPos;
            if (!isDragging) return;

            const pos = { x: e.clientX, y: e.clientY };
            const dx = pos.x - prevX;
            const dy = pos.y - prevY;

            if (prevX || prevY) {
                controls.view.x += dx;
                controls.view.y += dy;
                controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y
            }
        }

        function mouseReleased(e) {
            controls.viewPos.isDragging = false;
            controls.viewPos.prevX = null;
            controls.viewPos.prevY = null;
        }

        return {
            mousePressed,
            mouseDragged,
            mouseReleased
        }
    }

    static zoom(controls) {
        function worldZoom(e) {
            let delta;
            let x;
            let y;
            let newZoom;
            if(e.scale) { // pinch to zoom
                x = e.center.x;
                y = e.center.y;

                if(e.scale <= 0.75) {
                    newZoom = 0.5;
                } else if(e.scale <= 1.5) {
                    newZoom = 1;
                } else if(e.scale <= 3) {
                    newZoom = 2;
                } else {
                    newZoom = 4;
                }
            } else {
                const { x, y, deltaY} = e;
                if (deltaY < 0) {
                    newZoom = Math.min(4, controls.view.zoom*2);
                } else {
                    newZoom = Math.max(0.5, controls.view.zoom/2);
                }
            }
            const zoom = newZoom - controls.view.zoom;

            const wx = (x - controls.view.x) / (width * controls.view.zoom);
            const wy = (y - controls.view.y) / (height * controls.view.zoom);

            controls.view.x -= wx * width * zoom;
            controls.view.y -= wy * height * zoom;
            controls.view.zoom += zoom;
        }

        return { worldZoom }
    }
}

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
        strokeWeight((this.selected ? this.width * 2 : this.width)/controls.view.zoom);
        point(this.x, this.y);
    }

    checkCollision(tolerance) {
        if (Math.abs(this.x - ((mouseX - controls.view.x) / controls.view.zoom)) <= this.width && Math.abs(this.y - ((mouseY - controls.view.y) / controls.view.zoom)) <= (this.width) * tolerance) {
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
        strokeWeight((this.selected ? this.width * 2 : this.width)/controls.view.zoom);
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

        const color1 = get((x + (width / 2 + 1) * dy) * controls.view.zoom + controls.view.x, (y - (width / 2 + 1) * dx) * controls.view.zoom + controls.view.y);
        //const color1 = get((x + (width / 2 + 1) * dy), (y - (width / 2 + 1) * dx));

        strokeWeight(2/controls.view.zoom);
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
            text(Math.round(dist / 50 * 10) / 10 + "m", x - desiredDistance * dy, y + desiredDistance * dx);
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
            text(Math.round(dist / 50 * 10) / 10 + "m", x + desiredDistance * dy, y - desiredDistance * dx);
        }
    }

    checkCollision(tolerance) {
        const distanceToCorner1 = Math.sqrt(Math.pow(this.corner1.x - ((mouseX - controls.view.x) / controls.view.zoom), 2) + Math.pow(this.corner1.y - ((mouseY - controls.view.y) / controls.view.zoom), 2));
        const distanceToCorner2 = Math.sqrt(Math.pow(this.corner2.x - ((mouseX - controls.view.x) / controls.view.zoom), 2) + Math.pow(this.corner2.y - ((mouseY - controls.view.y) / controls.view.zoom), 2));
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

let canvas;
const controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
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
const corners = [corner1, corner2, corner3, corner4];
const connections = [connection1, connection2, connection3, connection4];

let selection = undefined;

let timeout = undefined;

let moved = false;

let oldSelection;
let startX;
let startY;

const grid = () => 50 / controls.view.zoom;

function setup() {
    canvas = createCanvas(document.getElementById('sketch-holder').offsetWidth - 30, document.getElementById('sketch-holder').offsetHeight);
    canvas.parent('sketch-holder');

    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))

    const hammer = new Hammer(document.body, { preventDefault: true });
    hammer.get('pinch').set({ enable: true });
    hammer.on("pinch", e => Controls.zoom(controls).worldZoom(e));
}

function draw() {
    background(254)
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);

    strokeWeight(1 / controls.view.zoom);
    stroke(151);

    for(let i = -1; i <= height/grid(); i++) {
        const y = (i*grid() - controls.view.y + controls.view.y % grid())/controls.view.zoom;
        line(-controls.view.x/controls.view.zoom, y, (width-controls.view.x)/controls.view.zoom, y);
    }

    for(let i = -1; i <= width/grid(); i++) {
        const x = (i*grid() - controls.view.x + controls.view.x % grid())/controls.view.zoom;
        line(x, -controls.view.y/controls.view.zoom, x, (height-controls.view.y)/controls.view.zoom);
    }

    // Fill
    drawInFill();

    // Outline
    for (const connection of connections.filter(connection => connection !== selection)) {
        connection.draw();
    }

    for (const corner of corners.filter(corner => corner !== selection)) {
        corner.draw();
    }

    if (selection) {
        selection.draw();
    }
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
    if (area < 0)
        area *= -1;

    stroke(0);
    fill(0);
    strokeWeight(1/controls.view.zoom);
    textAlign(LEFT, TOP);
    textSize(8 + 8/controls.view.zoom);
    textFont('Georgia');

    const [x, y] = polylabel([cornersVisited.map(c => [c.x, c.y])], 1.0);
    text(area + "m" + char(178), x, y);
}

const selectFunction = (e, tolerance) => {
    oldSelection = selection;
    selection = undefined;
    startX = ((mouseX - controls.view.x) / controls.view.zoom);
    startY = ((mouseY - controls.view.y) / controls.view.zoom);
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
                    const corner = new Corner(((mouseX - controls.view.x) / controls.view.zoom), ((mouseY - controls.view.y) / controls.view.zoom));
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

    if (!selection) {
        Controls.move(controls).mousePressed(e);
    }

    corners.filter(o => selection === undefined || (o !== selection && o !== selection.corner1 && o !== selection.corner2)).forEach(o => o.setSelection(false));
    connections.filter(o => o !== selection).forEach(o => o.setSelection(false));
}


const dragFunction = (e, tolerance) => {
    if (!selection) {
        Controls.move(controls).mouseDragged(e);
        return;
    }

    if (!moved && Math.abs(((mouseX - controls.view.x) / controls.view.zoom) - startX) + Math.abs(((mouseY - controls.view.y) / controls.view.zoom) - startY) > tolerance) {
        moved = true;
    }

    let snappedMouseX = ((mouseX - controls.view.x) / controls.view.zoom);
    let snappedMouseY = ((mouseY - controls.view.y) / controls.view.zoom);

    const cleanedGrid = (grid()/controls.view.zoom);

    if(snappedMouseX % cleanedGrid < cleanedGrid * 0.25) {
        snappedMouseX = Math.floor(snappedMouseX/cleanedGrid) * cleanedGrid;
    } else if(snappedMouseX % cleanedGrid >  cleanedGrid * 0.75) {
        snappedMouseX = Math.ceil(snappedMouseX/cleanedGrid) * cleanedGrid;
    }

    if(snappedMouseY % cleanedGrid <  cleanedGrid * 0.25) {
        snappedMouseY = Math.floor(snappedMouseY/cleanedGrid) * cleanedGrid;
    } else if(snappedMouseY % cleanedGrid >  cleanedGrid * 0.75) {
        snappedMouseY = Math.ceil(snappedMouseY/cleanedGrid) * cleanedGrid;
    }

    if (selection.type === "Corner") {
        selection.x = snappedMouseX;
        selection.y = snappedMouseY;
    } else if (selection.type === "Connection") {
        const m = selection.getSlope();

        if (Math.abs(m) === Infinity) {
            selection.corner1.x = snappedMouseX;
            selection.corner2.x = snappedMouseX;
        } else if (m === 0) {
            selection.corner1.y = snappedMouseY;
            selection.corner2.y = snappedMouseY;
        } else {
            const parallelLine = new Line(m, snappedMouseY - m * snappedMouseX);
            const perpendicularLine1 = new Line(-1 / m, selection.corner1.y - (-1 / m) * selection.corner1.x);
            const perpendicularLine2 = new Line(-1 / m, selection.corner2.y - (-1 / m) * selection.corner2.x);

            [selection.corner1.x, selection.corner1.y] = perpendicularLine1.getIntersection(parallelLine);
            [selection.corner2.x, selection.corner2.y] = perpendicularLine2.getIntersection(parallelLine);
        }
    }
}

const dragEnded = e => {
    moved = false;
    startX = undefined;
    startY = undefined;

    if (timeout) {
        clearTimeout(timeout);
    }

    Controls.move(controls).mouseReleased(e)
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

function mousePressed(e) {
    const {x, y, width, height} = document.getElementById('sketch-holder').getBoundingClientRect();
    if(e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
        selectFunction(e, onTouchDevice ? 3 : 1);
    }   
}

function touchStarted(e) {
    if(e.touches && e.touches.length > 0) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
    }

    const {x, y, width, height} = document.getElementById('sketch-holder').getBoundingClientRect();
    if(e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
        selectFunction(e, 3);
        e.preventDefault();
        return false;
    }
}

function mouseDragged(e) {
    const {x, y, width, height} = document.getElementById('sketch-holder').getBoundingClientRect();
    if(e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
        dragFunction(e, onTouchDevice ? 25 : 5);
    }
}

function touchMoved(e) {
    if(e.touches && e.touches.length > 0) {
        e.clientX = e.touches[0].clientX;
        e.clientY = e.touches[0].clientY;
    }

    const {x, y, width, height} = document.getElementById('sketch-holder').getBoundingClientRect();
    if(e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
        dragFunction(e, 25);
        e.preventDefault();
        return false;
    }
}

function mouseReleased(e) {
    dragEnded(e);
}

function touchEnded(e) {
    dragEnded(e);
}