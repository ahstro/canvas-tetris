document.body.onkeydown = function(e){
    var keys = {
        13: 'pause',
        32: 'hard',
        37: 'left',
        38: 'rotate',
        90: 'rotateAnti',
        39: 'right',
        40: 'down'
    };
    if(typeof keys[ e.keyCode ] != 'undefined'){
        keyPress(keys[ e.keyCode ]);
    }
};
