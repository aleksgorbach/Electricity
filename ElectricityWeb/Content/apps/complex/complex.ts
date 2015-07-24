///<reference path="visual/visual.ts"/>
///<reference path="interface/ui.ts"/>

class Application {
    
    canvas: fabric.ICanvas;
    toolbar: Ui.Toolbar;
    private size: Tools.Size;

    private elements: Visual.SizableElement[] = [];

    constructor() {
        this.canvas = new fabric.Canvas("canvas");
    }

    private static instanceInternal: Application;

    static get instance() {
        if (this.instanceInternal == null) {
            this.instanceInternal = new Application();
        }
        return this.instanceInternal;
    }

    public init(): void {
        var rect = new Visual.RectElement().initRect(new Tools.Position(100, 200), new Tools.Size(200, 100), true, "white", "green");
        var circle = new Visual.CircleElement().initCircle(new Tools.Position(400, 100), 20, false);
        var image = new Visual.ImageElement().initImage(new Tools.Position(400, 100), new Tools.Size(100, 100), "../Content/apps/complex/img/test.png", true);
        rect.connectWith(circle);
        this.elements.push(rect, circle, image);
        this.toolbar = new Ui.Toolbar(this, 0, 0, 100, 100);
        this.toolbar.createToggle();
        this.toolbar.createToggle();
        this.toolbar.createToggle();
    }

    clear(): void {
        this.canvas.clear();
    }

    deselect() {
        this.elements.forEach(elem => elem.selected = false);
    }
}

Application.instance.init();
