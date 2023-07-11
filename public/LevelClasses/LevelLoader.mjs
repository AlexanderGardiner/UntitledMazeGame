import Sprite from "../EntityClasses/Sprite.mjs";
import Position3D from "../UtilClasses/Position3D.mjs";

export default class LevelLoader {
    loadLevel(levelName,scene) {
        fetch("./Levels/"+levelName+".txt")
            .then((response) => response.text())
            .then((text) => {
                let level = this.toLine(text);
                console.log(level)
                let x = 0;
                let y = 0;
                let blockSize = 20;
                for (let i=0; i<level.length;i++) {
                    let startPoint = 0;
                    
                    for (let j=0; j<level[i].length;j+=2) {
                        console.log("i: "+i+" j: "+j+" "+level[i][j])
                        console.log(j+" "+(level[i].length-2))
                        if (level[i][j]!="X" || j>=level[i].length-2) {
                            
                            if (j>=level[i].length-2) {
                                scene.addEntity(new Sprite(new Position3D(x*blockSize/2,y*blockSize,-100), "Player.png",(j+2-x)*blockSize/2,blockSize,(j+2-x)*blockSize/2,blockSize));
                            } else {
                                scene.addEntity(new Sprite(new Position3D(x*blockSize/2,y*blockSize,-100), "Player.png",(j-x)*blockSize/2,blockSize,(j-x)*blockSize/2,blockSize));
                                
                            }

                            if (j>=level[i].length-2) {
                                console.log(level[i].substring(startPoint,j+1));
                            } else {
                                console.log(level[i].substring(startPoint,j-1));
                            }
                            
                            if (j==level[i].length-2) {
                                console.log("x: "+x+" y: "+y+" end");
                                y=i+1;
                                x=0;
                                startPoint = 0;
                                console.log("x: "+x+" y: "+y);
                            } else {
                                console.log("x: "+x+" y: "+y);
                                x = j+2;
                                y = i;
                                startPoint = (j)+2;
                                console.log("x: "+x+" y: "+y);
                            }
                            
                        }
                    }
                    
                }
            });
    }

    toLine(text) {  
        return text.split('\n')
      }

}