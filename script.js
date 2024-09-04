const SIZE = 700;

const editBtn = document.querySelector('#edit');
const nextbtn = document.querySelector('#next');

const container = document.querySelector('#container');

let gridSize;
let nextGrid = [];
let curGrid;

function getSquareSize(squareNumber) {
    return `${(SIZE/squareNumber)-2}px`;
}

function generateGrid(n) {
    nextGrid = [];
    let square;
    gridSize = n;
    let column;
    for (let x = 0; x < n; x++) {
        column = [];
        for (let y = 0; y < n; y++) {
            square = document.createElement('div');
            square.style.border = '1px solid black';
            square.style.width = getSquareSize(n);
            square.style.height = getSquareSize(n);
            square.classList.add('dead');
            column.push(square);
            container.appendChild(square);
        }
        nextGrid.push(column);
        
    }
  
}

generateGrid(16);

document.querySelector('#grid-size').addEventListener('click', (event) => {
    let newGridSize;
    do {
        newGridSize = prompt('Select new grid-size (5 - 100)');
    } while (newGridSize > 100 || newGridSize < 5);

    const oldGrid = document.querySelectorAll('#container > div');
    oldGrid.forEach(el => container.removeChild(el));

    generateGrid(newGridSize);
});


// Change alive or dead
function editGrid(event) {
    if (event.target.className === 'dead') {
        event.target.classList.remove('dead');
        event.target.classList.add('alive');
    } else {
        event.target.classList.remove('alive');
        event.target.classList.add('dead');
    }
}

// Edit alive or dead by color

let editState = false;
editBtn.addEventListener('click', (event) => {
    if (editState) {
        editState = false;
        editBtn.style.backgroundColor = '';
        editBtn.style.color = '';
        container.removeEventListener('click', editGrid);
    } else {
        editState = true;
        editBtn.style.backgroundColor = 'purple';
        editBtn.style.color = 'white';
        container.addEventListener('click', editGrid);
    }

});


nextbtn.addEventListener('click', (event) => {
    curGrid = nextGrid.map((x) => {
        return x.map((y) => {
            return y.classList[0];
        });
    });
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            leftCoord = (x - 1) % gridSize;
            rightCoord = (x + 1) % gridSize;
            aboveCoord = (y - 1) % gridSize;
            belowCoord = (y + 1) % gridSize;

            numNeighbors = 0
            if (curGrid.at(leftCoord).at(aboveCoord) == 'alive') {
                numNeighbors += 1;
            }
            if (curGrid.at(x).at(aboveCoord) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(rightCoord).at(aboveCoord) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(leftCoord).at(y) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(rightCoord).at(y) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(leftCoord).at(belowCoord) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(x).at(belowCoord) == 'alive') {
                numNeighbors += 1;
            } 
            if (curGrid.at(rightCoord).at(belowCoord) == 'alive') {
                numNeighbors += 1;
            } 

            if (curGrid[x][y] == 'alive' && (numNeighbors === 2 || numNeighbors === 3)) {
                continue;
            }
            if (curGrid[x][y] == 'dead' && numNeighbors === 3) {
                nextGrid[x][y].classList.remove('dead');
                nextGrid[x][y].classList.add('alive');
            } else {
                if (curGrid[x][y] == 'dead') {
                    continue
                } else {
                    nextGrid[x][y].classList.remove('alive');
                    nextGrid[x][y].classList.add('dead');
                }
            }
        }
    }
});
