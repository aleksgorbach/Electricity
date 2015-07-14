///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>

module visual {
	export class visualElement {
	    protected init(object: fabric.IObject, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			object.left = position.x;
			object.top = position.y;
			object.width = size.width;
			object.height = size.height;
	        object.fill = color || "grey";
			object.selectable = interactable || false;
	    }
	} 
	
	export class rectElement extends visualElement {
		initRect(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			var object = new fabric.Rect();
			super.init(object, position, size, interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class circleElement extends visualElement {
		initCircle(canvas: fabric.ICanvas, position: Tools.Position, radius: number, interactable?: boolean, color?: string) {
			var object = new fabric.Circle();
			object.radius = radius;
			super.init(object, position, new Tools.Size(radius, radius), interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class imageElement extends visualElement {
		initImage(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, url: string, interactable?: boolean) {
			var superFunc = super.init;
			fabric.Image.fromURL(url, function(img : fabric.IImage){
				superFunc(img, position, size, interactable, "white")
				canvas.add(img);
			});
			return this;
		}
	}
}