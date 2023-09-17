import Sprite from "../EntityClasses/Sprite.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";

export default class LevelLoader {
    async loadLevel(levelName,scene,aStar) {
        fetch("./Levels/"+levelName+".txt")
            .then((response) => response.text())
            .then((text) => {
                scene.reset();
                console.log(scene.getEntitiesLength())
                let level = text.split("\r\n");
                let blockSize = 50;
                let arrayLevel = [];
                for (let y=0; y<level.length;y++) {    
                    arrayLevel.push([]);                
                    for (let x=0; x<level[y].length;x+=2) {
                        
                        if (level[y][x]=="W") {
                            arrayLevel[y].push(1);
                            scene.addEntity(new Sprite(new Position3D((x/2)*blockSize,(level.length-y)*blockSize,-100), "Player.png",blockSize,blockSize,blockSize,blockSize));
                       
                            
                        } else if (level[y][x]=="P") {
                            arrayLevel[y].push(0);
                            let player =scene.getPlayer();
                            player.setPosition3D(new Position3D((x/2)*blockSize,(level.length-y)*blockSize+player.getHeight(),-100));
                        } else {
                            arrayLevel[y].push(0);
                        }
                    }
                    
                }
                aStar.setLevel(arrayLevel);
            });
    }

    toLine(text) {  
        return text.split('\n')
      }

}