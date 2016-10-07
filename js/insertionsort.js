var interval, stack;

var shuffle = function (arr) {
    var currentIndex = arr.length;
    while (0 < currentIndex) {
        var randomIndex = (Math.random() * currentIndex) | 0;
        currentIndex -= 1;
        var temp = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}
var init = function (arr) {
    var node = document.getElementById("display");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    clearInterval(interval);
    document.getElementById("next").disabled = false;
    updateTag("j", 2);
    updateTag("i", 1);
    var a = shuffle(arr);
    a.forEach(appendBlock);
    stack = generateStack(a);
    return a;
}
var appendBlock = function (n) {
    var height = n * 50;

    var outerDiv = document.createElement("div"),
        innerDiv = document.createElement("div"),
        text = document.createTextNode(n);

    outerDiv.style.height = "500px";
    outerDiv.className = "bar-holder";
    innerDiv.className = "bar";

    innerDiv.style.height = height + "px";
    outerDiv.style.margin.top = (500 - height) + "px";

    innerDiv.appendChild(text);
    outerDiv.appendChild(innerDiv);

    document.getElementById("display").appendChild(outerDiv);
}
var updateTag = function (label, value) {
    document.getElementById(label).innerHTML = value;
}
var instructionMapping = {
    color: function (n, color) {
        var node = document.getElementById("display").getElementsByClassName("bar-holder")[n];
        node.firstChild.style.backgroundColor = color;
    },
    decrement: function (label) {
        instructionMapping.highlight(4);
        var node = document.getElementById(label),
            value = parseInt(node.innerHTML);
        node.innerHTML = value - 1;
    },
    highlight: function (n) {
        var nodes = document.getElementsByClassName("highlight");
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].classList.remove("highlight");
        }
        document.getElementById("code").getElementsByTagName("p")[n].classList.add("highlight");
    },
    increment: function (label) {
        instructionMapping.highlight(0);
        var node = document.getElementById(label);
        node.innerHTML = parseInt(node.innerHTML) + 1;
    },
    set: function (label, value) {
        document.getElementById(label).innerHTML = value;
    },
    swap: function (n) {
        instructionMapping.highlight(3);
        var parent = document.getElementById("display"),
            children = parent.getElementsByClassName("bar-holder");
        parent.insertBefore(children[n + 1], children[n]);
    }
}
var next = function () {
    var instruction = stack.shift();
    if (instruction) {
        instructionMapping[instruction[0]](instruction[1], instruction[2]);
    } else {
        document.getElementById("next").disabled = true;
        alert("array is sorted!");
    }
}
var generateStack = function (arr) {
    var stack = [];
    stack.push([ "color", 0, "green" ]);
    stack.push([ "highlight", 0 ]);
    for (var j = 1; j < arr.length; j++) {
        stack.push([ "color", j, "blue" ]);
        stack.push([ "highlight", 1 ]);
        var i = j - 1;
        stack.push([ "set", "i", i ]);
        stack.push([ "highlight", 2 ]);
        var madeSwap = false;
        while (i > -1 && arr[i] > arr[i+1]) {
            madeSwap = true;
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            stack.push(["swap", i]);
            i = i - 1;
            stack.push(["decrement", "i"]);
        }
        stack.push([ "color", madeSwap ? i + 1 : j, "green" ]);
        stack.push([ "increment", "j"]);
    }
    return stack;
}
var auto = function () {
    if (stack.length) {
        interval = setInterval(function () {
            if (stack.length < 1) {
                clearInterval(interval);
            } else {
                next();
            }
        }, 150);
    } else {
        document.getElementById("reset").click();
    }
}

var n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var shuffledArray = init(n);

document.getElementById("reset").onclick = function () {
    shuffledArray = init(n);
}
document.getElementById("next").onclick = next;
document.getElementById("auto").onclick = auto;
