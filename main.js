$(document).ready(initializeApp);

var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};
var possibleMovesArray = [];
var currentPosition =  null;

// 0 = player 1 turn, 1 = player 2 turn;
var playerTurn = 0;
var playerOneTokens = 12;
var playerTwoTokens = 12;

//0-> empty spaces 1-> playerOne     2-> playerTwo      3-> kingPlayerOne   4-> kingPlayerTwo
var boardArray = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];

function initializeApp() {
    // applyClickHandlers();
    // var testPiece = new Piece();
    createBoard();
    applyClickHandlers();
}


function applyClickHandlers() {
    $(".square.dark").click(possibleMoves);
}

//populates the possibleMovesArray
function possibleMoves(){
    possibleMovesArray = [];    //reset global array
    currentPosition = $(this).attr("coordinate");
    console.log("coordinate that I clicked: ", currentPosition);
    var x = parseInt(currentPosition[0]);
    var y = parseInt(currentPosition[1]);
    //playerOne's movements, go up the board
    if(boardArray[x][y] === 1){

    }
    //playerTwo's movements, go down the board
    if(boardArray[x][y] === 2){
        //check if both spots are empty
        if(boardArray[x+1][y-1] === 0 && boardArray[x+1][y+1] === 0){
            var firstCoordinate = "" + (x+1) + (y+1);
            var secondCoordinate = "" + (x+1) + (y-1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
            console.log("possibleArray: ", possibleMovesArray);
        }
        //if piece cant make a left movement but can make right
        if(typeof boardArray[x+1][y-1] == "undefined" && boardArray[x+1][y+1] === 0){
            var firstCoordinate = "" + (x+1) + (y+1);
            possibleMovesArray.push(firstCoordinate);
            console.log("possibleArray: ", possibleMovesArray);
        }
        //if piece cant make a right movement can make right
        if(typeof boardArray[x+1][y+1] == "undefined" && boardArray[x+1][y-1] === 0){
            var firstCoordinate = "" + (x+1) + (y-1);
            possibleMovesArray.push(firstCoordinate);
            console.log("possibleArray: ", possibleMovesArray);
        }
    }
    // applyClickToPossible();
}

//with the possible moves, take one route, update the boardArray, replace current position with 0 
//update the movement with 1 or 2
function move(){
    //position -> new position that we clicked on...the spot we want to move to
    var position = $(this).attr("coordinate");
    var thisX = parseInt(position[0]);
    var thisY = parseInt(position[1]);
    var lastPosition = parseInt(currentPosition[0]);
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    if (playerTurn === 0) {
        boardArray[lastX][lastY] = 0;
        boardArray[thisX][thisY] = 1;
        $(".trianglePiece").attr("coordinate", lastX + "" + lastY).removeClass(".trianglePiece");
        $(".square").attr("coordinate", thisX + "" + thisY).addClass(".trianglePiece");
        playerTurn = 1 - playerTurn;
    } else {
        boardArray[lastX][lastY] = 0;
        boardArray[thisX][thisY] = 2;
        $(".trianglePiece").attr("coordinate", lastX + "" + lastY).removeClass(".circlePiece");
        $(".square").attr("coordinate", thisX + "" + thisY).addClass(".circlePiece");
        playerTurn = 1 - playerTurn;
    }
}

//go thru possibleMovesArray, apply clickhandlers to those coordinates in array, highlight them on DOM 

function applyClickToPossible() {
    // splitting x and y
    var firstCoordinate = possibleMovesArray[0];
    var secondCoordinate = possibleMovesArray[1];
    var firstX = parseInt(firstCoordinate[0]);
    var firstY = parseInt(firstCoordinate[1]);
    var secondX = parseInt(secondCoordinate[0]);
    var secondY = parseInt(secondCoordinate[1]);
    // adding click
    $(".square").attr("coordinate", firstX + "" + firstY).click(move);;
    $(".square").attr("coordinate", secondX + "" + secondY).click(move);
}

//remove the triangle/circle class
function display(){

}

//jump over enemy piece
function jump(){

}



//function to dynamically create board
function createBoard() {
    gameBoard = $(".gameBoard");
    for (var row = 0; row < boardSize.rows; row++) {
        var rowDiv = $("<div>", {
            class: "row"
        });
        for (var col = 0; col < boardSize.cols; col++) {
            var squareDiv = $("<div>", {
                class: "square",
                coordinate: row + "" + col,
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