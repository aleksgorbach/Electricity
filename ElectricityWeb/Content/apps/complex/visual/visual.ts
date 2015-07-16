///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>

module visual {
	export interface positioned {
		position: Tools.Position;
	}
	
	export class visualElement {
		private object: fabric.IObject;
		
		get canvasObject() : fabric.IObject {
			return this.object;
		}
		
	    protected init(object: fabric.IObject, interactable?: boolean) {
			this.object = object;
			object.selectable = interactable || false;
			object.hasBorders = false;
	    }
	} 
	
	export class sizableElement extends visualElement implements positioned {
		private connectings: oneSideConnecting[] = [];
		private canvas: fabric.ICanvas;
		
		get position(): Tools.Position {
			return new Tools.Position(this.canvasObject.left + this.canvasObject.width / 2, this.canvasObject.top + this.canvasObject.height / 2);
		}
		
		protected initSizable(object: fabric.IObject, canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			this.canvas = canvas;
			object.left = position.x;
			object.top = position.y;
			object.width = size.width;
			object.height = size.height;
			object.fill = color || "grey";
			super.init(object, interactable);
		}
		
		connectWith(dest: sizableElement) {
			if(this.isConnectedWith(dest)){
				return;
			}
			var line = new connectingLine().initLine(this.canvas, this, dest, false, "grey");
			this.canvas.sendToBack(line.canvasObject);			
			
			this.setConnection(dest, line);
			dest.setConnection(this, line);
		}
		
		isConnectedWith(obj: sizableElement): boolean {
			this.connectings.forEach(line => {
				if(line.obj == obj) {
					return true;
				}
			});
			return false;
		}
		
		private setConnection(obj: sizableElement, line: connectingLine) {
			this.connectings.push(new oneSideConnecting(obj, line));
			var object = this;
			this.canvasObject.on("moving", function(e) {
				var p = e.target;
				object.connectings.forEach(item => {
					if(item.obj == object){
						item.line.canvasObject.set({'x1': item.obj.canvasObject.left, 'y1': item.obj.canvasObject.top})
					} 
				});
			})
		}
	}
	
	export class rectElement extends sizableElement {
		initRect(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string) {
			var object = new fabric.Rect();
			super.initSizable(object, canvas, position, size, interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class circleElement extends sizableElement {
		initCircle(canvas: fabric.ICanvas, position: Tools.Position, radius: number, interactable?: boolean, color?: string) {
			var object = new fabric.Circle();
			object.radius = radius;
			super.initSizable(object, canvas, position, new Tools.Size(radius, radius), interactable, color);
			canvas.add(object);
			return this;
		}
	}
	
	export class imageElement extends sizableElement {
		initImage(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, url: string, interactable?: boolean) {
			var superFunc = super.initSizable;
			fabric.Image.fromURL(url, function(img : fabric.IImage){
				superFunc(img, canvas, position, size, interactable, "white")
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
	
	class oneSideConnecting {
		obj: sizableElement;
		line: connectingLine;
		
		constructor(obj: sizableElement, line: connectingLine){
			this.obj = obj;
			this.line = line;
		}
	}
}