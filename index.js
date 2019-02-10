/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
const winningCombos = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
    [6, 4, 2]
];


/**
 * starting function of game/code
 */
function letsStart(){
    document.querySelector(".result").style.display = "none";
    grid = [];
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

/**
 * intiliazes the grid variable with 9X9 matrix
 */
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

/**
 * returns row boxes template
 */
function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="zero">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}


/**
 * returns 9X9 grid template
 */
function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}


/**
 * renders main grid to DOM
 */
function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

/**
 * Handles the box click event
 */
function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx]===0){
        let newValue = 1;
        turn = 'X';
        grid[colIdx][rowIdx] = newValue;
        let gameWon = checkWin();
        renderMainGrid();
        if(gameWon)  gameOver(gameWon);
        else{
            if(!gameTie()){
                turn = 'O';
                newValue = 2;
                let ids = getBestBox();
                grid[ids.colIdx][ids.rowIdx] = newValue;
                let gameWon = checkWin();
                renderMainGrid();
                if(gameWon)  gameOver(gameWon);
                else addClickHandlers();
            }
        }
    }
}

function checkWin(){
    let playerValue = turn==='X'? 1:2;
    let copyGrid = [...grid[0],...grid[1],...grid[2]];
    let playedBoxes = copyGrid.reduce(
        (a,e,i)=> (e===playerValue)?a.concat(i):a,[]
        );
    let gameWon=null;
    for(let [index,win] of winningCombos.entries()){
        if(win.every(elem=>playedBoxes.indexOf(elem)>-1)) {
            gameWon = {index: index,turn:turn};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    console.log(gameWon.turn);
    var boxes = document.getElementsByClassName("box");
    //removeClickHandlers();
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
        if(boxes[idx].textContent===gameWon.turn)
        boxes[idx].style.backgroundColor= gameWon.turn === 'X' ? "green": "red";
    }
    winnerIs(gameWon.turn === 'X' ? "You won!": "You Lose!");
}


function getBestBox(){
    let ids = null;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
            if(grid[colIdx][rowIdx] === 0){
                ids = {colIdx:colIdx,rowIdx:rowIdx};
                break;
            }
        }
    }
    return ids;
}

function winnerIs(winner){
    document.querySelector(".result").style.display = "block";
    document.querySelector(".result .message").innerText = winner;
}
   
function gameTie(){
    let isTied = true;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
            if(grid[colIdx][rowIdx] === 0){
                isTied = false;
                break;
            }
        }
    }
    if(isTied){
        var boxes = document.getElementsByClassName("box");
        for (var idx = 0; idx < boxes.length; idx++) {
            boxes[idx].style.backgroundColor="blue";
            boxes[idx].removeEventListener('click', onBoxClick, false);
        }
        winnerIs("Game has been tied.");
    }
    return isTied;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function removeClickHandlers(){
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}


letsStart();
