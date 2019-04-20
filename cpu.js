const MCTS_TIMER = 3000;
var date = new Date();

/*
Class for implementing AI algorithm for Othello CPU
Uses Monte Carlo Tree Search for its AI
*/
class CPU {
    constructor(layout, color) {
        this.layout = layout;
        this.ai = false;
        this.color = color;
    }
    makeMove() {
        var root = new Node(this.layout, null, null, this.color);
        date = new Date();
        var startTime = date.getTime();
        date = new Date();
        var currTime = date.getTime();
        while(currTime - startTime < MCTS_TIMER) {
            var leaf = this.traverse(root);
            var result = leaf.rollout();
            this.backPropogate(leaf, result);

            date = new Date();
            currTime = date.getTime();
        }
        //select best child of root
        let maxScore = root.children[0].wins / root.children[0].matches;
        let maxIndex = 0;
        for(let i = 1; i < root.children.length; i++) {
            let currScore = root.children[i].wins / root.children[i].matches;
            if (currScore > maxScore) {
                maxScore = currScore;
                maxIndex = i;
            }
        }
        return root.children[maxIndex].move;
    }
    traverse(node) {
        while(node != null) {
            if(node.moveList.length == 0) {
                return node;
            }
            if (!node.fullyExpanded()) {
                //expand
                return this.expand(node);
            }
            else {
                // select best child
                node = this.bestChild(node);
            }
        }
        return node;
    }
    expand(node) {
        // TODO: implement this
        // get all possible moves
        return node.addChild();
    }
    bestChild(node) {
        var maxIndex = 0;
        if (node.children.length >= 1) {
            var max = (node.children[0].wins/node.children[0].matches) + 2* Math.sqrt(Math.log(node.matches)/node.children[0].matches);
        }
        for(let i = 1; i < node.children.length; i++) {
            var curr = (node.children[i].wins/node.children[i].matches) + 2* Math.sqrt(Math.log(node.matches)/node.children[i].matches);
            if (curr > max) {
                maxIndex = i;
                max = curr;
            }
        }
        return node.children[maxIndex];
    }
    backPropogate(node, result) {
        var curr = node;
        while(curr != null) {
            curr.matches = curr.matches + 1;
            curr.result = curr.result + result;
            curr = curr.parent;
        }
    }

}

class Node {
    constructor(layout, move, parent, color) {
        this.layout = deepCopy(layout);
        this.children = [];
        this.parent = parent;
        this.color = color;
        if (move != null) this.layout[move.x][move.y] = color;
        this.move = move;
        this.board = new Board(this.layout);
        // get list (and number) of possible moves
        this.moveList = this.board.checkAvailableMoves(this.color);
        this.wins = 0;
        this.matches = 0;
    }
    /*
    Make random moves until someone wins, for MCTS
    */
    rollout() {
        this.board = new Board(this.layout);
        var result = this.board.checkWin();
        var color1 = this.color;
        var color2 = oppColor(this.color);
        var move1;
        var move2;
        while(result != -1) {
            move1 = this.board.randomMove(color1);
            if (move1 == -1) break;
            move2 = this.board.randomMove(color2);
            if (move2 == -1) break;
            result = this.board.checkWin();
        }
        return result
    }
    /*
    Expands node
    */
    addChild() {
        if(this.children.length < this.moveList.length) {
            var child = new Node(this.layout, this.moveList[this.children.length], this, oppColor(this.color));
            this.children.push(child);
            return child;
        }
        return null;
    }
    fullyExpanded() {
        if(this.children.length < this.moveList.length) {
            return false;
        }
        else {
            return true;
        }
    }
}

/*
Deep copies 2D array
*/
function deepCopy(array) {
    var copyArray = []
    for(let i = 0; i < array.length; i++) {
        copyArray.push([]);
        for(let j = 0; j < array.length; j++) {
            copyArray[i].push(array[i][j]);
        }
    }
    return copyArray;
}