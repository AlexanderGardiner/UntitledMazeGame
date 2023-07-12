import Sprite from "../EntityClasses/Sprite.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";

export default class LevelLoader {
    async loadLevel(levelName,scene) {
        fetch("./Levels/"+levelName+".txt")
            .then((response) => response.text())
            .then((text) => {
                scene.reset();
                console.log(scene.getEntitiesLength())
                let level = text.split("\r\n");
                let blockSize = 50;
                for (let y=0; y<level.length;y++) {                    
                    for (let x=0; x<level[y].length;x+=2) {
                        
                        if (level[y][x]=="W") {

                            scene.addEntity(new Sprite(new Position3D((x/2)*blockSize,(level.length-y)*blockSize,-100), "Player.png",blockSize,blockSize,blockSize,blockSize));
                       
                            
                        } else if (level[y][x]=="P") {
                            let player =scene.getPlayer();
                            player.setPosition3D(new Position3D((x/2)*blockSize,(level.length-y)*blockSize+player.getHeight(),-100));
                        }
                    }
                    
                }
            });
    }

    toLine(text) {  
        return text.split('\n')
      }

}