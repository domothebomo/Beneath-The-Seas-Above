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
            'Animation/Writing: Skye Crockett',
            'UI/Background/Sound: Gavin Concepcion',
            'Sound effects and music from Freesound.org',
            ' ',
            'Sound creators:',
            'failure by Leszek_Szary',
            'Item pickup sound by Stretchy',
            'RPG SFX #1 - Item Jingle  Sirkoto51',
            'Underwater Ambience: Fission9',
            'SciFi Inspect Sound, UI, or In-Game Notification 01 by MATRIXXX_',
            'Horror Inspect Sound, UI, or In-Game Notification 01 by MATRIXXX_',
            'Music: Deep Blue by Benjamin Tissot',
            'https://www.bensound.com/free-music-for-videos',
            'License code: S4RHKPB7RZ0PZCYS'
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