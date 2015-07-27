///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
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
    var ObjectStorage = (function () {
        function ObjectStorage() {
            this.objects = [];
        }
        ObjectStorage.prototype.add = function () {
            var _this = this;
            var elements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                elements[_i - 0] = arguments[_i];
            }
            elements.forEach(function (element) { return _this.objects.push(element); });
        };
        ObjectStorage.prototype.remove = function (element) {
            var index = this.objects.indexOf(element);
            if (index != undefined) {
                this.objects.splice(index, 1);
            }
        };
        Object.defineProperty(ObjectStorage.prototype, "all", {
            get: function () {
                return this.objects;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectStorage;
    })();
    var CanvasObjects = (function () {
        function CanvasObjects(canvas) {
            this.storage = new ObjectStorage();
            this.canvas = canvas;
        }
        CanvasObjects.prototype.add = function () {
            var _this = this;
            var elements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                elements[_i - 0] = arguments[_i];
            }
            var canvas = this.canvas;
            elements.forEach(function (element) {
                _this.storage.add(element);
                canvas.add(element.canvasObject);
                if (element.sendBack) {
                    canvas.sendToBack(element.canvasObject);
                }
            });
        };
        CanvasObjects.prototype.remove = function (element) {
            this.storage.remove(element);
            this.canvas.remove(element.canvasObject);
            element.onRemove();
        };
        CanvasObjects.prototype.all = function () {
            var res = this.storage.all.filter(function (elem) {
                var casted = elem;
                return casted != null;
            });
            return res.map(function (elem) { return elem; });
        };
        return CanvasObjects;
    })();
    Tools.CanvasObjects = CanvasObjects;
})(Tools || (Tools = {}));
///<reference path="../tools/tools.ts"/>
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
        Object.defineProperty(VisualElement.prototype, "sendBack", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        VisualElement.prototype.delete = function () {
            Application.instance.elements.remove(this);
        };
        VisualElement.prototype.onRemove = function () {
        };
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
        SizableElement.prototype.initSizable = function (object, position, size, interactable, color, strokeWidth) {
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            object.stroke = inactiveFigure.stroke;
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
        SizableElement.prototype.onRemove = function () {
            this.connections.forEach(function (connection) { return connection.delete(); });
        };
        SizableElement.prototype.connectWith = function (dest) {
            if (this.isConnectedWith(dest)) {
                return null;
            }
            var line = new ConnectingLine().initLine(this, dest, false, "grey");
            this.setConnection(line);
            dest.setConnection(line);
            return line;
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
                this.canvasObject.set(val ? activeFigure : inactiveFigure);
                canvas.renderAll();
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
        RectElement.prototype.initRect = function (position, size, interactable, color) {
            var object = new fabric.Rect();
            _super.prototype.initSizable.call(this, object, position, size, interactable, color, 3);
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
        CircleElement.prototype.initCircle = function (position, radius, interactable, color) {
            var object = new fabric.Circle();
            object.radius = radius;
            _super.prototype.initSizable.call(this, object, position, new Size(radius, radius), interactable, color);
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
            var self = this;
            fabric.Image.fromURL(url, function (img) {
                self.initSizable(img, position, size, interactable, "white");
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
        ConnectingLine.prototype.initLine = function (from, to, interactable, color, width) {
            if (width === void 0) { width = 1; }
            this.from = from;
            this.to = to;
            var object = new fabric.Line([from.x, from.y, to.x, to.y]);
            object.strokeWidth = width;
            object.stroke = color;
            _super.prototype.init.call(this, object, interactable);
            this.line = object;
            return this;
        };
        ConnectingLine.prototype.updateNode = function (obj) {
            (obj === this.from) && this.line.set({ 'x1': this.from.x, 'y1': this.from.y });
            (obj === this.to) && this.line.set({ 'x2': this.to.x, 'y2': this.to.y });
        };
        ConnectingLine.prototype.contains = function (obj) {
            return this.from === obj || this.to === obj;
        };
        Object.defineProperty(ConnectingLine.prototype, "sendBack", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return ConnectingLine;
    })(VisualElement);
    Visual.ConnectingLine = ConnectingLine;
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
var inactiveBorder = { stroke: "#eee", strokeWidth: 2 };
var activeBorder = { stroke: "green", strokeWidth: 3 };
var inactiveConnection = { stroke: "grey", strokeWidth: 2 };
var activeConnection = { stroke: "grey", strokeWidth: 3 };
var inactiveFigure = { stroke: "#ddd", strokeWidth: 0 };
var activeFigure = { stroke: "#050", strokeWidth: 3 };
///<reference path="styles.ts"/>
var Ui;
(function (Ui) {
    var Toolbar = (function () {
        function Toolbar(position, controlSize) {
            var _this = this;
            var tools = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                tools[_i - 2] = arguments[_i];
            }
            this.offset = 3;
            this.controls = [];
            this.position = position;
            this.controlSize = controlSize;
            tools.forEach(function (tool) { return _this.createToggle(tool); });
        }
        Toolbar.prototype.createToggle = function (tool) {
            var t = new Toggle();
            var left = this.controls.length * (this.controlSize.width + this.offset);
            t.initToggle(this, new Tools.Position(this.position.x + left, this.position.y), this.controlSize, tool);
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
        Toggle.prototype.initToggle = function (toolbar, position, size, tool) {
            var self = this;
            this.toolbar = toolbar;
            this.size = size;
            this.tool = tool;
            var onClick = function () { return self.onClick(self); };
            fabric.Image.fromURL(tool.imgUrl, function (img) {
                img.width = size.width;
                img.height = size.height;
                img.left = position.x;
                img.top = position.y;
                img.selectable = false;
                img.on("mousedown", onClick);
                self.object = img;
                self.changeState(false);
                Application.instance.canvas.add(img);
            });
        };
        Toggle.prototype.onClick = function (self) {
            self.toolbar.onControlClicked(self);
        };
        Toggle.prototype.changeState = function (state) {
            this.object.set(state ? activeBorder : inactiveBorder);
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
})(Ui || (Ui = {}));
var Ui;
(function (Ui) {
    var SelectTool = (function () {
        function SelectTool() {
        }
        SelectTool.prototype.onElementClick = function (element) {
            Application.instance.deselect();
            element.selected = true;
        };
        Object.defineProperty(SelectTool.prototype, "imgUrl", {
            get: function () {
                return "../Content/apps/complex/img/select.png";
            },
            enumerable: true,
            configurable: true
        });
        return SelectTool;
    })();
    Ui.SelectTool = SelectTool;
    var DeleteTool = (function () {
        function DeleteTool() {
        }
        DeleteTool.prototype.onElementClick = function (element) {
            element.delete();
        };
        Object.defineProperty(DeleteTool.prototype, "imgUrl", {
            get: function () {
                return "../Content/apps/complex/img/delete.svg";
            },
            enumerable: true,
            configurable: true
        });
        return DeleteTool;
    })();
    Ui.DeleteTool = DeleteTool;
    var ConnectTool = (function () {
        function ConnectTool() {
        }
        ConnectTool.prototype.onElementClick = function (element) {
            if (this.saved == null) {
                this.saved = element;
                return;
            }
            if (this.saved.isConnectedWith(element)) {
                return;
            }
            var connection = this.saved.connectWith(element);
            Application.instance.elements.add(connection);
        };
        Object.defineProperty(ConnectTool.prototype, "imgUrl", {
            get: function () {
                return "../Content/apps/complex/img/connect.svg";
            },
            enumerable: true,
            configurable: true
        });
        return ConnectTool;
    })();
    Ui.ConnectTool = ConnectTool;
})(Ui || (Ui = {}));
///<reference path="visual/visual.ts"/>
///<reference path="interface/ui.ts"/>
///<reference path="interface/tools.ts"/>
var Application = (function () {
    function Application() {
        this.canvas = new fabric.Canvas("canvas");
        this.elements = new Tools.CanvasObjects(this.canvas);
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
        var rect = new Visual.RectElement().initRect(new Tools.Position(100, 200), new Tools.Size(200, 100), true, "#eee");
        var circle = new Visual.CircleElement().initCircle(new Tools.Position(400, 100), 20, false);
        this.elements.add(rect, circle);
        var toolbar = new Ui.Toolbar(new Tools.Position(0, 0), new Tools.Size(80, 80), new Ui.SelectTool(), new Ui.DeleteTool(), new Ui.ConnectTool());
        this.toolbar = toolbar;
    };
    Application.prototype.clear = function () {
        this.canvas.clear();
    };
    Application.prototype.deselect = function () {
        this.elements.all().forEach(function (elem) { return elem.selected = false; });
    };
    return Application;
})();
Application.instance.init();
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