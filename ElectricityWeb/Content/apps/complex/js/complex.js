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
///<reference path="../tools.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Visual;
(function (Visual) {
    var Size = Tools.Size;
    var VisualElement = (function () {
        function VisualElement() {
        }
        Object.defineProperty(VisualElement.prototype, "canvasObject", {
            get: function () {
                return this.object;
            },
            enumerable: true,
            configurable: true
        });
        VisualElement.prototype.init = function (object, interactable) {
            this.object = object;
            object.selectable = interactable || false;
            object.hasBorders = false;
            object.hasControls = false;
            object.hasRotatingPoint = false;
        };
        return VisualElement;
    })();
    Visual.VisualElement = VisualElement;
    var SizableElement = (function (_super) {
        __extends(SizableElement, _super);
        function SizableElement() {
            _super.apply(this, arguments);
            this.connections = [];
        }
        Object.defineProperty(SizableElement.prototype, "x", {
            get: function () {
                return this.canvasObject.left + this.canvasObject.width * this.canvasObject.scaleX / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SizableElement.prototype, "y", {
            get: function () {
                return this.canvasObject.top + this.canvasObject.height * this.canvasObject.scaleY / 2;
            },
            enumerable: true,
            configurable: true
        });
        SizableElement.prototype.initSizable = function (object, canvas, position, size, interactable, color, strokeColor, strokeWidth) {
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
            var self = this;
            object.on("mousedown", function () { return self.onClick(); });
            _super.prototype.init.call(this, object, interactable);
        };
        SizableElement.prototype.onClick = function () {
            Application.instance.toolbar.activeTool.clickHandler.onElementClick(this);
        };
        SizableElement.prototype.connectWith = function (dest) {
            if (this.isConnectedWith(dest)) {
                return;
            }
            var line = new ConnectingLine().initLine(this.canvas, this, dest, false, "grey");
            this.canvas.sendToBack(line.canvasObject);
            this.setConnection(line);
            dest.setConnection(line);
        };
        SizableElement.prototype.isConnectedWith = function (obj) {
            var connected = false;
            this.connections.forEach(function (line) {
                if (line.contains(obj)) {
                    connected = true;
                }
            });
            return connected;
        };
        SizableElement.prototype.setConnection = function (line) {
            var _this = this;
            this.connections.push(line);
            var handler = function () {
                _this.connections.forEach(function (item) {
                    item.updateNode(_this);
                });
            };
            this.canvasObject.on({ "moving": handler, "scaling": handler });
        };
        Object.defineProperty(SizableElement.prototype, "selected", {
            set: function (val) {
                var canvas = Application.instance.canvas;
                this.canvasObject.animate("strokeWidth", val ? 4 : 0, { onChange: canvas.renderAll.bind(canvas) });
            },
            enumerable: true,
            configurable: true
        });
        return SizableElement;
    })(VisualElement);
    Visual.SizableElement = SizableElement;
    var RectElement = (function (_super) {
        __extends(RectElement, _super);
        function RectElement() {
            _super.apply(this, arguments);
        }
        RectElement.prototype.initRect = function (position, size, interactable, color, strokeColor) {
            var object = new fabric.Rect();
            var canvas = Application.instance.canvas;
            _super.prototype.initSizable.call(this, object, canvas, position, size, interactable, color, strokeColor, 3);
            canvas.add(object);
            return this;
        };
        return RectElement;
    })(SizableElement);
    Visual.RectElement = RectElement;
    var CircleElement = (function (_super) {
        __extends(CircleElement, _super);
        function CircleElement() {
            _super.apply(this, arguments);
        }
        CircleElement.prototype.initCircle = function (position, radius, interactable, color, strokeColor) {
            var object = new fabric.Circle();
            var canvas = Application.instance.canvas;
            object.radius = radius;
            _super.prototype.initSizable.call(this, object, canvas, position, new Size(radius, radius), interactable, color);
            canvas.add(object);
            return this;
        };
        return CircleElement;
    })(SizableElement);
    Visual.CircleElement = CircleElement;
    var ImageElement = (function (_super) {
        __extends(ImageElement, _super);
        function ImageElement() {
            _super.apply(this, arguments);
        }
        ImageElement.prototype.initImage = function (position, size, url, interactable) {
            var canvas = Application.instance.canvas;
            var self = this;
            fabric.Image.fromURL(url, function (img) {
                canvas.add(img);
                self.initSizable(img, canvas, position, size, interactable, "white");
            });
            return this;
        };
        return ImageElement;
    })(SizableElement);
    Visual.ImageElement = ImageElement;
    var ConnectingLine = (function (_super) {
        __extends(ConnectingLine, _super);
        function ConnectingLine() {
            _super.apply(this, arguments);
        }
        ConnectingLine.prototype.initLine = function (canvas, from, to, interactable, color, width) {
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
        ConnectingLine.prototype.updateNode = function (obj) {
            (obj === this.from) && this.line.set({ 'x1': this.from.x, 'y1': this.from.y });
            (obj === this.to) && this.line.set({ 'x2': this.to.x, 'y2': this.to.y });
        };
        ConnectingLine.prototype.contains = function (obj) {
            return this.from === obj || this.to === obj;
        };
        return ConnectingLine;
    })(VisualElement);
    var TextField = (function () {
        function TextField(canvas, parent) {
            var object = new fabric.Text("Value", { "fontSize": 14 });
            object.left = parent.canvasObject.left;
            object.top = parent.canvasObject.top;
            var group = new fabric.Group([parent.canvasObject, object]);
            canvas.add(group);
        }
        return TextField;
    })();
})(Visual || (Visual = {}));
var Ui;
(function (Ui) {
    var Toolbar = (function () {
        function Toolbar(app, xPos, yPos, height, controlSize) {
            this.controls = [];
            this.app = app;
            this.x = xPos;
            this.y = yPos;
            this.height = height;
            this.elementSize = controlSize;
        }
        Toolbar.prototype.createToggle = function () {
            var t = new Toggle();
            var left = this.controls.length * this.elementSize;
            t.initToggle(this.app.canvas, this, this.x + left, this.y, this.elementSize, this.height, "../Content/apps/complex/img/select.png");
            this.controls.push(t);
        };
        Toolbar.prototype.onControlClicked = function (control) {
            var _this = this;
            this.controls.forEach(function (x) {
                x.changeState(x === control);
                if (x === control) {
                    _this.activeTool = x;
                }
            });
        };
        return Toolbar;
    })();
    Ui.Toolbar = Toolbar;
    var Toggle = (function () {
        function Toggle() {
        }
        Toggle.prototype.initToggle = function (canvas, toolbar, x, y, width, height, url) {
            var self = this;
            this.toolbar = toolbar;
            this.size = width;
            this.tool = new SelectTool();
            var onClick = function () { return self.onClick(self); };
            fabric.Image.fromURL(url, function (img) {
                img.width = width;
                img.height = height;
                img.left = x;
                img.top = y;
                img.selectable = false;
                img.on("mousedown", onClick);
                self.object = img;
                canvas.add(img);
            });
        };
        Toggle.prototype.onClick = function (self) {
            self.toolbar.onControlClicked(self);
        };
        Toggle.prototype.changeState = function (state) {
            this.object.setShadow({ color: "rgba(0, 0, 0, 0.15)", offsetX: 0, offsetY: state ? 7 : 0 });
        };
        Object.defineProperty(Toggle.prototype, "clickHandler", {
            get: function () {
                return this.tool;
            },
            enumerable: true,
            configurable: true
        });
        return Toggle;
    })();
    var SelectTool = (function () {
        function SelectTool() {
        }
        SelectTool.prototype.onElementClick = function (element) {
            Application.instance.deselect();
            element.selected = true;
        };
        return SelectTool;
    })();
})(Ui || (Ui = {}));
///<reference path="visual/visual.ts"/>
///<reference path="interface/ui.ts"/>
var Application = (function () {
    function Application() {
        this.elements = [];
        this.canvas = new fabric.Canvas("canvas");
    }
    Object.defineProperty(Application, "instance", {
        get: function () {
            if (this.instanceInternal == null) {
                this.instanceInternal = new Application();
            }
            return this.instanceInternal;
        },
        enumerable: true,
        configurable: true
    });
    Application.prototype.init = function () {
        var rect = new Visual.RectElement().initRect(new Tools.Position(100, 200), new Tools.Size(200, 100), true, "white", "green");
        var circle = new Visual.CircleElement().initCircle(new Tools.Position(400, 100), 20, false);
        var image = new Visual.ImageElement().initImage(new Tools.Position(400, 100), new Tools.Size(100, 100), "../Content/apps/complex/img/test.png", true);
        rect.connectWith(circle);
        this.elements.push(rect, circle, image);
        this.toolbar = new Ui.Toolbar(this, 0, 0, 100, 100);
        this.toolbar.createToggle();
        this.toolbar.createToggle();
        this.toolbar.createToggle();
    };
    Application.prototype.clear = function () {
        this.canvas.clear();
    };
    Application.prototype.deselect = function () {
        this.elements.forEach(function (elem) { return elem.selected = false; });
    };
    return Application;
})();
Application.instance.init();
var Input;
(function (Input) {
    var InputController = (function () {
        function InputController() {
        }
        return InputController;
    })();
    Input.InputController = InputController;
})(Input || (Input = {}));
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