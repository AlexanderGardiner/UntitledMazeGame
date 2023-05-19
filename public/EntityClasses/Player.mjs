import IsDashing from "../UtilClasses/IsDashing.mjs";
import MoveableSprite from "./MoveableSprite.mjs";

export default class Player extends MoveableSprite {
    constructor(position3D, imagePath, width, height, hitboxWidth=undefined, hitboxHeight=undefined, movementParameters) {
        super(position3D, imagePath, width, height, hitboxWidth, hitboxHeight);
        this.movementParameters = movementParameters;
        this.isDashing = new IsDashing(false, false, false, false);
        this.timeDashing = 0;
        this.timeDashNotPressed = 0;
        this.canDash = true;
        this.type = "Player";
    }


    getMovementParameters() {
        return this.movementParameters;
    }

    getIsDashing() {
        return this.isDashing;
    }

    setIsDashing(isDashing) {
        this.isDashing = isDashing;
    }

    setTimeDashing(timeDashing) {
        this.timeDashing = timeDashing;
    }

    getTimeDashing() {
        return this.timeDashing;
    }

    setTimeDashNotPressed(timeDashNotPressed) {
        this.timeDashNotPressed = timeDashNotPressed;
    }

    getTimeDashNotPressed() {
        return this.timeDashNotPressed;
    }

    setCanDash(canDash) {
        this.canDash = canDash;
    }

    getCanDash() {
        return this.canDash;
    }



}

