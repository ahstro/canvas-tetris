// Variables
var cols = 10, rows = 20;
var lose, interval, current, curX, curY, sq;
var board = [];
var shapes = [
        // I-tetramino
        [0,0,0,0,
         1,1,1,1],

        // O-tetramino
        [1,1,
         1,1],

        // L-tetramino
        [0,0,1,
         1,1,1],

        // J-tetramino
        [1,0,0,
         1,1,1],

        // T-tetramino
        [0,1,0,
         1,1,1],

        // S-tetramino
        [0,1,1,
         1,1],

        // Z-tetramino
        [1,1,0,
         0,1,1]
    ];

// Creates a square shape in variable 'current' to put the tetramino in.
// The square shape allows it to rotate properly.
function newMino(){
    // Checks if there are any minos left in the drop queue and generates more.
    if(drop.length <= 0){
        random();
    }
    var id = getNextFromDrop();
    var shape = shapes[id]; // Maintain id for color filling.

    current = [];

    // Sets the appropriate size of the shape square.
    switch(id){
        case 0:
            sq = 4;
            break;
        case 1:
            sq = 2;
            break;
        default:
            sq = 3;
            break;
    } 

    // Create mino array.
    for (var y = 0; y < sq; ++y){
        current[y] = [];
        for (var x = 0; x < sq; ++x){
            var i = sq * y + x;
            if (typeof shape[i] != 'undefined' && shape[i]){
                current[y][x] = id + 1;
            }
            else{
                current[y][x] = 0;
            }
        }
    }

    // Position where the mino will spawn.
    curY = 0;
    if(id == 1){
        curX = 4;
    }
    else{
        curX = 3;
    }
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
    for (var y = 0; y < sq; ++y){
        for (var x = 0; x < sq; ++x){
            if (current[y][x]){
                board[y+curY][x+curX] = current[y][x];
            }
        }
    }
}

// Rotates the mino 90 degrees clockwise
function rotate(current){
    var newCurrent = [];
    for (var y = 0; y < sq; ++y){
        newCurrent[y] = [];
        for (var x = 0; x < sq; ++x){
            newCurrent[y][x] = current[(sq - 1) - x][y];
        }
    }
    return newCurrent;
}

// Rotates the mino 90 degrees anticlockwise
function rotateAnti(current){
    var newCurrent = [];
    for (var y = 0; y < sq; ++y){
        newCurrent[y] = [];
        for (var x = 0; x < sq; ++x){
            newCurrent[y][x] = current[x][(sq - 1) - y];
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
    if(!paused){
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
            case 'hard':
                var i = 0;
            do{
                ++i;
            }while(valid(0,i));
            curY = curY + (i - 1);
            freeze();
            break;
            case 'rotate':
                checkRotationValidity(rotate(current));
            break;
            case 'rotateAnti':
                checkRotationValidity(rotateAnti(current));
            break;
        }
    }
    if(key == 'pause'){
        pause();
    }
}

// Checks rotation validity.
function checkRotationValidity(rotated){
    if (valid(0,0,rotated)){
        current = rotated;
    }
    else if(valid(1,0,rotated)){
        ++curX;
        current = rotated;
    }
    else if(valid(-1,0,rotated)){
        --curX;
        current = rotated;
    }
}

// Checks the validity of the proposed next move.
function valid( offsetX, offsetY, newCurrent){
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = curX + offsetX;
    offsetY = curY + offsetY;
    newCurrent = newCurrent || current;
    
    for (var y = 0; y < sq; ++y){
        for (var x = 0; x < sq; ++x){
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

// Pause game.
function pause(){
    if(!paused){
        // Stops the game.
        clearInterval(interval);
        clearInterval(renderInterval);

        // Lets the game know it's paused.
        paused = true;

        // Clears screen and renders 'Paused' text.
        var text = 'Paused';
        var posX = (width - context.measureText(text).width) / 2;
        var posY = height / 2;
        context.clearRect(0,0,width,height);
        context.fillStyle = '#222222';
        context.fillText(text, posX, posY);
    }
    else if(paused){
        interval = setInterval(tick, 250);
        renderInterval = setInterval(render, 30);
        paused = false;
    }
}

// Starts a new game.
function newGame(){
    clearInterval(interval);
    init();
    newMino();
    interval = setInterval(tick, 250);
    lose = false;
    paused = false;
}

newGame();
