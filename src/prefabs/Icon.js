class Icon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, price) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.lifeform = sprite;
        this.selected = false;
        this.price = price;
        this.unlocked = false;
        this.grounded = false;
        this.valid = true;

        if (this.lifeform == 'sea_stinger' || this.lifeform == 'choral') {
            //console.log('ya')
            this.grounded = true;
        }
        

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.alpha = 0.8;
        this.setTexture(sprite + '_shadow');
        this.setScale(2,2);

        this.nameDisplay = this.scene.add.bitmapText(this.x, this.y - this.height/2, 'unscreen_mk', '???', 20).setOrigin(0.5, 0.5).setDepth(100).setAlpha(1);
        this.priceDisplay = this.scene.add.bitmapText(this.x - 10, this.y + this.height + 48, 'unscreen_mk', '???', 20).setOrigin(0.5, 0.5).setDepth(100).setAlpha(1);
        //this.priceDisplay.set
        this.currencyDisplay = this.scene.add.sprite(this.x + 30, this.y + this.height + 50, 'biomass').setOrigin(0.5,0.5).setDepth(100).setAlpha(0.8).setScale(2,2);

        this.bioIcon = this.scene.add.sprite(this.x + 50, this.y + this.height, 'bio_icon').setOrigin(0.5,0.5).setDepth(100).setAlpha(0).setScale(2,2);
        this.bioIcon.setInteractive({
            useHandCursor: true
        });
        this.bioIcon.on('pointerdown', () => {
            this.scene.openBio(this);
        });

        this.setInteractive({
            useHandCursor: true
        });
        this.on('pointerdown', () => {
            if (!this.scene.paused) {
                if (this.unlocked && this.price <= playerBiomass && !this.selected) {
                    //console.log(this.lifeform);
                    this.scene.select.play();
                    this.selected = true;
                    this.selectBubble = this.scene.physics.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'select').setOrigin(0.5,0.5).setScale(2,2);
                    this.selectBubble.setInteractive({});
                    this.selectBubble.on('pointerdown', (pointer) => {
                        
                        if (pointer.leftButtonDown()) {
                            if (this.valid) {
                                this.scene.place.play();
                                if (this.scene.dialogueCount == 4) {
                                    this.progressTutorial();
                                }
                                this.scene.lifeforms.push(new Lifeform(this.scene, game.input.mousePointer.x, game.input.mousePointer.y, this.lifeform).setOrigin(0.5,0.5));
                                playerBiomass -= this.price;
                                this.selected = false;
                                this.selectBubble.destroy();
                            } else {
                                this.scene.denied.play();
                            }
                        } else {
                            this.selected = false;
                            this.selectBubble.destroy();
                        }
                        
                    });
                } else {
                    this.scene.denied.play();
                }
            }
        });
    }

    update() {
        if (this.unlocked && this.nameDisplay.text == '???') {
            this.bioIcon.alpha = 0.8;
            this.nameDisplay.text = this.getName().toUpperCase();
            this.priceDisplay.text = this.price;
            this.setTexture(this.lifeform);
            if (evolved[this.lifeform]) {
                this.evolve();
            }
        }

        if (this.selected) {
            this.selectValidity();

            if (this.scene.paused) {
                this.selected = false;
                this.selectBubble.destroy();
            }
        }

        this.x = this.scene.lifeformsPanel.x + 45 + this.scene.lifeformsPanel.width / 2;
        this.bioIcon.x = this.x + 55;
        this.nameDisplay.x = this.x;
        this.currencyDisplay.x = this.x + 35;
        if (this.lifeform == 'jellypede') {
            this.priceDisplay.x = this.x - 15;
        } else {
            this.priceDisplay.x = this.x - 10;
        }

        if (this.selected) {
            this.selectBubble.x = game.input.mousePointer.x;
            this.selectBubble.y = game.input.mousePointer.y;
        }
    }

    selectValidity() {
        this.valid = true;
        if (this.grounded && !this.scene.physics.world.overlap(this.selectBubble, this.scene.sand)) {
            //console.log('hi');
            this.valid = false;
        } else {
            for (let i = 0; i < this.scene.lifeforms.length; i++) {
                if (this.scene.physics.world.overlap(this.selectBubble, this.scene.lifeforms[i])) {
                    this.valid = false;
                }
            }
        }
        if (this.valid) {
            this.selectBubble.setTexture('select');
        } else {
            this.selectBubble.setTexture('select_invalid');
        }
    }

    getName() {
        if (this.lifeform == 'sea_stinger') {
            return 'sea stinger';
        } else if (this.lifeform == 'choral') {
            return 'chorus';
        }
        return this.lifeform;
    }

    evolve() {
        this.evolved = true;
        switch(this.lifeform) {
            case 'minoclops':
                this.price = 75;
                this.setTexture('minorpedo');
                this.nameDisplay.text = 'minorpedo';
                this.priceDisplay.text = this.price;
                break;
            case 'sea_stinger':
                this.price = 200;
                this.setTexture('stud_stinger');
                this.nameDisplay.text = 'stud stinger';
                this.priceDisplay.text = this.price;
                break;
            case 'choral':
                if (this.unlocked) {
                    this.price = 1500;
                    this.setTexture('chorctus');
                    this.nameDisplay.text = 'chorctus';
                    this.priceDisplay.text = this.price;
                } else {
                    this.setTexture('chorctus_shadow');
                }
                break;
            case 'triangler':
                if (this.unlocked) {
                    this.price = 3000;
                    this.setTexture('triangron');
                    this.nameDisplay.text = 'triangron';
                    this.priceDisplay.text = this.price;
                } else {
                    this.setTexture('triangron_shadow');
                }
                break;
            case 'jellypede':
                if (this.unlocked) {
                    this.price = 20000;
                    this.setTexture('jellygleam');
                    this.nameDisplay.text = 'jellygleam';
                    this.priceDisplay.text = this.price;
                } else {
                    this.setTexture('jellygleam_shadow');
                }
                break;
            
        }
    }

    progressTutorial() {
        this.scene.dialogueCount += 1;
        this.scene.rolloutDialogue(this.scene.tutorialDialogue[this.scene.dialogueCount]);

        this.scene.time.addEvent({
            callback: () => {
                //console.log('end');
                this.scene.tweens.add({
                     targets: [this.scene.tutorialPanel, this.scene.dialogueText],
                     duration: 200,
                     scaleX: {from: 1, to: 0},
                     ease: 'Linear'
                 });
            },
            repeat: 0,
            delay: 20000
        });
    }
}