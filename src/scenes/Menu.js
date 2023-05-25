class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0);
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0);
        this.sand = this.add.sprite(0, 0, 'sand').setOrigin(0,0);
        // this.title = this.add.image(game.config.width/2, game.config.height/2, 'title').setOrigin(0.5, 0.5);
        // this.title.setDisplaySize(game.config.width, game.config.height)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0, 0);
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2, 'BEYOND THE SEAS ABOVE', menuConfig).setOrigin(0.5);

        let directionConfig = {
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: 'cyan',
            color: 'purple',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // show menu text
        menuConfig.backgroundColor = 'cyan';
        menuConfig.color = '#000';
        directionConfig.fixedWidth = 0
        this.add.text(game.config.width/2, game.config.height/1.4 + borderUISize + borderPadding, 'Press SPACE to start', menuConfig).setOrigin(0.5);


        // Initialize variables
        this.currentTime = 0;
        this.bestTime = game.bestTime || 0;


        this.add.text(125, 440, `Music and sound effects from Freesound.org`, {
            fontFamily: 'Courier',
            fontSize: '15px',
            color: '#ffffff'
        });
    }


    update() {
        this.bubbles.tilePositionY += 0.25;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('habitatScene');
        }
    }


}

