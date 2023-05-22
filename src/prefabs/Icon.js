class Icon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, price) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.lifeform = sprite;
        this.selected = false;
        this.price = price;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.alpha = 0.8;

        this.nameDisplay = this.scene.add.bitmapText(this.x, this.y - this.height / 2, 'unscreen_mk', this.getName().toUpperCase()).setOrigin(0.5, 0.5).setDepth(100);
        //this.nameDisplay = this.scene.add.text(this.x, this.y - this.height / 2, this.lifeform, {fontSize: '11px'}).setOrigin(0.5, 0.5);

        this.priceDisplay = this.scene.add.bitmapText(this.x, this.y + this.height + 5, 'unscreen_mk', this.price).setOrigin(0.5, 0.5).setDepth(100);
        

        this.setInteractive({
            useHandCursor: true
        });
        this.on('pointerdown', () => {
            if (this.price <= playerBiomass) {
                console.log(this.lifeform);
                this.selected = true;
                this.selectBubble = this.scene.physics.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'select').setOrigin(0.5,0.5);
                this.selectBubble.setInteractive({});
                this.selectBubble.on('pointerdown', (pointer) => {
                    if (pointer.leftButtonDown()) {
                        console.log('placing');
                        //this.selected = false;
                        this.scene.lifeforms.push(new Lifeform(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, this.lifeform).setOrigin(0.5,0.5));
                        //this.selectBubble.destroy();
                        playerBiomass -= this.price;
                    }
                    this.selected = false;
                    this.selectBubble.destroy();
                });
            }
        });
    }

    update() {
        this.nameDisplay.x = this.x;
        this.nameDisplay.y = this.y - this.height / 3;
        this.priceDisplay.x = this.x;
        this.priceDisplay.y = this.y + this.height + 5;
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
}