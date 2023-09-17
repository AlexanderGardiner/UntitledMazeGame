export default class AStarNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.g = 0;
        this.h = 0;
        this.f = 0;

        this.parent = null;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getG() {
        return this.g;
    }

    getH() {
        return this.h;
    }

    getF() {
        return this.f;
    }

    setG(g) {
        this.g = g;
    }

    setH(h) {
        this.h = h;
    }

    setF(f) {
        this.f = f;
    }

    getParent() {
        return this.parent;
    }

    setParent(parent) {
        this.parent = parent;
    }

}