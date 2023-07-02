export default class LevelLoader {
    loadLevel(levelName,scene) {
        fetch("./Levels/"+levelName+".txt")
            .then((response) => response.text())
            .then((text) => {
                let level = this.toLine(text);
                for (let i=0; i<level.length;i++) {
                    let startPoint = 0;
                    for (let j=0; j<level[i].length/2;j++) {
                        if (level[i][j*2]!="X") {
                            console.log(level[i].substring(startPoint,j*2));
                            startPoint = j+1;
                        }
                    }
                    
                }
            });
    }

    toLine(text) {  
        return text.split('\n')
      }

}