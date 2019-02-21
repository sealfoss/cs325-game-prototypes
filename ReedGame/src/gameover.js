var gameOver = function(game){}

gameOver.prototype = {
	/*
	init: function(score){
		alert("You scored: "+score)
	},*/
  	create: function(){
		this.game.stage.backgroundColor = "#008080";

  		var gameOverTitle = this.game.add.sprite(500,200,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		
		var flappyIcon2 = this.game.add.sprite(500, 400, "flappy");
		flappyIcon2.anchor.setTo(0.5,0.5);

		var playButton3 = this.game.add.button(500,600,"restart",this.playTheGame,this);
		playButton3.anchor.setTo(0.5,0.5);
		var playButton4 = this.game.add.button(500,700,"mainmenu",this.playTheGameB,this);
		playButton4.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
	playTheGameB: function(){
		this.game.state.start("Boot");
	}
}