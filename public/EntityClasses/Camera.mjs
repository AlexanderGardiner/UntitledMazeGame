import Entity from "./Entity.mjs";
export default class Camera extends Entity {
    constructor(position3D, horizontalFov, aspectRatio) {
        super(position3D);
        this.type = "Camera";
        this.horizontalFov = horizontalFov;
        this.verticalFov = horizontalFov / aspectRatio;
    }

    getHorizontalFov() {
        return this.horizontalFov;
    }

    getVerticalFov() {
        return this.verticalFov;
    }
}