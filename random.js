var bag = ['i','o','l','j','t','s','z'];
var drop = [];

function random(){
    // Copies the content of bag to a temporary one.
    var tmpBag = bag.slice(0);

    // Gets a random mino from the bag, adds it to the
    // drop queue and removes it form the temporary bag.
    for(var i = 0; i < bag.length; ++i){
        var n = Math.floor(Math.random() * tmpBag.length);
        drop.push(tmpBag[n]);
        tmpBag.splice(n, 1);
    }
}

// Returns the index of the next mino, which also
// happens to be the index of the mino in the shapes array.
function getNextFromDrop(){
    var tmp = drop[0];
    drop.splice(0,1);
    return bag.indexOf(tmp);
}
