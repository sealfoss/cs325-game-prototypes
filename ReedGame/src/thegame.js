var theGame = function(game){
	/*
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
	*/
	var count = 0;
	var text;
	var clicked = false;
	var player;
	var jumpForce = 100;
	var sparky;
	var jump;
}

theGame.prototype = {
	preload: function() {
		this.game.load.audio("jumpSound", "assets/flappyguy/jump05.wav");
	},
	create: function() {
		jumpForce = 500;
		this.game.stage.backgroundColor = "#7EC0EE";

		var howTo = this.game.add.sprite(500, 700, "clickflap");
		howTo.anchor.setTo(0.5,0.5);

		var playButton2 = this.game.add.button(900,700,"play",this.playTheGame,this);
		playButton2.anchor.setTo(0.5,0.5);

		player = this.game.add.sprite(500, 400, "flappy");
		player.anchor.setTo(0.5,0.5);
		player.scale.setTo(0.5, 0.5);
		this.game.physics.enable(player, Phaser.Physics.ARCADE);

		//player.body.setCircle(32);
		player.body.collideWorldBounds = true;
		player.body.bounce.set(0.8);
		player.body.gravity.set(0, 180);
		player.inputEnabled = true;
		player.events.onInputDown.add(this.listener, this);
		

		var randX = Math.random() % 1000;
		var randY = Math.random() % 800;
		sparky = this.game.add.sprite(randX, randY, "zap");
		sparky.anchor.setTo(0.5,0.5);
		sparky.scale.setTo(0.5, 0.5);
		this.game.physics.enable(sparky, Phaser.Physics.ARCADE);

		//sparky.body.setCircle(32);
		sparky.body.collideWorldBounds = true;
		sparky.body.bounce.set(1.0);
		sparky.body.gravity.set(0,180);
		sparky.body.velocity.setTo(200,200);
		

		var collisionHandler = function(_good, _bad) {
			this.game.state.start("GameOver");
		}

		this.game.physics.arcade.overlap(player, sparky, this.collisionHandler, null, this);
		jump = this.game.add.audio("jumpSound");
	},
	update: function() {
		this.game.physics.arcade.overlap(player,sparky,this.playTheGame, null, this);
	},
	playTheGame: function(){
		this.game.state.start("GameOver");
	},
	listener: function() {
		player.body.velocity.y = player.body.velocity.y - jumpForce;
		jump.play();
	}
}

/*

theGame.prototype = {
  	create: function(){
		number = Math.floor(Math.random()*10);
		spriteNumber = this.game.add.sprite(160,240,"numbers");
		spriteNumber.anchor.setTo(0.5,0.5);
		spriteNumber.frame = number;	
		var higherButton = this.game.add.button(160,100,"higher",this.clickedHigher,this);
		higherButton.anchor.setTo(0.5,0.5);
		var lowerButton = this.game.add.button(160,380,"lower",this.clickedLower,this);
		lowerButton.anchor.setTo(0.5,0.5);	
	},
	clickedHigher: function(){
		higher=true;
		this.tweenNumber(true);
	},
	clickedLower: function(){
		higher=false;
		this.tweenNumber(false);
	},
	tweenNumber: function(higher){
		if(workingButtons){
			workingButtons=false;
			var exitTween = this.game.add.tween(spriteNumber);
	          exitTween.to({x:420},500);
	          exitTween.onComplete.add(this.exitNumber,this);
	          exitTween.start();
	     }
	},
	exitNumber: function(){
		spriteNumber.x = -180;
	     spriteNumber.frame = Math.floor(Math.random()*10);
	     var enterTween = this.game.add.tween(spriteNumber);
	     enterTween.to({x:160},500);
	     enterTween.onComplete.add(this.enterNumber,this);
	     enterTween.start();
	
	},
	enterNumber: function(){
		workingButtons=true;
		if((higher && spriteNumber.frame<number)||(!higher && spriteNumber.frame>number)){
			this.game.state.start("GameOver",true,false,score);	
		}
		else{  
			score++;
			number = spriteNumber.frame;
		}	
	}
}
*/