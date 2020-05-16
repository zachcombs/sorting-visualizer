var arr = [];
var speed = document.getElementById("mySpeed").value;
var divWidth;
var sorted = [];
var unsortedArray;

function arraySize() {
    var spaceOffset;
    document.getElementById("myRange").setAttribute("max", $(window).width() / 2);
    var x = document.getElementById("myRange").value;
    arr = Array.from({length: x}, () => Math.floor(Math.random() * $(window).height() * 0.7));
    var arraySize = arr.length;
    this.divWidth = ($(window).width() * 0.99) / x;
    unsortedArray = arr;
    document.getElementById("main").style.top = ($("#header").height());
    document.getElementById("arrayCounter").textContent = arraySize;
    drawDiv(arr, '#303a42', this.divWidth);
}

function clearPage() {
    location.reload();
}

function enableButtons() {
    $(".button").css({"color": "white"});
    document.getElementById("myRange").style.backgroundColor = "white";
    $(".asyncSlider").removeAttr("disabled");
    $(".button").removeAttr("disabled");
}

function disableButtons() {
    $(".button").attr("disabled", "disabled");
    $(".asyncSlider").attr("disabled", "disabled");
    document.getElementById("myRange").style.backgroundColor = "#6e6e6e";
    $(".button").css({"color": "#6e6e6e"});
}

function sortingSpeed() {
    speed = document.getElementById("mySpeed").value;
    document.getElementById("speedCounter").textContent = speed.toString() + "x";
}

function drawDiv(divArr, color, divwidth) {
    $("div.arrayDiv").remove();
    for(i = 0; i < divArr.length; i++) {
        var div = document.createElement("div");
        div.style.width = divwidth.toString() + "px";
        div.style.height= arr[i].toString() + "px";
        div.style.backgroundColor = color;
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
}

async function drawDivVisualizer(divArr, current, smallest, divwidth) {
    $("div.arrayDiv").remove();
    //Before current
    for(i = 0; i < current; i++) {
        var div = document.createElement("div");
        div.style.width = divwidth + "px";
        div.style.height= arr[i] + "px";
        div.style.backgroundColor = "#098f35";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
    //Current
    var div = document.createElement("div");
    div.style.width = divwidth + "px";
    div.style.height= arr[current] + "px";
    div.style.backgroundColor = "#6769bf";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = current;
    document.getElementById("main").appendChild(div);
    //Inbetween current and smallest
    for(i = current + 1; i < smallest; i++) {
        var div = document.createElement("div");
        div.style.width = divwidth + "px";
        div.style.height= arr[i] + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i;
        document.getElementById("main").appendChild(div);
    }
    //Smallest
    var div = document.createElement("div");
    div.style.width = divwidth + "px";
    div.style.height= arr[smallest] + "px";
    div.style.backgroundColor = "#f22929";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = smallest;
    document.getElementById("main").appendChild(div);
    try {
        for(i = smallest + 1; i < divArr.length - 1; i++) {
            var div = document.createElement("div");
            div.style.width = divwidth + "px";
            div.style.height= arr[i] + "px";
            div.style.backgroundColor = "#303a42";
            div.style.color = "white";
            div.className = "arrayDiv";
            div.id = i;
            document.getElementById("main").appendChild(div);
        }
    } catch {

    }
}

//SELECTION SORT CODE STARTS HERE
async function selectionSortButton() {
    disableButtons();
    selectionSort();
}

async function selectionSort() {
    var sorted = arr;
    var current;
    var smallest;
    var temp;
    
    for(var a = 0; a < sorted.length - 1; a++) {
        smallest = a;
        current = smallest;
        for(var b = a + 1; b < sorted.length; b++) {
            if(sorted[b] <= sorted[smallest]) {
                smallest = b;
            }
        }
        temp = sorted[a];
        sorted[a] = sorted[smallest];
        sorted[smallest] = temp;
        drawDivVisualizer(sorted, current, smallest, divWidth);
        const result = await resolveAfter2SecondsSelection();
    }
    drawDiv(sorted, "#098f35", divWidth);
    enableButtons();
}

function resolveAfter2SecondsSelection(sorted, current, smallest, divWidth) {
    return new Promise(resolve => {
      setTimeout(() => {
        drawDivVisualizer(sorted, current, smallest, divWidth);
        resolve('resolved');
      }, (1 / this.speed) * 1000);
    });
}
//SELECTION SORT CODE STOPS HERE

//BUBBLE SORT CODE STARTS HERE
async function bubbleSortButton() {
    disableButtons();
    bubbleSort();
}

async function bubbleSort() {
    var sorted = arr;
    var temp;
    var current;
    var done;
    for(var i = 0; i < sorted.length - 1; i++) {
        for(var j = 0; j < sorted.length - i; j++) {
            current = j;
            done = sorted.length - i;
            if(sorted[j] > sorted[j + 1]) {
                temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
                drawBubbleSort(sorted, current, done, divWidth);
                const result = await resolveAfter2SecondsBubble();
            }
        }
    }
    enableButtons();
    drawDiv(sorted, "#098f35", divWidth);
}

async function drawBubbleSort(bubSorted, current, done, divWidth) {
    $("div.arrayDiv").remove();
    //Before current
    for(i = 0; i < current; i++) {
        var div = document.createElement("div");
        div.style.width = divWidth + "px";
        div.style.height= arr[i] + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i;
        document.getElementById("main").appendChild(div);
    }
    //Current
    var div = document.createElement("div");
    div.style.width = divWidth + "px";
    div.style.height= arr[current] + "px";
    div.style.backgroundColor = "#6769bf";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = current;
    document.getElementById("main").appendChild(div);
    //Next
    var div = document.createElement("div");
    div.style.width = divWidth + "px";
    div.style.height= arr[current + 1] + "px";
    div.style.backgroundColor = "#f22929";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = current;
    document.getElementById("main").appendChild(div);
    //Inbetween current and done
    for(i = current + 2; i < done; i++) {
        var div = document.createElement("div");
        div.style.width = divWidth + "px";
        div.style.height= arr[i] + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i;
        document.getElementById("main").appendChild(div);
    }
    try {
        for(i = done ; i < bubSorted.length; i++) {
            var div = document.createElement("div");
            div.style.width = divWidth + "px";
            div.style.height= arr[i] + "px";
            div.style.backgroundColor = "#098f35";
            div.style.color = "white";
            div.className = "arrayDiv";
            div.id = i;
            document.getElementById("main").appendChild(div);
        }
    } catch(err) {
        
    }
    
}

function resolveAfter2SecondsBubble(bubSorted, current, smallest, divWidth) {
    return new Promise((resolve) => {
      setTimeout(() => {
        drawBubbleSort(bubSorted, current, smallest, divWidth);
        resolve('resolved');
      }, (1 / this.speed) * 100);
    });
}
//BUBBLE SORT CODE STOPS HERE

//MERGE SORT CODE STARTS HERE
async function mergeSortButton() {
    disableButtons();
    mergeSort();
}

function merge(leftArr, rightArr) {
    var temp;
    var sortedArr = [];
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr[0]);
            leftArr = leftArr.slice(1)
        } else {
            sortedArr.push(rightArr[0]);
            rightArr = rightArr.slice(1)
         }
       }
    while (leftArr.length)
        sortedArr.push(leftArr.shift());
    while (rightArr.length)
        sortedArr.push(rightArr.shift());
    console.log(sortedArr.toString())
    for(var i = 0; i < sortedArr.length - 1; i++) {
        for(var j = 0; j < sortedArr.length; j++) {
            if(sortedArr[i] >= sortedArr[j]) {
                temp = this.arr.find(element => (element >= sortedArr[i] && element <= sortedArr[i]));
                this.arr[this.arr.findIndex(element => (element >= sortedArr[i] && element <= sortedArr[i]))] = this.arr.find(element => (element >= sortedArr[i] && element <= sortedArr[i]));
                this.arr[this.arr.findIndex(element => (element >= sortedArr[i] && element <= sortedArr[j]))] = temp;
            }
        }
   }
    return sortedArr;
}

