///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>

module ui {
	export class toolbar {
		private canvas: fabric.ICanvas;
		private controls: toolbarElement[] = [];
		
		private x: number;
		private y: number;
		private height: number;
		
		constructor(canvas: fabric.ICanvas, xPos: number, yPos: number, height: number){
			this.canvas = canvas;
			this.x = xPos;
			this.y = yPos;
			this.height = height;
		}
		
	
		createToggle() {
			var t = new toggle();
			var left: number = 0;
			this.controls.forEach(elem => {
				left += elem.size;
			});
			t.initToggle(this.canvas, this.x + left, this.y, 100, this.height, "../Content/apps/complex/img/test.png");
			this.controls.push(t);
		}
	}
	
	interface toolbarElement {
		size: number;
		object: fabric.IObject;
	}
	
	class control implements toolbarElement {
		public object: fabric.IObject;
		
		size: number;
		
		protected onClick(e: fabric.IEvent) {
			alert(this);
		}
		
		init(object: fabric.IObject, width: number) {
			this.object = object;
			//object.selectable = false;
			object.on("mouse:down", this.onClick);		
		}
	} 
	
	class toggle extends control {
		private checked: boolean;
		
		initToggle(canvas: fabric.ICanvas, x: number, y: number, width: number, height: number, url: string) {
			var init = this.init;
			fabric.Image.fromURL(url, function(img) {
				img.width = width;
				img.height = height;
				img.left = x;
				img.top = y;
				init(img, width);
				canvas.add(img);
			})
		}
	}
}