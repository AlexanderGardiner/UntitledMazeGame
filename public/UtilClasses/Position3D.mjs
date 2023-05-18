export default class Position3D {
    constructor(xPos, yPos, zPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    getXPos() {
        return this.xPos;
    }

    getYPos() {
        return this.yPos;
    }

    getZPos() {
        return this.zPos;
    }

    setXPos(xPos) {
        this.xPos = xPos;
    }

    setYPos(yPos) {
        this.yPos = yPos;
    }

    setZPos(zPos) {
        this.zPos = zPos;
    }

    addPosition3D(position3D) {
        return new Position3D(this.getXPos() + position3D.getXPos(), 
                              this.getYPos() + position3D.getYPos(), 
                              this.getZPos() + position3D.getZPos());
    }

    addVector3D(vector3D) {
        return new Position3D(this.getXPos() + vector3D.getXMagnitude(), 
                              this.getYPos() + vector3D.getYMagnitude(), 
                              this.getZPos() + vector3D.getZMagnitude());
    }


}