function checkForIndex(arrayToSearch, whatToSearch) {
    return arrayToSearch >= whatToSearch && arrayToSearch <= whatToSearch;
}

function mergeSort(mergeArr) {
    if(mergeArr == undefined) {
        mergeArr = this.arr;
    }
    if (mergeArr.length < 2) {
        return mergeArr; }
    else {
        var midpoint = parseInt(mergeArr.length / 2);
        var leftArr   = mergeArr.slice(0, midpoint);
        var rightArr  = mergeArr.slice(midpoint, mergeArr.length);
        //console.log(leftArr +" | " + rightArr);
        //drawMergeSort(mergeArr);
        //const result = await resolveMerge();
        
        return merge(mergeSort(leftArr), mergeSort(rightArr));
    }
}

function resolveMerge(sortedArr, current) {
    return new Promise((resolve) => {
      setTimeout(() => {
        drawMergeSort(sortedArr, current);
        resolve('resolved');
      }, (1 / this.speed) * 100);
    });
}

function drawMergeSort(sortedArr, left, right) {
    var temp;
    /*
    249,267,85,99,93,63,211,23,334,4,292,265
    85,267
    85,249,267
    63,93
    63,93,99
    63,85,93,99,249,267
    23,334
    23,211,334
    265,292
    4,265,292
    4,23,211,265,292,334
    4,23,63,85,93,99,211,249,265,267,292,334
    
    249,85*,267*,99,93,63,211,23,334,4,292,265
    85*,249*,267,99,93,63,211,23,334,4,292,265
    85,249,267,99,63*,93*,211,23,334,4,292,265
    85,249,267,63*,99*,93,211,23,334,4,292,265
    85,249,267,63,93*,99*,211,23,334,4,292,265
    63*,249,267,85*,93,99,211,23,334,4,292,265
    63,85*,267,249*,93,99,211,23,334,4,292,265
    63,85,93*,249,267*,99,211,23,334,4,292,265
    63,85,93,99*,267,249*,211,23,334,4,292,265
    63,85,93,99,249*,267*,211,23,334,4,292,265
    
    63,85,93,99,249,267,211,23*,334*,4,292,265
    63,85,93,99,249,267,23*,211*,334,4,292,265
    63,85,93,99,249,267,23,211,334,4,265*,292*
    63,85,93,99,249,267,4*,211,334,23*,265,292
    63,85,93,99,249,267,4,23*,334,211*,265,292
    63,85,93,99,249,267,4,23,211*,334*,265,292
    63,85,93,99,249,267,4,23,211,265*,334*,292
    63,85,93,99,249,267,4,23,211,265,292*,334*

    4*,85,93,99,249,267,63*,23,211,265,292,334
    4,23*,93,99,249,267,65,85*,211,265,292,334
    4,23,65*,99,249,267,93*,85,211,265,292,334
    4,23,65,85*,249,267,93,99*,211,265,292,334
    4,23,65,85,93*,267,249*,99,211,265,292,334
    4,23,65,85,93,99*,249,267*,211,265,292,334
    4,23,65,85,93,99,211*,267,249*,265,292,334
    4,23,65,85,93,99,211,249*,267*,265,292,334
    4,23,65,85,93,99,211,249,265*,267*,292,334
    
    find 85 and 267
    if index of 85 > index of 267, swap
    find 85, 249, and 267
    
    */
    $("div.arrayDiv").remove();
    for(var i = 0; i < sortedArr.length - 1; i++) {
        for(var j = 0; j < sortedArr.length; j++) {
            if(sortedArr[i] >= sortedArr[j]) {
                temp = arr.find(sortedArr[i]);
                arr[arr.findIndex(sortedArr[i])] = arr.find(sortedArr[j]);
                arr[arr.findIndex(sortedArr[j])] = temp;
            }
        }
   }
}
//MERGE SORT CODE ENDS HERE

