///<reference path="../../js/typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>
///<reference path="visual/visual.ts"/>
///<reference path="../../js/typings/fabricjs/fabricjs.d.ts"/>

 class Application {
     private canvas: fabric.ICanvas;
     private size: Tools.Size;
     
     private elements: visual.visualElement[] = [];

     constructor() {
         this.canvas = new fabric.Canvas('canvas')
     }

     public init(): void {
         this.elements.push(new visual.rectElement().initRect(this.canvas, new Tools.Position(100, 200), new Tools.Size(200, 100), true, "green"));
         this.elements.push(new visual.circleElement().initCircle(this.canvas, new Tools.Position(400, 100), 20, false));
         this.elements.push(new visual.imageElement().initImage(this.canvas, new Tools.Position(400, 100), new Tools.Size(100, 100), '../Content/apps/complex/img/test.png', true));
     }


     public clear(): void {
         this.canvas.clear();
     }
 }

 var application: Application = new Application();
 application.init();