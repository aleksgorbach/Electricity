module Ui {
    import SizableElement = Visual.SizableElement;

    export class Toolbar {
        private app: Application;
        private controls: IToolbarElement[] = [];

        private x: number;
        private y: number;
        private height: number;
        private elementSize: number;

        public activeTool: IToolbarElement;

        constructor(app: Application, xPos: number, yPos: number, height: number, controlSize: number) {
            this.app = app;
            this.x = xPos;
            this.y = yPos;
            this.height = height;
            this.elementSize = controlSize;
        }

        createToggle() {
            var t = new Toggle();
            var left: number = this.controls.length * this.elementSize;
            t.initToggle(this.app.canvas, this, this.x + left, this.y, this.elementSize, this.height, new SelectTool());
            this.controls.push(t);
        }

        onControlClicked(control: IToolbarElement) {
            this.controls.forEach(x => {
                x.changeState(x === control);
                if (x === control) {
                    this.activeTool = x;
                }
            });
        }
    }

    export interface IToolbarElement {
        changeState(state: boolean);
        clickHandler: IToolAction;
    }

    class Toggle implements IToolbarElement {
        public object: fabric.IObject;

        size: number;
        private checked: boolean;
        private toolbar: Toolbar;
        private tool: IToolAction;

        initToggle(canvas: fabric.ICanvas, toolbar: Toolbar, x: number, y: number, width: number, height: number, tool: IToolAction) {
            var self = this;
            this.toolbar = toolbar;
            this.size = width;
            this.tool = tool;
            
            var onClick = () => self.onClick(self);
            fabric.Image.fromURL(tool.imgUrl, img => {
                img.width = width;
                img.height = height;
                img.left = x;
                img.top = y;
                img.selectable = false;
                img.on("mousedown", onClick);
                self.object = img;
                canvas.add(img);
            });
        }

        private onClick(self) {
            self.toolbar.onControlClicked(self);
        }

        changeState(state: boolean) {
            this.object.setShadow({ color: "rgba(0, 0, 0, 0.15)", offsetX: 0, offsetY: state ? 7 : 0 });
        }

        get clickHandler(): IToolAction {
            return this.tool;
        }
    }

    export interface IToolAction {
        onElementClick(element: SizableElement);
        imgUrl: string;
    }

    class SelectTool implements IToolAction {
        onElementClick(element: SizableElement) {
            Application.instance.deselect();
            element.selected = true;
        }

        get imgUrl(): string {
            return "../Content/apps/complex/img/select.png";
        }
    }
}