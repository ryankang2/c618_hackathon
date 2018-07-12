$(document).ready(initializeApp);

var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};
var possibleMovesArray = [];
var currentPosition = null;
var jumpPosition = null;
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
    $(".trianglePiece").click(possibleMoves);
    // $(".circlePiece").click(possibleMoves);
}

//populates the possibleMovesArray
function possibleMoves(x,y) {
    possibleMovesArray = []; //reset global array
    currentPosition = $(this).attr("coordinate");
    
    console.log("coordinate that I clicked: ", currentPosition);
    var x = parseInt(currentPosition[0]);
    var y = parseInt(currentPosition[1]);
    //playerOneMovement, goes up board
    if(boardArray[x][y] === 1){
        //if both spaces are empty
        if(boardArray[x-1][y-1] === 0 && boardArray[x-1][y+1] === 0){
            var firstCoordinate = "" + (x - 1) + (y - 1);
            var secondCoordinate = "" + (x - 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if(boardArray[x-1][y-1] === 0 && (boardArray[x-1][y+1] !== 0 && typeof boardArray[x-1][y+1] != undefined)){
            //can jump over right enemy checker
            if(boardArray[x-2][y+2] === 0){
                var jumpCoordinate = "" + (x-2) + (y+2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x-1) + (y+1);
              
            }
            var firstCoordinate = "" + (x-1) + (y-1);
            possibleMovesArray.push(firstCoordinate);
        }
        //right space is empty, left space is not empty/defined
        if(boardArray[x-1][y+1] === 0 && (boardArray[x-1][y-1] !== 0) && typeof boardArray[x-1][y-1] != undefined){
            //can jump over left enemy checker
            if(boardArray[x-2][y-2] === 0){
                var jumpCoordinate = "" + (x-2) + (y-2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x-1) + (y-1);
                
            }
            var firstCoordinate = "" + (x-1) + (y+1);
            possibleMovesArray.push(firstCoordinate);
        }
        //if left and right not empty, check if we can jump over
        // if(boardArray[x-1][y-1] !== 0 && boardArray[x-1][y+1] !== 0 &&
        //     $("[coordinate=" + (x-1)+(y-1) + "]").find(".triangle") == false &&
        //     $("[coordinate=" + (x-1)+(y+1) + "]").find(".triangle") == false){

        // }
        console.log("possible Array: ", possibleMovesArray);
    }
    //playerTwoMovement, goes down board
    if(boardArray[x][y] === 2){
        //if both spaces are empty
        if(boardArray[x+1][y+1] === 0 && boardArray[x+1][y-1] === 0){
            var firstCoordinate = "" + (x+1) + (y+1);
            var secondCoordinate = "" + (x+1) + (y-1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if(boardArray[x+1][y-1] === 0 && (boardArray[x+1][y+1] !== 0 && typeof boardArray[x+1][y+1] != undefined)){
            //can jump over right enemy checker
            if(boardArray[x+2][y+2] === 0){
                var jumpCoordinate = "" + (x+2) + (y+2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x+1) + (y+1);
              
            }
            var firstCoordinate = "" + (x+1) + (y-1);
            possibleMovesArray.push(firstCoordinate);
        }
        //right space is empty, left space is not empty/defined
        if(boardArray[x+1][y+1] === 0 && (boardArray[x+1][y-1] !== 0 && typeof boardArray[x+1][y-1] != undefined)){}
            //can jump over left enemy checker
            if(boardArray[x+2][y-2] === 0){
                var jumpCoordinate = "" + (x+2) + (y-2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x+1) + (y-1);
            
            }
            var firstCoordinate = "" + (x+1) + (y+1);
            possibleMovesArray.push(firstCoordinate);
            console.log("possible Array: ", possibleMovesArray);
        }

    //playerOne's movements, go up the board
    // if (boardArray[x][y] === 1) {
    //     playerOneMovement(x,y);
    // }
    // //playerTwo's movements, go down the board
    // if (boardArray[x][y] === 2) {
    //     playerTwoMovement(x,y);
    // }
    applyClickToPossible();
}

//subfunction to monitor player one movement
function playerOneMovement(x,y) {
    //check if both spots are empty
    if (boardArray[x - 1][y - 1] === 0 && boardArray[x - 1][y + 1] === 0) {
        var firstCoordinate = "" + (x - 1) + (y - 1);
        var secondCoordinate = "" + (x - 1) + (y + 1);
        possibleMovesArray.push(firstCoordinate, secondCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
    //if piece cant make a left movement but can make right
    if (boardArray[x - 1][y + 1] === 0 && boardArray[x - 1][y - 1] !== 0) {
        var firstCoordinate = "" + (x - 1) + (y + 1);
        possibleMovesArray.push(firstCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
    //if piece cant make a right movement can make left
    if (boardArray[x - 1][y - 1] === 0 && boardArray[x - 1][y + 1] !== 0) {
        var firstCoordinate = "" + (x - 1) + (y - 1);
        possibleMovesArray.push(firstCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
}

//subfunction to monitory player two movement
function playerTwoMovement(x,y) {
    //check if both spots are empty
    if (boardArray[x + 1][y + 1] === 0 && boardArray[x + 1][y - 1] === 0) {
        var firstCoordinate = "" + (x + 1) + (y + 1);
        var secondCoordinate = "" + (x + 1) + (y - 1);
        possibleMovesArray.push(firstCoordinate, secondCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
    //if piece cant make a left movement but can make right
    if (boardArray[x + 1][y - 1] !== 0 && boardArray[x + 1][y + 1] === 0) {
        var firstCoordinate = "" + (x + 1) + (y + 1);
        possibleMovesArray.push(firstCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
    //if piece cant make a right movement can make left
    if (boardArray[x + 1][y - 1] === 0 && boardArray[x + 1][y + 1] !== 0) {
        var firstCoordinate = "" + (x + 1) + (y - 1);
        possibleMovesArray.push(firstCoordinate);
        console.log("possibleMovesArray: ", possibleMovesArray);
    }
}

//with the possible moves, take one route, update the boardArray, replace current position with 0 
//update the movement with 1 or 2
function move() {
    //position -> new position that we clicked on...the spot we want to move to
    var position = $(this).attr("coordinate");
    var thisX = parseInt(position[0]);
    var thisY = parseInt(position[1]);
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    //if player 2 turn, move the circle pieces
    if (playerTurn === 1) {
        boardArray[lastX][lastY] = 0;
        boardArray[thisX][thisY] = 2;
        $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
        $("[coordinate=" + position + "]").addClass("circlePiece");
        playerTurn = 1 - playerTurn;
    }
    //player one turn, move triangle pieces
    else {
        boardArray[lastX][lastY] = 0;
        boardArray[thisX][thisY] = 1;
        $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
        $("[coordinate=" + position + "]").addClass("trianglePiece");
        playerTurn = 1 - playerTurn;
    }
    //turn off all divs, but apply click handler to next player's pieces
    $("div").off();
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
    }
    console.log(gameBoard);
}

//go thru possibleMovesArray, apply clickhandlers to those coordinates in array, highlight them on DOM 
function applyClickToPossible() {
    // splitting x and y
    var firstCoordinate = possibleMovesArray[0];
    var secondCoordinate = possibleMovesArray[1];
    var firstX = firstCoordinate[0];
    var firstY = firstCoordinate[1];
    if (secondCoordinate !== undefined) {
        var secondX = secondCoordinate[0];
        var secondY = secondCoordinate[1];
    }
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    if (secondCoordinate === undefined) {
        // if only one possible movement and if jump is possible
        if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) || (Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2)) {
            $("[coordinate=" + firstCoordinate + "]").click(jump);
        } else {
        // if only one possible movement and jump isn't possible;
        $("[coordinate=" + firstCoordinate + "]").click(move);
        }
    // if two movement possible 
    } else if   ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
                ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))){
        $("[coordinate=" + firstCoordinate + "]").click(jump);
        $("[coordinate=" + secondCoordinate + "]").click(jump);
    } else if   ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
                ((Math.abs(lastX - secondX) !== 2 && Math.abs(lastY - secondY) !== 2))){
        $("[coordinate=" + firstCoordinate + "]").click(jump);
        $("[coordinate=" + secondCoordinate + "]").click(move);
    } else if   ((Math.abs(lastX - firstX) !== 2 && Math.abs(lastY - firstY) !== 2) &&
                ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))){
        $("[coordinate=" + firstCoordinate + "]").click(move);
        $("[coordinate=" + secondCoordinate + "]").click(jump);
    }
    else {
        $("[coordinate=" + firstCoordinate + "]").click(move);
        $("[coordinate=" + secondCoordinate + "]").click(move);
    }
}

//remove the triangle/circle class
function display() {

}

//jump over enemy piece
function jump() {
    var position = $(this).attr("coordinate");
    var thisX = parseInt(position[0]);
    var thisY = parseInt(position[1]);
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    var jump  = jumpPosition;
    var jumpX = parseInt(jumpPosition[0]);
    var jumpY = parseInt(jumpPosition[1]);
    //if player 2 turn, move the circle pieces, and kill the item in the middle
    if (playerTurn === 1) {
        boardArray[lastX][lastY] = 0;
        boardArray[jumpX][jumpY] = 0;
        boardArray[thisX][thisY] = 2;

        $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
        $("[coordinate=" + jumpPosition + "]").removeClass("trianglePiece");
        $("[coordinate=" + position + "]").addClass("circlePiece");

        playerTurn = 1 - playerTurn;
    }
    //player one turn, move triangle pieces
    else {
        boardArray[lastX][lastY] = 0;
        boardArray[jumpX][jumpY] = 0;
        boardArray[thisX][thisY] = 1;
        $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
        $("[coordinate=" + jumpPosition + "]").removeClass("circlePiece");
        $("[coordinate=" + position + "]").addClass("trianglePiece");
        jump(jumpPosition);
        playerTurn = 1 - playerTurn;
    }
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
                if (row >= 5) {
                    squareDiv.addClass("trianglePiece");
                }
                if (row <= 2) {
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