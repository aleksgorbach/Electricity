function drawChart(model) {
    var moments = [];
    var counts = [];
    model.forEach(function(item) {
        moments.push(item["Moment"].toFixed(3));
        counts.push(item["Count"]);
    });
    var data = {
        labels: moments,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: counts
            }
        ]
    }
    var options = { scaleFontColor: "#fff" }
    var ctx = document.getElementById("chart").getContext("2d");
    var chart = new Chart(ctx).Line(data, options);
}