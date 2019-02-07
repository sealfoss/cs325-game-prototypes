"use strict";

window.onload = function() {
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );



    function preload() {
        // I learned how to load assets from the logo example that phaser came with.
        // This is a heavily modified version of the main.js that came with that demo.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('background', 'assets/GrassPhotoRepeat1(256).jpg');
        game.load.image( 'maggy', 'assets/Maggy01(64).png' );
        game.load.image('knife', 'assets/dagger01(64x128).png');
        game.load.image('brick', 'assets/bricks01(64).png');
        game.load.image('smiley', 'assets/smiley(128).png');
        game.load.audio('deathSound', 'assets/mud-splat.wav');
    }
    
    var maggySprite;
    var smileySprite;
    var moveSpeed = 4;
    var knives = new Array(4);
    var bricks = new Array(10);
    var text;
    var knivesGroup;
    var bricksGroup;
    var attacking;
    var splat;
    var soundStop;
    
    function create() {

        //I got this text section from the default phaser demo.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        text = game.add.text( game.world.centerX, 15, "Don't get stabbed!", style );
        text.anchor.setTo( 0.5, 0.0 );
        game.stage.backgroundColor = "228b22";

        maggySprite = game.add.sprite(game.world.centerX,game.world.centerY,'maggy');
        maggySprite.anchor.setTo(0.5, 0.5);
        game.physics.enable( maggySprite, Phaser.Physics.ARCADE );
        maggySprite.body.collideWorldBounds = true;
        
        maggySprite.body.onCollide = new Phaser.Signal();
        knivesGroup = this.game.add.group();
        bricksGroup = this.game.add.group();

        // I used this demo to figure out how to play sounds:
        // https://phaser.io/examples/v2/audio/sound-complete
        splat = game.add.audio('deathSound');
        soundStop = false;

        attacking = true;
        initKnives();
        initBricks();
        initSmiley();

        game.time.events.add(Phaser.Timer.SECOND * 4, reset, this);

    }
    
    function update() {
        move();
        attack();
        handleCollisions();
    }

// I used examples from this tutorial to figure out the collision system:
//https://www.joshmorony.com/phaser-fundamentals-handling-collisions/
    function handleCollisions() {
        game.physics.arcade.overlap(maggySprite, smileySprite, win);
        game.physics.arcade.overlap(maggySprite, knivesGroup, death);
        game.physics.arcade.collide(bricksGroup, knivesGroup);
    }

    function win() {
        text.setText("You didn't get stabbed!");

        if(!soundStop) {
            splat.play();
            soundStop = true;
        }

        attacking = false;

        reset();
    }

    function death() {
        text.setText("You got stabbed!");


        if(!soundStop) {
            splat.play();
            soundStop = true;
        }

        attacking = false;

        reset();
    }

    function reset() {
        knivesGroup.setAll('body.velocity.x', 0);

        knives[0].x = 0;
        knives[0].y = 0;

        knives[1].x = 800;
        knives[1].y = 0;

        knives[2].x = 0;
        knives[2].y = 600;

        knives[3].x = 800;
        knives[3].y = 600;

        smileySprite.x = game.rnd.realInRange(50, 750);
        smileySprite.y = game.rnd.realInRange(50, 550);

        for(var i = 0; i < bricks.length; i++) {
            bricks[i].x = game.rnd.realInRange(50, 750);
            bricks[i].y = game.rnd.realInRange(50, 550);
        }

        maggySprite.x = game.world.centerX;
        maggySprite.y = game.world.centerY;

        text.setText("Don't get stabbed!");
        
        attacking = true;
        soundStop = false;
    }

    function initSmiley() {
        var randX = game.rnd.realInRange(50, 750);
        var randY = game.rnd.realInRange(50, 550);
        smileySprite = game.add.sprite(randX, randY, 'smiley');
        smileySprite.scale.setTo(0.5, 0.5);
        game.physics.enable(smileySprite, Phaser.Physics.ARCADE);
    }

    function initBricks() { 
        for(var i = 0; i < bricks.length; i++) {
            var randX = game.rnd.realInRange(50, 750);
            var randY = game.rnd.realInRange(50, 550);
            bricks[i] = game.add.sprite(randX, randY, 'brick');
            bricks[i].anchor.setTo(0.5, 0.5);
            game.physics.enable(bricks[i], Phaser.Physics.ARCADE);
            bricks[i].body.collideWorldBounds = true;
            bricks[i].body.immovable = true;
            bricksGroup.add(bricks[i]);
        }
    }

    function initKnives() {
        knives[0] = game.add.sprite(0, 0, 'knife');
        knives[1] = game.add.sprite(800, 0, 'knife');
        knives[2] = game.add.sprite(0, 600, 'knife');
        knives[3] = game.add.sprite(800, 600, 'knife');

        for(var i = 0; i < knives.length; i++) {
            knives[i].anchor.setTo(0.5, 0.5);
            game.physics.enable( knives[i], Phaser.Physics.ARCADE );
            knives[i].body.bounce.setTo(5,5);
            knives[i].body.collideWorldBounds = true;
            knivesGroup.add(knives[i]);
        }
    }

    // I used this tutorial to figure out how to move sprites towards a target:
    // http://www.html5gamedevs.com/topic/10664-move-sprite-towards-another-sprite/
    function attack() {
        var attackSpeed;

        if(attacking) {attackSpeed = 150;}
        else { attackSpeed = 0;}

        for(var i = 0; i < knives.length; i++) {
            game.physics.arcade.moveToObject(knives[i], maggySprite, attackSpeed);
            knives[i].rotation = Math.atan2(maggySprite.y - knives[i].y, maggySprite.x - knives[i].x) +90;
        }

    }


    //I used this tutorial for keyboard input:
    //https://phaser.io/docs/2.4.4/Phaser.Keyboard.html
    function move() {
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            maggySprite.x += -1*moveSpeed;
        }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            maggySprite.x += moveSpeed;
        }

        if (game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            maggySprite.y += -1*moveSpeed;
        }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            maggySprite.y += moveSpeed;
        }

    }

};
