import Entity from "./Entity.mjs";
import Rotation3D from "../UtilClasses/Rotation3D.mjs";
export default class Point extends Entity {
    constructor(position3D, colour) {
        super(position3D, new Rotation3D(0,0,0));
        this.colour = colour;
        this.type = "Point";
    }

    getColour() {
        return this.colour;
    }

    setColour(colour) {
        this.colour = colour;
    }


}

