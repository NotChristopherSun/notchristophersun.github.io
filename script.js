const shapes = [];

class Model {
    constructor(x = 0, y = 0, z = 0, width = 8, length = 8, height = 8) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.length = length;
        this.height = height;
        this.parts = [];
        this.init();
    }

    init() {}
}

class Block extends Model {
    constructor(x = 0, y = 0, z = 0, width = 1, length = 1, height = 1, hue = 210, lightness = 50, alpha = 1) {
        super(x, y, z, width, length, height);
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

class Table extends Model {
    init() {
        var dx = (this.length - 1) / 2, dy = (this.width - 1) / 2, dz = this.height - .5;
        for (const [dirX, dirY] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
            this.parts.unshift(new Block(this.x + dx * dirX, this.y + dy * dirY, this.z, .5, .5, dz, 50));
            this.parts[0].shape.firstElementChild.remove();
        }
        this.parts.unshift(new Block(this.x, this.y, this.z + dz, this.width, this.length, .5, 210));
    }
}

class Chair extends Model {
    init() {
        this.parts.push(...new Table(this.x, this.y, this.z, this.width, this.length, this.height / 2).parts, new Block(this.x - this.width / 2 + .25, this.y, this.z + this.height / 2, this.width, .5, this.height / 2));
    }
}

class Window extends Model {
    init() {
        for (const [dx, dz] of [[this.length / 2 - 1, 0], [0, 0], [0, this.height - 2], [-this.length / 2 + 1, 0]]) this.parts.push(new Block(this.x + dx, this.y, this.z + dz, 2, dx ? 2 : this.length - 4, dx ? this.height : 2));
    }
}

class Room extends Model {
    init() {
        this.parts.push(new Block(this.x, this.y, this.z, this.width + 2, this.length + 2, 2, 160, 30));
        this.parts.push(new Block(this.x + this.length / 2, this.y, this.z + 2, this.width + 2, 2, this.height, 200, 90));
        this.parts.push(new Block(this.x - 1, this.y + this.width / 2, this.z + 2, 2, this.length, this.height, 200, 90));
        this.parts.push(new Window(this.x - 1, this.y + this.width / 2, this.z + 2, 2, this.length, this.height));
    }
}

function init() {
    shapes.push(new Room(0, 0, -12, 48, 48, 28));
    shapes.push(new Table(20, 18, -10, 10, 6, 8));
    shapes.push(new Chair(14, 18, -10, 4, 4, 10));
    console.log(shapes);
}