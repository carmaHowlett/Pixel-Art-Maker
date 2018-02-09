/*jshint esversion: 6 */
// Set colour default
let color = "#000";

//Boolean to check drag mode
let isClicked = false;

//Function that will clear all of the 'tr' and 'td' elements
function cleanGrid() {
    $("#pixel_canvas tr").remove();
}

function makeGrid() {
    let height = $("#input_height").val();
    let width = $("#input_width").val();
    let table = $("#pixel_canvas");

    for (let i = 0; i < height; i++) {
        table.append("<tr></tr>");
    }

    var trs = $("#pixel_canvas tr");

    for (let a = 0; a < width; a++) {
        trs.append("<td></td>");
    }
}

//Function that activates the single pixel
function makePixel(el) {
    let element = $(el.target);
    element.css("background", color);
}

//Save settings button event
$("#submit").on("click", function() {
    cleanGrid();
    makeGrid();
    $("#settings").toggleClass("open");
});

//Classis click event, down and release, so no drag event
$("#pixel_canvas").on("click", "td", function(e) {
        makePixel(e);
        isClicked = false;
    })
    .on("dblclick", "td", function(e) {
        $(e.target).css('background-color', '#FFFFFF');
    })
    .on("mousedown", function(e) { //Mouse button clicked but not released
        e.preventDefault();
        isClicked = true;
    })
    .on("mouseover", "td", function(e) {
        //check if the mouse button is clicked when passing over a grid element
        if (isClicked) {
            makePixel(e);
        }
    });

//Check the mouse button release on the document
$(document).on('mouseup', function() {
    isClicked = false;
});

$("#colorPicker").change(function() {
    color = $(this).val();
});

$("#close").on("click", function() {
    $("#settings").toggleClass("open");
});

$("#open").on("click", function() {
    $("#settings").toggleClass("open");
});

$("#refresh").on("click", function() {
    cleanGrid();
    makeGrid();
});

//First calll to create the grid on page
makeGrid();
