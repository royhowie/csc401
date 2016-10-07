var n = 0, max = -1;

var calculateTotal = function () {
	n = 0;
	for (var i = 0; i <= max; i++) {
		n += document.getElementById(i).checked ? Math.pow(2, i) : 0;
	}
	document.getElementById("number").value = n;
	document.getElementById("imageHolder").style.display = n == 1925 ? "block" : "none";
}

var addBlock = function (n) {
	var h = document.getElementById("block-holder"),
		div = document.createElement("div"),
		i = document.createElement("input"),
		l = document.createElement("label")

	l.appendChild(document.createTextNode(Math.pow(2, n).toString()));
	l.htmlFor = n;

	i.id = n;
	i.type = "checkbox";
	i.value = Math.pow(2,n);
	i.onchange = calculateTotal;

	div.appendChild(i)
	div.appendChild(l);

	div.className = "block"

	h.appendChild(div);

	document.getElementById("number").style.width = ((n+2)*55 - 5) + "px";
}



document.getElementById("number").onkeyup = function () {
	n = parseInt(this.value);
	var binary = n.toString(2).split("").reverse();

	while (Math.pow(2, max + 1) - 1 < n) {
		addBlock(++max);
	}
	while (binary.length < max + 1) {
		binary.push("0");
	}
	for (var i = 0; i < binary.length; i++) {
		document.getElementById(i).checked = binary[i] == "1";
	}
	document.getElementById("imageHolder").style.display = n == 1925 ? "block" : "none";
}

document.getElementById("add").onclick = function () {
	addBlock(++max);
}

for (var i = 0; i < 10; i++) {
	addBlock(++max);
}
