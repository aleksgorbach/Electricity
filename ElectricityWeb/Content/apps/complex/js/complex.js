var Tools;
(function (Tools) {
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    })();
    Tools.Size = Size;
    var Position = (function () {
        function Position(x, y) {
            this.x = x;
            this.y = y;
        }
        return Position;
    })();
    Tools.Position = Position;
})(Tools || (Tools = {}));
///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>
var __extends = this.__extends || function (d, b) {
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
        };
        return visualElement;
    })();
    visual.visualElement = visualElement;
    var sizableElement = (function (_super) {
        __extends(sizableElement, _super);
        function sizableElement() {
            _super.apply(this, arguments);
            this.connectings = [];
        }
        Object.defineProperty(sizableElement.prototype, "position", {
            get: function () {
                return new Tools.Position(this.canvasObject.left + this.canvasObject.width / 2, this.canvasObject.top + this.canvasObject.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        sizableElement.prototype.initSizable = function (object, canvas, position, size, interactable, color) {
            this.canvas = canvas;
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            _super.prototype.init.call(this, object, interactable);
        };
        sizableElement.prototype.connectWith = function (dest) {
            if (this.isConnectedWith(dest)) {
                return;
            }
            var line = new connectingLine().initLine(this.canvas, this, dest, false, "grey");
            this.canvas.sendToBack(line.canvasObject);
            this.setConnection(dest, line);
            dest.setConnection(this, line);
        };
        sizableElement.prototype.isConnectedWith = function (obj) {
            this.connectings.forEach(function (line) {
                if (line.obj == obj) {
                    return true;
                }
            });
            return false;
        };
        sizableElement.prototype.setConnection = function (obj, line) {
            this.connectings.push(new oneSideConnecting(obj, line));
            var object = this;
            this.canvasObject.on("moving", function (e) {
                var p = e.target;
                object.connectings.forEach(function (item) {
                    if (item.obj == object) {
                        item.line.canvasObject.set({ 'x1': item.obj.canvasObject.left, 'y1': item.obj.canvasObject.top });
                    }
                });
            });
        };
        return sizableElement;
    })(visualElement);
    visual.sizableElement = sizableElement;
    var rectElement = (function (_super) {
        __extends(rectElement, _super);
        function rectElement() {
            _super.apply(this, arguments);
        }
        rectElement.prototype.initRect = function (canvas, position, size, interactable, color) {
            var object = new fabric.Rect();
            _super.prototype.initSizable.call(this, object, canvas, position, size, interactable, color);
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
        circleElement.prototype.initCircle = function (canvas, position, radius, interactable, color) {
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
            var object = new fabric.Line([from.position.x, from.position.y, to.position.x, to.position.y]);
            object.strokeWidth = width;
            object.stroke = color;
            _super.prototype.init.call(this, object, interactable);
            canvas.add(object);
            return this;
        };
        return connectingLine;
    })(visualElement);
    visual.connectingLine = connectingLine;
    var oneSideConnecting = (function () {
        function oneSideConnecting(obj, line) {
            this.obj = obj;
            this.line = line;
        }
        return oneSideConnecting;
    })();
})(visual || (visual = {}));
///<reference path="../../js/typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>
///<reference path="visual/visual.ts"/>
///<reference path="../../js/typings/fabricjs/fabricjs.d.ts"/>
var Application = (function () {
    function Application() {
        this.canvas = new fabric.Canvas('canvas');
    }
    Application.prototype.init = function () {
        var rect = new visual.rectElement().initRect(this.canvas, new Tools.Position(100, 200), new Tools.Size(200, 100), true, "green");
        var circle = new visual.circleElement().initCircle(this.canvas, new Tools.Position(400, 100), 20, false);
        var image = new visual.imageElement().initImage(this.canvas, new Tools.Position(400, 100), new Tools.Size(100, 100), '../Content/apps/complex/img/test.png', true);
        rect.connectWith(circle);
    };
    Application.prototype.clear = function () {
        this.canvas.clear();
    };
    return Application;
})();
var application = new Application();
application.init();
var input;
(function (input) {
    var inputController = (function () {
        function inputController() {
        }
        return inputController;
    })();
    input.inputController = inputController;
})(input || (input = {}));
///<reference path="../../../../js/typings/fabricjs/fabricjs.d.ts"/>
var creator;
(function (creator_1) {
    var creator = (function () {
        function creator(canvas) {
            this.canvas = canvas;
            this.interactable = true;
        }
        return creator;
    })();
    creator_1.creator = creator;
    var staticContentCreator = (function (_super) {
        __extends(staticContentCreator, _super);
        function staticContentCreator(canvas) {
            _super.call(this, canvas);
            this.interactable = false;
        }
        return staticContentCreator;
    })(creator);
    creator_1.staticContentCreator = staticContentCreator;
})(creator || (creator = {}));
//# sourceMappingURL=complex.js.map