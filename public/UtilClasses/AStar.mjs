import AStarNode from "./AStarNode.mjs";

export default class AStar {
    constructor() {
        
    }

    setLevel(level) {
        this.level = level;
        console.log(this.level);
        this.calculateNextNode(new AStarNode(1,1),new AStarNode(3,1))
    }

    async calculateNextNode(startingNode, targetNode) {
        
        let openNodes = [startingNode];
        let closedNodes = [];
        let currentNode = startingNode;

        while (currentNode != targetNode && openNodes.length!=0) {
            await new Promise(resolve => setTimeout(resolve, 500)).then(async () => {
            let currentNodeIndex = 0;
            for (let i=0; i<openNodes.length;i++) {
                if (openNodes[i].getF()<currentNode) {
                    currentNode = node;
                    currentNodeIndex = i;
                }
            }

            closedNodes.push(openNodes.splice(currentNodeIndex,1)[0]);
            
            for (let y=-1; y<2; y++) {
                for (let x=-1; x<2; x++) {
                    if (!(x==0 && y==0)) {
                        await new Promise(resolve => setTimeout(resolve, 500)).then(() => {
                        if (this.level[currentNode.getY()+y][currentNode.getX()+x]!=1) {
                            let newNode = new AStarNode(currentNode.getX()+x, currentNode.getY()+y);
                            if (!this.nodeInList(newNode, openNodes) || ((newNode in openNodes) && currentNode.getG()+1<newNode.getG())) {
                                newNode.setParent(currentNode);
                                newNode.setG(newNode.getParent().getG()+1);
                                newNode.setH(Math.sqrt(
                                    Math.pow(newNode.getX()-targetNode.getX(),2)+
                                    Math.pow(newNode.getY()-targetNode.getY(),2)));
                                newNode.setF((newNode.getG()+newNode.getH()));
                                if (!this.nodeInList(newNode, openNodes)) {
                                    openNodes.push(newNode);
                                }
                            }
                            console.log(newNode)
                            
                        }
                    });
                    }
                }
            }
        });

        
        }
        console.log(currentNode)
    }

    nodeInList(node, list) {
        for (let i=0; i<list.length; i++) {
            if (list[i].getX() == node.getX() && list[i].getY() == node.getY()) {
                return true;
            }
        }
        return false;
    }


}