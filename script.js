const SIZE = 700;

const container = document.querySelector('.container');

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
        square.style.backgroundColor = 'white';

        container.appendChild(square);
    }
}

generateGrid(16);