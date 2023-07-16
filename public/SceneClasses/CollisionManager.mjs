import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
import Vector3D from "../UtilClasses/Vector3D.mjs";
import Collision from "../UtilClasses/Collision.mjs";


export default class CollisionManager {
    constructor(scene) {
        this.scene = scene;
    }

    move(entity, vector3D) {
        if (true){//Math.abs(vector3D.getXMagnitude())>Math.abs(vector3D.getYMagnitude())) {
            if (vector3D.getXMagnitude()>0) {
                let i=0;
                let hitRight = false;
                while (i<vector3D.getXMagnitude() && !hitRight) {
                    let j = 1;
                    entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0.1,0,0)));
                    while (!hitRight && j<this.scene.getEntitiesLength()) {
                        
                        hitRight = this.checkCollision(entity, this.scene.getEntity(j)).getRight();
                        j++;
                    }
                    i++;
                    if (hitRight) {
                        entity.getSpeed().addVector3D(new Vector3D(-entity.getSpeed().getXMagnitude(),0,0));
                    }
                }
                entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(-0.1,0,0)));
            } else if (vector3D.getXMagnitude()<0) {
                let i=0;
                let hitLeft = false;
                while (i>vector3D.getXMagnitude() && !hitLeft) {
                    let j = 1;
                    entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(-0.1,0,0)));
                    while (!hitLeft && j<this.scene.getEntitiesLength()) {
                        
                        hitLeft = this.checkCollision(entity, this.scene.getEntity(j)).getLeft();
                        j++;
                    }
                    i--;
                    if (hitLeft) {
                        entity.getSpeed().addVector3D(new Vector3D(-entity.getSpeed().getXMagnitude(),0,0));
                    }
                }
                entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0.1,0,0)));
            }
            
        }

        if (true){//Math.abs(vector3D.getYMagnitude())>Math.abs(vector3D.getXMagnitude())) {
            if (vector3D.getYMagnitude()>0) {
                let i=0;
                let hitTop = false;
                while (i<vector3D.getYMagnitude() && !hitTop) {
                    let j = 1;
                    entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0,0.1,0)));
                    while (!hitTop && j<this.scene.getEntitiesLength()) {
                        
                        hitTop = this.checkCollision(entity, this.scene.getEntity(j)).getTop();
                        j++;
                    }
                    i++;
                    if (hitTop) {
                        entity.getSpeed().addVector3D(new Vector3D(0,-entity.getSpeed().getYMagnitude(),0));
                    }
                }
                entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0,-0.1,0)));
            } else if (vector3D.getYMagnitude()<0) {
                let i=0;
                let hitBottom = false;
                while (i>vector3D.getYMagnitude() && !hitBottom) {
                    let j = 2;
                    entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0,-0.1,0)));
                    while (!hitBottom && j<this.scene.getEntitiesLength()) {
                        hitBottom = this.checkCollision(entity, this.scene.getEntity(j)).getBottom();
                        j++;
                    }
                    i--;
                    if (hitBottom) {
                        entity.getSpeed().addVector3D(new Vector3D(0,-entity.getSpeed().getYMagnitude(),0));
                    }
                }
                entity.setPosition3D(entity.getPosition3D().addPosition3D(new Position3D(0,0.1,0)));
            }
            
        }
        
        
    }

    checkCollision(entity1, entity2) {
        let hitTop = false;
        let hitBottom = false;
        let hitLeft = false;
        let hitRight = false;

        if (entity1.getPosition3D().getXPos() < entity2.getPosition3D().getXPos() + entity2.getHitboxWidth() &&
            entity1.getPosition3D().getXPos() + entity1.getHitboxWidth() > entity2.getPosition3D().getXPos() &&
            entity1.getPosition3D().getYPos() < entity2.getPosition3D().getYPos() + entity2.getHitboxHeight() &&
            entity1.getPosition3D().getYPos() + entity1.getHitboxHeight() > entity2.getPosition3D().getYPos()) {

            if (entity1.getPosition3D().getYPos() + entity1.getHitboxHeight() < entity2.getPosition3D().getYPos()+5) {
                hitTop = true;
            }

            if (entity1.getPosition3D().getXPos() + entity1.getHitboxWidth() < entity2.getPosition3D().getXPos()+5) {
                hitRight = true;
            }

            if (entity1.getPosition3D().getYPos() > entity2.getPosition3D().getYPos() + entity2.getHitboxHeight()-5) {
                hitBottom = true;
            }

            if (entity1.getPosition3D().getXPos() > entity2.getPosition3D().getXPos() + entity2.getHitboxWidth()-5) {
                hitLeft = true;
            }
        }

        return new Collision(hitTop, hitBottom, hitLeft, hitRight, entity2);
    }
    
}