export default class Collision {
    constructor(top, bottom, left, right, entityHit) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.entityHit = entityHit;
    }

    getTop() {
        return this.top;
    }

    getBottom() {
        return this.bottom;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    getEntityHit() {
        return this.entityHit;
    }
}