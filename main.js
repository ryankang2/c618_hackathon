$(document).ready(initializeApp);

var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};

// 0 = player 1 turn, 1 = player 2 turn;
var playerTurn = 0;
var playerOneTokens = 12;
var playerTwoTokens = 12;

//0-> empty spaces 1-> playerOne     2-> playerTwo      3-> kingPlayerOne   4-> kingPlayerTwo
var boardArray = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
];

function initializeApp() {
    // applyClickHandlers();
    // var testPiece = new Piece();
    createBoard();
    applyClickHandlers();
}


function applyClickHandlers() {
    $('.square').click(possibleMoves);
}

function possibleMoves(){
    var x = $(".square").x;
    var y = $(".square").y;
}

//with the possible moves, take one route, update the boardArray, replace current position with 0 
//update the movement with 1 or 2
function move(position){
    var x = parseInt(position[0]);
    var y = parseInt(position[1]);
    var currentPosition = $(this).attr("coordinate");
    var thisX = parseInt(currentPosition[0]);
    var thisY = parseInt(currentPosition[1]);
    if (playerTurn === 0) {
        boardArray[x][y] = 1;
        $(".square").attr("coordinate", x + "" + y).addClass(".trianglePiece");
        boardArray[thisX][thisY] = 0;
        $(".trianglePiece").attr("coordinate", x + "" + y).removeClass(".trianglePiece");
        playerTurn = 1 - playerTurn;
    } else {
        boardArray[x][y] = 2;
        $(".square").attr("coordinate", x + "" + y).addClass(".ciclePiece");
        boardArray[thisX][thisY] = 0;
        $(".trianglePiece").attr("coordinate", x + "" + y).removeClass(".circlePiece");
        playerTurn = 1 - playerTurn;
    }
}

function applyClickToPossible() {
    
}

//remove the triangle/circle class
function display(){

}

function jump(){

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
                    squareDiv.addClass("trianglePiece");      
                }
                if(row <= 2){
                    squareDiv.addClass("circlePiece");
                }
            }
            rowDiv.append(squareDiv);
        }
        gameBoard.append(rowDiv);
    }
}








// class Piece {
//         //color -> which player, isKing -> is the piece a king piece or not
//         //isAlive -> true if on board, false if not
//         constructor(shape, isKing, isAlive) {
//             if(shape === "triangle"){
//                 this.image = "img/triangle.png";
//                 this.shape = shape;
//             }
//             if(shape === "circle"){
//                 this.image = "img/circle.png";
//                 this.shape = shape;
//             }
//             this.shape = shape;
//             this.isKing = isKing;
//         }
    
//         applyClickHandlers() {
//             $(".square").click(this.possibleMoves);
//         }
    
//         //shows possibles choices
//         possibleMoves(){
//             // var xLocation = $(event.target.parentElement).attr('x');
//             // var yLocation =  $(event.target.parentElement).attr('y');
//             // console.log(xLocation, "+" , yLocation);
//             console.log('here');
//         }
    
//         //function to jump onto a diagonal square
//         move() { //physically moves the pieces 
//             if (this.color = "black") {
    
//             }
//         }
    
//         //function to "eat" another piece, call this in the move function
//         jumpOver(){
    
//         }
//     }