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
        this.top = document.createElement("aside");
        this.top.style.width = length * 1.155 + "vmin";
        this.top.style.height = width + "vmin";
        this.top.style.backgroundColor = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
        this.top.style.transform = "rotate(210deg) skew(-30deg)";
        this.left = document.createElement("aside");
        this.left.style.width = height * 1.155 + "vmin";
        this.left.style.height = length + "vmin";
        this.left.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 10}%, ${alpha})`;
        this.left.style.transform = "rotate(90deg) skew(-30deg)";
        this.right = document.createElement("aside");
        this.right.style.width = width * 1.155 + "vmin";
        this.right.style.height = height + "vmin";
        this.right.style.backgroundColor = `hsla(${hue}, 100%, ${lightness - 20}%, ${alpha})`;
        this.right.style.transform = "rotate(330deg) skew(-30deg)";
        cube.append(this.top, this.left, this.right);
        document.body.firstElementChild.appendChild(cube);
    }
}

class Table extends Model {
    init() {
        var dx = (this.length - 1) / 2, dy = (this.width - 1) / 2;
        for (const [dirX, dirY] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
            this.parts.unshift(new Block(this.x + dx * dirX, this.y + dy * dirY, this.z, .5, .5, this.height - .5, 50));
            this.parts[0].top.remove();
        }
        this.parts.push(new Block(this.x, this.y, this.z + this.height - .5, this.width, this.length, .5, 210));
    }
}

class Desk extends Model {
    init() {
        this.parts.push(new Block(this.x, this.y - this.width * .375, this.z, this.width / 4, this.length, .5, 220));
        this.parts.push(new Block(this.x, this.y + this.width * .375, this.z, this.width / 4, this.length, .5, 220));
        this.parts.push(new Block(this.x + this.length / 2 - .25, this.y + .75, this.z + this.height / 2, this.width - 1.5, .5, this.height / 2, 20));
        this.parts[2].top.remove();
        this.parts[2].left.remove();
        this.parts.push(new Block(this.x + this.length / 4, this.y - this.width / 2 + 1.25, this.z + .5, .5, this.length / 2, this.height - 1, 30));
        this.parts[3].top.remove();
        this.parts.push(new Block(this.x - this.length / 2 + .5, this.y + this.width * .375, this.z + .5, .5, .5, this.height / 2, 50));
        this.parts[4].top.remove();
        this.parts.push(new Block(this.x - .25, this.y + this.width * .375, this.z + this.height / 2, this.width / 4, this.length - .5, .5, 215));
        this.parts.push(new Block(this.x - this.length / 2 + .5, this.y - this.width * .375, this.z + .5, .5, .5, this.height - .5, 50));
        this.parts[6].top.remove();
        this.parts.push(new Block(this.x - this.length / 2 + .5, this.y + this.width * .375, this.z + this.height / 2 + .5, .5, .5, this.height / 2 - .5, 50));
        this.parts[7].top.remove();
        this.parts.push(new Block(this.x, this.y, this.z + this.height - .5, this.width, this.length, .5, 210));
    }
}

class Chair extends Model {
    init() {
        this.parts.push(...new Table(this.x, this.y, this.z, this.width, this.length, this.height / 2).parts, new Block(this.x - this.width / 2 + .25, this.y, this.z + this.height / 2, this.width, .5, this.height / 2));
    }
}

class Window extends Model {
    init() {
        this.parts.push(new Block(this.x + this.length / 2 - 1, this.y, this.z, 2, 2, this.height), new Block(this.x, this.y, this.z, 2, this.length - 4, 2));
        this.parts.push(new Block(this.x, this.y, this.z + 2, this.width / 2, this.length - 4, this.height - 4, 200, 90, .3));
        this.parts.push(new Block(this.x, this.y, this.z + this.height - 2, 2, this.length - 4, 2), new Block(this.x - this.length / 2 + 1, this.y, this.z, 2, 2, this.height));
        this.parts[2].top.remove();
        this.parts[2].right.remove();
    }
}

class Room extends Model {
    init() {
        this.parts.push(new Block(this.x, this.y, this.z, this.width + 2, this.length + 2, 2, 160, 30));
        this.parts.push(new Block(this.x + this.length / 2, this.y, this.z + 2, this.width + 2, 2, this.height, 200, 90));
        this.parts.push(new Block(this.x + this.length / 3 - 1, this.y + this.width / 2, this.z + 2, 2, this.length / 3, this.height, 200, 90));
        this.parts.push(new Block(this.x - 1, this.y + this.width / 2, this.z + 2, 2, this.length / 3, this.height / 4, 200, 90));
        this.parts.push(new Window(this.x - 1, this.y + this.width / 2, this.z + this.height / 4 + 2, 2, this.length / 3, this.height / 2));
        this.parts.push(new Block(this.x - 1, this.y + this.width / 2, this.z + this.height * .75 + 2, 2, this.length / 3, this.height / 4, 200, 90));
        this.parts.push(new Block(this.x - this.length / 3 - 1, this.y + this.width / 2, this.z + 2, 2, this.length / 3, this.height, 200, 90));
        this.parts[2].right.remove();
        this.parts[3].top.remove();
        this.parts[3].right.remove();
        this.parts[4].parts[0].top.remove();
        this.parts[4].parts[3].top.remove();
        this.parts[4].parts[4].top.remove();
        this.parts[4].parts[4].right.remove();
        this.parts[5].right.remove();
    }
}

function init() {
    shapes.push(new Room(0, 0, -12, 48, 48, 28));
    shapes.push(new Table(20, 10, -10, 10, 6, 8));
    shapes.push(new Desk(20, -12, -10, 12, 6, 10));
    shapes.push(new Chair(14, 10, -10, 4, 4, 10));
    console.log(shapes);
}