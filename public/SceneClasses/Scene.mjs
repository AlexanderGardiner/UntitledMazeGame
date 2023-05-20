import Position2D from "../UtilClasses/Position2D.mjs";
import MathUtil from "../UtilClasses/MathUtil.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
export default class Scene {
    constructor(canvas, camera, player) {
        this.entities = [];
        this.camera = camera;
        this.player = player;
        this.entities.push(camera);
        this.entities.push(player);
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
    }

    getEntity(index) {
        return this.entities[index];
    }

    getEntitiesLength() {
        return this.entities.length;
    }

    addEntity(entity) {
        this.entities.push(entity);
        console.log(this.entities);
    }

    getPlayer() {
        return this.player;
    }

    updateScene() {
        for (let i=0; i<this.entities.length; i++) {
            if (this.entities[i].type == "Point") {
                let pointSize = 20;

                if (positionOnScreen!=undefined) {
                    this.ctx.fillStyle = "rgb("+this.entities[i].getColour().getR()+","+this.entities[i].getColour().getG()+","+this.entities[i].getColour().getB()+")";
                    this.drawRectOnCanvas(this.entities[i].getXPos(), this.entities[i].getYPos(), pointSize, pointSize)
                }
            } else if (this.entities[i].type == "Sprite") {
                this.drawSpriteOnCanvas(this.entities[i].getPosition3D().getXPos(), this.entities[i].getPosition3D().getYPos(), this.entities[i].getWidth(), this.entities[i].getHeight(), this.entities[i].getImage());
            } else if (this.entities[i].type == "Player") {
                this.drawSpriteOnCanvas(this.entities[i].getPosition3D().getXPos(), this.entities[i].getPosition3D().getYPos(), this.entities[i].getWidth(), this.entities[i].getHeight(), this.entities[i].getImage());
            }
        }
    }

    clearScene() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawRectOnCanvas(x, y, width, height) {
        this.ctx.fillRect(x-this.player.getPosition3D().getX(), this.canvasHeight-y-this.player.getPosition3D().getY(), width, height);
    }

    drawSpriteOnCanvas(x, y, width, height, image) {
        this.ctx.drawImage(image, x-this.player.getPosition3D().getXPos()+this.canvasWidth/2, this.canvasHeight/2-y+this.player.getPosition3D().getYPos(), width, height);
    }

    
  
    
}

