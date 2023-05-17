class Prefab extends Phaser.Scene 
{
    constructor (key)
    {
        super(key);
    }

    preload () 
    {
        this.load.image('ghost', 'assets/Mega-Ghost.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('coin', 'assets/coin.png');

    }

    create () 
    {
        //this.transitionDuration = 1000;
        //this.counter = 0;

        this.cameras.main.setBackgroundColor('#7393B3');
        this.ghost = this.physics.add.sprite(100, 900, 'ghost');
        
        this.coin = this.physics.add.staticGroup();
        this.coin.create(900, 100, 'coin').setScale(0.1).refreshBody();

        //this.coin.setScale(0.1);

        this.ghost.setCollideWorldBounds(true);
        this.ghost.setScale(0.25);

        // sets movement and add keys
        this.keys = this.input.keyboard.addKeys("A, D, SPACE"); //disabled 'W' & 'S'"
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 1020, 'ground').setScale(2).refreshBody();
        this.physics.add.collider(this.ghost, this.platforms); // sets collision between ground and ghost
        this.physics.add.overlap(this.ghost, this.coin, this.collectCoin, null, this);

        //this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
    }

    typeWrite(textBox, textString, index, speed) 
    {
        
        if (index < textString.length) 
        {
            textBox.text += textString.charAt(index);
            index += 1;

            this.time.delayedCall(speed, () => {
                this.typeWrite(textBox, textString, index, speed);
            });
        }
    }

    randomNum ()
    {
        let min = Math.ceil(1);
        let max = Math.floor(25000);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    // bottom two functins need a rework dont work as intended

    randomNum ()
    {
        let min = Math.ceil(1);
        let max = Math.floor(25000);

        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    setTargets (target, key) 
    {
        this.targetCoins = target;
        this.coinsCollected = 0;
        this.nextScene = key;
    }
    

    collectCoin(ghost, coin) 
    {
        // Remove the coin from the game
        coin.disableBody(true, true);
    
        // Increase the counter
        this.coinsCollected += 1;
    
        // Check if the target has been reached
        if (this.coinsCollected >= this.targetCoins) {
            // Reset the counter
            this.coinsCollected = 0;
    
            // Make a delayed call
            this.time.delayedCall(2000, () => this.scene.start(this.nextScene));
        }
    }
    
    /*collectCoin(ghost, coin) 
    {
        coin.disableBody(true, true);
    }
    */

    update () 
    {
        // the following code is for allowing the ghost sprite to move
        const speed = 4;
        // disabled 'W' & 'S'
        /*
        if(this.keys.W.isDown)
        {
            this.ghost.y -= speed;
        }

        if(this.keys.S.isDown)
        {
            this.ghost.y += speed;
        }
        */
        if(this.keys.A.isDown)
        {
            this.ghost.x -= speed;
            this.ghost.flipX = false;
        }

        if(this.keys.D.isDown)
        {
            this.ghost.x += speed;
            this.ghost.flipX = true;
        }

        if(this.keys.SPACE.isDown && this.ghost.body.touching.down)
        {
            this.ghost.setVelocityY(-370);
        }

        if (this.ghost.y >= this.physics.world.bounds.height - 70) {
            this.ghost.setPosition(100, 900);
            this.ghost.setVelocity(0);
        }
        
        //this.physics.add.collider(this.ghost, this.ground);

    }
}