class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0).setScale(2,2);
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0).setScale(2,2);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.toggle = this.sound.add("menu", {
            volume: 0.75
        });

        this.add.bitmapText(10,10,'unscreen_mk', 'ESC to return to menu', 20);

        this.Credits = [
            'CREDITS',
            'Lead Programmer: Dominic Fanaris',
            'Animation/Writing: Skye',
            'UI/Background/Sound: Gavin Concepcion',
            'Sound effects and music from Freesound.org',
            ' ',
            'Sound creators:',
            'Failure: Leszek_Szary',
            'Pop: Stretchy',
            'Upgrade: Sirkoto51',
            'Ambience: Fission9',
            'Menu: MATRIXXX_',
            ' ',
            'Music: Sea Bottom Segue',
            'Composed by Tomoya Ohtani',
            'https://youtu.be/3CR6kKsy_LA'
        ];
    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.toggle.play();
            this.scene.start('menuScene');
        }
    }

}