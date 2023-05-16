import Position2D from "../UtilClasses/Position2D.mjs";
import MathUtil from "../UtilClasses/MathUtil.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";
export default class Scene {
    constructor(canvas, camera) {
        this.entities = [];
        this.camera = camera;
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    updateScene() {
        for (let i=0; i<this.entities.length; i++) {
            if (this.entities[i].type == "Point") {
                let positionOnScreen = this.projectPoint(this.entities[i], this.camera);
                let pointSize = 20;

                if (positionOnScreen!=undefined) {
                    this.ctx.fillStyle = "rgb("+this.entities[i].getColour().getR()+","+this.entities[i].getColour().getG()+","+this.entities[i].getColour().getB()+")";
                    this.drawRectOnCanvas(positionOnScreen.getXPos(), positionOnScreen.getYPos(), pointSize, pointSize)
                }
            }
        }
    }

    clearScene() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawRectOnCanvas(x, y, width, height) {
        this.ctx.fillRect(x,y,width,height);
    }

    projectPoint(point, camera) {
        let pointPosition3D = point.getPosition3D();
        let cameraPosition3D = camera.getPosition3D();
        let cameraRotation3D = camera.getRotation3D();

        let cameraRelativeX = pointPosition3D.getXPos() - cameraPosition3D.getXPos();
        let cameraRelativeY = pointPosition3D.getYPos() - cameraPosition3D.getYPos();
        let cameraRelativeZ = pointPosition3D.getZPos() - cameraPosition3D.getZPos();

        let sinCameraPitch = Math.sin(MathUtil.degreesToRadians(cameraRotation3D.getPitch()));
        let cosCameraPitch = Math.cos(MathUtil.degreesToRadians(cameraRotation3D.getPitch()));

        let sinCameraRoll = Math.sin(MathUtil.degreesToRadians(cameraRotation3D.getRoll()));
        let cosCameraRoll = Math.cos(MathUtil.degreesToRadians(cameraRotation3D.getRoll()));

        let sinCameraYaw = Math.sin(MathUtil.degreesToRadians(cameraRotation3D.getYaw()));
        let cosCameraYaw = Math.cos(MathUtil.degreesToRadians(cameraRotation3D.getYaw()));
        
        // Rotate around the yaw axis
        let rotatedX = cosCameraYaw * cameraRelativeX - sinCameraYaw * cameraRelativeY;
        let rotatedY = sinCameraYaw * cameraRelativeX + cosCameraYaw * cameraRelativeY;
        let rotatedZ = cameraRelativeZ;

        // Rotate around the roll axis
        let rotatedY2 = cosCameraRoll * rotatedY - sinCameraRoll * rotatedZ;
        let rotatedZ2 = sinCameraRoll * rotatedY + cosCameraRoll * rotatedZ;
        let rotatedX2 = rotatedX;

        // Rotate around the pitch axis
        let transformX = rotatedX2;
        let transformY = cosCameraPitch * rotatedY2 + sinCameraPitch * rotatedZ2;
        let transformZ = -sinCameraPitch * rotatedY2 + cosCameraPitch * rotatedZ2;


        let transformedPointX = transformX;
        let transformedPointY = transformZ;

        let perspectivePointX = (transformX/(Math.tan(camera.getVerticalFov()/2)));// + this.canvasWidth/2
        let perspectivePointY = (transformZ/(Math.tan(camera.getHorizontalFov()/2)));// + this.canvasHeight/2;
        
        let isInCameraXDimension = transformedPointX <= this.canvasWidth/2 && transformedPointX >= -this.canvasWidth/2;
        let isInCameraYXDimension = transformedPointY <= this.canvasHeight/2 && transformedPointY >= -this.canvasHeight/2;    
        
        if (/*isInCameraXDimension && isInCameraYXDimension &&*/ transformZ<0) {
        // if (true) {
            return new Position2D(transformX+this.canvasWidth/2, transformY+this.canvasHeight/2);
        } else {
            console.log("tranform z: "+transformZ);
            console.log("tranform z: "+transformZ<0)
        }

        return undefined;

    }
    
    getCameraPosition3D() {
        
        return this.camera.getPosition3D();
    }

    setCameraPosition3D(position3D) {
        this.camera.setPosition3D(position3D);
    }

    getCameraRotation3D() {
        return this.camera.getRotation3D();
    }

    setCameraRotation3D(rotation3D) {
        this.camera.setRotation3D(rotation3D);
    }
  
    
}

