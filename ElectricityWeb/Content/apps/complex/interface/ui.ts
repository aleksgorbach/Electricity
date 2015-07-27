///<reference path="styles.ts"/>

module Ui {
    import SizableElement = Visual.SizableElement;

    export class Toolbar {
        private offset = 3;
        private app: Application;
        private controls: IToolbarElement[] = [];
        private position: Tools.Position;
        private controlSize: Tools.Size;

        activeTool: IToolbarElement;

        constructor(position: Tools.Position, controlSize: Tools.Size, ...tools: IToolAction[]) {
            this.position = position;
            this.controlSize = controlSize;
            tools.forEach(tool => this.createToggle(tool));
        }

        private createToggle(tool: IToolAction) {
            var t = new Toggle();
            var left = this.controls.length * (this.controlSize.width + this.offset);
            t.initToggle(this, new Tools.Position(this.position.x + left, this.position.y), this.controlSize, tool);
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
        object: fabric.IObject;

        size: Tools.Size;

        private checked: boolean;
        private toolbar: Toolbar;
        private tool: IToolAction;

        initToggle(toolbar: Toolbar, position: Tools.Position, size: Tools.Size, tool: IToolAction) {
            var self = this;
            this.toolbar = toolbar;
            this.size = size;
            this.tool = tool;
            
            var onClick = () => self.onClick(self);
            fabric.Image.fromURL(tool.imgUrl, img => {
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
        }

        private onClick(self) {
            self.toolbar.onControlClicked(self);
        }

        changeState(state: boolean) {
            this.object.set(state ? activeBorder : inactiveBorder);
        }

        get clickHandler(): IToolAction {
            return this.tool;
        }
    }

    export interface IToolAction {
        onElementClick(element: SizableElement);
        imgUrl: string;
    }
}