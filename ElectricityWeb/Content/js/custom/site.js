$(document).ready(function() {
    $(".button-collapse").sideNav({
        menuWidth: 340
    });
    $("select").material_select();
    $("#loader").hide();
});

function onBeforeAjaxRequest() {
    $("#loader").show();
}

function onAfterAjaxRequest() {
    $("#loader").hide();
}