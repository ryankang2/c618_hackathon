$(document).ready(initializeApp);

var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};
var possibleMovesArray = [];
var currentPosition = null;
var jumpPosition = null;        //position of token thats being kileld
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
function possibleMoves(x, y) {
    possibleMovesArray = []; //reset global array
    currentPosition = $(this).attr("coordinate");

    console.log("coordinate that I clicked: ", currentPosition);
    var x = parseInt(currentPosition[0]);
    var y = parseInt(currentPosition[1]);
    //playerOneMovement, goes up board
    if (boardArray[x][y] === 1) {
        //if both spaces are empty
        if (boardArray[x - 1][y - 1] === 0 && boardArray[x - 1][y + 1] === 0) {
            var firstCoordinate = "" + (x - 1) + (y - 1);
            var secondCoordinate = "" + (x - 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if (boardArray[x - 1][y - 1] === 0 && (boardArray[x - 1][y + 1] !== 0 && typeof boardArray[x - 1][y + 1] != undefined)) {
            //can jump over right enemy checker
            if (boardArray[x - 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x - 1) + (y + 1);

            }
            var firstCoordinate = "" + (x - 1) + (y - 1);
            possibleMovesArray.push(firstCoordinate);
        }
        //right space is empty, left space is not empty/defined
        if (boardArray[x - 1][y + 1] === 0 && (boardArray[x - 1][y - 1] !== 0) && typeof boardArray[x - 1][y - 1] != undefined) {
            //can jump over left enemy checker
            if (boardArray[x - 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x - 1) + (y - 1);

            }
            var firstCoordinate = "" + (x - 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate);
        }
        console.log("possible Array: ", possibleMovesArray);
        //if both left/right are enemy checkers
        if (boardArray[x - 1][y + 1] === 2 && boardArray[x - 1][y - 1] === 2) {
            //check if can jump over right enemy checker
            if (boardArray[x - 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
            }
            //check if can jump over left enemey checker
            if (boardArray[x - 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
            }
        }
        //if both left/right are checkers 
        if (boardArray[x - 1][y + 1] != 0 && boardArray[x - 1][y - 1] != 0) {
            //if right checker is a enemy and have ability to jump over
            if (boardArray[x - 1][y + 1] === 2 && boardArray[x - 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
            }
            //if left checker is an enemy and have ability to jump over
            if (boardArray[x - 1][y - 1] === 2 && boardArray[x - 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x - 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
            }
        }
    }

    //playerTwoMovement, goes down board
    if (boardArray[x][y] === 2) {
        //if both spaces are empty
        if (boardArray[x + 1][y + 1] === 0 && boardArray[x + 1][y - 1] === 0) {
            var firstCoordinate = "" + (x + 1) + (y + 1);
            var secondCoordinate = "" + (x + 1) + (y - 1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if (boardArray[x + 1][y - 1] === 0 && (boardArray[x + 1][y + 1] !== 0 && typeof boardArray[x + 1][y + 1] != undefined)) {
            //can jump over right enemy checker
            if (boardArray[x + 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y + 1);
            }
            var firstCoordinate = "" + (x + 1) + (y - 1);
            possibleMovesArray.push(firstCoordinate);
        }
        //right space is empty, left space is not empty/defined
        if (boardArray[x + 1][y + 1] === 0 && (boardArray[x + 1][y - 1] !== 0 && typeof boardArray[x + 1][y - 1] != undefined)) {
            //can jump over left enemy checker
            if (boardArray[x + 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y - 1);

            }
            var firstCoordinate = "" + (x + 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate);
            console.log("possible Array: ", possibleMovesArray);
        }
        //if both left/right are enemy checkers
        if (boardArray[x + 1][y + 1] === 1 && boardArray[x + 1][y - 1] === 1) {
            //check if can jump over right checker
            if (boardArray[x + 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
            }
            //check if can jump over left checker
            if (boardArray[x + 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
            }
        }
        //if both left/right are checkers
        if (boardArray[x + 1][y + 1] !== 0 && boardArray[x + 1][y - 1] !== 0 && possibleMovesArray.length < 2) {
            //if right checker is an enemy and have ability to jump over
            if (boardArray[x + 1][y + 1] === 1 && boardArray[x + 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
            }
            //if left checker is an enemy and have ability to jump over
            if (boardArray[x + 1][y - 1] === 1 && boardArray[x + 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
            }
            if (possibleMovesArray[0] == possibleMovesArray[1]) {
                possibleMovesArray.pop();
            }
        }
    }
    applyClickToPossible();
    console.log("possible Array: ", possibleMovesArray);
}

//subfunction to monitor player one movement
function playerOneMovement(x, y) {
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
function playerTwoMovement(x, y) {
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
    // debugger;
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
    } else if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
        ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(jump);
        $("[coordinate=" + secondCoordinate + "]").click(jump);
    } else if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
        ((Math.abs(lastX - secondX) !== 2 && Math.abs(lastY - secondY) !== 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(jump);
        $("[coordinate=" + secondCoordinate + "]").click(move);
    } else if ((Math.abs(lastX - firstX) !== 2 && Math.abs(lastY - firstY) !== 2) &&
        ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(move);
        $("[coordinate=" + secondCoordinate + "]").click(jump);
    } else {
        $("[coordinate=" + firstCoordinate + "]").click(move);
        $("[coordinate=" + secondCoordinate + "]").click(move);
    }
}

//remove the triangle/circle class
function display() {

}

//jump over enemy piece
function jump() {
    debugger;
    var position = $(this).attr("coordinate");
    var thisX = parseInt(position[0]);
    var thisY = parseInt(position[1]);
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    var jump = jumpPosition;
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
        playerTurn = 1 - playerTurn;
    }
    $("div").off();
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
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

//checks if a user won, call right after user jumps over another checker
function checkWin(){
    var msg = null;
    if(playerOneTokens === 0){
        msg = "Player Two Won!"
        return true;
    }
    if(playerTwoTokens === 0){
        msg = "Player One Won!";
        return true;
    }
    return false;
}