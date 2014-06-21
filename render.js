var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
var width = 300, height = 600;
var block_width = width / cols, block_height = height / rows;

// Draw a single square at (x, y)
function drawBlock(x,y){
    context.fillRect(block_width * x, block_height * y, block_width -1, block_height - 1);
    context.strokeRect(block_width * x, block_height * y, block_width -1, block_height - 1);
}

// Draws the matrix and the moving mino.
function render(){
    // Clears matrix.
    context.clearRect(0,0,width,height);
    
    context.strokeStyle = 'black';
    for(var x = 0; x < cols; ++x){
        for(var y = 0; y < rows; ++y){
            if(board[y][x]){
                context.fillStyle = colors[board[y][x]-1];
                drawBlock(x,y);
            }
        }
    }

    context.fillStyle = 'red';
    for(var y = 0; y < 4; ++y){
        for(var x = 0; x < 4; ++x){
            if(current[y][x]){
                context.fillStyle = colors[current[y][x]-1];
                drawBlock(curX + x, curY + y);
            }
        }
    }
}

setInterval(render, 30);