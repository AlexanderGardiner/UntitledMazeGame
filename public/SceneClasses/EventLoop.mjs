import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
import CollisionManager from "./CollisionManager.mjs";
import LevelLoader from "../LevelClasses/LevelLoader.mjs";

export default class EventLoop {
    constructor(scene, keyboardInput) {
        this.scene = scene;
        this.keyboardInput = keyboardInput;
        this.previousTime = performance.now();
        this.currentTime = performance.now();
        this.deltaTime;
        this.collisionManager = new CollisionManager(this.scene);
        this.levelLoader = new LevelLoader();
        this.dashStartTime = 0;
        this.playerDashing = false;
        this.playerDashEndTime = 0;
        //this.levelLoader.loadLevel("level1",this.scene);
        
    }

    update() {
        this.currentTime = performance.now();
        this.deltaTime = (this.currentTime-this.previousTime)/17;
        let player = this.scene.getPlayer();
        let playerSpeedIncrease =  this.movePlayer();

        player.setSpeed(player.getSpeed().addVector3D(playerSpeedIncrease));

        
        this.collisionManager.move(player, player.getSpeed());
        this.scene.clearScene();
        this.scene.updateScene();

        window.requestAnimationFrame(this.update.bind(this));
        // setTimeout(this.update.bind(this), 20);

        this.previousTime = this.currentTime;
    }

    movePlayer() {
        let player = this.scene.getPlayer();
        let playerMovementParameters = player.getMovementParameters()

        let playerSpeedIncrease = new Vector3D(0,0,0);
        
        if (this.keyboardInput.getUpPressed()) {
            console.log(this.playerDashing)
            if ((this.keyboardInput.getDashPressed() || this.playerDashing) && performance.now()-this.playerDashEndTime>playerMovementParameters.getDashRechargeTime()) {
                if (!this.playerDashing) {
                    this.dashStartTime = performance.now();
                    this.playerDashing = true;
                    if (player.getSpeed().getYMagnitude()+playerMovementParameters.getDashAcceleration()<playerMovementParameters.getDashSpeed()) {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getDashAcceleration(),0));
                    } else {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getDashSpeed() - player.getSpeed().getYMagnitude(),0));
                    } 
                } else {
                    if (performance.now()-this.dashStartTime<playerMovementParameters.getDashLength()) {
                        if (player.getSpeed().getYMagnitude()+playerMovementParameters.getDashAcceleration()<playerMovementParameters.getDashSpeed()) {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getDashAcceleration(),0));
                        } else {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getDashSpeed() - player.getSpeed().getYMagnitude(),0));
                        }
                    } else {
                        this.playerDashEndTime = performance.now();
                        this.playerDashing = false;
                    }
                }
            } else {
                if (player.getSpeed().getYMagnitude()+playerMovementParameters.getAcceleration()<playerMovementParameters.getMaxSpeed()) {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getAcceleration(),0));
                } else {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,playerMovementParameters.getMaxSpeed() - player.getSpeed().getYMagnitude(),0));
                } 
            }
            
        }

        if (this.keyboardInput.getDownPressed()) {
            if (player.getSpeed().getYMagnitude()-playerMovementParameters.getAcceleration()>-playerMovementParameters.getMaxSpeed()) {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-playerMovementParameters.getAcceleration(),0));
            } else {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-playerMovementParameters.getMaxSpeed() - player.getSpeed().getYMagnitude(),0));
            } 
        }

        if (this.keyboardInput.getRightPressed()) {
            if (player.getSpeed().getXMagnitude()+playerMovementParameters.getAcceleration()<playerMovementParameters.getMaxSpeed()) {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(playerMovementParameters.getAcceleration(),0,0));
            } else {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(playerMovementParameters.getMaxSpeed() - player.getSpeed().getXMagnitude(),0,0));
            } 
        }

        if (this.keyboardInput.getLeftPressed()) {
            if (player.getSpeed().getXMagnitude()-playerMovementParameters.getAcceleration()>-playerMovementParameters.getMaxSpeed()) {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-playerMovementParameters.getAcceleration(),0,0));
            } else {
                playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-playerMovementParameters.getMaxSpeed() - player.getSpeed().getXMagnitude(),0,0));
            } 
        }

        
        
        let playerXDeceleration = 0;
        let playerYDeceleration = 0;
        if (!this.keyboardInput.getUpPressed() && !this.keyboardInput.getDownPressed()) {
            if (player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()>0) {
                if (player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()-playerMovementParameters.getDeceleration()>0) {
                    playerYDeceleration = -playerMovementParameters.getDeceleration();
                } else {
                    playerYDeceleration = -(player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude());
                }
            } else if (player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()<0) {
                if (player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()+playerMovementParameters.getDeceleration()<0) {
                    playerYDeceleration = playerMovementParameters.getDeceleration();
                } else {
                    playerYDeceleration = -(player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude());
                }
            }
        }

        if (!this.keyboardInput.getRightPressed() && !this.keyboardInput.getLeftPressed()) {
            if (player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()>0) {
                if (player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()-playerMovementParameters.getDeceleration()>0) {
                    playerXDeceleration = -playerMovementParameters.getDeceleration();
                } else {
                    playerXDeceleration = -(player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude());
                }
            } else if (player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()<0) {
                if (player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()+playerMovementParameters.getDeceleration()<0) {
                    playerXDeceleration = playerMovementParameters.getDeceleration();
                } else {
                    playerXDeceleration = -(player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude());
                }
            }
        }
        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(playerXDeceleration,playerYDeceleration,0));

        playerSpeedIncrease = playerSpeedIncrease.multiplyVector3D(new Vector3D(this.deltaTime, this.deltaTime, this.deltaTime));
        
        return playerSpeedIncrease;
    }

}