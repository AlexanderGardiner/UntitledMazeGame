import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3d.mjs";

export default class EventLoop {
    constructor(scene, keyboardInput) {
        this.scene = scene;
        this.keyboardInput = keyboardInput;
    }

    update() {
        let additionalPlayerSpeed = new Vector3D(0, 0, 0)
        let player = this.scene.getPlayer();

        if (this.keyboardInput.getUpPressed()) {
            if (player.getSpeed<player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed+player.getMovementParameters().getAcceleration());
            }
            
        }

        if (this.keyboardInput.getDownPressed()) {
            if (player.getSpeed().getYMagnitude()-5>=player.getMaxMovementSpeed()) {
                additionalPlayerSpeed.setYMagnitude(additionalPlayerSpeed.getXMagnitude() - 5);
            } else {
                additionalPlayerSpeed.setYMagnitude(-player.getMaxMovementSpeed() - player.getSpeed());
            }
        }



        if (this.keyboardInput.getRightPressed()) {
            if (player.getSpeed().getXMagnitude()+5<=player.getMaxMovementSpeed()) {
                additionalPlayerSpeed.setXMagnitude(additionalPlayerSpeed.getXMagnitude() + 5);
            } else {
                additionalPlayerSpeed.setXMagnitude(player.getMaxMovementSpeed() - player.getSpeed());
            }
        }

        if (this.keyboardInput.getLeftPressed()) {
            if (player.getSpeed().getXMagnitude()-5>=player.getMaxMovementSpeed()) {
                additionalPlayerSpeed.setXMagnitude(additionalPlayerSpeed.getXMagnitude() - 5);
            } else {
                additionalPlayerSpeed.setXMagnitude(-player.getMaxMovementSpeed() - player.getSpeed());
            }
        }

        player.setSpeed(player.getSpeed().addVector3D(additionalPlayerSpeed));

        player.setPosition3D(player.getPosition3D().addVector3D(this.scene.getPlayer().getSpeed()));
        this.scene.clearScene();
        this.scene.updateScene();
    }
}