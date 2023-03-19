let gameGrid = document.querySelectorAll(".gridBox");
gameGrid.forEach(element => {
    element.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("data-box"));
    });
});

const player1 = createPlayerObject("jon","X");

// gameboard module

var gameBoard = (function(play) {

    let gameArray = [];

    let test = function addPlay(play) {
        
        if ( gameArray.length <= 8 ) {
            return gameArray.push(play);
        } else {
            return `Tie!`
        }
    };

    return {
        array: gameArray,
        method: test
    };

})();




// player factory function

function createPlayerObject(name, token) {
    console.log(`${name} will play as ${token}`);
    return { name, token };
};