var w;
var children
var arr;

function arraySize() {
    var w = $(window).width() / 1.15;
    var x = document.getElementById("myRange").value;
    arr = Array.from({length: x}, () => Math.floor(Math.random() * 200));
    divWidth = Math.floor(w / x);
    drawDiv(arr);
}

function drawDiv(divArr) {
    $("div.arrayDiv").remove();
    for(i = 0; i < divArr.length; i++) {
        var div = document.createElement("div");
        div.style.width = divWidth.toString() + "px";
        div.style.height= arr[i].toString() + "px";
        div.style.backgroundColor = "#242c54";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
}

function selectionSort() {
    var sorted = arr;
    var smallest;
    var temp;

    for(var a = 0; a < sorted.length - 1; a++) {
        smallest = a;
        for(var b = a + 1; b < sorted.length; b++) {
            if(sorted[b] < sorted[smallest]) {
                smallest = b;
            }
            drawDiv(sorted);
        }
        temp = sorted[a];
        sorted[a] = sorted[smallest];
        sorted[smallest] = temp;
    }
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}