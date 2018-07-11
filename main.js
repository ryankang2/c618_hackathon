$(document).ready(initializeApp);

var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};

function initializeApp() {
    // applyClickHandlers();
    // var testPiece = new Piece();
    createBoard();
    applyClickHandlers();
}

class Piece {
    //color -> which player, isKing -> is the piece a king piece or not
    //isAlive -> true if on board, false if not
    constructor(shape, isKing, isAlive) {
        if(shape === "triangle"){
            this.image = "img/triangle.png";
            this.shape = shape;
        }
        if(shape === "cicle"){
            this.image = "img/circle.png";
            this.shape = shape;
        }
        this.shape = shape;
        this.isKing = isKing;
    }
    //shows possibles choices
    possibleMoves(){
        // var xLocation = $(event.target.parentElement).attr('x');
        // var yLocation =  $(event.target.parentElement).attr('y');
        // console.log(xLocation, "+" , yLocation);
        console.log('here');
    }

    //function to jump onto a diagonal square
    move() { //physically moves the pieces 
        if (this.color = "black") {

        }
    }
    applyClickHandlers() {
        $(".square").click(this.possibleMoves);
    }

    //function to "eat" another piece, call this in the move function
    jumpOver(){

    }
}

function applyClickHandlers() {
    $('.square').click(this.possibleMoves);
}

//function to dynamically 
function createBoard() {
    gameBoard = $(".gameBoard");
    for (var row = 0; row < boardSize.rows; row++) {
        var rowDiv = $("<div>", {
            class: "row"
        });
        for (var col = 0; col < boardSize.cols; col++) {
            var squareDiv = $("<div>", {
                class: "square",
                x: row,
                y: col
            });
            //check if board square is blue
            if ((row + col) % 2 === 0) {
                squareDiv.addClass("light");
            } 
            //check if board square is black
            else {
                squareDiv.addClass("dark");
                if(row >= 5){
                    var playerOnePiece = new Piece("triangle");
                    console.log("playerOne: ", playerOnePiece);
                    // var pieceDiv = $("<div>", {
                    //     css: "background-image: url(" + playerOnePiece.image + ")"
                    // });
                    var pieceDiv = $("<img>").attr("src", playerOnePiece.image);
                    squareDiv.append(pieceDiv);
                }
                if(row <= 2){
                    var playerOnePiece = new Piece("triangle");
                    squareDiv.addClass("circlePiece");

                }
            }
            rowDiv.append(squareDiv);
        }
        gameBoard.append(rowDiv);
    }
}