export default class KeyboardInput {
    constructor(moveLeftCode, moveRightCode, moveUpCode, moveDownCode, dashCode) {
        this.moveLeftCode = moveLeftCode;
        this.moveRightCode = moveRightCode;
        this.moveUpCode = moveUpCode;
        this.moveDownCode = moveDownCode;
        this.dashCode = dashCode;
        
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.dashPressed = false;
        
        addEventListener("keydown", (event) => {
            if (event.key == this.moveLeftCode) {
                this.leftPressed = true;
            } else if (event.key == this.moveRightCode) {
                this.rightPressed = true;
            } else if (event.key == this.moveUpCode) {
                this.upPressed = true;
            } else if (event.key == this.moveDownCode) {
                this.downPressed = true;
            } else if (event.key == this.dashCode) {
                this.dashPressed = true;
            }
        });

        addEventListener("keyup", (event) => {
            if (event.key == this.moveLeftCode) {
                this.leftPressed = false;
            } else if (event.key == this.moveRightCode) {
                this.rightPressed = false;
            } else if (event.key == this.moveUpCode) {
                this.upPressed = false;
            } else if (event.key == this.moveDownCode) {
                this.downPressed = false;
            } else if (event.key == this.dashCode) {
                this.dashPressed = false;
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

    getDashPressed() {
        return this.dashPressed;
    }
}