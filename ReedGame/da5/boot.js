var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};




boot.prototype = {
	preload: function(){
		  this.game.load.image("loading","assets/loading.png"); 
		  this.game.load.image("welcome","assets/flappyguy/WelcomeTo.png");
		  this.game.load.image("flappy", "assets/flappyguy/guy.png");
		  this.game.load.image("begin", "assets/flappyguy/ClickToBegin.png");
		  this.game.load.image("gameover", "assets/flappyguy/GameOver.png");
		  this.game.load.image("restart", "assets/flappyguy/TryAgain.png");
		  this.game.load.image("mainmenu", "assets/flappyguy/MainMenu.png")
		  this.game.load.image("zap", "assets/flappyguy/lightening.png");
		  this.game.load.image("clickflap", "assets/flappyguy/LeftClickToFlap.png");
		  this.game.load.image("IMG_MaggyMenu", "assets/Maggy01.png");
		  this.game.load.image("IMG_Maggy", "assets/Maggy01(64).png");
		  this.game.load.image("IMG_BricksMenu", "assets/bricks01.png");
		  this.game.load.image("IMG_Bricks", "assets/bricks01(64).png");
		  this.game.load.image("IMG_Stabby", "assets/dagger01(64x128).png");
		  this.game.load.image("IMG_Smiley", "assets/smiley(128).png");
		  //this.game.load.audio("jumpSound", "assets/flappyguy/jump05.wav");

	},
  	create: function(){
		/*
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
		//this.game.state.start("Preload");
		*/
		this.game.stage.backgroundColor = "#dba000";
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);

		
		
		//var playButton = this.game.add.button(160,320,"play",this.playTheGame(),this);
		//playButton.anchor.setTo(0.5,0.5);
		//this.game.state.start("Preload");

		//var gameTitle = this.game.add.sprite(160,160,"gametitle");
		//var gameTitle = this.game.add.sprite(900, 200, "welcome");
		//gameTitle.anchor.setTo(0.5,0.5);

		var maggyIcon = this.game.add.sprite(900, 400, "IMG_MaggyMenu");
		maggyIcon.anchor.setTo(0.5,0.5);

		var playButton = this.game.add.button(900,750,"begin",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);


	},
	playTheGame: function(){
		this.game.state.start("Level01");
	}
}