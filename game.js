class Intro extends Prefab // maybe change intro to an animation & then have the start screen
{
    constructor ()
    {
        super('intro');
    }

    preload ()
    {
        this.load.image('studio', 'assets/MegaGhostStudios.png');
    }

    create () 
    {
        this.cameras.main.setBackgroundColor('#4F4B5A');
        //this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.studio = this.add.image(960, 540, 'studio');
        //this.studio.setScale(0.70);
       this.add.text(750,950, "Click anywhere to begin.", {color: '#000000'}).setFontSize(30);
       
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('PLACEHOLDER FOR NEXT SCENE'));
        });
    }

    update () 
    {

    }
}

class LevelOne extends Prefab
{
    constructor()
    {
        super('levelone');
    }

    create ()
    {

    }

    update ()
    {
        
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Intro],
    title: "Ghost Prototype"
}

const game = new Phaser.Game(config);