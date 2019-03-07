var gameOver = function(game){}

gameOver.prototype = {
	/*
	init: function(score){
		alert("You scored: "+score)
	},*/
  	create: function(){
		this.game.stage.backgroundColor = "#008080";

  		var gameOverTitle = this.game.add.sprite(900,200,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		
		var MaggyIcon2 = this.game.add.sprite(900, 500, "IMG_MaggyMenu");
		MaggyIcon2.anchor.setTo(0.5,0.5);
		MaggyIcon2.scale.setTo(0.75, 0.75);

		var playButton3 = this.game.add.button(900,750,"restart",this.playTheGame,this);
		playButton3.anchor.setTo(0.5,0.5);
		var playButton4 = this.game.add.button(900,850,"mainmenu",this.playTheGameB,this);
		playButton4.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("Level01");
	},
	playTheGameB: function(){
		this.game.state.start("Boot");
	}
}