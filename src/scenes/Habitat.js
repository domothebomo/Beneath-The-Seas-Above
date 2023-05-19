class Habitat extends Phaser.Scene {
    constructor() {
        super('habitatScene');
    }

    preload() {
        this.load.path = './assets/';
        //this.load.image('background', 'background.png');
        this.load.image('sand', 'sand.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');

        this.load.image('minoclops', 'minoclops.png');
        this.load.image('sea_stinger', 'sea_stinger.png');
        this.load.image('choral', 'choral.png');
    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0);
        //this.water = this.add.tileSprite(0, 0, 600, 400, 'water');
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0);
        this.sand = this.add.sprite(0, 0, 'sand').setOrigin(0,0);


        this.fish1 = this.add.sprite(200, 250, 'minoclops');
        this.fish1.flipX = true;
        this.fish2 = this.add.sprite(250, 350, 'sea_stinger');
        this.fish2.flipX = true;
        this.plant = this.add.sprite(100, 325, 'choral');
    }

    update() {
        this.bubbles.tilePositionY += 0.25;
    }
}