export default class Vector3D {
    constructor(xMagnitude, yMagnitude, zMagnitude) {
        this.xMagnitude = xMagnitude;
        this.yMagnitude = yMagnitude;
        this.zMagnitude = zMagnitude;
    }

    getXMagnitude() {
        return this.xMagnitude;
    }

    getYMagnitude() {
        return this.yMagnitude;
    }

    getZMagnitude() {
        return this.zMagnitude;
    }

    SetXMagnitude(xMagnitude) {
        this.xMagnitude = xMagnitude;
    }

    setYMagnitude(yMagnitude) {
        this.yMagnitude = yMagnitude;
    }

    setZMagnitude(zMagnitude) {
        this.zMagnitude = zMagnitude;
    }

}