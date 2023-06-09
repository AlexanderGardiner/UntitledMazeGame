import Entity from "./Entity.mjs";
export default class Camera extends Entity {
    constructor(position3D, rotation3D, horizontalFov, aspectRatio) {
        super(position3D, rotation3D);
        this.type = "Camera";
        this.horizontalFov = horizontalFov;
        this.verticalFov = horizontalFov / aspectRatio;
        this.type = "Camera";
    }

    getHorizontalFov() {
        return this.horizontalFov;
    }

    getVerticalFov() {
        return this.verticalFov;
    }
}