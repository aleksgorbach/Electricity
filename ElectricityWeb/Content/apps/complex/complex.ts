///<reference path="visual/visual.ts"/>
///<reference path="interface/ui.ts"/>
///<reference path="interface/tools.ts"/>

class Application {
    canvas: fabric.ICanvas;
    toolbar: Ui.Toolbar;
    private size: Tools.Size;

    elements: Tools.CanvasObjects;

    constructor() {
        this.canvas = new fabric.Canvas("canvas");
        this.elements = new Tools.CanvasObjects(this.canvas);
    }

    private static instanceInternal: Application;

    static get instance() {
        if (this.instanceInternal == null) {
            this.instanceInternal = new Application();
        }
        return this.instanceInternal;
    }

    init(): void {
        var rect = new Visual.RectElement().initRect(new Tools.Position(100, 200), new Tools.Size(200, 100), true, "#eee");
        var circle = new Visual.CircleElement().initCircle(new Tools.Position(400, 100), 20, false);
        //var connection = rect.connectWith(circle);
        this.elements.add(rect, circle);
        var toolbar = new Ui.Toolbar(new Tools.Position(0, 0), new Tools.Size(80, 80),
            new Ui.SelectTool(),
            new Ui.DeleteTool(),
            new Ui.ConnectTool());
        this.toolbar = toolbar;
    }

    clear(): void {
        this.canvas.clear();
    }

    deselect() {
        this.elements.all<Visual.SizableElement>().forEach(elem => elem.selected = false);
    }
}

Application.instance.init();
