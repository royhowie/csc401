var r = document.getElementById("greeting"),
    options = document.getElementById("greetings");

var update = function () {
    r.innerHTML = options.value + ", " + document.getElementById("name").value + "!";
}

options.onchange = update;
document.getElementById("name").onkeyup = update;
