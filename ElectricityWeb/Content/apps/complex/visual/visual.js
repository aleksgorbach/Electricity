///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var visual;
(function (visual) {
    var visualElement = (function () {
        function visualElement() {
        }
        Object.defineProperty(visualElement.prototype, "canvasObject", {
            get: function () {
                return this.object;
            },
            enumerable: true,
            configurable: true
        });
        visualElement.prototype.init = function (object, interactable) {
            this.object = object;
            object.selectable = interactable || false;
            object.hasBorders = false;
            object.hasControls = false;
            object.hasRotatingPoint = false;
        };
        return visualElement;
    })();
    var sizableElement = (function (_super) {
        __extends(sizableElement, _super);
        function sizableElement() {
            _super.apply(this, arguments);
            this.connections = [];
        }
        Object.defineProperty(sizableElement.prototype, "x", {
            get: function () {
                return this.canvasObject.left + this.canvasObject.width * this.canvasObject.scaleX / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(sizableElement.prototype, "y", {
            get: function () {
                return this.canvasObject.top + this.canvasObject.height * this.canvasObject.scaleY / 2;
            },
            enumerable: true,
            configurable: true
        });
        sizableElement.prototype.initSizable = function (object, canvas, position, size, interactable, color, strokeColor, strokeWidth) {
            this.canvas = canvas;
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            object.stroke = strokeColor || object.fill;
            object.strokeWidth = strokeWidth || 0;
            ;
            object.setShadow({ color: "rgba(0, 0, 0, 0.15)", offsetX: 4, offsetY: 4 });
            _super.prototype.init.call(this, object, interactable);
        };
        sizableElement.prototype.connectWith = function (dest) {
            if (this.isConnectedWith(dest)) {
                return;
            }
            var line = new connectingLine().initLine(this.canvas, this, dest, false, "grey");
            this.canvas.sendToBack(line.canvasObject);
            this.setConnection(line);
            dest.setConnection(line);
        };
        sizableElement.prototype.isConnectedWith = function (obj) {
            this.connections.forEach(function (line) {
                if (line.contains(obj)) {
                    return true;
                }
            });
            return false;
        };
        sizableElement.prototype.setConnection = function (line) {
            this.connections.push(line);
            var obj = this;
            var handler = function (e) {
                obj.connections.forEach(function (item) {
                    item.updateNode(obj);
                });
            };
            this.canvasObject.on({ "moving": handler, "scaling": handler });
        };
        return sizableElement;
    })(visualElement);
    var rectElement = (function (_super) {
        __extends(rectElement, _super);
        function rectElement() {
            _super.apply(this, arguments);
        }
        rectElement.prototype.initRect = function (canvas, position, size, interactable, color, strokeColor) {
            var object = new fabric.Rect();
            _super.prototype.initSizable.call(this, object, canvas, position, size, interactable, color, strokeColor, 3);
            canvas.add(object);
            return this;
        };
        return rectElement;
    })(sizableElement);
    visual.rectElement = rectElement;
    var circleElement = (function (_super) {
        __extends(circleElement, _super);
        function circleElement() {
            _super.apply(this, arguments);
        }
        circleElement.prototype.initCircle = function (canvas, position, radius, interactable, color, strokeColor) {
            var object = new fabric.Circle();
            object.radius = radius;
            _super.prototype.initSizable.call(this, object, canvas, position, new Tools.Size(radius, radius), interactable, color);
            canvas.add(object);
            return this;
        };
        return circleElement;
    })(sizableElement);
    visual.circleElement = circleElement;
    var imageElement = (function (_super) {
        __extends(imageElement, _super);
        function imageElement() {
            _super.apply(this, arguments);
        }
        imageElement.prototype.initImage = function (canvas, position, size, url, interactable) {
            var superFunc = _super.prototype.initSizable;
            fabric.Image.fromURL(url, function (img) {
                superFunc(img, canvas, position, size, interactable, "white");
                canvas.add(img);
            });
            return this;
        };
        return imageElement;
    })(sizableElement);
    visual.imageElement = imageElement;
    var connectingLine = (function (_super) {
        __extends(connectingLine, _super);
        function connectingLine() {
            _super.apply(this, arguments);
        }
        connectingLine.prototype.initLine = function (canvas, from, to, interactable, color, width) {
            if (width === void 0) { width = 1; }
            this.from = from;
            this.to = to;
            var object = new fabric.Line([from.x, from.y, to.x, to.y]);
            object.strokeWidth = width;
            object.stroke = color;
            _super.prototype.init.call(this, object, interactable);
            this.line = object;
            canvas.add(object);
            return this;
        };
        connectingLine.prototype.updateNode = function (obj) {
            (obj == this.from) && this.line.set({ 'x1': this.from.x, 'y1': this.from.y });
            (obj == this.to) && this.line.set({ 'x2': this.to.x, 'y2': this.to.y });
        };
        connectingLine.prototype.contains = function (obj) {
            return this.from == obj || this.to == obj;
        };
        return connectingLine;
    })(visualElement);
    var textField = (function () {
        function textField(canvas, parent) {
            var object = new fabric.Text("Value", { "fontSize": 14 });
            object.left = parent.canvasObject.left;
            object.top = parent.canvasObject.top;
            var group = new fabric.Group([parent.canvasObject, object]);
            canvas.add(group);
        }
        return textField;
    })();
})(visual || (visual = {}));
//# sourceMappingURL=visual.js.map