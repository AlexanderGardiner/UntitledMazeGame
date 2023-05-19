import MoveableSprite from "./MoveableSprite.mjs";

export default class Player extends MoveableSprite {
    constructor(position3D, imagePath, width, height, hitboxWidth=undefined, hitboxHeight=undefined, movementParameters) {
        super(position3D, imagePath, width, height, hitboxWidth, hitboxHeight);
        this.movementParameters = movementParameters;
        this.type = "Player";
    }


    getMovementParameters() {
        return this.movementParameters;
    }

}

