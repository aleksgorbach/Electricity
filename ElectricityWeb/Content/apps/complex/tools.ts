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
}