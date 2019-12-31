"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Array.prototype.first = function () {
  if (this.length > 0) {
    return this[0];
  } else {
    return null;
  }
};

var mobileAndTabletCheck = function mobileAndTabletCheck() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

var Controls =
/*#__PURE__*/
function () {
  function Controls() {
    _classCallCheck(this, Controls);
  }

  _createClass(Controls, null, [{
    key: "move",
    value: function move(controls) {
      function mousePressed(e) {
        controls.viewPos.isDragging = true;
        controls.viewPos.prevX = e.clientX;
        controls.viewPos.prevY = e.clientY;
      }

      function mouseDragged(e) {
        var _controls$viewPos = controls.viewPos,
            prevX = _controls$viewPos.prevX,
            prevY = _controls$viewPos.prevY,
            isDragging = _controls$viewPos.isDragging;
        if (!isDragging) return;
        var pos = {
          x: e.clientX,
          y: e.clientY
        };
        var dx = pos.x - prevX;
        var dy = pos.y - prevY;

        if (prevX || prevY) {
          controls.view.x += dx;
          controls.view.y += dy;
          controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y;
        }
      }

      function mouseReleased(e) {
        controls.viewPos.isDragging = false;
        controls.viewPos.prevX = null;
        controls.viewPos.prevY = null;
      }

      return {
        mousePressed: mousePressed,
        mouseDragged: mouseDragged,
        mouseReleased: mouseReleased
      };
    }
  }, {
    key: "zoom",
    value: function zoom(controls) {
      function worldZoom(e) {
        var x;
        var y;
        var newZoom;

        if (e.scale) {
          // pinch to zoom
          x = e.center.x;
          y = e.center.y;

          if (e.scale <= 0.75) {
            newZoom = 0.5;
          } else if (e.scale <= 1.5) {
            newZoom = 1;
          } else if (e.scale <= 3) {
            newZoom = 2;
          } else {
            newZoom = 4;
          }
        } else {
          x = e.x;
          y = e.y;
          var deltaY = e.deltaY;

          if (deltaY < 0) {
            newZoom = Math.min(4, controls.view.zoom * 2);
          } else {
            newZoom = Math.max(0.5, controls.view.zoom / 2);
          }
        }

        var zoom = newZoom - controls.view.zoom;
        var wx = (x - controls.view.x) / (width * controls.view.zoom);
        var wy = (y - controls.view.y) / (height * controls.view.zoom);
        controls.view.x -= wx * width * zoom;
        controls.view.y -= wy * height * zoom;
        controls.view.zoom += zoom;
      }

      return {
        worldZoom: worldZoom
      };
    }
  }]);

  return Controls;
}();

var Line =
/*#__PURE__*/
function () {
  function Line(a, b) {
    _classCallCheck(this, Line);

    this.a = a;
    this.b = b;
  }

  _createClass(Line, [{
    key: "getIntersection",
    value: function getIntersection(line) {
      var x = (line.b - this.b) / (this.a - line.a);
      var y = this.a * x + this.b;
      return [x, y];
    }
  }]);

  return Line;
}();

