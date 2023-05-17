export default class Rotation2D {
    constructor(xRotation, yRotation) {
        this.xRotation = xRotation;
        this.yRotation = yRotation;
    }

    getXRotation() {
        return this.xRotation;
    }

    getYRotation() {
        return this.yRotation;
    }

    setXRotation(xRotation) {
        this.xRotation = xRotation;
    }

    setYRotation(yRotation) {
        this.yRotation = yRotation;
    }

    addVector3D(vector3D) {
        return new Rotation3D(this.getXRotation() + vector3D.getXMagnitude(), 
                              this.getYRotation() + vector3D.getYMagnitude());
    }
}