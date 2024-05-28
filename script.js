const SIZE = 700;

const container = document.querySelector('#container');

function getSquareSize(squareNumber) {
    return `${(SIZE/squareNumber)-2}px`;
}

function generateGrid(n) {
    let square;
    for (let i = 0; i < n**2; i++) {
        square = document.createElement('div');
        square.style.border = '1px solid black';
        square.style.width = getSquareSize(n);
        square.style.height = getSquareSize(n);
        square.classList.add('dead');

        container.appendChild(square);
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

function editGrid(event) {
    if (event.target.className === 'dead') {
        event.target.classList.remove('dead');
        event.target.classList.add('alive');
    } else {
        event.target.classList.remove('alive');
        event.target.classList.add('dead');
    }
}

const editBtn = document.querySelector('#edit');
let editState = false;
editBtn.addEventListener('click', (event) => {
    if (editState) {
        editState = false;
        container.removeEventListener('click', editGrid);
    } else {
        editState = true;
        container.addEventListener('click', editGrid);
    }

});

