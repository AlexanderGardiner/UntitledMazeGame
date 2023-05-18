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
            if (player.getSpeed().getYMagnitude()+playerMovementParameters.getAcceleration()<=player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getAcceleration(),0)));
            } else {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getMaxSpeed()-player.getSpeed().getYMagnitude(),0)));
            }
            
        } 
        
        if (this.keyboardInput.getDownPressed()) {
            if (player.getSpeed().getYMagnitude()-playerMovementParameters.getAcceleration()>=-player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,-playerMovementParameters.getAcceleration(),0)));
            } else {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,-playerMovementParameters.getMaxSpeed()-player.getSpeed().getYMagnitude(),0)));
            }
            
        } 

        if (this.keyboardInput.getRightPressed()) {
            if (player.getSpeed().getXMagnitude()+playerMovementParameters.getAcceleration()<=player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(playerMovementParameters.getAcceleration(),0,0)));
            } else {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(playerMovementParameters.getMaxSpeed()-player.getSpeed().getXMagnitude(),0,0)));
            }
            
        } 
        
        if (this.keyboardInput.getLeftPressed()) {
            if (player.getSpeed().getXMagnitude()-playerMovementParameters.getAcceleration()>=-player.getMovementParameters().getMaxSpeed()) {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(-playerMovementParameters.getAcceleration(),0,0)));
            } else {
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(-playerMovementParameters.getMaxSpeed()-player.getSpeed().getXMagnitude(),0,0)));
            }
            
        } 



    
    
        let xSpeedAdjustment = 0;
        let ySpeedAdjustment = 0;
        let zSpeedAdjustment = 0;


        if (!this.keyboardInput.getUpPressed() && player.getSpeed().getYMagnitude()>0) {
            ySpeedAdjustment -= playerMovementParameters.getDeceleration();
        }

        if (!this.keyboardInput.getDownPressed() && player.getSpeed().getYMagnitude()<0) {
            ySpeedAdjustment += playerMovementParameters.getDeceleration();
        }

        if (!this.keyboardInput.getRightPressed() && player.getSpeed().getXMagnitude()>0) {
            xSpeedAdjustment -= playerMovementParameters.getDeceleration();
        }

        if (!this.keyboardInput.getLeftPressed() && player.getSpeed().getXMagnitude()<0) {
            xSpeedAdjustment += playerMovementParameters.getDeceleration();
        }



        if (player.getSpeed().getZMagnitude()<0) {
            zSpeedAdjustment = playerMovementParameters.getDeceleration();
        } else if (player.getSpeed().getZMagnitude()>0) {
            zSpeedAdjustment = -playerMovementParameters.getDeceleration()
        } 
        

        

        player.setSpeed(player.getSpeed().addVector3D(new Vector3D(xSpeedAdjustment, ySpeedAdjustment, zSpeedAdjustment)));

        if (player.getSpeed().getYMagnitude()<0.0015 && player.getSpeed().getYMagnitude()>-0.0015) {
            player.getSpeed().setYMagnitude(0);
        }

        if (player.getSpeed().getXMagnitude()<0.0015 && player.getSpeed().getXMagnitude()>-0.0015) {
            player.getSpeed().setXMagnitude(0);
        }

        if (player.getSpeed().getXMagnitude()!=0 && player.getSpeed().getYMagnitude()!=0) {
            player.getSpeed().multiplyVector3D(new Vector3D(1/Math.sqrt(2),1/Math.sqrt(2),1));
        } 


        player.setPosition3D(player.getPosition3D().addVector3D(player.getSpeed()));
        
        this.scene.clearScene();
        this.scene.updateScene();

        window.requestAnimationFrame(this.update.bind(this));
    }
}