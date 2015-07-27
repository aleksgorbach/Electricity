///<reference path="../tools/tools.ts"/>

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

        get sendBack() {
            return false;
        }


        delete() {
            Application.instance.elements.remove(this);
        }

        onRemove() {
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

        private text: TextField;

        get x(): number {
            return this.canvasObject.left + this.canvasObject.width * this.canvasObject.scaleX / 2;
        }

        get y(): number {
            return this.canvasObject.top + this.canvasObject.height * this.canvasObject.scaleY / 2;
        }

        protected initSizable(object: fabric.IObject, position: Position, size: Size, interactable?: boolean, color?: string, strokeWidth?: number) {
            object.left = position.x;
            object.top = position.y;
            object.width = size.width;
            object.height = size.height;
            object.fill = color || "grey";
            object.stroke = inactiveFigure.stroke;
            object.strokeWidth = strokeWidth || 0;;
            object.setShadow({ color: "rgba(0, 0, 0, 0.15)", offsetX: 4, offsetY: 4 });
            var self = this;
            object.on("mousedown", () => self.onClick());
            super.init(object, interactable);
        }

        private onClick() {
            Application.instance.toolbar.activeTool.clickHandler.onElementClick(this);
        }

        onRemove() {
            this.connections.forEach(connection => connection.delete());
        }

        connectWith(dest: SizableElement) : ConnectingLine {
            if (this.isConnectedWith(dest)) {
                return null;
            }
            var line = new ConnectingLine().initLine(this, dest, false, "grey");

            this.setConnection(line);
            dest.setConnection(line);
            return line;
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
            this.canvasObject.set(val ? activeFigure : inactiveFigure);
            canvas.renderAll();
        }
    }

    export class RectElement extends SizableElement {
        initRect(position: Tools.Position, size: Size, interactable?: boolean, color?: string) {
            var object = new fabric.Rect();
            super.initSizable(object, position, size, interactable, color, 3);
            return this;
        }
    }

    export class CircleElement extends SizableElement {
        initCircle(position: Position, radius: number, interactable?: boolean, color?: string) {
            var object = new fabric.Circle();
            object.radius = radius;
            super.initSizable(object, position, new Size(radius, radius), interactable, color);
            return this;
        }
    }

    export class ImageElement extends SizableElement {
        initImage(position: Position, size: Size, url: string, interactable?: boolean) {
            var self = this;
            fabric.Image.fromURL(url, (img: fabric.IImage) => {
                self.initSizable(img, position, size, interactable, "white");
            });
            return this;
        }
    }

    export class ConnectingLine extends VisualElement {
        private from: IPositioned;
        private to: IPositioned;
        private line: fabric.ILine;

        initLine(from: IPositioned, to: IPositioned, interactable?: boolean, color?: string, width: number = 1) {
            this.from = from;
            this.to = to;
            var object = new fabric.Line([from.x, from.y, to.x, to.y]);
            object.strokeWidth = width;
            object.stroke = color;
            super.init(object, interactable);
            this.line = object;
            return this;
        }

        updateNode(obj: IPositioned) {
            (obj === this.from) && this.line.set({ 'x1': this.from.x, 'y1': this.from.y });
            (obj === this.to) && this.line.set({ 'x2': this.to.x, 'y2': this.to.y });
        }

        contains(obj: IPositioned): boolean {
            return this.from === obj || this.to === obj;
        }

        get sendBack() {
            return true;
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