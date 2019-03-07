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
	var jumpForce = -1000000000;
	var sparky;
	var jump;
	var spawnZap = false;
	
	var zaps;
	var time;
	var right;
	var jumpBlock;
	var jumpTime;
}


theGame.prototype = {
	preload: function() {
		this.game.load.audio("jumpSound", "assets/flappyguy/jump05.wav");
		this.game.load.audio("zapSound", "assets/flappyguy/zap.wav");
		this.game.load.audio("screamSound", "assets/flappyguy/scream.wav")
	},
	create: function() {
		jumpTime = 0;
		jumpBlock = false;
		right = true;
		zaps = this.game.add.group();
		time = 400;
		// below this, original

		jumpForce = 500;
		this.game.stage.backgroundColor = "#7EC0EE";

		player = this.game.add.sprite(500, 740, "flappy");
		player.anchor.setTo(0.5,0.5);
		player.scale.setTo(0.5, 0.5);
		this.game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.setCircle(120);

		//player.body.setCircle(32);
		player.body.collideWorldBounds = true;
		//player.body.bounce.set(0.4);
		player.body.bounce.y = 0.7;
		player.body.gravity.set(0, 180);
		player.inputEnabled = true;
		

		
		jump = this.game.add.audio("jumpSound");
		zap = this.game.add.audio("zapSound");
		scream = this.game.add.audio("screamSound");
	},
	update: function() {
		this.game.physics.arcade.overlap(player,zaps,this.playTheGame, null, this);
		
		if(time%600 == 0) { this.spawnSparky(); }
		time++;

		if(jumpBlock == true && time > jumpTime+60 && player.y > 740) { jumpBlock = false; } 

		this.controls();
	},	
	playTheGame: function(){
		scream.play();
		this.game.state.start("GameOver");
	},
	playerJump: function() {
		player.body.velocity.y = jumpForce;
		jump.play();
		jumpBlock = true;
		jumpTime = time;
	},
	controls: function() {
		var moveSpeed = 10;

		if (this.game.input.keyboard.isDown(Phaser.KeyCode.W)) {
		   if(!jumpBlock) { this.playerJump(); }
		}
		
		if (this.game.input.keyboard.isDown(Phaser.KeyCode.A)) {
			player.x -= moveSpeed;
		}

		if (this.game.input.keyboard.isDown(Phaser.KeyCode.D)) {
			player.x += moveSpeed;
		}
	},
	spawnSparky: function() {
		var randX = this.game.rnd.integerInRange(40, 960);
		sparky = this.game.add.sprite(randX, 20, "zap");
		sparky.anchor.setTo(0.5,0.5);
		sparky.scale.setTo(0.5, 0.5);
		this.game.physics.enable(sparky, Phaser.Physics.ARCADE);
		sparky.body.setCircle(120);
		sparky.body.collideWorldBounds = true;
		sparky.body.bounce.set(1.0);
		sparky.body.gravity.set(0,180);
		var velX = 200;
		if(right) { velX = velX * -1; }
		sparky.body.velocity.setTo(velX,200);
		right = !right;
		zaps.add(sparky);
		zap.play();
	}
}
