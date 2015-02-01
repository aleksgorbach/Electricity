//$(document).ready(function() {
//    $('#lossForm').submit(function () {
//        var data = $(this).serialize();
//        $.ajax({
//            url: "/home/TransmissionLoss",
//            data: data,
//            type: "POST",
//            dataType: "json",
//            success: function(response) {
//                alert(response["Time"]);
//            },
//            error: function (request, textStatus, errorThrown) {
//                alert("Request: " + request.data + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
//            }
//        });
//        return false;
//    });
//})