
var gameBoard = (function(){

    let board = ["","","","","","","","",""];

    // we want the gameboard to render automatically, therefore use IIFE
    let render = (function() {

        let grid = document.querySelector(".grid");
    
        // board -> referencing elements of the array and using them to build html divs

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
    })();
})();

function playerFactory(name, token) {
    return {name, token};
}

let start = (function() {
    let startButton = document.querySelector("#start");
    let form = document.querySelector("form");
    startButton.addEventListener("click", (e) => {
        e.preventDefault();
        let firstPlayerName = document.querySelector("#player1").value;
        let secondPlayerName = document.querySelector("#player2").value;

        if ( firstPlayerName != "" && secondPlayerName != "" ) {
            let playerOne = playerFactory(firstPlayerName, "X");
            console.log(playerOne);
            let playerTwo = playerFactory(secondPlayerName, "O");
            console.log(playerTwo);
            form.reset();
        } else {
            alert("Names must be submitted for both players before beginning the game");
        }
    });
})();

