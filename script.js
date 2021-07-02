var INTERVAL = 100;
var square_size = 20;
var rows = 30;
var cols = 30;
var board = [];
var steps = 0;

document.getElementById("steps").innerHTML = "Step count: " + steps;

for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < cols; j++) {
        board[i][j] = Math.round(Math.random());
    }
}

// var board = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

function draw() {
    document.getElementById("steps").innerHTML = steps;
    // console.table(board);

    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.canvas.width = square_size * cols;
        ctx.canvas.height = square_size * rows;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] == 1) {
                    ctx.fillRect(
                        square_size * j,
                        square_size * i,
                        square_size,
                        square_size
                    );
                }
            }
        }
    }
    board = newBoard(board);
    steps += 1;
}

function newBoard(board) {
    var updatedBoard = [];
    for (var i = 0; i < rows; i++) {
        updatedBoard[i] = [];
        for (var j = 0; j < cols; j++) {
            updatedBoard[i][j] = 0;
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            var livingNeighborsCount = livingNeighbors(board, i, j);
            if (board[i][j] == 0 && livingNeighborsCount == 3) {
                updatedBoard[i][j] = 1;
            }
            if (board[i][j] == 1 && livingNeighborsCount == 2) {
                updatedBoard[i][j] = 1;
            }
            if (board[i][j] == 1 && livingNeighborsCount == 3) {
                updatedBoard[i][j] = 1;
            }
        }
    }
    return updatedBoard;
}

function livingNeighbors(myArray, i, j) {
    var rowLimit = myArray.length - 1;
    var columnLimit = myArray[0].length - 1;
    var livingNeighborsCount = 0;

    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
        for (
            var y = Math.max(0, j - 1);
            y <= Math.min(j + 1, columnLimit);
            y++
        ) {
            if (x !== i || y !== j) {
                if (myArray[x][y] == 1) {
                    livingNeighborsCount += 1;
                }
            }
        }
    }
    return livingNeighborsCount;
}

setInterval(draw, INTERVAL);
