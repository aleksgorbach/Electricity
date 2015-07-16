///<reference path="../../js/typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>
///<reference path="visual/visual.ts"/>
///<reference path="../../js/typings/fabricjs/fabricjs.d.ts"/>

 class Application {
     private canvas: fabric.ICanvas;
     private size: Tools.Size;

     constructor() {
         this.canvas = new fabric.Canvas('canvas')
     }

     public init(): void {
         var rect = new visual.rectElement().initRect(this.canvas, new Tools.Position(100, 200), new Tools.Size(200, 100), true, "green");
         var circle = new visual.circleElement().initCircle(this.canvas, new Tools.Position(400, 100), 20, false);
         var image = new visual.imageElement().initImage(this.canvas, new Tools.Position(400, 100), new Tools.Size(100, 100), '../Content/apps/complex/img/test.png', true);
         rect.connectWith(circle);
     }


     public clear(): void {
         this.canvas.clear();
     }
 }

 var application: Application = new Application();
 application.init();