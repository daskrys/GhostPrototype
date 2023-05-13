class Prefab extends Phaser.Scene 
{
    constructor (key)
    {
        super(key);
    }

    preload () 
    {

    }

    create () 
    {

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
    addKeys (newSprite, newKeys)
    {
        this.newKeys = this.input.keyboard.addKeys("W, A, S, D");
    }

    movement (newSprite, newKeys)
    {
        const speed = 4;

        // Update the ghost's position based on the keys being pressed this is for controls
        // commented out for animation needs to be rewritten
        if (this.keys.W.isDown) 
        {
            this.newSprite.y -= speed;
        }

        if (this.keys.A.isDown) 
        {
            this.newSprite.x -= speed;
            this.newSprite.flipX = false;
        }

        if (this.keys.S.isDown) 
        {
            this.newSprite.y += speed;
        }

        if (this.keys.D.isDown) 
        {
            this.newSprite.x += speed;
            this.newSprite.flipX = true;
        }
    }

    randomNum ()
    {
        let min = Math.ceil(1);
        let max = Math.floor(25000);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    update () 
    {

    }
}