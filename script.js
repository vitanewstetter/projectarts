
$("#browse-keywords").hide();
$(".browse-dropdown").hide();

$("#currently-selected").click(function () {
    $("#browse-keywords").toggle();
});

$(".browse-selector").mouseenter(function () {
    var dropdown = $(".browse-dropdown");
    $(this).find(dropdown).show();
});

$(".browse-selector").mouseleave(function () {
    var dropdown = $(".browse-dropdown");
    $(this).find(dropdown).hide();
});


