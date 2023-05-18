import Sprite from "./Sprite.mjs";
import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
export default class MoveableSprite extends Sprite {
    constructor(position3D, imagePath, width, height) {
        super(position3D, imagePath, width, height);
        this.speed = new Vector3D(0, 0, 0);
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }


}

