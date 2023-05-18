import MoveableSprite from "./MoveableSprite.mjs";

export default class Player extends MoveableSprite {
    constructor(position3D, imagePath, width, height, movementParameters) {
        super(position3D, imagePath, width, height);
        this.movementParameters = movementParameters;
        this.type = "Player";
    }


    getMovementParameters() {
        return this.movementParameters;
    }

}

