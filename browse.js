
//variables to pass along
var selections= [];

var keywords = document.getElementById("browse-keywords");
var currentlySelected = document.getElementById("currently-selected");
var closeSearch = document.getElementById("close-search");
var selector = document.querySelectorAll(".browse-selector");
var selectedX;
var onX = false;
var more = document.querySelectorAll(".more");
var final = document.querySelectorAll(".final");


//show search bar on click
currentlySelected.onclick = function(){
    if(onX == false){keywords.style.display = "block";}};

//hide search bar on X
closeSearch.onclick = function(){ keywords.style.display = "none";};

//mouseover show dropdown menu
// the "-2" excludes the checkboxes all the way on the right!!!
for (var j = 0; j < selector.length-2; j++) {
    selector[j].onmouseover = function () {
        var dropdown = this.querySelectorAll(".browse-dropdown");
        dropdown[0].style.display = "block";
    };
    selector[j].onmouseout = function () {
        var dropdown = this.querySelectorAll(".browse-dropdown");
        dropdown[0].style.display = "none";
    };
}
//remove selected terms by clicking x
var removeSelection = function(){
    selectedX = document.querySelectorAll(".selected-x");
    for (var k = 0; k < selectedX.length; k++){
        selectedX[k].onclick = function(){
            onX = true;
            var child = this.parentNode;
            var parent = child.parentNode;
            parent.removeChild(child);
        };
        //make sure search bar doesn't show
        currentlySelected.onmousemove = function(){
            onX = false;
        };
    }
};
removeSelection();
//add query when you click on dropdown menu
for (var l = 0; l < final.length; l++){
    final[l].onclick = function(){
        var name = this.innerHTML;
        var html = name + '<img class = "x-out selected-x" src="images/icons/x.svg">';
        var newSelection = document.createElement('div');
        newSelection.className = "browse-selection";
        newSelection.innerHTML = html;
        currentlySelected.appendChild(newSelection);
        removeSelection();
        selectedX = document.querySelectorAll(".selected-x");
    };
}

