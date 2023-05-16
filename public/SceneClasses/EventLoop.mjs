import Rotation3D from "../UtilClasses/Rotation3D.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";

import Vector3D from "../UtilClasses/Vector3d.mjs";

export default class EventLoop {
    constructor(scene, keyboardInput) {
        this.scene = scene;
        this.keyboardInput = keyboardInput;
    }

    update() {
        this.scene.clearScene();
        this.scene.updateScene();
    }
}