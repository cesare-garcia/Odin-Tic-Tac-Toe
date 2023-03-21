var gameBoard = ( () => {

    let board = ["","","","","","","","",""];

    let checkBoard = function() {
        console.log(board);
    };

    const render = function() {

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
                    console.log(e.target.id); // this will need to be currentTurn.marker
                });
            });
        };
    };

    let update = function() {
        // let boxes = document.querySelectorAll(".gridBox");
        // boxes.forEach( (element) => {
        //     element.addEventListener("click", (e) => {
        //         e.target.innerText = "X"; // this will need to be currentTurn.marker
        //     });
        // });

    };

    return { checkBoard, render, update };

})();

function playerFactory(name, token) {
    return {name, token};
}

const game = (() => {

    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            playerFactory(document.querySelector("#player1").value, "X"),
            playerFactory(document.querySelector("#player2").value, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.render();
    };


    return { start };

})();

const startButton = document.querySelector("#start");
startButton.addEventListener("click", (e) => {
    e.preventDefault();
    game.start();
});