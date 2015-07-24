///<reference path="../tools.ts"/>

module Visual {
    import Size = Tools.Size;
    import Position = Tools.Position;

    export interface IPositioned {
        x: number;
        y: number;
    }

    export class VisualElement {
        private object: fabric.IObject;

        get canvasObject(): fabric.IObject {
            return this.object;
        }

        protected init(object: fabric.IObject, interactable?: boolean) {
            this.object = object;
            object.selectable = interactable || false;
            object.hasBorders = false;
            object.hasControls = false;
            object.hasRotatingPoint = false;
        }
    }

    export class SizableElement extends VisualElement implements IPositioned {
        private connections: ConnectingLine[] = [];
        private canvas: fabric.ICanvas;

        private text: TextField;

        get x(): number {
            return this.canvasObject.left + this.canvasObject.width * this.canvasObject.scaleX / 2;
        }

        get y(): number {
            return this.canvasObject.top + this.canvasObject.height * this.canvasObject.scaleY / 2;
        }

        protected initSizable(object: fabric.IObject, canvas: fabric.ICanvas, position: Position, size: Size, interactable?: boolean, color?: string, strokeColor?: string, strokeWidth?: number) {
            this.canvas = canvas;
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            object.stroke = strokeColor || object.fill;
            object.strokeWidth = strokeWidth || 0;;
            object.setShadow({ color: "rgba(0, 0, 0, 0.15)", offsetX: 4, offsetY: 4 });
            var self = this;
            object.on("mousedown", () => self.onClick());
            super.init(object, interactable);
        }

        private onClick() {
            Application.instance.toolbar.activeTool.clickHandler.onElementClick(this);
        }

        connectWith(dest: SizableElement) {
            if (this.isConnectedWith(dest)) {
                return;
            }
            var line = new ConnectingLine().initLine(this.canvas, this, dest, false, "grey");
            this.canvas.sendToBack(line.canvasObject);

            this.setConnection(line);
            dest.setConnection(line);
        }

        isConnectedWith(obj: SizableElement): boolean {
            var connected: boolean = false;
            this.connections.forEach(line => {
                if (line.contains(obj)) {
                    connected = true;
                }
            });
            return connected;
        }

        private setConnection(line: ConnectingLine) {
            this.connections.push(line);
            var handler = () => {
                this.connections.forEach(item => {
                    item.updateNode(this);
                });
            };
            this.canvasObject.on({ "moving": handler, "scaling": handler });
        }

        set selected(val: boolean) {
            var canvas = Application.instance.canvas;
            this.canvasObject.animate("strokeWidth", val ? 4 : 0, { onChange: canvas.renderAll.bind(canvas) });
        }
    }

    export class RectElement extends SizableElement {
        initRect(position: Tools.Position, size: Size, interactable?: boolean, color?: string, strokeColor?: string) {
            var object = new fabric.Rect();
            var canvas = Application.instance.canvas;
            super.initSizable(object, canvas, position, size, interactable, color, strokeColor, 3);
            canvas.add(object);
            return this;
        }
    }

    export class CircleElement extends SizableElement {
        initCircle(position: Position, radius: number, interactable?: boolean, color?: string, strokeColor?: string) {
            var object = new fabric.Circle();
            var canvas = Application.instance.canvas;
            object.radius = radius;
            super.initSizable(object, canvas, position, new Size(radius, radius), interactable, color);
            canvas.add(object);
            return this;
        }
    }

    export class ImageElement extends SizableElement {
        initImage(position: Position, size: Size, url: string, interactable?: boolean) {
            var canvas = Application.instance.canvas;
            //var superFunc = super.initSizable;
            var self = this;
            fabric.Image.fromURL(url, (img: fabric.IImage) => {
                canvas.add(img);
                self.initSizable(img, canvas, position, size, interactable, "white");
                //superFunc(img, canvas, position, size, interactable, "white");
            });
            return this;
        }
    }

    class ConnectingLine extends VisualElement {
        private from: IPositioned;
        private to: IPositioned;
        private line: fabric.ILine;

        initLine(canvas: fabric.ICanvas, from: IPositioned, to: IPositioned, interactable?: boolean, color?: string, width: number = 1) {
            this.from = from;
            this.to = to;
            var object = new fabric.Line([from.x, from.y, to.x, to.y]);
            object.strokeWidth = width;
            object.stroke = color;
            super.init(object, interactable);
            this.line = object;
            canvas.add(object);
            return this;
        }

        updateNode(obj: IPositioned) {
            (obj === this.from) && this.line.set({ 'x1': this.from.x, 'y1': this.from.y });
            (obj === this.to) && this.line.set({ 'x2': this.to.x, 'y2': this.to.y });
        }

        contains(obj: IPositioned): boolean {
            return this.from === obj || this.to === obj;
        }
    }

    class TextField {
        constructor(canvas: fabric.ICanvas, parent: SizableElement) {
            var object = new fabric.Text("Value", { "fontSize": 14 });
            object.left = parent.canvasObject.left;
            object.top = parent.canvasObject.top;

            var group = new fabric.Group([parent.canvasObject, object]);
            canvas.add(group);
        }
    }
}