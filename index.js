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
const GRID_LENGTH = 5;
let turn = 'X';


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
    var rowIdx = Number(this.getAttribute("rowIdx"));
    var colIdx = Number(this.getAttribute("colIdx"));
    if(grid[colIdx][rowIdx]===0){
        let newValue = 1;
        turn = 'X';
        grid[colIdx][rowIdx] = newValue;
        //console.log(typeof colIdx+'-'+rowIdx);
        let gameWon = checkWin(colIdx,rowIdx);
        renderMainGrid();
        if(gameWon)  gameOver();
        else{
            if(!gameTie()){
                turn = 'O';
                newValue = 2;
                let ids = getBestBox();
                //console.log(ids);
                grid[ids.colIdx][ids.rowIdx] = newValue;
                let gameWon = checkWin(ids.colIdx,ids.rowIdx);
                renderMainGrid();
                if(gameWon)  gameOver();
                else addClickHandlers();
            }
        }
    }
}

/**
 * checks if any one of the player won or not
 */
function checkWin(currow,curcol){
    let crow= Number(currow);
    let ccol = Number(curcol);
    let playerValue = turn==='X'? 1:2;
    let gameWon = true;
    for(let col=0;col<GRID_LENGTH;col++){
        if(grid[crow][col]!==playerValue){
            gameWon = false;
            break;
        }
    }
    if(gameWon){
        return gameWon;
    }
    gameWon = true;
    for(let row=0;row<GRID_LENGTH;row++){
        if(grid[row][ccol]!==playerValue){
            gameWon = false;
            break;
        }
    }
    if(gameWon){
        return gameWon;
    }
    
    if(crow===ccol){
        gameWon = true;
        for(let r=0;r<GRID_LENGTH;r++){
            if(grid[r][r]!==playerValue){
                gameWon = false;
                break;
            }
        }
        if(gameWon){
            return gameWon;
        }
    }
    
    //console.log(crow+ccol+'-'+GRID_LENGTH-1);

    if(crow+ccol===GRID_LENGTH-1){
        gameWon = true;
        for(let r=0;r<GRID_LENGTH;r++){
            if(grid[r][GRID_LENGTH-1-r]!==playerValue){
                gameWon = false;
                break;
            }
        }
    }
    return gameWon;
}

/**
 * After game over removes event listeners from boxes and declares the winner
 */
function gameOver(){
    console.log(turn);
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
        if(boxes[idx].textContent===turn)
        boxes[idx].style.backgroundColor= turn === 'X' ? "green": "red";
    }
    winnerIs(turn === 'X' ? "You won!": "You Lose!");
}

/**
 * return spot/box location for next move
 */
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

/**
 * displays the winner in view
 */
function winnerIs(winner){
    document.querySelector(".result").style.display = "block";
    document.querySelector(".result .message").innerText = winner;
}

/**
 * checks if game has been tied or not
 */
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

/**
 * adds event listeners to boxes
 */
function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

/**
 * removes event listeners to boxes
 */
function removeClickHandlers(){
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}


letsStart();
