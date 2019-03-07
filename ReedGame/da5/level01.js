var Level01 = function(game){
    var Player;
    var Bricks;
    var MoveSpeed;
    var Stabbers;
    var jumpTimer;
    var cursors;
    var jumpButton;
    var canjump;
    var upReset;
    var moveThreshold;
    var speedConstant;
    var gravConstant;
    var playing;
    var Smiley;
    var countDown;
    var hooray;
    var scream;
    var jump;
}


Level01.prototype = {
	preload: function() {
		this.game.load.audio("jumpSound", "assets/flappyguy/jump05.wav");
		this.game.load.audio("zapSound", "assets/flappyguy/zap.wav");
        this.game.load.audio("screamSound", "assets/flappyguy/scream.wav");
        this.game.load.audio("hooraySound", "assets/MaggyRedo/hooray.wav");
	},
	create: function() {
        speedConstant = 50000;
        moveThreshold = 400;
        gravConstant = 200;
        upReset = true;
        canJump = false;
        jumpTimer = 0;
        MoveSpeed = 10;
        Bricks = this.game.add.group();
        Stabbers = this.game.add.group();
        cursors = this.game.input.keyboard.createCursorKeys();
        jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.stage.backgroundColor = "#60f1ff";
        jump = this.game.add.audio("jumpSound");
        scream = this.game.add.audio("screamSound");
        hooray = this.game.add.audio("hooraySound");
        playing = true;
        countDown = 60 * 3;
        
        this.initPlayer();
        this.initSmiley();
        this.buildPlatforms();
        this.initStabbers();
        
	},
	update: function() {
        if(playing) {
            this.detectCollision();
            this.attack();
            this.controlPlayer();
        } else {
            this.game.state.start("GameOver");
        }
    },
    attack: function() {
        for (var i = 0, len = Stabbers.children.length; i < len; i++) {
            var Stabby = Stabbers.children[i];
            var angle = this.game.physics.arcade.angleBetween(Player, Stabby);
            Stabby.rotation = angle -90;
            var dist = this.getDistance(Player.x, Player.y, Stabby.x, Stabby.y);

            if(dist <= moveThreshold) {
                var speed = speedConstant/dist;
                this.game.physics.arcade.moveToObject(Stabby, Player, speed);
                Stabby.body.velocity.y += gravConstant;
            }
        }
    },
    getDistance: function(x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        x = x * x;
        y = y * y;
        return Math.sqrt(x + y);
    },
    controlPlayer: function() {
        Player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            Player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown) {
            Player.body.velocity.x = 150;
        }
        
        if (upReset && canJump && cursors.up.isDown && jumpTimer == 0) {
            Player.body.velocity.y = -600;
            jumpTimer = 60 * 1;
            canJump = false;
            upReset = false;
            jump.play();
        }

        if (!upReset && !cursors.up.isDown) {
            upReset = true;
        }

        if(jumpTimer > 0) {
            jumpTimer = jumpTimer - 1;
        }
    },
    detectCollision() {
        this.game.physics.arcade.collide(Player, Bricks, this.resetJump);
        this.game.physics.arcade.collide(Stabbers, Bricks);
        this.game.physics.arcade.collide(Stabbers, Stabbers);
        this.game.physics.arcade.overlap(Player, Stabbers, this.death);
        this.game.physics.arcade.overlap(Player, Smiley, this.win);
    },
    win: function() {
        hooray.play();
        playing = false;
    },
    death: function() {
        scream.play();
        playing = false;
    },
    resetJump: function() {
        canJump = true;
    },
    initPlayer: function() {
        Player = this.game.add.sprite(32, (800-100), "IMG_Maggy");
        this.game.physics.enable(Player, Phaser.Physics.ARCADE);
        Player.body.setCircle(30);
		Player.body.collideWorldBounds = true;
		Player.body.bounce.y = 0.125;
        Player.body.gravity.set(0, 720);
    },
    initSmiley: function() {
        Smiley = this.game.add.sprite(1800 - 64, 64, "IMG_Smiley");
        this.game.physics.enable(Smiley, Phaser.Physics.ARCADE);
        Smiley.anchor.setTo(0.5,0.5);
        Smiley.body.setCircle(64);
    },
    initStabbers: function() {
        this.initStabber(600, 800);
        this.initStabber(400, 100);
        this.initStabber(1000, 800);
        this.initStabber(1600, 800);
        this.initStabber(900, 100);
    },
    initStabber: function(posX, posY) {
        var Stabber = this.game.add.sprite(posX, posY, "IMG_Stabby");
        this.game.physics.enable(Stabber, Phaser.Physics.ARCADE);
        Stabber.anchor.setTo(0.5,0.5);
        Stabber.body.setCircle(40);
        Stabber.body.collideWorldBounds = true;
        Stabber.body.bounce.x = 0.1;
        Stabber.body.bounce.y = 0.4;
        Stabber.body.gravity.set(0, 180);
        Stabbers.add(Stabber);
    },
    buildPlatforms: function() {
        this.buildPlatform(0, (900-64), (1800/64)); // floor
        this.buildPlatform((4*64), 900-(4*64), 6);
        this.buildPlatform(0, 900-(7*64), 3);
        this.buildPlatform(700, 900-(6*64), 4);
        this.buildPlatform(800, 128, 4);
        this.buildPlatform((5*64), 900-(10*64), 6);
        this.buildPlatform(1800 - (64*4), 900-(7*64), 4);
        this.buildPlatform(1800 - (9*64), 900-(10*64), 3);
        this.buildPlatform(1800 - (64*4), 900-(12*64), 4);
        this.buildPlatform((18*64), 900-(4*64), 4);
    },
    buildPlatform: function(x, y, size) {
        for(var i = 0; i < size; i++) {
            var PosX = x + (i * 64);
            var NewBrick = this.game.add.sprite(PosX, y, "IMG_Bricks");
            this.game.physics.enable(NewBrick, Phaser.Physics.ARCADE);
            NewBrick.body.immovable = true;
            Bricks.add(NewBrick);
        }
    }
}
