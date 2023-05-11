class Intro extends Phaser.Scene 
{
    constructor ()
    {
        super('intro');
    }

    create () 
    {

    }

    update () 
    {

    }
}

class Scene1 extends Phaser.Scene 
{
    constructor ()
    {
        super('scene1');
    }

    create () 
    {

    }

    update () 
    {

    }
}

let config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    scene: [Scene1],
    title: "Physics Game"
}

const game = new Phaser.Game(config);