export default class KeyboardInput {
    constructor(moveLeftCode, moveRightCode, moveUpCode, moveDownCode) {
        this.moveLeftCode = moveLeftCode;
        this.moveRightCode = moveRightCode;
        this.moveUpCode = moveUpCode;
        this.moveDownCode = moveDownCode;
        
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        
        addEventListener("keydown", (event) => {
            if (event.key == moveLeftCode) {
                this.leftPressed = true;
            } else if (event.key == moveRightCode) {
                this.rightPressed = true;
            } else if (event.key == moveUpCode) {
                this.upPressed = true;
            } else if (event.key == moveDownCode) {
                this.downPressed = true;
            }
        });

        addEventListener("keyup", (event) => {
            if (event.key == moveLeftCode) {
                this.leftPressed = false;
            } else if (event.key == moveRightCode) {
                this.rightPressed = false;
            } else if (event.key == moveUpCode) {
                this.upPressed = false;
            } else if (event.key == moveDownCode) {
                this.downPressed = false;
            }
        });
    }

    getLeftPressed() {
        return this.leftPressed;
    }

    getRightPressed() {
        return this.rightPressed;
    }

    getUpPressed() {
        return this.upPressed;
    }

    getDownPressed() {
        return this.downPressed;
    }
}