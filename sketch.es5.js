"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    this.width = 10;
    this.selected = false;
    this.type = "Corner";
  }

  _createClass(Corner, [{
    key: "draw",
    value: function draw() {
      stroke(this.selected ? 255 : 0);
      strokeWeight(this.selected ? this.width * 2 : this.width);
      point(this.x, this.y);
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      if (Math.abs(this.x - mouseX) <= this.width / 2 && Math.abs(this.y - mouseY) <= this.width / 2) {
        return true;
      }
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
      stroke(this.selected ? 255 : 0);
      strokeWeight(this.selected ? this.width * 2 : this.width);
      line(this.corner1.x, this.corner1.y, this.corner2.x, this.corner2.y);
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      var distanceToCorner1 = Math.sqrt(Math.pow(this.corner1.x - mouseX, 2) + Math.pow(this.corner1.y - mouseY, 2));
      var distanceToCorner2 = Math.sqrt(Math.pow(this.corner2.x - mouseX, 2) + Math.pow(this.corner2.y - mouseY, 2));
      var distanceBetweenCorners = Math.sqrt(Math.pow(this.corner2.x - this.corner1.x, 2) + Math.pow(this.corner2.y - this.corner1.y, 2));
      return distanceToCorner1 + distanceToCorner2 - distanceBetweenCorners <= 0.5;
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
  }]);

  return Connection;
}();

var corner1 = new Corner(100, 100);
var corner2 = new Corner(100, 300);
var corner3 = new Corner(300, 100);
var corner4 = new Corner(300, 300);
var connection1 = new Connection(corner1, corner2);
var connection2 = new Connection(corner1, corner3);
var connection3 = new Connection(corner2, corner4);
var connection4 = new Connection(corner3, corner4);
var objects = [corner1, corner2, corner3, corner4, connection1, connection2, connection3, connection4];
var selection = undefined;
var moved = false;
var timeout = undefined;

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
}

function draw() {
  background(220);

  for (var _i = 0, _objects = objects; _i < _objects.length; _i++) {
    var object = _objects[_i];
    object.draw();
  }
}

var selectFunction = function selectFunction() {
  selection = undefined;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var object = _step.value;

      if (!selection && object.checkCollision()) {
        object.selected = true;
        selection = object;

        if (selection.type === "Connection") {
          timeout = setTimeout(function () {
            if (!moved) {
              var corner = new Corner(mouseX, mouseY);

              var _connection = new Connection(selection.corner1, corner);

              var _connection2 = new Connection(corner, selection.corner2);

              objects.splice(objects.indexOf(selection), 1);
              objects.push(corner);
              objects.push(_connection);
              objects.push(_connection2);
              corner.selected = true;
              selection = corner;
            }
          }, 1000);
        }
      } else {
        object.selected = false;
      }
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
};

var dragFunction = function dragFunction() {
  moved = true;

  if (!selection) {
    return;
  }

  if (selection.type === "Corner") {
    selection.x = mouseX;
    selection.y = mouseY;
  } else if (selection.type === "Connection") {
    var m = selection.getSlope();

    if (Math.abs(m) === Infinity) {
      selection.corner1.x = mouseX;
      selection.corner2.x = mouseX;
    } else if (m === 0) {
      selection.corner1.y = mouseY;
      selection.corner2.y = mouseY;
    } else {
      var parallelLine = new Line(m, mouseY - m * mouseX);
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

var dragEnded = function dragEnded() {
  moved = false;

  if (timeout) {
    clearTimeout(timeout);
  }
};

var deleteCorner = function deleteCorner() {
  if (!selection || selection.type !== "Corner") {
    return;
  }

  var connections = objects.filter(function (o) {
    return o.corner1 === selection || o.corner2 === selection;
  });
  var connection1 = connections[0];
  var connection2 = connections[1];
  var newConnection = new Connection(connection1.getOtherCorner(selection), connection2.getOtherCorner(selection));
  objects.splice(objects.indexOf(selection), 1);
  objects.splice(objects.indexOf(connection1), 1);
  objects.splice(objects.indexOf(connection2), 1);
  objects.push(newConnection);
  selection = undefined;
};

function keyPressed() {
  if (key === 'Backspace') {
    deleteCorner();
  }

  return false;
}

function mousePressed() {
  selectFunction();
}

function touchStarted() {
  selectFunction();
}

function mouseDragged() {
  dragFunction();
}

function touchMoved() {
  dragFunction();
}

function mouseReleased() {
  dragEnded();
}

function touchEnded() {
  dragEnded();
}