$(document).ready(initializeApp);

function initializeApp () {
    addAvatarClick();
}

function addAvatarClick () {
    $(".avatar").click(sendData);
}

function sendData () {
    var clicked = $(this);
    var turn = sessionStorage;
    if (clicked.hasClass("player1")) {
        turn.playerTurn = 0;
        // window.open("game.html", "_self")
        loadingTimeout();
    } else {
        turn.playerTurn = 1;
        // window.open("game.html", "_self")
        loadingTimeout();
    }
}

function loadingTimeout() {
    var preload = $("div");
    var loading = 0;
    var id = setInterval(frame, 64);

    function frame() {
        if(loading == 40) {
         clearInterval(id);
         window.open("game.html", "_self");
        } else {
            loading = loading + 1;
            preload.addClass("fade");
        }
    }
}