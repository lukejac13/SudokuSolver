const N = 9;

// Create the Sudoku grid dynamically
const gridElement = document.getElementById("sudokuGrid");
let sudokuGrid = [];
for (let i = 0; i < N * N; i++) {
    const input = document.createElement("input");
    input.className = "box";
    input.maxLength = 1;
    input.type = "text";
    input.oninput = (e) => {
        const value = e.target.value;
        e.target.value = value.replace(/[^1-9]/, ""); // Allow only 1-9
    };
    gridElement.appendChild(input);
    sudokuGrid.push(input);
}

// Function to get grid data
function getGridData() {
    let grid = [];
    for (let row = 0; row < N; row++) {
        let currentRow = [];
        for (let col = 0; col < N; col++) {
            let value = sudokuGrid[row * N + col].value;
            currentRow.push(value ? parseInt(value) : 0);
        }
        grid.push(currentRow);
    }
    return grid;
}

// Sudoku solving logic
function isPresentInRow(grid, row, num) {
    return grid[row].includes(num);
}

function isPresentInCol(grid, col, num) {
    for (let row = 0; row < N; row++) {
        if (grid[row][col] === num) return true;
    }
    return false;
}

function isPresentInBox(grid, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row + startRow][col + startCol] === num) return true;
        }
    }
    return false;
}

function isValidPlace(grid, row, col, num) {
    return (
        !isPresentInRow(grid, row, num) &&
        !isPresentInCol(grid, col, num) &&
        !isPresentInBox(grid, row - (row % 3), col - (col % 3), num)
    );
}

function solve(grid) {
    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidPlace(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Solve Sudoku and update UI
function solveSudoku() {
    const grid = getGridData();
    if (solve(grid)) {
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                sudokuGrid[row * N + col].value = grid[row][col];
            }
        }
    } else {
        alert("No solution exists for the given Sudoku!");
    }
}

// Reset Sudoku grid
function resetGrid() {
    for (let i = 0; i < sudokuGrid.length; i++) {
        sudokuGrid[i].value = ""; // Clear all cells
    }
}
