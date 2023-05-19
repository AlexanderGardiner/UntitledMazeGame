export default class IsDashing {
    constructor(up, down, left, right) {
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }

    getUp() {
        return this.up;
    }

    getDown() {
        return this.down;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    setUp(up) {
        this.up = up;
    }

    setDown(down) {
        this.down = down;
    }

    setLeft(left) {
        this.left = left;
    }

    setRight(right) {
        this.right = right;
    }

    dashing() {
        return this.getUp() || this.getDown() || this.getRight() || this.getLeft();
    }
}