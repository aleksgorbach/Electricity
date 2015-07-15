///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>

module visual {
	export interface positioned {
		position: Tools.Position;
	}
	
	export class visualElement {
	    protected init(object: fabric.IObject, interactable?: boolean) {
			object.selectable = interactable || false;
			object.hasBorders = false;
	    }
	} 
	
	export class sizableElement extends visualElement implements positioned {
		private object: fabric.IObject;
		
		get position(): Tools.Position {
			return new Tools.Position(this.object.left + this.object.width / 2, this.object.top + this.object.height / 2);
		}
		
		protected initSizable(object: fabric.IObject, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			this.object = object;
			object.left = position.x;
			object.top = position.y;
			object.width = size.width;
			object.height = size.height;
			object.fill = color || "grey";
			super.init(object, interactable);
		}
		
		connectWith(dest: sizableElement) {
			
		}
	}
	
	export class rectElement extends sizableElement {
		initRect(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			var object = new fabric.Rect();
			super.initSizable(object, position, size, interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class circleElement extends sizableElement {
		initCircle(canvas: fabric.ICanvas, position: Tools.Position, radius: number, interactable?: boolean, color?: string) {
			var object = new fabric.Circle();
			object.radius = radius;
			super.initSizable(object, position, new Tools.Size(radius, radius), interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class imageElement extends sizableElement {
		initImage(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, url: string, interactable?: boolean) {
			var superFunc = super.initSizable;
			fabric.Image.fromURL(url, function(img : fabric.IImage){
				superFunc(img, position, size, interactable, "white")
				canvas.add(img);
			});
			return this;
		}
	}
	
	export class connectingLine extends visualElement {
		initLine(canvas: fabric.ICanvas, from: positioned, to: positioned, interactable?: boolean, color?: string, width: number = 1){
			var object = new fabric.Line([from.position.x, from.position.y, to.position.x, to.position.y]);
			object.strokeWidth = width;
			object.stroke = color;
			super.init(object, interactable);
			canvas.add(object);
			return this;
		}
	}
}