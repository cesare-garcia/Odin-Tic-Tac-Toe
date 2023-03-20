var selectStart = (function(){
    let startButton = document.querySelector("#start");
    startButton.addEventListener("click", (e) => {
        e.preventDefault();
        game.start();
        document.querySelector("#new_game").disabled = false;
    });
    return { startButton };
})();

var selectReset = (function(){
    let newGameButton = document.querySelector("#new_game");
    newGameButton.addEventListener("click", (e) => {
        alert("Resetting Page");
    });
})();

var gameBoard = (function(){

    let board = ["","","","","","","","",""];

    let render = function() {

        if ( document.querySelector(".grid") == undefined ) {
            let main = document.querySelector("main");
            let grid = document.createElement("div");
            grid.classList.add("grid");
            main.appendChild(grid);
            
            board.forEach( (element, index) => {
                let gridBox = document.createElement("div");
                gridBox.classList.add("gridBox");
                gridBox.setAttribute("id", `${index}`);
                gridBox.innerText = `${element}`;
                grid.appendChild(gridBox);
            });
    
            let boxes = document.querySelectorAll(".gridBox");
            boxes.forEach( (element) => {
                element.addEventListener("click", (e) => {
                    console.log(e.target.id);
                });
            });
        };
    };

    let checkBoard = function() {
        console.log(board);
    };

    // the update function that is returned will be the one that allows board to be adjusted.
    return { checkBoard, render };

})();

function playerFactory(name, token) {
    return {name, token};
}

var game = (function(){
    
    let start = function() {

        if ( document.querySelector("#player1").value != "" && document.querySelector("#player2").value != "" ) {
            var playerOne = playerFactory(document.querySelector("#player1").value,"X");
            var playerTwo = playerFactory(document.querySelector("#player2").value, "O");
            gameBoard.render();
            selectStart.startButton.disabled = "true";
            let form = document.querySelector("form");
            form.reset();

            return { playerOne, playerTwo };

        } else {
            alert("You must enter names for both players to start the game.");
        }
    };

    




    return { start };

})();