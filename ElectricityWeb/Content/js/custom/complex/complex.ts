///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>

 class Application {
     private context: CanvasRenderingContext2D;
     private size: Tools.Size;

     constructor(canvas: HTMLCanvasElement) {
         this.context = canvas.getContext("2d");
         this.size = new Tools.Size(canvas.width, canvas.height);
     }

     public clear(): void {
         this.context.clearRect(0, 0, this.size.width, this.size.height);
     }
 }

 var canvas : HTMLCanvasElement = <HTMLCanvasElement>((document.getElementById("canvas")));
 alert(canvas);
 var application: Application = new Application(canvas);