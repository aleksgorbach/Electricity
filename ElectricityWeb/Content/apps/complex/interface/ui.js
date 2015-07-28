///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ui;
(function (ui) {
    var toolbar = (function () {
        function toolbar(canvas, xPos, yPos, height, controlSize) {
            this.controls = [];
            this.canvas = canvas;
            this.x = xPos;
            this.y = yPos;
            this.height = height;
            this.elementSize = controlSize;
        }
        toolbar.prototype.createToggle = function () {
            var t = new toggle();
            var left = this.controls.length * this.elementSize;
            t.initToggle(this.canvas, this.x + left, this.y, 100, this.height, "../Content/apps/complex/img/test.png");
            this.controls.push(t);
        };
        return toolbar;
    })();
    ui.toolbar = toolbar;
    var control = (function () {
        function control() {
        }
        control.prototype.onClick = function () {
            console.log('click');
        };
        control.prototype.init = function (object, width) {
            this.object = object;
            object.selectable = false;
            object.on("mousedown", this.onClick);
        };
        return control;
    })();
    var toggle = (function (_super) {
        __extends(toggle, _super);
        function toggle() {
            _super.apply(this, arguments);
        }
        toggle.prototype.initToggle = function (canvas, x, y, width, height, url) {
            var init = this.init;
            fabric.Image.fromURL(url, function (img) {
                img.width = width;
                img.height = height;
                img.left = x;
                img.top = y;
                init(img, width);
                canvas.add(img);
            });
        };
        return toggle;
    })(control);
})(ui || (ui = {}));
//# sourceMappingURL=ui.js.map