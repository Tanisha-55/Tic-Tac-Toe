const gameInfo = document.querySelector(".game-info");
const boxGame = document.querySelectorAll(".box");
const btnG = document.querySelector(".btn");

//initialization
let currentPlayer;
let GridBox;

const winningPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){

    console.log("JII");

    currentPlayer = "X";
    GridBox = ["", "", "", "", "", "", "", "", ""];
    
    // missing :-
    // when we click on new game, then erase all the boxes 
    boxGame.forEach((box, index) => {
        box.innerText = "";
        boxGame[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        // box.classList = `box box${index+1}`;
        box.classList.remove("win");
    });

    btnG.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initGame();

// swapping the turn
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI m dikhana
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//check whether game is over or not: any winningPos matches or not
function checkGameOver(){
    let ans = "";
    winningPos.forEach((pos) => {
        if( (GridBox[pos[0]]!== "" || GridBox[pos[1]]!== "" || GridBox[pos[2]]!== "" )
        && (GridBox[pos[0]] === GridBox[pos[1]]) && (GridBox[pos[1]] === GridBox[pos[2]])) {

            //if X is winner
            if(GridBox[pos[0]] === "X")
                ans = "X";
            else
                ans = "O";

            boxGame.forEach((box) => {
                box.style.pointerEvents="none";
            });

            //chamge the color of the grid of winner 
            boxGame[pos[0]].classList.add("win");
            boxGame[pos[1]].classList.add("win");
            boxGame[pos[2]].classList.add("win");
        }
    });

    //if we have the winner
    if(ans!==""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        btnG.classList.add("active");
        return;
    }

    //if there is no winner and game tie
    let fillCount = 0;
    GridBox.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        btnG.classList.add("active");
    }
}

//function to handle the game;
function handleGame(index){
    if(GridBox[index] === ""){
        //UI m dikhana
        boxGame[index].innerText = currentPlayer;

        //grid m dikhana
        GridBox[index] = currentPlayer;
        boxGame[index].style.pointerEvents = "none";
        
        //swap kro turn ko
        swapTurn();

        //chck if anyone wons the game or not
        checkGameOver();
    } 
};

//add event listeners to the boxes.
boxGame.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleGame(index);
    });
});

btnG.addEventListener("click", initGame);