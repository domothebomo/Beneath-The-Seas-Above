class Upgrade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, price, action) {
        super(scene, x, y, sprite);
      
        this.scene = scene;
        this.price = price;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.alpha = 0.8;

        this.purchased = false;
        this.unlocked = false;

        //this.infoBorder = this.scene.add.rectangle(this.x, this.y + 22, 150, 14, '#FFFFFF').setOrigin(0.5,0.5);
        //this.info = this.scene.add.bitmapText(this.x, this.y + 20, 'unscreen_mk', 'Unlocks Minoclops').setOrigin(0.5,0.5);
        //this.infoBorder.width = this.info.width + 5;
        //this.infoBorder.x = this.x;
        this.priceDisplay = this.scene.add.bitmapText(this.x - 10, this.y - 20, 'unscreen_mk', this.price).setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8);
        this.currencyDisplay = this.scene.add.sprite(this.x + 15, this.y - 20, 'biomass').setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8);

        //action();

        this.setInteractive({
            useHandCursor: true
        });
        this.on('pointermove', () => {
            //console.log('dog');
            this.infoBorder.alpha = 1;
            this.info.alpha = 1;
        });
        this.on('pointerout', () => {
            //console.log('bye');
            this.infoBorder.alpha = 0;
            this.info.alpha = 0;
        });
        this.on('pointerdown', () => {
            if (!this.purchased && this.unlocked && this.price <= playerBiomass) {
                this.scene.upgradeSound.play();
                action();
                this.purchased = true;
                this.check = this.scene.add.sprite(this.x, this.y, 'check').setDepth(100);
                playerBiomass -= this.price;
            } else {
                this.scene.denied.play();
            }
            //console.log('dog');
        });

    }

    update() {
        this.y = this.scene.techPanel.y - 50;
        this.infoBorder.y = this.y + 22;
        this.info.y = this.y + 20;
        if (this.purchased) {
            this.check.y = this.y;
        }
        this.priceDisplay.y = this.y - 20;
        this.currencyDisplay.y = this.y - 18;
    }
}