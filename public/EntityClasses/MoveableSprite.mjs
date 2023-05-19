import Sprite from "./Sprite.mjs";
import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
export default class MoveableSprite extends Sprite {
    constructor(position3D, imagePath, width, height, hitboxWidth=undefined, hitboxHeight=undefined) {
        super(position3D, imagePath, width, height, hitboxWidth, hitboxHeight);
        this.speed = new Vector3D(0, 0, 0);
        this.type = "Moveable Sprite";
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }


}

