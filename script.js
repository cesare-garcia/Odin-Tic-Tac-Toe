var displayController = (() => {
        const displayMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    };
    return {
        displayMessage
    };
})();

var gameBoard = ( () => {

    let board = ["","","","","","","","",""];

    const checkBoard = () => board;

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
        if ( board[index] == "") {
            board[index] = value;
            gameBoard.render();
        }
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
        if ( checkForWin(gameBoard.checkBoard(), players[currentPlayerIndex].token) ) {
            gameOver = true;
            displayController.displayMessage(`${players[currentPlayerIndex].name} won the match`);
        } else if (checkForTie(gameBoard.checkBoard()) ) {
            gameOver = true;
            displayController.displayMessage(`It's a tie`);
        }
        
        if ( currentPlayerIndex == 0 ) {
            currentPlayerIndex = 1;
        } else if ( currentPlayerIndex == 1 ) {
            currentPlayerIndex = 0;
        }
    };

    function checkForWin(board) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for ( let i = 0; i < winningCombos.length; i++ ) {
            const [a, b, c] = winningCombos[i];
            if ( board[a] && board[a] === board[b] && board[a] === board[c] ) {
                return true;
            }
        }
        return false;

    }

    function checkForTie(board) {
        return board.every(cell => cell !== "");
    }

    return {
        start,
        handleClick,
    };

})();

const restartButton = document.querySelector("#new_game");
restartButton.disabled = true;

const startButton = document.querySelector("#start");
startButton.addEventListener("click", (e) => {
    if ( document.querySelector("#player1").value != "" && document.querySelector("#player2").value != "") {
        e.preventDefault();
        game.start();
        let form = document.querySelector("form");
        form.reset();
        startButton.disabled = true;
        restartButton.disabled = false;
    } else {
        alert("Takes two to play.");
    }
    

});

restartButton.addEventListener("click", (e) => {
    alert("Resetting page.");
});