///<reference path="../../../js/typings/fabricjs/fabricjs.d.ts"/>

module Tools {

    export class Size {
        width: number;
        height: number;

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
        }
    }

    export class Position {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    class ObjectStorage<T> {
        private objects: T[];

        constructor() {
            this.objects = [];
        }

        add(...elements: T[]) {
            elements.forEach(element => this.objects.push(element));
        }

        remove(element: T) {
            var index = this.objects.indexOf(element);
            if (index != undefined) {
                this.objects.splice(index, 1);
            }
        }

        get all(): T[] {
            return this.objects;
        }
    }

    export class CanvasObjects {
        private storage: ObjectStorage<Visual.VisualElement>;
        private canvas: fabric.ICanvas;

        constructor(canvas: fabric.ICanvas) {
            this.storage = new ObjectStorage<Visual.VisualElement>();
            this.canvas = canvas;
        }

        add(...elements: Visual.VisualElement[]) {
            var canvas = this.canvas;
            elements.forEach(element => {
                this.storage.add(element);
                canvas.add(element.canvasObject);
                if (element.sendBack) {
                    canvas.sendToBack(element.canvasObject);
                }
            });
        }

        remove(element: Visual.VisualElement) {
            this.storage.remove(element);
            this.canvas.remove(element.canvasObject);
            element.onRemove();
        }

        all<T extends Visual.VisualElement>(): T[] {
            var res = this.storage.all.filter(elem => {
                var casted = <T>elem;
                return casted != null;
            });
            return res.map(elem => <T>elem);
        }
    }
}