import Scene from "./SceneClasses/Scene.mjs";
import Camera from "./EntityClasses/Camera.mjs";
import Position3D from "./UtilClasses/Position3D.mjs";
import Rotation3D from "./UtilClasses/Rotation3D.mjs";
import MovementParameters from "./UtilClasses/MovementParameters.mjs";
import Colour from "./UtilClasses/Colour.mjs";
import Player from "./EntityClasses/Player.mjs";
import EventLoop from "./SceneClasses/EventLoop.mjs";
import KeyboardInput from "./InputClasses/KeyboardInput.mjs";

import Sprite from "./EntityClasses/Sprite.mjs";
var scene = new Scene(document.getElementById("viewCanvas"), 
                      new Camera(new Position3D(0,0,0), new Rotation3D(0,0,0),90,1920/1080),
                      new Player(new Position3D(500,500,-100), "Player.png",50,50,50,50,new MovementParameters(7,0.7,0.4,12,1,2000)));
var keyboardInput = new KeyboardInput("ArrowLeft", "ArrowRight","ArrowUp","ArrowDown","c");

scene.addEntity(new Sprite(new Position3D(600,500,-100), "Player.png",50,50,50,50))

var eventLoop = new EventLoop(scene, keyboardInput);

function movePoint(xPos, yPos) {
    scene.entities[0].setPosition3D(new Position3D(xPos,yPos,0));

}

eventLoop.update();
