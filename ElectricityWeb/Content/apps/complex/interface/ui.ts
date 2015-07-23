///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>

module Ui {
	export class Toolbar {
		private canvas: fabric.ICanvas;
		private controls: IToolbarElement[] = [];
		
		private x: number;
		private y: number;
		private height: number;
		private elementSize: number;
		
		constructor(canvas: fabric.ICanvas, xPos: number, yPos: number, height: number, controlSize: number){
			this.canvas = canvas;
			this.x = xPos;
			this.y = yPos;
			this.height = height;
			this.elementSize = controlSize;
		}
		
	
		createToggle() {
			var t = new Toggle();
			var left: number = this.controls.length * this.elementSize;
			t.initToggle(this.canvas, this.x + left, this.y, 100, this.height, "../Content/apps/complex/img/test.png");
			this.controls.push(t);
		}
	}
	
	interface IToolbarElement {
		size: number;
		object: fabric.IObject;
	}
	
	class Control implements IToolbarElement {
		public object: fabric.IObject;
		
		size: number;
		
		protected onClick() {
			console.log("click");
		}
		
		init(object: fabric.IObject, width: number) {
			this.object = object;
			object.selectable = false;
			object.on("mousedown", this.onClick);		
		}
	} 
	
	class Toggle extends Control {
		private checked: boolean;
		
		initToggle(canvas: fabric.ICanvas, x: number, y: number, width: number, height: number, url: string) {
			var init = this.init;
			fabric.Image.fromURL(url, img => {
			    img.width = width;
			    img.height = height;
			    img.left = x;
			    img.top = y;
			    init(img, width);
			    canvas.add(img);
			});
		}
	}
}