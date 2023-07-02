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
        this.levelLoader.loadLevel("level1",this.scene);
    }

    update() {
        this.currentTime = performance.now();
        this.deltaTime = (this.currentTime-this.previousTime)/17;
        let player = this.scene.getPlayer();
        let playerMovementParameters = player.getMovementParameters()

        if (!player.getIsDashing().dashing()) {
            player.setTimeDashNotPressed(player.getTimeDashNotPressed()+this.currentTime-this.previousTime);
            player.setTimeDashing(0);
        } else {
            player.setTimeDashing(player.getTimeDashing()+this.currentTime-this.previousTime);         
            player.setTimeDashNotPressed(0);
        }
            
        console.log(player.getTimeDashing())

        if (player.getTimeDashing()>playerMovementParameters.getDashLength()) {
            player.setCanDash(false);
        }

        if (player.getTimeDashNotPressed()>playerMovementParameters.getDashRechargeTime()) {
            player.setCanDash(true);
        }
    

        if (this.keyboardInput.getUpPressed()) {
            if (this.keyboardInput.getDashPressed() && player.getCanDash()) {
                player.getIsDashing().setUp(true);
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getDashSpeed(),0)));
            } else {
                player.getIsDashing().setUp(false);
                if (player.getSpeed().getYMagnitude()+playerMovementParameters.getAcceleration()<=player.getMovementParameters().getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getAcceleration(),0)));
                } else if (player.getSpeed().getYMagnitude()<playerMovementParameters.getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,playerMovementParameters.getMaxSpeed()-player.getSpeed().getYMagnitude(),0)));
                }
            }
            
        } else {
            player.getIsDashing().setUp(false);
        }
        
        if (this.keyboardInput.getDownPressed()) {
            if (this.keyboardInput.getDashPressed() && player.getCanDash()) {
                player.getIsDashing().setDown(true);
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,-playerMovementParameters.getDashSpeed(),0)));
            } else {
                player.getIsDashing().setDown(false);
                if (player.getSpeed().getYMagnitude()-playerMovementParameters.getAcceleration()>=-player.getMovementParameters().getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,-playerMovementParameters.getAcceleration(),0)));
                } else if (player.getSpeed().getYMagnitude()>-playerMovementParameters.getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(0,-playerMovementParameters.getMaxSpeed()-player.getSpeed().getYMagnitude(),0)));
                }
            }
            
        } else {
            player.getIsDashing().setDown(false);
        }

        if (this.keyboardInput.getRightPressed()) {
            if (this.keyboardInput.getDashPressed() && player.getCanDash()) {
                player.getIsDashing().setRight(true);
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(playerMovementParameters.getDashSpeed(),0,0)));
            } else {
                player.getIsDashing().setRight(false);
                if (player.getSpeed().getXMagnitude()+playerMovementParameters.getAcceleration()<=player.getMovementParameters().getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(playerMovementParameters.getAcceleration(),0,0)));
                } else if (player.getSpeed().getXMagnitude()<playerMovementParameters.getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(playerMovementParameters.getMaxSpeed()-player.getSpeed().getXMagnitude(),0,0)));
                }
            }
                
        } else {
            player.getIsDashing().setRight(false);
        }
        
        if (this.keyboardInput.getLeftPressed()) {
            if (this.keyboardInput.getDashPressed() && player.getCanDash()) {
                player.getIsDashing().setLeft(true);
                player.setSpeed(player.getSpeed().addVector3D(new Vector3D(-playerMovementParameters.getDashSpeed(),0,0)));
            } else {
                player.getIsDashing().setLeft(false);
                if (player.getSpeed().getXMagnitude()-playerMovementParameters.getAcceleration()>=-player.getMovementParameters().getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(-playerMovementParameters.getAcceleration(),0,0)));
                } else if (player.getSpeed().getXMagnitude()>-playerMovementParameters.getMaxSpeed()) {
                    player.setSpeed(player.getSpeed().addVector3D(new Vector3D(-playerMovementParameters.getMaxSpeed()-player.getSpeed().getXMagnitude(),0,0)));
                }
            }

            
            
        } else {
            player.getIsDashing().setLeft(false);
        }


    
        
    
        let xSpeedAdjustment = 0;
        let ySpeedAdjustment = 0;
        let zSpeedAdjustment = 0;

        if (!this.keyboardInput.getUpPressed() && player.getSpeed().getYMagnitude()>0 && !player.getIsDashing().getUp()) {
            let deceleration = playerMovementParameters.getDeceleration() * player.getSpeed().getYMagnitude();


            if (player.getSpeed().getYMagnitude()-deceleration>0) {
                ySpeedAdjustment -= deceleration;
            } else {
                ySpeedAdjustment -= player.getSpeed().getYMagnitude();
            }
            
        } 

        if (!this.keyboardInput.getDownPressed() && player.getSpeed().getYMagnitude()<0 && !player.getIsDashing().getDown()) {
            let deceleration = playerMovementParameters.getDeceleration() * -player.getSpeed().getYMagnitude();

            
            if (player.getSpeed().getYMagnitude()+deceleration<0) {
                ySpeedAdjustment += deceleration;
            } else {
                ySpeedAdjustment -= player.getSpeed().getYMagnitude();
            }
        }

        if (!this.keyboardInput.getRightPressed() && player.getSpeed().getXMagnitude()>0 && !player.getIsDashing().getRight()) {
            let deceleration = playerMovementParameters.getDeceleration() * player.getSpeed().getXMagnitude();
            
            if (player.getSpeed().getXMagnitude()-deceleration>0) {
                xSpeedAdjustment -= deceleration;
            } else {
                xSpeedAdjustment -= player.getSpeed().getXMagnitude();
            }
        }

        if (!this.keyboardInput.getLeftPressed() && player.getSpeed().getXMagnitude()<0 && !player.getIsDashing().getLeft()) {
            let deceleration = playerMovementParameters.getDeceleration() * -player.getSpeed().getXMagnitude();

            if (player.getSpeed().getXMagnitude()+deceleration<0) {
                xSpeedAdjustment += deceleration;
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
        // setTimeout(this.update.bind(this), 20);
        this.previousTime = this.currentTime;
    }

}