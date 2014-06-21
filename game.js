// Variables
var cols = 10, rows = 20;
var lose, interval, current, curX, curY;
var board = [];
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple']; // roygbiv?
var shapes = [
        // I-tetramino
        [1,1,1,1],

        // L-tetramino
        [1,1,1,0,
         1],

        // J-tetramino
        [1,1,1,0,
         0,0,1],

        // T-tetramino
//        [1,1,1,0,
//        0,1],
        [0,1,0,0,
         1,1,1],

        // O-tetramino
        [1,1,0,0,
         1,1],

        // Z-tetramino
        [1,1,0,0,
         0,1,1],

        // S-tetramino
        [0,1,1,0,
         1,1]];

// Creates a 4x4 shape in variable 'current' to put the tetramino in.
// 4x4 allows it to rotate properly.
function newMino(){
    var id = Math.floor(Math.random() * shapes.length); // Get random shape.
    var shape = shapes[id]; // Maintain id for for color filling.

    current = [];
    for (var y = 0; y < 4; ++y){
        current[y] = [];
        for (var x = 0; x < 4; ++x){
            var i = 4 * y + x;
            if (typeof shape[i] != 'undefined' && shape[i]){
                current[y][x] = id + 1;
            }
            else{
                current[y][x] = 0;
            }
        }
    }

    // Position where the mino will spawn.
    curX = 5;
    curY = 0;
}

// Clear the board
function init(){
    for (var y = 0; y < rows; ++y){
        board[y] = [];
        for (var x = 0; x < cols; ++x){
            board[y][x] = 0;
        }
    }
}

// Moves stuff down, clears lines, etc.
function tick(){
    // Move downward.
    if (valid(0,1)){
        ++curY;
    }
    // If the element settled.
    else{
        freeze();
        clearLines();
        if (lose){
            newGame();
            return false;
        }
        newMino();
    }
}

// Freeze shape at its position and fix it to the board
function freeze(){
    for (var y = 0; y < 4; ++y){
        for (var x = 0; x < 4; ++x){
            if (current[y][x]){
                board[y+curY][x+curX] = current[y][x];
            }
        }
    }
}

// Returns rotates the rotated shape 'current' perpendicularly anticlockwwise
function rotate (current){
    var newCurrent = [];
    for (var y = 0; y < 4; ++y){
        newCurrent[y] = [];
        for (var x = 0; x < 4; ++x){
            newCurrent[y][x] = current[3-x][y];
        }
    }
    return newCurrent;
}

// Check if lines are filled and clear them.
function clearLines(){
    for (var y = rows - 1; y >= 0; --y){
        var rowFilled = true;
        for (var x = 0; x < cols; ++x){
            if (board[y][x] == 0){
                rowFilled = false;
                break;
            }
        }
        if (rowFilled){
            for (var yy = y; yy > 0; --yy){
                for (var x = 0; x < cols; ++x){
                    board[yy][x] = board[yy-1][x];
                }
            }
            ++y;
        }
    }
}

// Handles key presses. Duh.
function keyPress(key){
    switch (key){
        case 'left':
            if (valid(-1)){
                --curX;
            }
            break;
        case 'right':
            if (valid(1)){
                ++curX;
            }
            break;
        case 'down':
            if (valid(0, 1)){
                ++curY;
            }
            break;
        case 'rotate': // 'rotateClockwise'
            //var rotated = rotate(current);
            var rotated = rotate(current);
            if (valid(0,0,rotated)){
                current = rotated;
            }
            break;
        // case 'rotateAnti':
    }
}

// Checks the validity of the proposed next move.
function valid( offsetX, offsetY, newCurrent){
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = curX + offsetX;
    offsetY = curY + offsetY;
    newCurrent = newCurrent || current;
    
    for (var y = 0; y < 4; ++y){
        for (var x = 0; x < 4; ++x){
            if (newCurrent[y][x]){
                if (typeof board[y + offsetY] == 'undefined' ||
                    typeof board[y + offsetY][x + offsetX] == 'undefined' ||
                    board[y + offsetY][x + offsetX] ||
                    x + offsetX < 0 ||
                    y + offsetY >= rows ||
                    x + offsetX >= cols){
                        if (offsetY == 1){
                            lose = true; // Lose if the current shape is at the top.
                        }
                        return false;
                    }
            }
        }
    }
    return true;
}

// Starts a new game.
function newGame(){
    clearInterval(interval);
    init();
    newMino();
    interval = setInterval(tick, 250);
    lose = false;
}

newGame();