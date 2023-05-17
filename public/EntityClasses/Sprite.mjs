import Entity from "./Entity.mjs";
import Rotation3D from "../UtilClasses/Rotation3D.mjs";
export default class Sprite extends Entity {
    constructor(position3D, imagePath, width, height) {
        super(position3D, new Rotation3D(0,0,0));
        this.image = new Image();
        this.image.src = window.location.href+"Images/"+imagePath;
        this.width = width;
        this.height = height;
        this.type = "Sprite";
    }

    getImage() {
        return this.image;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

}

