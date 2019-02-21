
var startState = function(game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
}

startState.prototype = {
    preload: function() {
        
    },
    create: function() {
        game.stage.backgroundColor = "#ffffff";
        var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Welcome to Vidya!", style );
        text.anchor.setTo( 0.5, 0.0 );
        
    }
}





/*
var startState = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var style = { font: "25px Verdana", fill: "#000000", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Welcome to Vidya!", style );
        text.anchor.setTo( 0.5, 0.0 );
        game.stage.backgroundColor = "#ffffff";
    }
}
*/