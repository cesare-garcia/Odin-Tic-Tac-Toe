let gameGrid = document.querySelectorAll(".gridBox");
gameGrid.forEach(element => {
    element.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("data-box"));
    });
});






// player factory function

function createPlayerObject(name, token) {
    console.log(`${name} will play as ${token}`);
    return { name, token };
}