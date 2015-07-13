///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="tools.ts"/>
var Application = (function () {
    function Application(canvas) {
        this.context = canvas.getContext("2d");
        this.size = new Tools.Size(canvas.width, canvas.height);
    }
    Application.prototype.clear = function () {
        this.context.clearRect(0, 0, this.size.width, this.size.height);
    };
    return Application;
})();
var canvas = ((document.getElementById("canvas")));
alert(canvas);
var application = new Application(canvas);
