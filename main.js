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
var playerTurn = parseInt(sessionStorage.playerTurn);
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
    turnHighlight();
}


function applyClickHandlers() {
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
    }
    $(".reset").click(reset);
}

//populates the possibleMovesArray
function possibleMoves(x, y) {
    possibleMovesArray = []; //reset global array
    currentPosition = $(this).attr("coordinate");

    console.log("coordinate that I clicked: ", currentPosition);
    var x = parseInt(currentPosition[0]);
    var y = parseInt(currentPosition[1]);
    //playerOneMovement, goes up board
    if (boardArray[x][y] === 1 || boardArray[x][y] == 3) {
        //if both left and right are on same team, just return out
        if(boardArray[x-1][y-1] === 1 && boardArray[x-1][y+1] === 1){
            return;
        }
        //if both spaces are empty
        if (boardArray[x - 1][y - 1] === 0 && boardArray[x - 1][y + 1] === 0) {
            var firstCoordinate = "" + (x - 1) + (y - 1);
            var secondCoordinate = "" + (x - 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if (boardArray[x - 1][y - 1] === 0 && (boardArray[x - 1][y + 1] !== 0 && typeof boardArray[x - 1][y + 1] != undefined)) {
            //can jump over right enemy checker
            if (x - 2 > 0 && boardArray[x - 2][y + 2] === 0 && boardArray[x-1][y+1] === 2) {
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
            if (x - 2 > 0 && boardArray[x - 2][y - 2] === 0 && boardArray[x-1][y-1] === 2) {
                var jumpCoordinate = "" + (x - 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x - 1) + (y - 1);

            }
            var firstCoordinate = "" + (x - 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate);
        }
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
        if (boardArray[x - 1][y + 1] != 0 && boardArray[x - 1][y - 1] != 0 && possibleMovesArray.length < 2) {
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
            if (possibleMovesArray[0] == possibleMovesArray[1]) {
                possibleMovesArray.pop();
            }
        }
    }

    //playerTwoMovement, goes down board
    if (boardArray[x][y] === 2 || boardArray[x][y] === 4) {
        //check if left/right are same team
        if(boardArray[x+1][y+1] === 2 && boardArray[x+1][y-1] === 2){
            console.log("Here player2");
            return;
        }
        //if both spaces are empty
        if (boardArray[x + 1][y + 1] === 0 && boardArray[x + 1][y - 1] === 0) {
            var firstCoordinate = "" + (x + 1) + (y + 1);
            var secondCoordinate = "" + (x + 1) + (y - 1);
            possibleMovesArray.push(firstCoordinate, secondCoordinate);
        }
        //left space is empty, right space is not empty/defined
        if (boardArray[x + 1][y - 1] === 0 && (boardArray[x + 1][y + 1] !== 0 && typeof boardArray[x + 1][y + 1] != "undefined")) {
            //can jump over right enemy checker
            if (x + 2 < 8 && boardArray[x + 2][y + 2] === 0 && boardArray[x+1][y+1] === 1) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y + 1);
            }
            var firstCoordinate = "" + (x + 1) + (y - 1);
            possibleMovesArray.push(firstCoordinate);
        }
        //right space is empty, left space is not empty/defined
        if (boardArray[x + 1][y + 1] === 0 && (boardArray[x + 1][y - 1] !== 0 && typeof boardArray[x + 1][y - 1] != "undefined")) {
            //can jump over left enemy checker
            if (x + 2 < 8  && boardArray[x + 2][y - 2] === 0 && boardArray[x+1][y-1] === 1) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y - 1);

            }
            var firstCoordinate = "" + (x + 1) + (y + 1);
            possibleMovesArray.push(firstCoordinate);
        }
        //if both left/right are enemy checkers
        if (boardArray[x + 1][y + 1] === 1 && boardArray[x + 1][y - 1] === 1) {
            //check if can jump over right checker
            if (x + 2 < 8 && boardArray[x + 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y + 1);
            }
            //check if can jump over left checker
            if (x + 2 < 8 && boardArray[x + 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                jumpPosition = "" + (x + 1) + (y - 1);
            }
        }
        //if both left/right are checkers
        if (boardArray[x + 1][y + 1] !== 0 && boardArray[x + 1][y - 1] !== 0 && possibleMovesArray.length < 2) {
            //if right checker is an enemy and have ability to jump over
            if (boardArray[x + 1][y + 1] === 1 && boardArray[x + 2][y + 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y + 2);
                possibleMovesArray.push(jumpCoordinate);
                // jumpPosition = "" + (x + 1) + (y + 1);
            }
            //if left checker is an enemy and have ability to jump over
            if (boardArray[x + 1][y - 1] === 1 && boardArray[x + 2][y - 2] === 0) {
                var jumpCoordinate = "" + (x + 2) + (y - 2);
                possibleMovesArray.push(jumpCoordinate);
                // jumpPosition = "" + (x + 1) + (y - 1);
            }
            if (possibleMovesArray[0] == possibleMovesArray[1]) {
                possibleMovesArray.pop();
            }
            if (possibleMovesArray[0] == possibleMovesArray[1]) {
                possibleMovesArray.pop();
            }
        }
    }
    applyClickToPossible();
    console.log("possible Array: ", possibleMovesArray);
}

