$(document).ready(initializeApp);

var gameBoard = null;       //8x8 gameboard that's dynamically created
var boardSize = { rows: 8, cols: 8};


class Piece{
    //color -> which player, isKing -> is the piece a king piece or not
    //isAlive -> true if on board, false if not
    constructor(color, isKing, isAlive){
        this.color = color;
        this.isKing = isKing;
    }
    //function to jump onto a diagonal square
    move(){

    }

    //function to "eat" another piece, call this in the move function
    jumpOver(){
        
    }    
}



function initializeApp(){
    applyClickHandlers();
    createBoard();
}

function applyClickHandlers(){

}

//function to dynamically 
function createBoard(){
    console.log("here");
    for(var row = 0; row < boardSize.rows; row++){
        var rowDiv = $("<div>", {class: "row"});
        for(var col = 0; col < boardSize.cols; col++){
            var squareDiv = $("div>", {class: "square"});
            if((row+col)%2 === 0){
                squareDiv.addClass("light");
            }
            else{
                squareDiv.addClass("dark");
            }
            rowDiv.append(squareDiv);
        }
        gameBoard.append(rowDiv);
    }
}