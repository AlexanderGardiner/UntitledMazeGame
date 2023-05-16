import Scene from "./SceneClasses/Scene.mjs";
import Camera from "./EntityClasses/Camera.mjs";
import Position3D from "./UtilClasses/Position3D.mjs";
import Rotation3D from "./UtilClasses/Rotation3D.mjs";
import Colour from "./UtilClasses/Colour.mjs";
import Point from "./EntityClasses/Point.mjs";
import EventLoop from "./SceneClasses/EventLoop.mjs";
import KeyboardInput from "./InputClasses/KeyboardInput.mjs";
var scene = new Scene(document.getElementById("viewCanvas"), new Camera(new Position3D(0,0,0), new Rotation3D(0,0,0),90,1920/1080));
var keyboardInput = new KeyboardInput("ArrowLeft", "ArrowRight","ArrowUp","ArrowDown");
scene.addEntity(new Point(new Position3D(20,500,20), new Colour(255,0,0)));
scene.addEntity(new Point(new Position3D(120,500,20), new Colour(255,255,0)));
scene.addEntity(new Point(new Position3D(120,500,120), new Colour(255,255,0)));
scene.addEntity(new Point(new Position3D(20,500,120), new Colour(255,255,0)));

scene.addEntity(new Point(new Position3D(10,600,10), new Colour(255,0,0)));
scene.addEntity(new Point(new Position3D(100,600,10), new Colour(255,0,0)));
scene.addEntity(new Point(new Position3D(100,600,100), new Colour(255,0,0)));
scene.addEntity(new Point(new Position3D(10,600,100), new Colour(255,0,0)));



var eventLoop = new EventLoop(scene, keyboardInput);

function movePoint(xPos, yPos) {
    scene.entities[0].setPosition3D(new Position3D(xPos,yPos,0));

}
setInterval(() => eventLoop.update(), 100);