//with the possible moves, take one route, update the boardArray, replace current position with 0 
//update the movement with 1 or 2
function move() {
    //position -> new position that we clicked on...the spot we want to move to
    var position = $(this).attr("coordinate");
    // var thisX = parseInt(position[0]);
    // var thisY = parseInt(position[1]);
    // var lastPosition = currentPosition;
    // var lastX = parseInt(lastPosition[0]);
    // var lastY = parseInt(lastPosition[1]);
    //if player 2 turn, move the circle pieces
    checkPawnOrKing(position);
    playerTurn = 1 - playerTurn;
    //turn off all divs, but apply click handler to next player's pieces
    $("div").off();
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
    }
    turnHighlight();
    $(".gameBoard div").removeClass("highlight");
}

//go thru possibleMovesArray, apply clickhandlers to those coordinates in array, highlight them on DOM 
function applyClickToPossible() {
    // turn off click and enable again to prevent changing coin choice
    $(".gameBoard div").off().removeClass("highlight");
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
    }
    // splitting x and y
     var firstCoordinate = null;
    var secondCoordinate = null;
    for(var i = 0; i < possibleMovesArray.length; i++){
        if(i === 0){
            firstCoordinate = possibleMovesArray[i];
        }
        if(i === 1){
            secondCoordinate = possibleMovesArray[i];
        }
    }
    var firstX = firstCoordinate[0];    //x coordinate of first array index
    var firstY = firstCoordinate[1];    //y coordinate of first array index
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);  //current x position 
    var lastY = parseInt(lastPosition[1]);  //current y position 
    

    if (secondCoordinate === null) {
        // if only one possible movement and if jump is possible
        if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) || (Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2)) {
            $("[coordinate=" + firstCoordinate + "]").click(jump).addClass("highlight");

        } 
        // if only one possible movement and jump isn't possible;
        else {
            $("[coordinate=" + firstCoordinate + "]").click(move).addClass("highlight");
        }
        return;
    } 
    else{
        var secondX = secondCoordinate[0];
        var secondY = secondCoordinate[1];
    }
    //if highlighted squares already have class highlight, return
    if($("[coordinate=" + firstCoordinate + "]").hasClass("highlight") && $("[coordinate=" + secondCoordinate + "]").hasClass("highlight")){
        return;
    }
    // if two movement possible 
    if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
        ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(jump).addClass("highlight");
        $("[coordinate=" + secondCoordinate + "]").click(jump).addClass("highlight");

    } else if ((Math.abs(lastX - firstX) === 2 && Math.abs(lastY - firstY) === 2) &&
        ((Math.abs(lastX - secondX) !== 2 && Math.abs(lastY - secondY) !== 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(jump).addClass("highlight");
        $("[coordinate=" + secondCoordinate + "]").click(move).addClass("highlight");
    } else if ((Math.abs(lastX - firstX) !== 2 && Math.abs(lastY - firstY) !== 2) &&
        ((Math.abs(lastX - secondX) === 2 && Math.abs(lastY - secondY) === 2))) {
        $("[coordinate=" + firstCoordinate + "]").click(move).addClass("highlight");
        $("[coordinate=" + secondCoordinate + "]").click(jump).addClass("highlight");
    } else {
        $("[coordinate=" + firstCoordinate + "]").click(move).addClass("highlight");
        $("[coordinate=" + secondCoordinate + "]").click(move).addClass("highlight");
    }
}


//jump over enemy piece
function jump() {
    var position = $(this).attr("coordinate");
    var thisX = parseInt(position[0]);  //position of square we are jumping on
    var thisY = parseInt(position[1]);
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);  //position before jump
    var lastY = parseInt(lastPosition[1]);

    //making jumpPosition based on choice
    if (playerTurn === 0) {
        if (thisY > lastY) {
            jumpPosition = Math.abs(thisX + 1) + "" + Math.abs(thisY - 1);
        }
        else{
            jumpPosition = Math.abs(thisX + 1) + "" + Math.abs(thisY  + 1);
        }
    }
    if (playerTurn === 1) {
        if (thisY > lastY) {
            jumpPosition = Math.abs(thisX - 1) + "" + Math.abs(thisY - 1);
        }
        else{
            jumpPosition = Math.abs(thisX - 1) + "" + Math.abs(thisY + 1);
        }
    }

    checkPawnOrKing(position, jumpPosition);
    $("div").off();
    playerTurn = 1 - playerTurn;
    
    if (playerTurn === 0) {
        $(".trianglePiece").click(possibleMoves);
    } else {
        $(".circlePiece").click(possibleMoves);
    }
    turnHighlight();
    $(".gameBoard div").removeClass("highlight");
    // change flag for checkPawnOrKing function
    jumpPosition = null;
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

// turns on the highlights for selected 
function turnHighlight () {
    if (playerTurn === 0) {
        $(".left .avatar").addClass("highlight");
        $(".right .avatar").removeClass("highlight");
    } else {
        $(".right .avatar").addClass("highlight");
        $(".left .avatar").removeClass("highlight");
    }
}

//resets game
function reset(){
    console.log("button pressed");
    $(".gameBoard").empty();
    playerOneTokens = 12;
    playerTwoTokens = 12;
    possibleMovesArray = [];
    currentPosition = null;
    jumpPosition = null;   
    gameBoard = null;
    playerTurn = parseInt(sessionStorage.playerTurn);
    boardArray = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];    
    initializeApp();
}

