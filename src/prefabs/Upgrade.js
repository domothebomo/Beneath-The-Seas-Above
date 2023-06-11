class Upgrade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, price, action, desc) {
        super(scene, x, y, sprite);
      
        this.scene = scene;
        this.price = price;
        this.icon = sprite;
        this.desc = desc;
        this.offset = this.scene.techPanel.y - y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.alpha = 0.8;
        this.setScale(2,2);
        this.setTexture('unknown');

        //this.offset =  - y;

        this.purchased = false;
        this.unlocked = false;

        //this.infoBorder = this.scene.add.rectangle(this.x, this.y + 22, 150, 14, '#FFFFFF').setOrigin(0.5,0.5);
        //this.info = this.scene.add.bitmapText(this.x, this.y + 20, 'unscreen_mk', 'Unlocks Minoclops').setOrigin(0.5,0.5);
        //this.infoBorder.width = this.info.width + 5;
        //this.infoBorder.x = this.x;
        //this.priceDisplay = this.scene.add.bitmapText(this.x - 20, this.y - 20, 'unscreen_mk', this.price, 20).setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8);
        //this.currencyDisplay = this.scene.add.sprite(this.x + 25, this.y - 20, 'biomass').setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8).setScale(2,2);
        this.infoBorder = this.scene.add.rectangle(this.x, this.y + 30, 140, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(101).setScale(2,2);
        this.unknownBorder = this.scene.add.rectangle(this.x, this.y + 30, 25, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(101).setScale(2,2);
        this.info = this.scene.add.bitmapText(this.x, this.y + 40, 'unscreen_mk', '???', 20).setOrigin(0.5,0.5).setAlpha(0).setDepth(101);

        this.priceDisplay = this.scene.add.bitmapText(this.x - 20, this.y - 20, 'unscreen_mk', this.price, 20).setOrigin(0.5,0.5).setDepth(101).setAlpha(0).setLeftAlign();
        this.currencyDisplay = this.scene.add.sprite(this.x + 15, this.y - 20, 'biomass').setOrigin(0.5,0.5).setDepth(101).setAlpha(0).setScale(2,2);
        if (this.price >= 1000) {
            this.currencyDisplay.x = this.x + 25;
        } else if (this.price >= 100) {
            this.currencyDisplay.x = this.x + 20;
        }

        //action();

        this.setInteractive({
            useHandCursor: true
        });
        this.on('pointermove', () => {
            //console.log('dog');
            this.infoBorder.alpha = 1;
            this.info.alpha = 1;
            this.priceDisplay.alpha = 0.8;
            this.currencyDisplay.alpha = 0.8;
            if (!this.unlocked) {
                this.unknownBorder.alpha = 1;
            }
        });
        this.on('pointerout', () => {
            //console.log('bye');
            this.infoBorder.alpha = 0;
            this.info.alpha = 0;
            this.priceDisplay.alpha = 0;
            this.currencyDisplay.alpha = 0;
            if (!this.unlocked) {
                this.unknownBorder.alpha = 0;
            }
        });
        this.on('pointerdown', () => {
            if (!this.scene.paused) {
                if (!this.purchased && this.unlocked && this.price <= playerBiomass) {
                    this.scene.upgradeSound.play();
                    action();
                    this.purchased = true;
                    this.check = this.scene.add.sprite(this.x, this.y, 'check').setDepth(100).setScale(2,2);
                    playerBiomass -= this.price;
                } else {
                    this.scene.denied.play();
                }
            }
            //console.log('dog');
        });

    }

    update() {

        if (!this.unlocked) {
            this.info.text = '???';
            this.priceDisplay.text = '???';
            this.infoBorder.alpha = 0;
            
        } else if (this.unlocked && this.info.text == '???') {
            //this.infoBorder.alpha = 1;
            this.info.text = this.desc;
            this.priceDisplay.text = this.price;
            this.setTexture(this.icon);
        }

        // UPDATE COMPONENTS WHEN MENU OPENS/CLOSES
        //this.y = this.scene.techPanel.y - 90;
        this.y = this.scene.techPanel.y - this.offset;
        this.infoBorder.y = this.y + 30;
        this.unknownBorder.y = this.y + 30
        this.info.y = this.y + 40;
        if (this.purchased) {
            this.check.y = this.y;
        }
        this.priceDisplay.y = this.y - 40;
        this.currencyDisplay.y = this.y - 36;
    }
}