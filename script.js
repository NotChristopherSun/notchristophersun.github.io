class Block {
    constructor(x = 0, y = 0, z = 0, width = 1, length = 1, height = 1, hue = 210, lightness = 50, alpha = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.length = length;
        this.height = height;
        var cube = document.createElement("figure");
        cube.style.left = -x + y + (length - width) / 2 + "vmin";
        cube.style.top = (-x * .5 - y * .5 - z + (width + length) / 4 - height) * 1.155 + "vmin";
        var top = document.createElement("aside");
        top.style.width = length * 1.155 + "vmin";
        top.style.height = width + "vmin";
        top.style.backgroundColor = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
        top.style.transform = "rotate(210deg) skew(-30deg)";
        var left = document.createElement("aside");
        left.style.width = height * 1.155 + "vmin";
        left.style.height = length + "vmin";
        left.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 10}%, ${alpha})`;
        left.style.transform = "rotate(90deg) skew(-30deg)";
        var right = document.createElement("aside");
        right.style.width = width * 1.155 + "vmin";
        right.style.height = height + "vmin";
        right.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 20}%, ${alpha})`;
        right.style.transform = "rotate(330deg) skew(-30deg)";
        cube.append(top, left, right);
        document.body.firstElementChild.appendChild(cube);
        this.shape = cube;
    }
}

class Table {
    constructor(x = 0, y = 0, z = 0, width = 8, length = 4, height = 6) {
        var dx = (length - 1) / 2, dy = (width - 1) / 2, dz = height - .5;
        for ((directionX, directionY) of [(1, 1), (1, -1), (-1, 1), (-1, -1)])
        this.legTop = new Block(x + dx, y + dy, z, .5, .5, dz, 50);
        this.legTop.top.remove();
        this.legLeft = new Block(x + dx, y - dy, z, .5, .5, dz, 50);
        this.legLeft.top.remove();
        this.legRight = new Block(x - dx, y + dy, z, .5, .5, dz, 50);
        this.legRight.top.remove();
        this.legBottom = new Block(x - dx, y - dy, z, .5, .5, dz, 50);
        this.legBottom.top.remove();
        this.top = new Block(x, y, z + dz, width, length, .5, 210);
    }
}

function init() {
    const room = [];
    room.push(new Block(0, 0, -12, 52, 52, 2, 160, 30));
    room.push(new Block(25, 0, -10, 52, 2, 26, 200, 90));
    room.push(new Block(-1, 25, -10, 2, 50, 26, 200, 90));
    room.push(new Table(21, 19, -10, 10, 6, 8));
    console.log(room);
}