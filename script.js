
$("#browse-keywords").hide();
$(".browse-dropdown").hide();

$("#currently-selected").click(function () {
    $("#browse-keywords").show();
});

$(".browse-selector").mouseenter(function () {
    var dropdown = $(".browse-dropdown");
    $(this).find(dropdown).show();
});

$(".browse-selector").mouseleave(function () {
    var dropdown = $(".browse-dropdown");
    $(this).find(dropdown).hide();
});

$(".dropdown-item").click(function () {
   var temp = $(this).html();
    $("#currently-selected").append('<div class = "browse-selection">' + temp + '<a href="#"><img class = "x-out" src="images/icons/x.svg"></a> </div>')
});

