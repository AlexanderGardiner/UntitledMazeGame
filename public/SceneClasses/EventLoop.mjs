import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
import CollisionManager from "./CollisionManager.mjs";

export default class EventLoop {
    constructor(scene, keyboardInput) {
        this.scene = scene;
        this.keyboardInput = keyboardInput;
        this.previousTime = performance.now();
        this.currentTime = performance.now();
        this.deltaTime;
        this.collisionManager = new CollisionManager(this.scene);
    }

    update() {
        this.currentTime = performance.now();
        this.deltaTime = (this.currentTime-this.previousTime)/17;
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
            if (player.getSpeed().getYMagnitude()-playerMovementParameters.getDeceleration()>0) {
                ySpeedAdjustment -= playerMovementParameters.getDeceleration();
            } else {
                ySpeedAdjustment -= player.getSpeed().getYMagnitude();
            }
            
        } 

        if (!this.keyboardInput.getDownPressed() && player.getSpeed().getYMagnitude()<0) {
            if (player.getSpeed().getYMagnitude()+playerMovementParameters.getDeceleration()<0) {
                ySpeedAdjustment += playerMovementParameters.getDeceleration();
            } else {
                ySpeedAdjustment -= player.getSpeed().getYMagnitude();
            }
        }

        if (!this.keyboardInput.getRightPressed() && player.getSpeed().getXMagnitude()>0) {
            if (player.getSpeed().getXMagnitude()-playerMovementParameters.getDeceleration()>0) {
                xSpeedAdjustment -= playerMovementParameters.getDeceleration();
            } else {
                xSpeedAdjustment -= player.getSpeed().getXMagnitude();
            }
        }

        if (!this.keyboardInput.getLeftPressed() && player.getSpeed().getXMagnitude()<0) {
            if (player.getSpeed().getXMagnitude()+playerMovementParameters.getDeceleration()<0) {
                xSpeedAdjustment += playerMovementParameters.getDeceleration();
            } else {
                xSpeedAdjustment -= player.getSpeed().getXMagnitude();
            }
        }



        if (player.getSpeed().getZMagnitude()<0) {
            zSpeedAdjustment = playerMovementParameters.getDeceleration();
        } else if (player.getSpeed().getZMagnitude()>0) {
            zSpeedAdjustment = -playerMovementParameters.getDeceleration()
        } 
        

        

        player.setSpeed(player.getSpeed().addVector3D(new Vector3D(xSpeedAdjustment, ySpeedAdjustment, zSpeedAdjustment)));

        if (player.getSpeed().getXMagnitude()!=0 && player.getSpeed().getYMagnitude()!=0) {
            player.getSpeed().multiplyVector3D(new Vector3D(1/Math.sqrt(2),1/Math.sqrt(2),1));
        } 

        if (player.getSpeed().getYMagnitude()<0.0015 && player.getSpeed().getYMagnitude()>-0.0015) {
            player.getSpeed().setYMagnitude(0);
        }

        if (player.getSpeed().getXMagnitude()<0.0015 && player.getSpeed().getXMagnitude()>-0.0015) {
            player.getSpeed().setXMagnitude(0);
        }

        
        player.setSpeed(player.getSpeed().multiplyVector3D(new Vector3D(this.deltaTime, this.deltaTime, this.deltaTime)));


        this.collisionManager.move(player, player.getSpeed());
        this.scene.clearScene();
        this.scene.updateScene();

        window.requestAnimationFrame(this.update.bind(this));
        // setTimeout(this.update.bind(this), 1000);
        this.previousTime = this.currentTime;
    }
}