///<reference path="../../../../js/typings/fabricjs/fabricjs.d.ts"/>

module creator {
	export class creator {
		private canvas: fabric.ICanvas;
		protected interactable: boolean;
		
		constructor(canvas: fabric.ICanvas) {
			this.canvas = canvas;
			this.interactable = true;
		}
		
	}
	
	export class staticContentCreator extends creator {
		constructor(canvas: fabric.ICanvas){
			super(canvas);
			this.interactable = false;
		}
	}
}