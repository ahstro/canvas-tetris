document.body.onkeydown = function(e){
    var keys = {
        37: 'left',
        38: 'rotate',
        39: 'right',
        40: 'down'
    };
    if(typeof keys[ e.keyCode ] != 'undefined'){
        keyPress(keys[ e.keyCode ]);
        render();
    }
};