function checkPawnOrKing(position, jumpPosition) {
    var thisX = parseInt(position[0]);
    var thisY = parseInt(position[1]);
    var lastPosition = currentPosition;
    var lastX = parseInt(lastPosition[0]);
    var lastY = parseInt(lastPosition[1]);
    // for jump();
    if (jumpPosition != null) {
        var jumpX = parseInt(jumpPosition[0]);
        var jumpY = parseInt(jumpPosition[1]);
        if (playerTurn === 1) {
            if (thisX === 7) {
                boardArray[lastX][lastY] = 0;
                boardArray[jumpX][jumpY] = 0;
                boardArray[thisX][thisY] = 4;
                $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
                $("[coordinate=" + jumpPosition + "]").removeClass("trianglePiece");
                $("[coordinate=" + position + "]").addClass("king circlePiece");
            } else {
                boardArray[lastX][lastY] = 0;
                boardArray[jumpX][jumpY] = 0;
                boardArray[thisX][thisY] = 2;
                $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
                $("[coordinate=" + jumpPosition + "]").removeClass("trianglePiece");
                $("[coordinate=" + position + "]").addClass("circlePiece");
            }
        }
        //player one turn, move triangle pieces
        else {
            if (thisX === 0) {
                boardArray[lastX][lastY] = 0;
                boardArray[jumpX][jumpY] = 0;
                boardArray[thisX][thisY] = 3;
                $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
                $("[coordinate=" + jumpPosition + "]").removeClass("circlePiece");
                $("[coordinate=" + position + "]").addClass("king trianglePiece");
            } else {
                boardArray[lastX][lastY] = 0;
                boardArray[jumpX][jumpY] = 0;
                boardArray[thisX][thisY] = 1;
                $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
                $("[coordinate=" + jumpPosition + "]").removeClass("circlePiece");
                $("[coordinate=" + position + "]").addClass("trianglePiece");
            }
        }
    } else {
        if (playerTurn === 1) {
            if(thisX === 7){
                console.log("KING CIRCLE");
                boardArray[lastX][lastY] = 0;
                boardArray[thisX][thisY] = 4;
                $("[coordinate=" + position + "]").addClass("king circlePiece");
                $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
            } else {
                boardArray[lastX][lastY] = 0;
                boardArray[thisX][thisY] = 2;
                $("[coordinate=" + lastPosition + "]").removeClass("circlePiece");
                $("[coordinate=" + position + "]").addClass("circlePiece");
            }
        }
        // check and change if player 2 coin movement turns to king or not
        else {
            if(thisX === 0){
                console.log("KING TRIANGLE");
                boardArray[lastX][lastY] = 0;
                boardArray[thisX][thisY] = 3;
                $("[coordinate=" + position + "]").addClass("king trianglePiece");
                $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
            } else {
                boardArray[lastX][lastY] = 0;
                boardArray[thisX][thisY] = 1;
                $("[coordinate=" + lastPosition + "]").removeClass("trianglePiece");
                $("[coordinate=" + position + "]").addClass("trianglePiece");
            }
        }
}
}