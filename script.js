function cube(x = 0, y = 0, z = 0, width = 1, length = 1, height = 1, hue = 210, lightness = 50, alpha = 1) {
    var cube = document.createElement("figure");
    cube.style.left = (-x + y + (length - width) / 2) * 50 + "px";
    cube.style.top = (-x * .5 - y * .5 - z + (width + length) / 4 - height) * 57.8 + "px";
    var top = document.createElement("aside");
    top.style.width = length * 57.8 + "px";
    top.style.height = width * 50 + "px";
    top.style.backgroundColor = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
    top.style.transform = "rotate(210deg) skew(-30deg)";
    var left = document.createElement("aside");
    left.style.width = height * 57.8 + "px";
    left.style.height = length * 50 + "px";
    left.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 10}%, ${alpha})`;
    left.style.transform = "rotate(90deg) skew(-30deg)";
    var right = document.createElement("aside");
    right.style.width = width * 57.8 + "px";
    right.style.height = height * 50 + "px";
    right.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 20}%, ${alpha})`;
    right.style.transform = "rotate(330deg) skew(-30deg)";
    cube.append(top, left, right);
    document.body.firstElementChild.appendChild(cube);
}

function init() {
    cube(0, 0, 0, 1, 1, 1, 200);
}