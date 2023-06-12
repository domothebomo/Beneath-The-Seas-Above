class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // PATH
        this.load.path = './assets/';

        // AUDIO
        this.load.audio('menu', './audio/menu.wav');
        this.load.audio('underwater', './audio/deepblue.mp3');

        //BACKGROUND
        this.load.image('sand', 'sand2.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');
        this.load.image('facility', 'facility-interior.png')

        // BUTTON
        this.load.image('pause', 'pause-button.png');

        // BITMAP FONT
        this.load.bitmapFont('unscreen_mk', './fonts/unscreen_mk.png', './fonts/unscreen_mk.xml');
    }
    create() {
        // BACKGROUND
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0).setScale(2,2);
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0).setScale(2,2);
        this.sand = this.add.sprite(0, 0, 'sand').setOrigin(0,0).setScale(2,2);
        this.facility = this.add.sprite(0, 0, 'facility').setOrigin(0,0).setScale(2,2);

        // TITLE
        this.add.bitmapText(game.config.width / 2, game.config.height/2.25 - 30, 'unscreen_mk', 'BENEATH THE SEAS ABOVE', 80).setOrigin(0.5);

        // SOUNDS
        this.toggle = this.sound.add("menu", {
            volume: 0.75
        });
        if (!music) {
            music = this.sound.add("underwater", {
                volume: 0.1,
                loop: true
            });
        }   
        if (!music.isPlaying) {
            music.play()
        }

        // PLAY BUTTON
        this.startButton = this.add.image(game.config.width/2, game.config.height/2 + 40, 'pause').setOrigin(0.5,0.5).setScale(3.5,2).setDepth(200);
        this.startButtonText = this.add.bitmapText(this.startButton.x, this.startButton.y - 5, 'unscreen_mk', 'PLAY', 30, 1).setOrigin(0.5, 0.5).setDepth(200);
        this.startButton.setInteractive({
            useHandCursor: true
        });
        this.startButton.on('pointerdown', () => {
            this.toggle.play();
            this.scene.start('habitatScene');
        });

        // CREDITS BUTTON
        this.creditsButton = this.add.image(game.config.width/2, game.config.height/2 + 120, 'pause').setOrigin(0.5,0.5).setScale(3.5,2).setDepth(200);
        this.creditsButtonText = this.add.bitmapText(this.creditsButton.x, this.creditsButton.y - 5, 'unscreen_mk', 'CREDITS', 30, 1).setOrigin(0.5, 0.5).setDepth(200);
        this.creditsButton.setInteractive({
            useHandCursor: true
        });
        this.creditsButton.on('pointerdown', () => {
            this.toggle.play();
            this.scene.start('creditsScene');
        });
    }


    update() {
        
        this.bubbles.tilePositionY += 0.25;

    }
}


