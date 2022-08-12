function cube() {
    var cube = document.createElement("figure");
    for (const side of ["top", "left", "right"]) {
        cube.appendChild(document.createElement("aside"));
        cube.lastElementChild.classList.add(side);
    }
    document.body.firstElementChild.appendChild(cube);
}