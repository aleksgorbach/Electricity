$(document).ready(function () {
    var form = $(".input-form");
    var chartUrl = '@Url.Action("AsyncTable", "Engine")';
    alert(chartUrl);
    $.post({
        url: chartUrl,
        type: "POST",
        data: form.serialize(),
        success: drawChart
    });
});

function drawChart(data) {
    alert(data);
}