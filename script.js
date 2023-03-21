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
                element.addEventListener("click", game.handleClick);
            });
        } else {
            
            let main = document.querySelector("main");
            let removeGrid = document.querySelector(".grid");
            main.removeChild(removeGrid);
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
                element.addEventListener("click", game.handleClick);
            });
        };
    };

    let update = (index, value) => {
        board[index] = value;
        gameBoard.render();
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

    const handleClick = (event) => {
        let index = event.target.id;
        gameBoard.update(index, players[currentPlayerIndex].token);
        if ( currentPlayerIndex == 0 ) {
            currentPlayerIndex = 1;
        } else if ( currentPlayerIndex == 1 ) {
            currentPlayerIndex = 0;
        }
    };


    return {
        start,
        handleClick
    };

})();

const restartButton = document.querySelector("#new_game");
restartButton.disabled = true;

const startButton = document.querySelector("#start");
startButton.addEventListener("click", (e) => {
    e.preventDefault();
    game.start();
    let form = document.querySelector("form");
    form.reset();
    startButton.disabled = true;
    restartButton.disabled = false;
});

restartButton.addEventListener("click", (e) => {
    alert("Resetting page.");
});