var Corner =
/*#__PURE__*/
function () {
  function Corner(x, y) {
    _classCallCheck(this, Corner);

    this.x = x;
    this.y = y;
    this.width = 5;
    this.selected = false;
    this.type = "Corner";
  }

  _createClass(Corner, [{
    key: "draw",
    value: function draw() {
      if (this.selected) {
        stroke(173, 216, 230);
      } else {
        stroke(0);
      }

      strokeWeight((this.selected ? this.width * 2 : this.width) / controls.view.zoom);
      point(this.x, this.y);
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(tolerance) {
      if (Math.abs(this.x - (mouseX - controls.view.x) / controls.view.zoom) <= this.width && Math.abs(this.y - (mouseY - controls.view.y) / controls.view.zoom) <= this.width * tolerance) {
        return true;
      }
    }
  }, {
    key: "setSelection",
    value: function setSelection(selected) {
      this.selected = selected;
    }
  }]);

  return Corner;
}();

var Connection =
/*#__PURE__*/
function () {
  function Connection(corner1, corner2) {
    _classCallCheck(this, Connection);

    this.corner1 = corner1;
    this.corner2 = corner2;
    this.width = 5;
    this.selected = false;
    this.type = "Connection";
  }

  _createClass(Connection, [{
    key: "draw",
    value: function draw() {
      if (this.selected) {
        stroke(173, 216, 230);
      } else {
        stroke(0);
      }

      strokeWeight((this.selected ? this.width * 2 : this.width) / controls.view.zoom);
      line(this.corner1.x, this.corner1.y, this.corner2.x, this.corner2.y);

      if (this.corner1.selected || this.corner2.selected) {
        this.drawMeasurements();
      }
    }
  }, {
    key: "drawMeasurements",
    value: function drawMeasurements() {
      var desiredDistance = 20;
      var width = this.selected ? this.width * 2 : this.width;
      var dx = this.corner1.x - this.corner2.x;
      var dy = this.corner1.y - this.corner2.y;
      var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      dx /= dist;
      dy /= dist; // Determine on which side to draw

      var x = (this.corner1.x + this.corner2.x) / 2;
      var y = (this.corner1.y + this.corner2.y) / 2;
      var color1 = get((x + (width / 2 + 1) * dy) * controls.view.zoom + controls.view.x, (y - (width / 2 + 1) * dx) * controls.view.zoom + controls.view.y); //const color1 = get((x + (width / 2 + 1) * dy), (y - (width / 2 + 1) * dx));

      strokeWeight(2 / controls.view.zoom);
      stroke(173, 216, 230);
      drawingContext.setLineDash([10, 10]);

      if (color1[0] === 255 && color1[1] === 255 && color1[2] === 255) {
        var x1 = this.corner1.x - desiredDistance * dy;
        var y1 = this.corner1.y + desiredDistance * dx;
        var x4 = this.corner2.x - desiredDistance * dy;
        var y4 = this.corner2.y + desiredDistance * dx;
        var x2 = x1 - (dist / 2 - 20) * dx;
        var y2 = y1 - (dist / 2 - 20) * dy;
        var x3 = x1 - (dist / 2 + 20) * dx;
        var y3 = y1 - (dist / 2 + 20) * dy;
        line(x1, y1, x2, y2);
        line(x3, y3, x4, y4);
        drawingContext.setLineDash([]);
        line(this.corner1.x, this.corner1.y, x1, y1);
        line(this.corner2.x, this.corner2.y, x4, y4); // text

        strokeWeight(0.5);
        fill(173, 216, 230);
        textAlign(CENTER, CENTER);
        textSize(12);
        textFont('Georgia');
        text(Math.round(dist / 50 * 10) / 10 + "m", x - desiredDistance * dy, y + desiredDistance * dx);
      } else {
        var _x = this.corner1.x + desiredDistance * dy;

        var _y = this.corner1.y - desiredDistance * dx;

        var _x2 = this.corner2.x + desiredDistance * dy;

        var _y2 = this.corner2.y - desiredDistance * dx;

        var _x3 = _x - (dist / 2 - 20) * dx;

        var _y3 = _y - (dist / 2 - 20) * dy;

        var _x4 = _x - (dist / 2 + 20) * dx;

        var _y4 = _y - (dist / 2 + 20) * dy;

        line(_x, _y, _x3, _y3);
        line(_x4, _y4, _x2, _y2);
        drawingContext.setLineDash([]);
        line(this.corner1.x, this.corner1.y, _x, _y);
        line(this.corner2.x, this.corner2.y, _x2, _y2); // text

        strokeWeight(0.5);
        fill(173, 216, 230);
        textAlign(CENTER, CENTER);
        textSize(12);
        textFont('Georgia');
        text(Math.round(dist / 50 * 10) / 10 + "m", x + desiredDistance * dy, y - desiredDistance * dx);
      }
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(tolerance) {
      var distanceToCorner1 = Math.sqrt(Math.pow(this.corner1.x - (mouseX - controls.view.x) / controls.view.zoom, 2) + Math.pow(this.corner1.y - (mouseY - controls.view.y) / controls.view.zoom, 2));
      var distanceToCorner2 = Math.sqrt(Math.pow(this.corner2.x - (mouseX - controls.view.x) / controls.view.zoom, 2) + Math.pow(this.corner2.y - (mouseY - controls.view.y) / controls.view.zoom, 2));
      var distanceBetweenCorners = Math.sqrt(Math.pow(this.corner2.x - this.corner1.x, 2) + Math.pow(this.corner2.y - this.corner1.y, 2));
      return distanceToCorner1 + distanceToCorner2 - distanceBetweenCorners <= 0.5 * tolerance;
    }
  }, {
    key: "getSlope",
    value: function getSlope() {
      return (this.corner2.y - this.corner1.y) / (this.corner2.x - this.corner1.x);
    }
  }, {
    key: "getOtherCorner",
    value: function getOtherCorner(corner) {
      if (corner === this.corner1) {
        return this.corner2;
      } else {
        return this.corner1;
      }
    }
  }, {
    key: "setSelection",
    value: function setSelection(selected) {
      this.selected = selected;

      if (selected) {
        this.corner1.selected = selected;
        this.corner2.selected = selected;
      }
    }
  }]);

  return Connection;
}();

var canvas;
var controls = {
  view: {
    x: 0,
    y: 0,
    zoom: 1
  },
  viewPos: {
    prevX: null,
    prevY: null,
    isDragging: false
  }
};
var onTouchDevice = mobileAndTabletCheck();
var corner1 = new Corner(100, 100);
var corner2 = new Corner(100, 350);
var corner3 = new Corner(350, 100);
var corner4 = new Corner(350, 350);
var connection1 = new Connection(corner1, corner2);
var connection2 = new Connection(corner1, corner3);
var connection3 = new Connection(corner2, corner4);
var connection4 = new Connection(corner3, corner4);
var corners = [corner1, corner2, corner3, corner4];
var connections = [connection1, connection2, connection3, connection4];
var selection = undefined;
var timeout = undefined;
var moved = false;
var oldSelection;
var startX;
var startY;

var grid = function grid() {
  return 50 / controls.view.zoom;
};

function setup() {
  canvas = createCanvas(document.getElementById('sketch-holder').offsetWidth - 30, document.getElementById('sketch-holder').offsetHeight);
  canvas.parent('sketch-holder');
  canvas.mouseWheel(function (e) {
    return Controls.zoom(controls).worldZoom(e);
  });
  var hammer = new Hammer(document.body, {
    preventDefault: true
  });
  hammer.get('pinch').set({
    enable: true
  });
  hammer.on("pinch", function (e) {
    return Controls.zoom(controls).worldZoom(e);
  });
}

function draw() {
  background(254);
  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  strokeWeight(1 / controls.view.zoom);
  stroke(151);

  for (var i = -1; i <= height / grid(); i++) {
    var y = (i * grid() - controls.view.y + controls.view.y % grid()) / controls.view.zoom;
    line(-controls.view.x / controls.view.zoom, y, (width - controls.view.x) / controls.view.zoom, y);
  }

  for (var _i = -1; _i <= width / grid(); _i++) {
    var x = (_i * grid() - controls.view.x + controls.view.x % grid()) / controls.view.zoom;
    line(x, -controls.view.y / controls.view.zoom, x, (height - controls.view.y) / controls.view.zoom);
  } // Fill


  drawInFill(); // Outline

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = connections.filter(function (connection) {
      return connection !== selection;
    })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var connection = _step.value;
      connection.draw();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = corners.filter(function (corner) {
      return corner !== selection;
    })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var corner = _step2.value;
      corner.draw();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (selection) {
    selection.draw();
  }
}

var drawInFill = function drawInFill() {
  var cornersVisited = [];
  var connectionsVisited = [];

  if (corners.length < 3) {
    return;
  }

  noStroke();
  fill(255);
  beginShape();
  var area = 0;
  var start = corners[0];
  var nextConnection = connections.filter(function (connection) {
    return (connection.corner1 === start || connection.corner2 === start) && connectionsVisited.indexOf(connection) < 0;
  }).first();

  while (nextConnection) {
    cornersVisited.push(start);
    connectionsVisited.push(nextConnection);
    var other = nextConnection.getOtherCorner(start);
    area += start.x * other.y - other.x * start.y;
    start = other;
    vertex(start.x, start.y);
    nextConnection = connections.filter(function (connection) {
      return (connection.corner1 === start || connection.corner2 === start) && connectionsVisited.indexOf(connection) < 0;
    }).first();
  }

  endShape(CLOSE);
  area += start.x * corners[0].y - corners[0].x * start.y;
  area /= 2;
  area = Math.round(area / Math.pow(50, 2) * 10) / 10;
  if (area < 0) area *= -1;
  stroke(0);
  fill(0);
  strokeWeight(1 / controls.view.zoom);
  textAlign(LEFT, TOP);
  textSize(8 + 8 / controls.view.zoom);
  textFont('Georgia');

  var _polylabel = polylabel([cornersVisited.map(function (c) {
    return [c.x, c.y];
  })], 1.0),
      _polylabel2 = _slicedToArray(_polylabel, 2),
      x = _polylabel2[0],
      y = _polylabel2[1];

  text(area + "m" + char(178), x, y);
};

var selectFunction = function selectFunction(e, tolerance) {
  oldSelection = selection;
  selection = undefined;
  startX = (mouseX - controls.view.x) / controls.view.zoom;
  startY = (mouseY - controls.view.y) / controls.view.zoom;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = corners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var object = _step3.value;

      if (!selection && object.checkCollision(tolerance)) {
        object.setSelection(true);
        selection = object;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    var _loop = function _loop() {
      var object = _step4.value;

      if (!selection && object.checkCollision(tolerance)) {
        object.setSelection(true);
        selection = object;
        timeout = setTimeout(function () {
          if (!moved) {
            var corner = new Corner((mouseX - controls.view.x) / controls.view.zoom, (mouseY - controls.view.y) / controls.view.zoom);

            var _connection = new Connection(selection.corner1, corner);

            var _connection2 = new Connection(corner, selection.corner2);

            connections.splice(connections.indexOf(object), 1);
            corners.push(corner);
            connections.push(_connection);
            connections.push(_connection2);
            corner.setSelection(true);
            selection = corner;
          }
        }, 1000);
      }
    };

    for (var _iterator4 = connections[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  if (!selection) {
    Controls.move(controls).mousePressed(e);
  }

  corners.filter(function (o) {
    return selection === undefined || o !== selection && o !== selection.corner1 && o !== selection.corner2;
  }).forEach(function (o) {
    return o.setSelection(false);
  });
  connections.filter(function (o) {
    return o !== selection;
  }).forEach(function (o) {
    return o.setSelection(false);
  });
};

var dragFunction = function dragFunction(e, tolerance) {
  if (!selection) {
    Controls.move(controls).mouseDragged(e);
    return;
  }

  if (!moved && Math.abs((mouseX - controls.view.x) / controls.view.zoom - startX) + Math.abs((mouseY - controls.view.y) / controls.view.zoom - startY) > tolerance) {
    moved = true;
  }

  var snappedMouseX = (mouseX - controls.view.x) / controls.view.zoom;
  var snappedMouseY = (mouseY - controls.view.y) / controls.view.zoom;
  var cleanedGrid = grid() / controls.view.zoom;

  if (snappedMouseX % cleanedGrid < cleanedGrid * 0.25) {
    snappedMouseX = Math.floor(snappedMouseX / cleanedGrid) * cleanedGrid;
  } else if (snappedMouseX % cleanedGrid > cleanedGrid * 0.75) {
    snappedMouseX = Math.ceil(snappedMouseX / cleanedGrid) * cleanedGrid;
  }

  if (snappedMouseY % cleanedGrid < cleanedGrid * 0.25) {
    snappedMouseY = Math.floor(snappedMouseY / cleanedGrid) * cleanedGrid;
  } else if (snappedMouseY % cleanedGrid > cleanedGrid * 0.75) {
    snappedMouseY = Math.ceil(snappedMouseY / cleanedGrid) * cleanedGrid;
  }

  if (selection.type === "Corner") {
    selection.x = snappedMouseX;
    selection.y = snappedMouseY;
  } else if (selection.type === "Connection") {
    var m = selection.getSlope();

    if (Math.abs(m) === Infinity) {
      selection.corner1.x = snappedMouseX;
      selection.corner2.x = snappedMouseX;
    } else if (m === 0) {
      selection.corner1.y = snappedMouseY;
      selection.corner2.y = snappedMouseY;
    } else {
      var parallelLine = new Line(m, snappedMouseY - m * snappedMouseX);
      var perpendicularLine1 = new Line(-1 / m, selection.corner1.y - -1 / m * selection.corner1.x);
      var perpendicularLine2 = new Line(-1 / m, selection.corner2.y - -1 / m * selection.corner2.x);

      var _perpendicularLine1$g = perpendicularLine1.getIntersection(parallelLine);

      var _perpendicularLine1$g2 = _slicedToArray(_perpendicularLine1$g, 2);

      selection.corner1.x = _perpendicularLine1$g2[0];
      selection.corner1.y = _perpendicularLine1$g2[1];

      var _perpendicularLine2$g = perpendicularLine2.getIntersection(parallelLine);

      var _perpendicularLine2$g2 = _slicedToArray(_perpendicularLine2$g, 2);

      selection.corner2.x = _perpendicularLine2$g2[0];
      selection.corner2.y = _perpendicularLine2$g2[1];
    }
  }
};

var dragEnded = function dragEnded(e) {
  moved = false;
  startX = undefined;
  startY = undefined;

  if (timeout) {
    clearTimeout(timeout);
  }

  Controls.move(controls).mouseReleased(e);
};

var deleteCorner = function deleteCorner(corner) {
  corner = corner || selection;

  if (!corner || corner.type !== "Corner") {
    return;
  }

  var viableConnections = connections.filter(function (o) {
    return o.corner1 === corner || o.corner2 === corner;
  });
  var connection1 = viableConnections[0];
  var connection2 = viableConnections[1];
  var newConnection = new Connection(connection1.getOtherCorner(corner), connection2.getOtherCorner(corner));
  corners.splice(corners.indexOf(corner), 1);
  connections.splice(connections.indexOf(connection1), 1);
  connections.splice(connections.indexOf(connection2), 1);
  connections.push(newConnection);
  selection = undefined;
};

function keyPressed() {
  if (key === 'Backspace') {
    deleteCorner();
  }

  return false;
}

function mousePressed(e) {
  var _document$getElementB = document.getElementById('sketch-holder').getBoundingClientRect(),
      x = _document$getElementB.x,
      y = _document$getElementB.y,
      width = _document$getElementB.width,
      height = _document$getElementB.height;

  if (e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
    selectFunction(e, onTouchDevice ? 3 : 1);
  }
}

function touchStarted(e) {
  if (e.touches && e.touches.length > 0) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  var _document$getElementB2 = document.getElementById('sketch-holder').getBoundingClientRect(),
      x = _document$getElementB2.x,
      y = _document$getElementB2.y,
      width = _document$getElementB2.width,
      height = _document$getElementB2.height;

  if (e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
    selectFunction(e, 3);
    e.preventDefault();
    return false;
  }
}

function mouseDragged(e) {
  var _document$getElementB3 = document.getElementById('sketch-holder').getBoundingClientRect(),
      x = _document$getElementB3.x,
      y = _document$getElementB3.y,
      width = _document$getElementB3.width,
      height = _document$getElementB3.height;

  if (e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
    dragFunction(e, onTouchDevice ? 25 : 5);
  }
}

function touchMoved(e) {
  if (e.touches && e.touches.length > 0) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  var _document$getElementB4 = document.getElementById('sketch-holder').getBoundingClientRect(),
      x = _document$getElementB4.x,
      y = _document$getElementB4.y,
      width = _document$getElementB4.width,
      height = _document$getElementB4.height;

  if (e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) {
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