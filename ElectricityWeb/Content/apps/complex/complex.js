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
        visualElement.prototype.init = function (object, position, size, interactable, color) {
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            object.selectable = interactable || false;
        };
        return visualElement;
    })();
    visual.visualElement = visualElement;
    var rectElement = (function (_super) {
        __extends(rectElement, _super);
        function rectElement() {
            _super.apply(this, arguments);
        }
        rectElement.prototype.initRect = function (canvas, position, size, interactable, color) {
            var object = new fabric.Rect();
            _super.prototype.init.call(this, object, position, size, interactable, color);
            canvas.add(object);
            return this;
        };
        return rectElement;
    })(visualElement);
    visual.rectElement = rectElement;
    var circleElement = (function (_super) {
        __extends(circleElement, _super);
        function circleElement() {
            _super.apply(this, arguments);
        }
        circleElement.prototype.initCircle = function (canvas, position, radius, interactable, color) {
            var object = new fabric.Circle();
            object.radius = radius;
            _super.prototype.init.call(this, object, position, new Tools.Size(radius, radius), interactable, color);
            canvas.add(object);
            return this;
        };
        return circleElement;
    })(visualElement);
    visual.circleElement = circleElement;
    var imageElement = (function (_super) {
        __extends(imageElement, _super);
        function imageElement() {
            _super.apply(this, arguments);
        }
        imageElement.prototype.initImage = function (canvas, position, size, url, interactable) {
            var superFunc = _super.prototype.init;
            fabric.Image.fromURL(url, function (img) {
                superFunc(img, position, size, interactable, "white");
                canvas.add(img);
            });
            return this;
        };
        return imageElement;
    })(visualElement);
    visual.imageElement = imageElement;
})(visual || (visual = {}));
///<reference path="../../js/typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>
///<reference path="visual/visual.ts"/>
///<reference path="../../js/typings/fabricjs/fabricjs.d.ts"/>
var Application = (function () {
    function Application() {
        this.elements = [];
        this.canvas = new fabric.Canvas('canvas');
    }
    Application.prototype.init = function () {
        this.elements.push(new visual.rectElement().initRect(this.canvas, new Tools.Position(100, 200), new Tools.Size(200, 100), true, "green"));
        this.elements.push(new visual.circleElement().initCircle(this.canvas, new Tools.Position(400, 100), 20, false));
        this.elements.push(new visual.imageElement().initImage(this.canvas, new Tools.Position(400, 100), new Tools.Size(100, 100), '../Content/apps/complex/img/test.png', true));
    };
    Application.prototype.clear = function () {
        this.canvas.clear();
    };
    return Application;
})();
var application = new Application();
application.init();
//# sourceMappingURL=complex.js.map