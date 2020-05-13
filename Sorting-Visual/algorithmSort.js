var arr = [];
var speed = document.getElementById("mySpeed").value;
var divWidth;
var sorted = [];
var unsortedArray;

function arraySize() {
    var x = document.getElementById("myRange").value;
    arr = Array.from({length: x}, () => Math.floor(Math.random() * $(window).height() * 0.85));
    this.divWidth = $(window).width() / x;
    unsortedArray = arr;
    drawDiv(arr, '#303a42', this.divWidth);
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
        div.style.width = divwidth.toString() + "px";
        div.style.height= arr[i].toString() + "px";
        div.style.backgroundColor = "#098f35";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
    //Current
    var div = document.createElement("div");
    div.style.width = divwidth.toString() + "px";
    div.style.height= arr[current].toString() + "px";
    div.style.backgroundColor = "#6769bf";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = current.toString();
    document.getElementById("main").appendChild(div);
    //Inbetween current and smallest
    for(i = current + 1; i < smallest; i++) {
        var div = document.createElement("div");
        div.style.width = divwidth.toString() + "px";
        div.style.height= arr[i].toString() + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
    //Smallest
    var div = document.createElement("div");
    div.style.width = divwidth.toString() + "px";
    div.style.height= arr[smallest].toString() + "px";
    div.style.backgroundColor = "#f22929";
    div.style.color = "white";
    div.className = "arrayDiv";
    div.id = smallest.toString();
    document.getElementById("main").appendChild(div);
    for(i = smallest + 1; i < divArr.length - 1; i++) {
        var div = document.createElement("div");
        div.style.width = divwidth.toString() + "px";
        div.style.height= arr[i].toString() + "px";
        div.style.backgroundColor = "#303a42";
        div.style.color = "white";
        div.className = "arrayDiv";
        div.id = i.toString();
        document.getElementById("main").appendChild(div);
    }
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
}

function resolveAfter2SecondsSelection(sorted, current, smallest, divWidth) {
    return new Promise(resolve => {
      setTimeout(() => {
        drawDivVisualizer(sorted, current, smallest, divWidth);
        resolve('resolved');
      }, (1 / this.speed) * 1000);
    });
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

//Merge code pulled from https://medium.com/techtrument/implementing-merge-sort-in-javascript-898d5f54a234

function merge(leftArr, rightArr) {
    //DRAW THE VISUAL FROM THESE VARIABLES
    console.log(leftArr)
    console.log(rightArr)
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
    console.log(sortedArr);
    return sortedArr;
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
        //drawMergeSort(mergeArr);
        //const result = await resolveMerge();
        
        return merge(mergeSort(leftArr), mergeSort(rightArr));
    }
}

function resolveMerge(mergeSorted, current) {
    return new Promise((resolve) => {
      setTimeout(() => {
        drawMergeSort(mergeSorted, current);
        resolve('resolved');
      }, (1 / this.speed) * 100);
    });
}

function drawMergeSort(mergeSorted, current) {
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
    div.style.backgroundColor = "#f22929";
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
    try {
        for(i = done ; i < mergeSorted.length; i++) {
            var div = document.createElement("div");
            div.style.width = divWidth + "px";
            div.style.height= arr[i] + "px";
            div.style.backgroundColor = "#303a42";
            div.style.color = "white";
            div.className = "arrayDiv";
            div.id = i;
            document.getElementById("main").appendChild(div);
        }
    } catch(err) {
        
    }
}

function logMerge() {
    console.log(mergeSort(arr));
}