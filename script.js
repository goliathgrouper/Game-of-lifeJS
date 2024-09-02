const SIZE = 700;

const editBtn = document.querySelector('#edit');
const strendbtn = document.querySelector('#start-end');

const container = document.querySelector('#container');

let gridSize;
let grid = [];

function getSquareSize(squareNumber) {
    return `${(SIZE/squareNumber)-2}px`;
}

function generateGrid(n) {
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
        grid.push(column);
        
    }
    //grid = [...container.querySelectorAll('#container > div')];
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


strendbtn.addEventListener('click', (event) => {
    let text = strendbtn.textContent;
    if (text === 'Start') {
        strendbtn.textContent = 'End';
        
    } else {
        strendbtn.textContent = 'Start';
        
    }
});


for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        leftCoord = (x - 1) % gridSize;
        rightCoord = (x + 1) % gridSize;
        aboveCoord = (y - 1) % gridSize;
        belowCoord = (y + 1) % gridSize;

        numNeighbors = 0
        if (grid.at(leftCoord).at(aboveCoord).classList.contains('alive')) {
            numNeighbors += 1;
        }
        if (grid.at(x).at(aboveCoord).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(rightCoord).at(aboveCoord).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(leftCoord).at(y).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(rightCoord).at(y).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(leftCoord).at(belowCoord).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(x).at(belowCoord).classList.contains('alive')) {
            numNeighbors += 1;
        } 
        if (grid.at(rightCoord).at(belowCoord).classList.contains('alive')) {
            numNeighbors += 1;
        } 

        if (grid[x][y].classList.contains()){} // TOBECONTINUED...................
    }
}
/*# Calculate the next step's cells based on current step's cells:
    for x in range(gridSize):
        for y in range(HEIGHT):
            # Get neighboring coordinates:
            # `% WIDTH` ensures leftCoord is always between 0 and WIDTH - 1
            leftCoord  = (x - 1) % WIDTH
            rightCoord = (x + 1) % WIDTH
            aboveCoord = (y - 1) % HEIGHT
            belowCoord = (y + 1) % HEIGHT

            # Count number of living neighbors:
            numNeighbors = 0
            if currentCells[leftCoord][aboveCoord] == '#':
                numNeighbors += 1 # Top-left neighbor is alive.
            if currentCells[x][aboveCoord] == '#':
                numNeighbors += 1 # Top neighbor is alive.
            if currentCells[rightCoord][aboveCoord] == '#':
                numNeighbors += 1 # Top-right neighbor is alive.
            if currentCells[leftCoord][y] == '#':
                numNeighbors += 1 # Left neighbor is alive.
            if currentCells[rightCoord][y] == '#':
                numNeighbors += 1 # Right neighbor is alive.
            if currentCells[leftCoord][belowCoord] == '#':
                numNeighbors += 1 # Bottom-left neighbor is alive.
            if currentCells[x][belowCoord] == '#':
                numNeighbors += 1 # Bottom neighbor is alive.
            if currentCells[rightCoord][belowCoord] == '#':
                numNeighbors += 1 # Bottom-right neighbor is alive.

            # Set cell based on Conway's Game of Life rules:
            if currentCells[x][y] == '#' and (numNeighbors == 2 or
numNeighbors == 3):
                # Living cells with 2 or 3 neighbors stay alive:
                nextCells[x][y] = '#'
            elif currentCells[x][y] == ' ' and numNeighbors == 3:
                # Dead cells with 3 neighbors become alive:
                nextCells[x][y] = '#'
            else:
                # Everything else dies or stays dead:
                nextCells[x][y] = ' '
    time.sleep(0.5) # Add pause to reduce flickering.
*/