class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('sand', 'sand.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');

        // BITMAP FONT
        this.load.bitmapFont('unscreen_mk', './fonts/unscreen_mk.png', './fonts/unscreen_mk.xml');
    }
    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0);
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0);
        this.sand = this.add.sprite(0, 0, 'sand').setOrigin(0,0);
        // this.title = this.add.image(game.config.width/2, game.config.height/2, 'title').setOrigin(0.5, 0.5);
        // this.title.setDisplaySize(game.config.width, game.config.height)
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0, 0);
        // menu text configuration
        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '25px',
        //     backgroundColor: 'cyan',
        //     color: 'purple',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }
        this.add.bitmapText(300, game.config.height/2.25, 'unscreen_mk', 'BENEATH THE SEAS ABOVE', 30).setOrigin(0.5);

        // let spaceConfig = {
        //     fontFamily: 'Arial',
        //     fontSize: '20px',
        //     backgroundColor: 'gray',
        //     color: 'black',
        //     align: 'right',
        //     padding: {
        //     top: 5,
        //     bottom: 5,
        //     },
        //     fixedWidth: 100
        // }

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // show menu text
        //menuConfig.backgroundColor = 'cyan';
        //menuConfig.color = '#000';
        //spaceConfig.fixedWidth = 0
        this.add.bitmapText(300, game.config.height/1.4, 'unscreen_mk', 'Press SPACE to start', 18).setOrigin(0.5);

        this.add.bitmapText(game.config.width/2, 300,'unscreen_mk', 'Music and sound effects from Freesound.org', 14).setOrigin(0.5);

        // this.add.text(130, 300, `Music and sound effects from Freesound.org`, {
        //     fontFamily: 'Courier',
        //     fontSize: '30px',
        //     color: '#ffffff'
        // });
    }


    update() {
        this.bubbles.tilePositionY += 0.25;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('habitatScene');
        }
    }
}
