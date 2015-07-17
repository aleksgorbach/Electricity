///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>
///<reference path="../tools.ts"/>

module visual {
	interface positioned {
		x: number;
		y: number;
	}
	
	class visualElement {
		private object: fabric.IObject;
		
		get canvasObject() : fabric.IObject {
			return this.object;
		}
		
	    protected init(object: fabric.IObject, interactable?: boolean) {
			this.object = object;
			object.selectable = interactable || false;
			object.hasBorders = false;
			object.hasControls = false;
			object.hasRotatingPoint = false;
	    }
	} 
	
	class sizableElement extends visualElement implements positioned {
		private connections: connectingLine[] = [];
		private canvas: fabric.ICanvas;
		
		private text: textField;
		
		get x(): number {
			return this.canvasObject.left + this.canvasObject.width * this.canvasObject.scaleX / 2; 
		}
		
		get y(): number {
			return this.canvasObject.top + this.canvasObject.height * this.canvasObject.scaleY / 2;
		}
		
		protected initSizable(object: fabric.IObject, canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string, strokeColor?: string, strokeWidth?: number) {
			this.canvas = canvas;
			object.left = position.x;
			object.top = position.y;
			object.width = size.width;
			object.height = size.height;
			object.fill = color || "grey";
			object.stroke = strokeColor || object.fill;
			object.strokeWidth = strokeWidth || 0;;
			object.setShadow({color: "rgba(0, 0, 0, 0.15)", offsetX: 4, offsetY: 4});
			super.init(object, interactable);
		}
		
		connectWith(dest: sizableElement) {
			if(this.isConnectedWith(dest)){
				return;
			}
			var line = new connectingLine().initLine(this.canvas, this, dest, false, "grey");
			this.canvas.sendToBack(line.canvasObject);			
			
			this.setConnection(line);
			dest.setConnection(line);
		}
		
		isConnectedWith(obj: sizableElement): boolean {
			this.connections.forEach(line => {
				if(line.contains(obj)) {
					return true;
				}
			});
			return false;
		}
		
		private setConnection(line: connectingLine) {
			this.connections.push(line);
			var obj = this;
			var handler = function(e: Event){
				obj.connections.forEach(item => {
					item.updateNode(obj);
				});
			}
			this.canvasObject.on({"moving": handler, "scaling" : handler });
		}
	}
	
	export class rectElement extends sizableElement {
		initRect(canvas: fabric.ICanvas, position: Tools.Position, size: Tools.Size, interactable?: boolean, color?: string, strokeColor?: string) {
			var object = new fabric.Rect();
			super.initSizable(object, canvas, position, size, interactable, color, strokeColor, 3);
			canvas.add(object);
			return this;
		}
	}
	
	export class circleElement extends sizableElement {
		initCircle(canvas: fabric.ICanvas, position: Tools.Position, radius: number, interactable?: boolean, color?: string, strokeColor?: string) {
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
	
	class connectingLine extends visualElement {
		private from: positioned;
		private to: positioned;
		private line: fabric.ILine;
		
		initLine(canvas: fabric.ICanvas, from: positioned, to: positioned, interactable?: boolean, color?: string, width: number = 1){
			this.from = from;
			this.to = to;
			var object = new fabric.Line([from.x, from.y, to.x, to.y]);
			object.strokeWidth = width;
			object.stroke = color;
			super.init(object, interactable);
			this.line = object;
			canvas.add(object);
			return this;
		}
		
		updateNode(obj: positioned) {
			(obj == this.from) && this.line.set({'x1': this.from.x, 'y1': this.from.y});
			(obj == this.to) && this.line.set({'x2': this.to.x, 'y2': this.to.y});
		}
		
		contains(obj: positioned) : boolean {
			return this.from == obj || this.to == obj;
		}
	}
	
	class textField {
		constructor(canvas: fabric.ICanvas, parent: sizableElement) {
			var object = new fabric.Text("Value", {"fontSize" : 14});
			object.left = parent.canvasObject.left;
			object.top = parent.canvasObject.top;
			
			var group = new fabric.Group([parent.canvasObject, object]);
			canvas.add(group);
		}
	}
}