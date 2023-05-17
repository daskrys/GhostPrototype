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
            this.time.delayedCall(500, () => this.scene.start('levelone'));
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

    preload ()
    {
        super.preload(); // preloads prefabs assets
    }

    create ()
    {   

        super.create();
        this.add.text(100, 300, "Collect Coints to Advance!").setFontSize(30);
        this.add.text(100, 200, "Move Left: 'A' Key\nMove Right: 'D' Key\nJump: SPACE Key").setFontSize(30);
        this.platforms.create(1600, 900, 'ground').setScale(1.5).refreshBody();
        this.platforms.create(450, 700, 'ground').setScale(1.5).refreshBody();
        this.platforms.create(1600, 500, 'ground').setScale(1.5).refreshBody();
        // add a second coin
        this.setTargets(2, 'leveltwo');
        //this.coinTwo = this.physics.add.staticGroup();
        this.coin.create(1000, 700, 'coin').setScale(0.1).refreshBody();
       
        //this.physics.add.overlap(this.ghost, this.coin, this.collectCoin, null, this);
    }

    update ()
    {
        super.update(); // updates from prefab
    }
}

class LevelTwo extends Prefab 
{
    constructor ()
    {
        super('leveltwo');
    }

    create ()
    {   
        super.create();
        // create more platforms
        this.platforms.create(200, 580, 'ground').setScale(1.5).refreshBody();
        this.platforms.create(1600, 580, 'ground').setScale(1.5).refreshBody();
        this.platforms.create(1200, 800, 'ground').setScale(1.5).refreshBody();
        this.platforms.create(-50, 380, 'ground').setScale(1.5).refreshBody();

        // create more coints
        this.setTargets(4, 'levelthree'); // sets the coin target and next scene must be specified
        
        this.coin.create(600, 300, 'coin').setScale(0.1).refreshBody();
        this.coin.create(800, 600, 'coin').setScale(0.1).refreshBody();
        this.coin.create(1600, 300, 'coin').setScale(0.1).refreshBody();
        this.createEnemy();
        let enemy = this.enemy.create(1500, 500, 'enemy').setScale(0.5);

       let shootEvent = this.time.addEvent({
            delay: 4000, // needs to be 2900 good middle ground so its not too difficult
            callback: function () {this.shootProjectile(enemy)},
            callbackScope: this,
            loop: true
        });

        this.events.on('enemyDestroyed', function() {
            // Remove the timed event
            shootEvent.remove();
        }, this);
        
        this.tweens.add({
            targets: enemy,
            x: { from: enemy.x - 200, to: enemy.x },
            alpha: { from: 0, to: 1 },
            ease: 'linear',
            duration: 2000,
            repeat: -1
        });
      //  this.physics.add.overlap(this.ghost, this.coinTwo, this.collectCoin, null, this);
    }

    preload ()
    {
        super.preload();
    }

    update () 
    {
        super.update();
    }
}

class LevelThree extends Prefab
{
    constructor () 
    {
        super('levelthree');
    }

    preload () 
    {
        super.preload();
    }

    create () 
    {   
        super.create();

        this.setTargets(4, 'outro');

        this.platforms.create(1350, 800, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(1350, 400, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(1750, 600, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(1750, 200, 'ground').setScale(0.5).refreshBody();

        this.coin.create(1350, 700, 'coin').setScale(0.1).refreshBody();

        this.platforms.create(150, 800, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(550, 600, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(150, 400, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(850, 400, 'ground').setScale(0.5).refreshBody();

        this.coin.create(550, 500, 'coin').setScale(0.1).refreshBody();
        this.coin.create(1750, 100, 'coin').setScale(0.1).refreshBody();

        this.createEnemy();
        let enemy = this.enemy.create(1800, 150, 'enemy').setScale(0.5);
        let enemyTwo = this.enemy.create(100, 300, 'enemy').setScale(0.5);

       let shootEvent = this.time.addEvent({
            delay: 4000, // needs to be 2900 good middle ground so its not too difficult
            callback: function () {this.shootProjectile(enemy)},
            callbackScope: this,
            loop: true
        });

        this.events.on('enemyDestroyed', function() {
            // Remove the timed event
            shootEvent.remove();
        }, this);
        
        this.tweens.add({
            targets: enemy,
            x: { from: enemy.x - 200, to: enemy.x },
            alpha: { from: 0, to: 1 },
            ease: 'linear',
            duration: 2000,
            repeat: -1
        });

        let shootEventTwo = this.time.addEvent({
            delay: 4000, // needs to be 2900 good middle ground so its not too difficult
            callback: function () {this.shootProjectile(enemyTwo)},
            callbackScope: this,
            loop: true
        });

        this.events.on('enemyDestroyed', function() {
            // Remove the timed event
            shootEventTwo.remove();
        }, this);
        
        this.tweens.add({
            targets: enemyTwo,
            x: { from: enemyTwo.x - 100, to: enemyTwo.x },
            alpha: { from: 0, to: 1 },
            ease: 'linear',
            duration: 2000,
            repeat: -1
        });
    }


    update ()
    {
        super.update();
    }
}

class Outro extends Phaser.Scene {
    constructor() 
    {
        super('outro');
    }
    create() {
        this.cameras.main.setBackgroundColor('#4F4B5A');

        let credits = this.add.text(450, 540, "Programming & Art - Christian Perez \nTools Used - Adobe Illustrator, GarageBand, Phaser 3.60");
        credits.setFontSize(30);

        this.tweens.add({
            targets: credits,
            y: {from: 540, to: 150},
            ease: 'linear',
            duration: 2500,
        })
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    //scene: [Outro],
    scene: [Intro, LevelOne, LevelTwo, LevelThree, Outro],
    title: "Ghost Prototype",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    }
}

const game = new Phaser.Game(config);