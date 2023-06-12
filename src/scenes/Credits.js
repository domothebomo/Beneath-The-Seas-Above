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

        this.credits = 
            `CREDITS\nLead Programmer: Dominic Fanaris\nAnimation/Writing: Skye Crockett\nUI/Background/Sound: Gavin Concepcion\n\nSound effects from Freesound.org\n\nSound creators:\nfailure by Leszek_Szary\nItem pickup sound by Stretchy\nRPG SFX #1 - Item Jingle  Sirkoto51\nUnderwater Ambience: Fission9\nSciFi Inspect Sound, UI, or In-Game Notification 01 by MATRIXXX_\nHorror Inspect Sound, UI, or In-Game Notification 01 by MATRIXXX_\n\nMusic: Deep Blue by Benjamin Tissot\nhttps://www.bensound.com/free-music-for-videos\nLicense code: S4RHKPB7RZ0PZCYS`;

        this.add.bitmapText(50,50, 'unscreen_mk', this.credits, 27);
    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.toggle.play();
            this.scene.start('menuScene');
        }
    }

}