//INSERTION SORT CODE STARTS HERE
async function insertionSortButton() {
    disableButtons();
    bubbleSort();
}

async function insertionSort() {
    var insertionSorted = arr;
    var insertCurr;
    var temp;
    for(var i = 1; i < insertionSorted.length; i++) {
        insertCurr = i;
        for(var j = i - 1; j >= 0; j--) {
            if(insertionSorted[insertCurr] < insertionSorted[j]) {
                temp = insertionSorted[insertCurr];
                insertionSorted[insertCurr] = insertionSorted[j];
                insertionSorted[j] = temp;
                drawInsertionSort(insertionSorted, j, insertCurr);
                const result = await insertionResolve();
            }
            insertCurr--;
        }
    }
    enableButtons();
    drawDiv(insertionSorted, "#098f35", divWidth);
}

async function drawInsertionSort(insertArr, left, right) {
    $("div.arrayDiv").remove();
    //Before left
    for(i = 0; i < left; i++) {
        var div = document.createElement("div");
        div.style.width = this.divWidth + "px";
        div.style.height= insertArr[i] + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i;
        document.getElementById("main").appendChild(div);
    }
    //Left
    var div = document.createElement("div");
    div.style.width = this.divWidth + "px";
    div.style.height= insertArr[left] + "px";
    div.style.backgroundColor = "#f22929";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = left;
    document.getElementById("main").appendChild(div);
    //Right
    var div = document.createElement("div");
    div.style.width = this.divWidth + "px";
    div.style.height= insertArr[right] + "px";
    div.style.backgroundColor = "#6769bf";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = right;
    document.getElementById("main").appendChild(div);
    try {
        for(var f = right ; f < insertArr.length; f++) {
            var div = document.createElement("div");
            div.style.width = this.divWidth + "px";
            div.style.height= insertArr[f] + "px"; //If there is a bug it's probably here :)
            div.style.backgroundColor = "#303a42";
            div.style.color = "white";
            div.className = "arrayDiv";
            div.id = f;
            document.getElementById("main").appendChild(div);
        }
    } catch(err) {
        
    }
}

function insertionResolve(insSorted, left, right) {
    return new Promise((resolve) => {
      setTimeout(() => {
        drawInsertionSort(insSorted, left, right);
        resolve('resolved');
      }, (1 / this.speed) * 1000);
    });
}
//INSERTION SORT CODE ENDS HERE

//QUICK SORT CODE STARTS HERE
async function quickSortButton() {
    disableButtons();
    quickSort();
}

async function quickSort() {

}

async function quickResolve() {

}
//QUICK SORT CODE ENDS HERE