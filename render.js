// Variables
var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
var width = 300, height = 600;
var block_width = width / cols, block_height = height / rows;

// Colors
var cyan = '#1dd1d1';
var yellow = '#d1d11d';
var orange = '#d1921d';
var blue = '#1d1dd1';
var purple = '#801280';
var green = '#128012';
var red = '#d11e1e';
var colors = [cyan, yellow, orange, blue, purple, green, red];
var minoStroke = 'black';
var gridStroke = '#e4e4e4';
var gridFill = '#eeeeee';


// Draw a single square at (x, y)
function drawBlock(x,y){
    context.fillRect(block_width * x, block_height * y, block_width -1, block_height - 1);
    context.strokeRect(block_width * x, block_height * y, block_width -1, block_height - 1);
}

// Draws the matrix and the moving mino.
function render(){
    // Clears matrix.
    context.clearRect(0,0,width,height);

    //
    for(var x = 0; x < cols; ++x){
        for(var y = 0; y < rows; ++y){
            // If there's a mino there, render it...
            if(board[y][x]){
                context.strokeStyle = minoStroke;
                context.fillStyle = colors[board[y][x]-1];
                drawBlock(x,y);
            }
            // ...otherwise, render the background grid.
            else{
                context.strokeStyle = gridStroke;
                context.fillStyle = gridFill;
                drawBlock(x,y);
            }
        }
    }

    for(var y = 0; y < sq; ++y){
        for(var x = 0; x < sq; ++x){
            if(current[y][x]){
                context.strokeStyle = minoStroke;
                context.fillStyle = colors[current[y][x]-1];
                drawBlock(curX + x, curY + y);
            }
        }
    }
}

setInterval(render, 30);
