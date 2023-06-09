export default class Entity {
    constructor(position3D, rotation3D=undefined, hitboxWidth=undefined, hitboxHeight=undefined) {
        this.position3D = position3D;
        this.rotation3D = rotation3D;
        this.hitboxWidth = hitboxWidth;
        this.hitboxHeight = hitboxHeight;
        this.type = "Entity";
    }

    getPosition3D() {
        return this.position3D;
    }

    setPosition3D(position3D) {
        this.position3D = position3D;
    }

    getRotation3D() {
        return this.rotation3D;
    }

    setRotation3D(rotation3D) {
        this.rotation3D = rotation3D;
    }

    getHitboxWidth() {
        return this.hitboxWidth;
    }

    getHitboxHeight() {
        return this.hitboxHeight;
    }

}