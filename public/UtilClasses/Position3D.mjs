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

    add(vector3D) {
        return new Position3D(this.getXPos() + vector3D.getXPos(), 
                              this.getYPos() + vector3D.getYPos(), 
                              this.getZPos() + vector3D.getZPos());
    }

}