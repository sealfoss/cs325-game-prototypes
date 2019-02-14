"use strict";

window.onload = function() {

    var hBound = 1000;
    var vBound = 800;
    
    var game = new Phaser.Game( hBound, vBound, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );



    function preload() {
        // I learned how to load assets from the logo example that phaser came with.
        // This is a heavily modified version of the main.js that came with that demo.

        game.load.image( 'T_ant_white', 'assets/ANT(WHITE,128).png' );
        game.load.audio( 'S_splat', 'assets/mud-splat.wav' );
        game.load.image( 'T_splat', 'assets/bloodSplat01(256).png' );
        game.load.image( 'T_smiley', 'assets/smiley(128).png' );
    }

    
    var killWait = 60 * 3;
    var resetWait = 60 * 5;
    var antCount = 10;
    var playerAnt;
    var splat;
    var text;
    var ants = new Array(antCount);
    var directions = new Array(antCount);
    var travelTimes = new Array(antCount);
    var splats = new Array(antCount + 1);
    var speed = 3;
    var mBound = 3;
    var playing = true;
    var goal;
    var killThreshold = 40;
    var won = false;
    var lost = false;
    var deads = new Array(antCount + 1);
    var squishCount;

    var text;
    
    function create() {
        squishCount = antCount / 2;

        //I got this text section from the default phaser demo.
        var style = { font: "25px Verdana", fill: "00000", align: "center" };
        text = game.add.text( game.world.centerX, 15, "DON'T GET SQUEESHED! - " 
        + squishCount + " SQEESHES LEFT!", style );
        text.anchor.setTo( 0.5, 0.0 );
        game.stage.backgroundColor = "ffffff";


        // initialize the goal
        goal = game.add.sprite(100, 100, 'T_smiley');
        game.physics.enable(goal, Phaser.Physics.ARCADE);
        goal.body.setCircle(32);
        resetGoal();

        // initialize all the ants, including the player
        initAnts();

        splat = game.add.audio('S_splat');
        
    }
    
    function update() {
        if(playing) {
            movePlayer();
            moveAnts();
            checkCollision();

            if(!won) {
                checkMouse();
            }
        } else if(won) {
            resetWait -= 1;

            if(resetWait < 1) {
                won = false;
                lost = false;
                playing = true;
                resetWait = 5 * 60;
                game.state.restart();
            }

        } else if(lost) {
            resetWait -= 1;

            if(resetWait < 1) {
                won = false;
                lost = false;
                playing = true;
                resetWait = 5 * 60;
                game.state.restart();
            }
            
        } else {
            killWait -= 1;

            if(killWait < 1) {
                won = false;
                lost = false;
                playing = true;
                killWait = 3 * 60;
                text.setText("DON'T GET SQUEESHED!");
            }
        }
    }

    

    function killPlayer() {

        if(deads[antCount + 1]  == false) {
            playing = false;
            lost = true;
            playerAnt.alpha = 0;
            splat.play();
            splats[antCount+1] = game.add.sprite(playerAnt.x, playerAnt.y, 'T_splat');
            splats[antCount+1].anchor.setTo(0.5, 0.5);
            splats[antCount+1].scale.setTo(0.7, 0.7);
            deads[antCount + 1] = true;
            text.setText("THE ANT GOT SQUEESHED!");
        }
    }

    function killAnt(ant) {

        if(deads[ant] == false) {
            squishCount -= 1;
            ants[ant].alpha = 0;
            splats[ant] = game.add.sprite(ants[ant].x, ants[ant].y, 'T_splat');
            splats[ant].anchor.setTo(0.5, 0.5);
            splats[ant].scale.setTo(0.7, 0.7);
            splat.play();
            deads[ant] = true;
            text.setText("DON'T GET SQUEESHED! - " + squishCount + " SQEESHES LEFT!");

            if(squishCount < 1) {
                win();
            }
        }
    }


    function checkKill(mX, mY) {
        var xSquared;
        var ySquared;
        var dist;

        xSquared = playerAnt.x - mX;
        xSquared = xSquared * xSquared;

        ySquared = playerAnt.y - mY;
        ySquared = ySquared * ySquared;

        dist = Math.sqrt(xSquared + ySquared);

        if(dist <= killThreshold) {
            killPlayer();
        } else {
            for(var i = 0; i < antCount; i++) {

                xSquared = ants[i].x - mX;
                xSquared = xSquared * xSquared;

                ySquared = ants[i].y - mY;
                ySquared = ySquared * ySquared;
                
                dist = Math.sqrt(xSquared + ySquared);
            
                if(dist <= killThreshold) {
                    killAnt(i);
                }
            }
        }
    }

   

    function checkMouse() {
        if(game.input.activePointer.leftButton.isDown) {
            var posX = game.input.mousePointer.x;
            var posY = game.input.mousePointer.y;
            checkKill(posX, posY);
        }
    }



    function win() {
        playing = false;
        won = true;
        text.setText("THE ANT WON!");
    }

    function resetGoal() {
        var randX = game.rnd.realInRange(64, hBound - 64);
        var randY = game.rnd.realInRange(64, vBound - 64);
        goal.x = randX;
        goal.y = randY;
    }

    function moveAnts() {
        for(var i = 0; i < antCount; i++) {
        
            if(travelTimes[i] < 1) {
                resetAnt(i);
            }
            else if(ants[i].x <= 32 && directions[i] == 3) {
                directions[i] = 1;
                setRot(ants[i], 1);
            } else if(ants[i].x >= hBound - 32 && directions[i] == 1) {
                directions[i] = 3;
                setRot(ants[i], 3)
            } else if(ants[i].y <= 32 && directions[i] == 2) {
                directions[i] = 0;
                setRot(ants[i], 0);
            } else if(ants[i].y >= vBound - 32 && directions[i] == 0) {
                directions[i] = 2;
                setRot(ants[i], 2);
            }

            if(directions[i] == 0) {
                ants[i].y += speed;
            } else if(directions[i] == 1) {
                ants[i].x += speed;
            } else if(directions[i] == 2) {
                ants[i].y -= speed;
            } else if(directions[i] == 3) {
                ants[i].x -= speed;
            }

            travelTimes[i] -= 1;
        }
    }

    function initAnts() {
        var randX;
        var randY;

        // I do this twice so that the player ant is rendered between all of them

        for(var i = 0; i < antCount/2; i++) {
            randX = game.rnd.realInRange(64, 936);
            randY = game.rnd.realInRange(64, 736);

            // generate sprite for ant, at random position
            ants[i] = game.add.sprite(randX, randY, 'T_ant_white');
            ants[i].tint = Math.random() * 0xffffff;
            ants[i].anchor.setTo(0.5, 0.5);

            // set ant's direction and travel time
            resetAnt(i);

            deads[i] = false;
        }

        // init the player's ant so it is hidden in as far as sort order
        playerAnt = game.add.sprite(game.world.centerX,game.world.centerY,'T_ant_white');
        playerAnt.tint = Math.random() * 0xffffff;
        playerAnt.anchor.setTo(0.5, 0.5);
        game.physics.enable(playerAnt, Phaser.Physics.ARCADE);
        playerAnt.body.setCircle(32);
        playerAnt.body.collideWorldBounds = true;
        
        // set the player to a random rotation
        var initRot = game.rnd.integerInRange(0, 3);
        setRot(playerAnt, initRot);

        // set the player to a random position
        randX = game.rnd.realInRange(64, 936);
        randY = game.rnd.realInRange(64, 736);
        playerAnt.x = randX;
        playerAnt.y = randY;

        deads[antCount + 1] = false;

        for(var i = antCount/2; i < antCount; i++) {
            randX = game.rnd.realInRange(64, 936);
            randY = game.rnd.realInRange(64, 736);

            // generate sprite for ant, at random position
            ants[i] = game.add.sprite(randX, randY, 'T_ant_white');
            ants[i].tint = Math.random() * 0xffffff;
            ants[i].anchor.setTo(0.5, 0.5);

            // set ant's direction and travel time
            resetAnt(i);

            deads[i] = false;
        }
    }

    function resetAnt(antIndex) {
        // set ant to random direction to move towards
        directions[antIndex] = game.rnd.integerInRange(0, 3);
        setRot(ants[antIndex], directions[antIndex]);
        // set a length of time for the ant to move in that direction for
        travelTimes[antIndex] = 60 * game.rnd.realInRange(1, mBound);

        //random chance to stop the ant
        if(game.rnd.integerInRange(1, 1000) % 7 == 0) {
            directions[antIndex] = 4;
        }
    }

    function setRot(sprite, rot) {
        if(rot == 0) {
            sprite.angle = 180;
        } else if(rot == 1) {
            sprite.angle = 90;
        } else if(rot == 2) {
            sprite.angle = 0;
        } else if(rot == 3) {
            sprite.angle = 270;
        }
    }

// I used examples from this tutorial to figure out the collision system:
//https://www.joshmorony.com/phaser-fundamentals-handling-collisions/
    function checkCollision() {
        game.physics.arcade.overlap(playerAnt, goal, win);
    }

    //I used this tutorial for keyboard input:
    //https://phaser.io/docs/2.4.4/Phaser.Keyboard.html
    function movePlayer() {
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.A))
        {
            if(playerAnt.angle != 270) { playerAnt.angle = 270; }
            playerAnt.x -= speed;
            return;
        }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.D))
        {
            if(playerAnt.angle != 90) { playerAnt.angle = 90; }
            playerAnt.x += speed;
            return;
        }

        if (game.input.keyboard.isDown(Phaser.KeyCode.W))
        {
            if(playerAnt.angle != 0) { playerAnt.angle = 0; }
            playerAnt.y -= speed;
            return;
        }
        else if (game.input.keyboard.isDown(Phaser.KeyCode.S))
        {
            if(playerAnt.angle != 180) { playerAnt.angle = 180; }
            playerAnt.y += speed;
            return;
        }

    }

};
