import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
import CollisionManager from "./CollisionManager.mjs";
import LevelLoader from "../LevelClasses/LevelLoader.mjs";
import AStar from "../UtilClasses/AStar.mjs";

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
        this.player = this.scene.getPlayer();
        this.playerMovementParameters = this.player.getMovementParameters();
        this.aStar = new AStar();
        this.levelLoader.loadLevel("testLevel",this.scene,this.aStar).then();
        
        
    }

    update() {
        this.currentTime = performance.now();
        this.deltaTime = (this.currentTime-this.previousTime)/20;
        
        this.player = this.scene.getPlayer();
        this.playerCanDash = performance.now()-this.playerDashEndTime>this.playerMovementParameters.getDashRechargeTime();
        let playerSpeedIncrease = this.getPlayerSpeedIncrease();

        this.player.setSpeed(this.player.getSpeed().addVector3D(playerSpeedIncrease));
        
        let deltaTimeAdjustedSpeed = this.player.getSpeed().multiplyVector3D(new Vector3D(this.deltaTime, this.deltaTime, this.deltaTime));
        this.collisionManager.move(this.player, deltaTimeAdjustedSpeed);        

        if (!this.playerCanDash) {
            this.player.setImage("PlayerRechargingDash.png");
        } else {
            this.player.setImage("Player.png")
        }
        this.scene.updateScene();

        this.previousTime = this.currentTime;
        window.requestAnimationFrame(this.update.bind(this));
        // setTimeout(this.update.bind(this), 0);

        
    }

    getPlayerSpeedIncrease() {
        
        
        this.playerMovementParameters = this.player.getMovementParameters()
        let playerSpeedIncrease = new Vector3D(0,0,0);
        
        if (this.keyboardInput.getUpPressed()) {
            if ((this.keyboardInput.getDashPressed() || this.playerDashing) && performance.now()-this.playerDashEndTime>this.playerMovementParameters.getDashRechargeTime()) {
                if (!this.playerDashing) {
                    this.dashStartTime = performance.now();
                    this.playerDashing = true;
                    if (this.player.getSpeed().getYMagnitude()+this.playerMovementParameters.getDashAcceleration()<this.playerMovementParameters.getDashSpeed()) {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getDashAcceleration(),0));
                    } else {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getYMagnitude(),0));
                    } 
                } else {
                    if (performance.now()-this.dashStartTime<this.playerMovementParameters.getDashLength()) {
                        if (this.player.getSpeed().getYMagnitude()+this.playerMovementParameters.getDashAcceleration()<this.playerMovementParameters.getDashSpeed()) {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getDashAcceleration(),0));
                        } else {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getYMagnitude(),0));
                        }
                    } else {
                        this.playerDashEndTime = performance.now();
                        this.playerDashing = false;
                    }
                }
            } else {
                if (this.player.getSpeed().getYMagnitude()+this.playerMovementParameters.getAcceleration()<this.playerMovementParameters.getMaxSpeed()) {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getAcceleration(),0));
                } else {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,this.playerMovementParameters.getMaxSpeed() - this.player.getSpeed().getYMagnitude(),0));
                } 
            }
            
        }

        if (this.keyboardInput.getDownPressed()) {
            if ((this.keyboardInput.getDashPressed() || this.playerDashing) && performance.now()-this.playerDashEndTime>this.playerMovementParameters.getDashRechargeTime()) {
                if (!this.playerDashing) {
                    this.dashStartTime = performance.now();
                    this.playerDashing = true;
                    if (this.player.getSpeed().getYMagnitude()-this.playerMovementParameters.getDashAcceleration()>-this.playerMovementParameters.getDashSpeed()) {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getDashAcceleration(),0));
                    } else {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getYMagnitude(),0));
                    } 
                } else {
                    if (performance.now()-this.dashStartTime<this.playerMovementParameters.getDashLength()) {
                        if (this.player.getSpeed().getYMagnitude()-this.playerMovementParameters.getDashAcceleration()>-this.playerMovementParameters.getDashSpeed()) {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getDashAcceleration(),0));
                        } else {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getYMagnitude(),0));
                        } 
                    } else {
                        this.playerDashEndTime = performance.now();
                        this.playerDashing = false;
                    }
                }
            } else {
                if (this.player.getSpeed().getYMagnitude()-this.playerMovementParameters.getAcceleration()>-this.playerMovementParameters.getMaxSpeed()) {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getAcceleration(),0));
                } else {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(0,-this.playerMovementParameters.getMaxSpeed() - this.player.getSpeed().getYMagnitude(),0));
                } 
            }
        }

        if (this.keyboardInput.getRightPressed()) {
            if ((this.keyboardInput.getDashPressed() || this.playerDashing) && performance.now()-this.playerDashEndTime>this.playerMovementParameters.getDashRechargeTime()) {
                if (!this.playerDashing) {
                    this.dashStartTime = performance.now();
                    this.playerDashing = true;
                    if (this.player.getSpeed().getXMagnitude()+this.playerMovementParameters.getDashAcceleration()<this.playerMovementParameters.getDashSpeed()) {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getDashAcceleration(),0,0));
                    } else {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                    } 
                } else {
                    if (performance.now()-this.dashStartTime<this.playerMovementParameters.getDashLength()) {
                        if (this.player.getSpeed().getXMagnitude()+this.playerMovementParameters.getDashAcceleration()<this.playerMovementParameters.getDashSpeed()) {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getDashAcceleration(),0,0));
                        } else {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                        } 
                    } else {
                        this.playerDashEndTime = performance.now();
                        this.playerDashing = false;
                    }
                }
            } else {
                if (this.player.getSpeed().getXMagnitude()+this.playerMovementParameters.getAcceleration()<this.playerMovementParameters.getMaxSpeed()) {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getAcceleration(),0,0));
                } else {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(this.playerMovementParameters.getMaxSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                } 
            }
        }

        if (this.keyboardInput.getLeftPressed()) {
            if ((this.keyboardInput.getDashPressed() || this.playerDashing) && performance.now()-this.playerDashEndTime>this.playerMovementParameters.getDashRechargeTime()) {
                if (!this.playerDashing) {
                    this.dashStartTime = performance.now();
                    this.playerDashing = true;
                    if (this.player.getSpeed().getXMagnitude()-this.playerMovementParameters.getDashAcceleration()>-this.playerMovementParameters.getDashSpeed()) {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getDashAcceleration(),0,0));
                    } else {
                        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                    } 
                } else {
                    if (performance.now()-this.dashStartTime<this.playerMovementParameters.getDashLength()) {
                        if (this.player.getSpeed().getXMagnitude()-this.playerMovementParameters.getDashAcceleration()>-this.playerMovementParameters.getDashSpeed()) {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getDashAcceleration(),0,0));
                        } else {
                            playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getDashSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                        } 
                    } else {
                        this.playerDashEndTime = performance.now();
                        this.playerDashing = false;
                    }
                }
            } else {
                if (this.player.getSpeed().getXMagnitude()-this.playerMovementParameters.getAcceleration()>-this.playerMovementParameters.getMaxSpeed()) {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getAcceleration(),0,0));
                } else {
                    playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(-this.playerMovementParameters.getMaxSpeed() - this.player.getSpeed().getXMagnitude(),0,0));
                } 
            }
        }

        
        
        let playerXDeceleration = 0;
        let playerYDeceleration = 0;
        if (!this.keyboardInput.getUpPressed() && !this.keyboardInput.getDownPressed()) {
            if (this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()>0) {
                if (this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()-this.playerMovementParameters.getDeceleration()>0) {
                    playerYDeceleration = -this.playerMovementParameters.getDeceleration();
                } else {
                    playerYDeceleration = -(this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude());
                }
            } else if (this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()<0) {
                if (this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude()+this.playerMovementParameters.getDeceleration()<0) {
                    playerYDeceleration = this.playerMovementParameters.getDeceleration();
                } else {
                    playerYDeceleration = -(this.player.getSpeed().getYMagnitude() + playerSpeedIncrease.getYMagnitude());
                }
            }
        }

        if (!this.keyboardInput.getRightPressed() && !this.keyboardInput.getLeftPressed()) {
            if (this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()>0) {
                if (this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()-this.playerMovementParameters.getDeceleration()>0) {
                    playerXDeceleration = -this.playerMovementParameters.getDeceleration();
                } else {
                    playerXDeceleration = -(this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude());
                }
            } else if (this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()<0) {
                if (this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude()+this.playerMovementParameters.getDeceleration()<0) {
                    playerXDeceleration = this.playerMovementParameters.getDeceleration();
                } else {
                    playerXDeceleration = -(this.player.getSpeed().getXMagnitude() + playerSpeedIncrease.getXMagnitude());
                }
            }
        }
        playerSpeedIncrease = playerSpeedIncrease.addVector3D(new Vector3D(playerXDeceleration,playerYDeceleration,0));

        playerSpeedIncrease = playerSpeedIncrease.multiplyVector3D(new Vector3D(this.deltaTime, this.deltaTime, this.deltaTime));
        
        return playerSpeedIncrease;
    }

}