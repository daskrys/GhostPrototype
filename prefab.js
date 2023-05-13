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

    }

    create () 
    {
        //this.transitionDuration = 1000;

        this.cameras.main.setBackgroundColor('#7393B3');
        this.ghost = this.physics.add.sprite(100, 200, 'ghost');
        this.ghost.setScale(0.25);

        // sets movement and add keys
        this.keys = this.input.keyboard.addKeys("W, A, S, D, SPACE");
        this.ground = this.physics.add.staticGroup();
        this.ground.create(960, 1060, 'ground').setScale(3).refreshBody();


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

    update () 
    {
        // the following code is for allowing the ghost sprite to move
        const speed = 4;

        if(this.keys.W.isDown)
        {
            this.ghost.y -= speed;
        }

        if(this.keys.A.isDown)
        {
            this.ghost.x -= speed;
            this.ghost.flipX = false;
        }

        if(this.keys.S.isDown)
        {
            this.ghost.y += speed;
        }

        if(this.keys.D.isDown)
        {
            this.ghost.x += speed;
            this.ghost.flipX = true;
        }

        if(this.keys.SPACE.isDown && this.ghost.body.touching.down)
        {
            this.ghost.setVelocityY(-50);
        }

        //this.physics.add.collider(this.ghost, this.ground);

    }
}