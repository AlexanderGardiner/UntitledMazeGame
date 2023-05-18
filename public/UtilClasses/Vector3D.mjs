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

    setXMagnitude(xMagnitude) {
        this.xMagnitude = xMagnitude;
    }

    setYMagnitude(yMagnitude) {
        this.yMagnitude = yMagnitude;
    }

    setZMagnitude(zMagnitude) {
        this.zMagnitude = zMagnitude;
    }

    addVector3D(vector3D) {
        return new Vector3D(this.getXMagnitude() + vector3D.getXMagnitude(), 
                            this.getYMagnitude() + vector3D.getYMagnitude(), 
                            this.getZMagnitude() + vector3D.getZMagnitude());
    }

    multiplyVector3D(vector3D) {
        return new Vector3D(this.getXMagnitude() * vector3D.getXMagnitude(), 
                            this.getYMagnitude() * vector3D.getYMagnitude(), 
                            this.getZMagnitude() * vector3D.getZMagnitude());
    }


}