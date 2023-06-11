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
    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.toggle.play();
            this.scene.start('menuScene');
        }
    }
}