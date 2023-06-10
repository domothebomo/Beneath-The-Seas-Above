class Icon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, price) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.lifeform = sprite;
        this.selected = false;
        this.price = price;
        this.unlocked = false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.alpha = 0;
        this.setScale(2,2);

        this.nameDisplay = this.scene.add.bitmapText(this.x, this.y - this.height/2, 'unscreen_mk', this.getName().toUpperCase(), 20).setOrigin(0.5, 0.5).setDepth(100).setAlpha(0);
        //this.nameDisplay = this.scene.add.text(this.x, this.y - this.height / 2, this.lifeform, {fontSize: '11px'}).setOrigin(0.5, 0.5);

        //this.priceDisplay = this.scene.add.bitmapText(this.x - 10, this.y + this.height + 14, 'unscreen_mk', this.price, 20).setOrigin(0.5, 0.5).setDepth(100);
        //this.currencyDisplay = this.scene.add.sprite(this.x + 15, this.y + this.height + 18, 'biomass').setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8).setScale(2,2);
        this.priceDisplay = this.scene.add.bitmapText(this.x - 10, this.y + this.height + 48, 'unscreen_mk', this.price, 20).setOrigin(0.5, 0.5).setDepth(100).setAlpha(0);
        this.currencyDisplay = this.scene.add.sprite(this.x + 30, this.y + this.height + 50, 'biomass').setOrigin(0.5,0.5).setDepth(100).setAlpha(0).setScale(2,2);

        this.setInteractive({
            useHandCursor: true
        });
        this.on('pointerdown', () => {
            if (this.unlocked && this.price <= playerBiomass && !this.selected) {
                //console.log(this.lifeform);
                this.selected = true;
                this.selectBubble = this.scene.physics.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'select').setOrigin(0.5,0.5).setScale(2,2);
                this.selectBubble.setInteractive({});
                this.selectBubble.on('pointerdown', (pointer) => {
                    if (pointer.leftButtonDown()) {
                        if (this.scene.dialogueCount == 4) {
                            this.progressTutorial();
                        }
                        //console.log('placing');
                        //this.selected = false;
                        this.scene.lifeforms.push(new Lifeform(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, this.lifeform).setOrigin(0.5,0.5));
                        //this.selectBubble.destroy();
                        playerBiomass -= this.price;
                    }
                    this.selected = false;
                    this.selectBubble.destroy();
                });
            } else {
                this.scene.denied.play();
            }
        });
    }

    update() {
        if (this.unlocked) {
            this.alpha = 0.8;
            this.priceDisplay.alpha = 1;
            this.currencyDisplay.alpha = 0.8;
            this.nameDisplay.alpha = 1;
        }

        this.nameDisplay.x = this.x;
        this.currencyDisplay.x = this.x + 30;
        this.priceDisplay.x = this.x - 10;
        if (this.selected) {
            this.selectBubble.x = game.input.mousePointer.x;
            this.selectBubble.y = game.input.mousePointer.y;
            /**this.scene.input.on('pointerdown', (pointer) => {
                if (this.selected) {
                    console.log('placing');
                //console.log(pointer);
                //console.log(event);
                    this.selected = false;
                    this.scene.lifeforms.push(new Lifeform(this.scene, pointer.x, pointer.y, this.lifeform).setOrigin(0.5,0.5));
                    this.selectBubble.destroy();
                    playerBiomass -= this.price;
                }
            });*/
        }
    }

    getName() {
        if (this.lifeform == 'sea_stinger') {
            return 'sea stinger';
        }
        return this.lifeform;
    }

    progressTutorial() {
        this.scene.dialogueCount += 1;
        this.scene.rolloutDialogue(this.scene.tutorialDialogue[this.scene.dialogueCount]);

        this.scene.time.addEvent({
            callback: () => {
                console.log('end');
                // this.scene.tweens.add({
                //     targets: [this.scene, this.techTab],
                //     duration: 200,
                //     y: {from: 12, to: 192},
                //     ease: 'Linear'
                // });
            },
            repeat: 0,
            delay: 20000
        });
    }
}