import IsDashing from "../UtilClasses/IsDashing.mjs";
import MoveableSprite from "./MoveableSprite.mjs";

export default class Enemy extends MoveableSprite {
    constructor(position3D, imagePath, width, height, hitboxWidth=undefined, hitboxHeight=undefined, speed) {
        super(position3D, imagePath, width, height, hitboxWidth, hitboxHeight);
        this.speed = speed;
        this.type = "Enemy";
    }

}

