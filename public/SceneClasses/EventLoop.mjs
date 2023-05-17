import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3d.mjs";

export default class EventLoop {
    constructor(scene, keyboardInput) {
        this.scene = scene;
        this.keyboardInput = keyboardInput;
    }

    update() {
        let player = this.scene.getPlayer();
        let playerMovementParameters = player.getMovementParameters()

        if (this.keyboardInput.getUpPressed()) {
            if (player.getSpeed+playerMovementParameters.getAcceleration()<=player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,player.getSpeed()+playerMovementParameters.getAcceleration(),0)));
            } else {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getMaxSpeed(),0)));
            }
            
        } 
        console.log(player.getSpeed());
    



        player.setPosition3D(player.getPosition3D().addVector3D(player.getSpeed()));
        let xSpeedAdjustment = 0;
        if (player.getSpeed().getXMagnitude>0) {
            
        }
        this.scene.clearScene();
        this.scene.updateScene();
    }
}