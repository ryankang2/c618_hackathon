$(document).ready(initializeApp);

<<<<<<< HEAD
var gameBoard = null;       //8x8 gameboard that's dynamically created
var boardSize = { rows: 8, cols: 8};
var testPiece = new Piece('black', true); 

class Piece{
    //color -> which player, isKing -> is the piece a king piece or not
    //isAlive -> true if on board, false if not
    constructor(color, isKing){
        this.color = color;
        this.isKing = isKing;
    }
    //function to jump onto a diagonal square
    possibleMoves() { //shows possibles choices
    // var xLocation = $(event.target.parentElement).attr('x');
    // var yLocation =  $(event.target.parentElement).attr('y');
    // console.log(xLocation, "+" , yLocation);
    console.log('here');
    }
    move(){ //physically moves the pieces 
        if (this.color = "black") { 
            $('')
        }
    }
=======
var gameBoard = null; //8x8 gameboard that's dynamically created
var boardSize = {
    rows: 8,
    cols: 8
};

var playerOneTokens = 12;
var playerTwoTokens = 12;

>>>>>>> e6226aa93039172d49d620301e232369961f3410

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
function move(){
   
}

//remove the triangle/circle class
function display(){

}

<<<<<<< HEAD
function applyClickHandlers(){
  $('.square').click(testPiece.possibleMoves());
=======
function jump(){
>>>>>>> e6226aa93039172d49d620301e232369961f3410

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