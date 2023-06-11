class Habitat extends Phaser.Scene {
    constructor() {
        super('habitatScene');
    }

    preload() {

        this.load.path = './assets/';

        this.load.audio('ambience', './audio/ambience.wav');
        this.load.audio('collect', './audio/pop.wav');
        this.load.audio('upgrade', './audio/upgrade.mp3');
        this.load.audio('denied', './audio/denied.wav');

        // BITMAP FONT (MOVE TO TITLE SCREEN LATER)
        //this.load.bitmapFont('unscreen_mk', './fonts/unscreen_mk.png', './fonts/unscreen_mk.xml');

        //this.load.image('background', 'background.png');
        this.load.image('sand', 'sand2.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');

        this.load.image('notif', 'syringe.png');
        this.load.image('select', 'select.png');
        this.load.image('select_invalid', 'select_invalid.png');
        this.load.image('report', 'report.png');
        this.load.image('check', 'check.png');
        this.load.image('biomass', 'biomass.png');

        this.load.image('lifeforms_panel', 'side_panel.png');
        this.load.image('lifeforms_tab', 'panel_tab.png');
        this.load.image('tech_panel', 'top_panel.png');
        this.load.image('tech_tab', 'top_panel_tab.png');
        this.load.image('tutorial_panel', 'tutorial_panel.png');

        this.load.image('minoclops', 'minoclops.png');
        this.load.image('sea_stinger', 'sea_stinger.png');
        this.load.image('choral', 'choral.png');

        this.load.image('minoclops_shadow', 'minoclops_shadow.png');
        this.load.image('sea_stinger_shadow', 'sea_stinger_shadow.png');
        this.load.image('choral_shadow', 'choral_shadow.png');

        this.load.image('pause', 'pause-button.png');
    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0).setScale(2,2);
        //this.water = this.add.tileSprite(0, 0, 600, 400, 'water');
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0).setScale(2,2);
        this.sand = this.physics.add.sprite(0, 0, 'sand').setOrigin(0,0).setScale(2,2);
        this.sand.body.setSize(game.config.width, 75);
        this.sand.body.setOffset(0, game.config.height/2 - 70);
        //this.sand.body.setCollideWorldBounds(true);

        this.ambience = this.sound.add("ambience", {
            volume: 0.25,
            loop: true
        });
        this.ambience.play();
        this.collectSound = this.sound.add("collect", {
            volume: 0.5
        });
        this.upgradeSound = this.sound.add("upgrade", {
            volume: 0.5
        });
        this.denied = this.sound.add("denied", {
            volume: 0.5
        });

        this.input.mouse.disableContextMenu();

        // LIFEFORMS GROUP
        this.lifeforms = [];   
        

        //this.fish1 = new Lifeform(this, 200, 250, 'minoclops').setOrigin(0.5,0.5);
        //this.fish2 = new Lifeform(this, 250, 350, 'sea_stinger').setOrigin(0.5,0.5);
        //this.plant = new Lifeform(this, 100, 325, 'choral').setOrigin(0.5,0.5);
        //this.lifeforms.push(new Lifeform(this, 200, 250, 'minoclops').setOrigin(0.5,0.5));
        //this.lifeforms.push(new Lifeform(this, 250, 350, 'sea_stinger').setOrigin(0.5,0.5));
        //this.lifeforms.push(new Lifeform(this, 100, 325, 'choral').setOrigin(0.5,0.5));

        //this.biomassDisplay = this.add.text(25, 25, 'BIOMASS: '+playerBiomass, {fontSize: '14px'});
        this.biomassIcon = this.add.sprite(20, 20, 'biomass').setOrigin(0,0).setScale(3,3);
        this.biomassDisplay = this.add.bitmapText(80, 20, 'unscreen_mk', playerBiomass, 39);//.setScale(2,2);

        this.createLifeformsPanel();

        this.createTechnologyPanel();

        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.tutorialDialogue = [
            'Welcome to Thalasso, professor. You were debriefed \nbefore arrival, but now that your team has set up your \nbase of operations, allow me to remind you of your \nassignment. As a newly promoted Senior Researcher of \nExtraterrestrial Marine Biology, your first assignment \nis a research study wherein you will grow an ecosystem \nfrom this planet\'s previously uninhabited waters.',
            'Let\'s start by getting you oriented. As you can see, your \ninterface provides a viewport to the environment outside \nthe station, and there are two tabs on the top and right \nsides of the screen. Try using your mouse to click the tab \nabove you.',
            'This menu is your Areas of Study. It is a tree of upgrades \nthat progresses from left to right, each of which will \nhelp you further your research. Go ahead and purchase \nyour first upgrade.',
            'Well done. Areas of Study are unlocked using Biomass, \nwhich is harvested from the lifeforms you place. Your \ncurrent Biomass supply is displayed on the top-left of \nyour interface. The technology you just purchased \nunlocked your first lifeform. Click on the tab on the \nright side of the screen to open up your Lifeforms Panel.',
            'Your Lifeforms Panel is where you will purchase and \nplace lifeforms into the environment. As you unlock more \nspecies, you will have more options here to choose from. \nClick on the Minoclops image to select it for purchase, \nthen click somewhere in the environment to place the \nlifeform. You may also right-click while a lifeform is \nselected to cancel the purchase.',
            'Good. Your lifeforms will slowly gather Biomass, which \nyou can extract by clicking the syringe above their \nheads. You can also toggle the Area of Study panel with \nthe W key, and the Lifeforms Panel with the D key. \nContinue to purchase lifeforms and progress through \nyour Areas of Study to complete your assignment. \nGood luck.'
        ]
        this.tutorialPanel = this.add.sprite(30,game.config.height- 300, 'tutorial_panel').setOrigin(0,0).setDepth(101).setScale(1.5, 0.75).setAlpha(0.5);
        this.dialogueText = this.add.bitmapText(40, game.config.height- 290, 'unscreen_mk', '', 25).setDepth(101).setLeftAlign();
        this.dialogueCount = 0;
        this.rollout = null;
        this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);

        this.introBlurb = this.time.addEvent({
            callback: () => {
                this.dialogueCount += 1;
                this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
            },
            repeat: 0,
            delay: 20000
        });

        //this.physics.add.collider()
    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        this.biomassDisplay.text = playerBiomass;

        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            //console.log('bruh');
            this.tutorialPanel.alpha = this.tutorialPanel.alpha == 1 ? 0 : 1;
            this.tutorialText.alpha = this.tutorialText.alpha == 1 ? 0 : 1;
            this.tutorialTip.alpha = this.tutorialTip.alpha == 1 ? 0 : 1;
        }

        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.toggleTechnologyPanel();
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.toggleLifeformPanel();
        }

        // UPDATE PANELS
        this.lifeformsTitle.x = this.lifeformsPanel.x + this.lifeformsPanel.width;
        this.techTitle.y = this.techPanel.y - 35;
        //this.upgrade1.y = this.techPanel.y - 50;
        this.upgrade1.update();
        this.upgrade2.update();
        this.upgrade3.update();
        this.upgrade4.update();

        //this.createLifeformsPanel();

        for (let i = 0; i < this.lifeforms.length; i++) {
            this.lifeforms[i].update();
        }
        //this.fish1.x += 1;
        //this.fish2.x += 1;
        //this.plant.x += 3;
        //this.fish1.update();
        //this.fish2.update();
        //this.plant.update();

        this.minoclopsIcon.update();
        this.seastingerIcon.update();
        this.choralIcon.update();

        // pause button
        // this.pause = this.add.image(20, 350, 'pause').setOrigin(0,0);
        // this.add.text(26, 357, `ESCAPE`, {
        //     fontFamily: 'Courier',
        //     fontSize: '15px',
        //     color: '#ffffff'
        // });
    }

    createLifeformsPanel() {
        this.lifeformsPanel = this.physics.add.sprite(game.config.width - 192 + 180, 16, 'lifeforms_panel').setOrigin(0,0).setScale(2,2);
        this.lifeformsPanel.alpha = 0.5;
        this.lifeformsPanel.setDepth(100);
        this.lifeformsTab = this.add.sprite(this.lifeformsPanel.x, this.lifeformsPanel.height - 16, 'lifeforms_tab').setOrigin(1, 0.5).setScale(2,2);
        this.lifeformsTab.alpha = 0.5;
        this.lifeformsTab.setDepth(100);

        //this.lifeformsTitle = this.add.text(this.lifeformsPanel.x + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 5, 'LIFEFORMS')
        this.lifeformsTitle = this.add.bitmapText(this.lifeformsPanel.x + this.lifeformsPanel.width, this.lifeformsPanel.y + 5, 'unscreen_mk', 'LIFEFORMS', 26).setOrigin(0.5, 0).setDepth(100);

        //this.minoclopsIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 50, 'minoclops').setOrigin(0.5,0);
        //this.seastingerIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 130, 'sea_stinger').setOrigin(0.5,0);
        //this.choralIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 210, 'choral').setOrigin(0.5,0);
        this.minoclopsIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 70, 'minoclops', 25).setOrigin(0.5,0).setDepth(100);
        //this.minoclopsIcon.unlocked = true;
        this.seastingerIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 210, 'sea_stinger', 75).setOrigin(0.5,0).setDepth(100);
        this.choralIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 350, 'choral', 150).setOrigin(0.5,0).setDepth(100);

        this.lifeformPanelOpen = false;

        this.lifeformsTab.setInteractive({
            useHandCursor: true
        });
        this.lifeformsTab.on('pointerdown', () => {
            this.toggleLifeformPanel();
        });
    }

    toggleLifeformPanel() {
        if (this.dialogueCount == 3) {
            this.dialogueCount += 1;
            this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
        }
        if (!this.lifeformPanelOpen) {
            this.lifeformPanelOpen = true;
            this.tweens.add({
                targets: [this.lifeformsPanel, this.lifeformsTab],
                duration: 200,
                x: {from: game.config.width - 12, to: game.config.width - 192},
                ease: 'Linear'
            });
            this.tweens.add({
                targets: [this.minoclopsIcon, this.seastingerIcon, this.choralIcon],
                duration: 200,
                x: {from: this.minoclopsIcon.x, to: this.minoclopsIcon.x - 180},
                ease: 'Linear'
            });
        } else {
            this.lifeformPanelOpen = false;
            this.tweens.add({
                targets: [this.lifeformsPanel, this.lifeformsTab],
                duration: 200,
                x: {from: game.config.width - 192, to: game.config.width - 12},
                ease: 'Linear'
            });
            this.tweens.add({
                targets: [this.minoclopsIcon, this.seastingerIcon, this.choralIcon],
                duration: 200,
                x: {from: this.minoclopsIcon.x, to: this.minoclopsIcon.x + 180},
                ease: 'Linear'
            });
        }
    }

    createTechnologyPanel() {
        this.techPanel = this.physics.add.sprite(game.config.width / 2, 12, 'tech_panel').setOrigin(0.5,1).setScale(2,2);
        this.techPanel.alpha = 0.5;
        this.techPanel.setDepth(100);
        this.techTab = this.add.sprite(this.techPanel.x - 32, 12, 'tech_tab').setOrigin(0.5, 0).setScale(2,2);
        this.techTab.alpha = 0.5;
        this.techTab.setDepth(100);

        this.techTitle = this.add.bitmapText(this.techPanel.x - 15, this.techPanel.y - 35, 'unscreen_mk', 'AREAS OF STUDY', 26).setOrigin(0.5, 0).setDepth(100);

        // UPGRADES
        {
            this.upgrade1 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 60, this.techPanel.y - 20, 'report', 25, () => {
                //console.log('test');
                if (this.dialogueCount == 2) {
                    this.dialogueCount += 1;
                    this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
                }
                this.minoclopsIcon.unlocked = true;
                this.upgrade2.unlocked = true;
            }).setOrigin(0.5,0.5).setDepth(100);
            this.upgrade1.infoBorder = this.add.rectangle(this.upgrade1.x, this.upgrade1.y + 30, 140, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(100).setScale(2,2);
            this.upgrade1.info = this.add.bitmapText(this.upgrade1.x, this.upgrade1.y + 40, 'unscreen_mk', 'Unlocks Minoclops', 20).setOrigin(0.5,0.5).setAlpha(0).setDepth(100);
            this.upgrade1.unlocked = true;

            this.upgrade2 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 240, this.techPanel.y - 20, 'report', 100, () => {
                //console.log('test');
                this.seastingerIcon.unlocked = true;
                this.upgrade3.unlocked = true;
            }).setOrigin(0.5,0.5).setDepth(100);
            this.upgrade2.infoBorder = this.add.rectangle(this.upgrade2.x, this.upgrade2.y + 30, 150, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(100).setScale(2,2);
            this.upgrade2.info = this.add.bitmapText(this.upgrade2.x, this.upgrade2.y + 20, 'unscreen_mk', 'Unlocks Sea Stingers', 20).setOrigin(0.5,0.5).setAlpha(0).setDepth(100);
            //this.upgrade2.unlocked = true;

            this.upgrade3 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 420, this.techPanel.y - 20, 'report', 500, () => {
                //console.log('test');
                this.choralIcon.unlocked = true;
                this.upgrade4.unlocked = true;
            }).setOrigin(0.5,0.5).setDepth(100);
            this.upgrade3.infoBorder = this.add.rectangle(this.upgrade3.x, this.upgrade3.y + 22, 120, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(100).setScale(2,2);
            this.upgrade3.info = this.add.bitmapText(this.upgrade3.x, this.upgrade3.y + 20, 'unscreen_mk', 'Unlocks Choral', 20).setOrigin(0.5,0.5).setAlpha(0).setDepth(100);

            this.upgrade4 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 600, this.techPanel.y - 20, 'report', 2000, () => {
                autogather = true;
                this.victoryText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'unscreen_mk', 'ASSIGNMENT COMPLETE', 30).setOrigin(0.5,0.5);
                this.time.addEvent({
                    delay: 3000, callback: () => {
                        this.tweens.add({
                            targets: [this.victoryText],
                            duration: 2000,
                            alpha: {from: 1, to: 0}
                        });
                    }
                });
            }).setOrigin(0.5,0.5).setDepth(100);
            this.upgrade4.infoBorder = this.add.rectangle(this.upgrade4.x, this.upgrade4.y + 22, 120, 14, '#FFFFFF').setOrigin(0.5,0).setAlpha(0).setDepth(100).setScale(2,2);
            this.upgrade4.info = this.add.bitmapText(this.upgrade4.x, this.upgrade4.y + 20, 'unscreen_mk', 'SUBMIT REPORT', 20).setOrigin(0.5,0.5).setAlpha(0).setDepth(100);
        }   

        this.techPanelOpen = false;

        this.techTab.setInteractive({
            useHandCursor: true
        });
        this.techTab.on('pointerdown', () => {
            this.toggleTechnologyPanel();
        });
    }

    toggleTechnologyPanel() {
        if (this.dialogueCount == 1) {
            this.dialogueCount += 1;
            this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
        } else if (this.dialogueCount == 0) {
            this.dialogueCount += 2;
            this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
            this.introBlurb.destroy();
        }

        if (!this.techPanelOpen) {
            this.techPanelOpen = true;
            this.tweens.add({
                targets: [this.techPanel, this.techTab],
                duration: 200,
                y: {from: 12, to: 192},
                ease: 'Linear'
            });
        } else {
            this.techPanelOpen = false;
            this.tweens.add({
                targets: [this.techPanel, this.techTab],
                duration: 200,
                y: {from: 192, to: 12},
                ease: 'Linear'
            });
        }
    }

    rolloutDialogue(dialogue) {
        //let lines = this.dialogueText.getWrappedText(dialogue);
        //let text = lines.join('\n');
        if (this.rollout) {
            this.rollout.destroy();
        }
        //this.rollout.destroy();
        this.dialogueText.text = '';
        let text = dialogue;

        let letterCount = 0;
        this.rollout = this.time.addEvent({
            callback: () => {
                //if (letterCount % 55 == 0) {
                 //   this.dialogueText.text += '\n';
                //}
                this.dialogueText.text += text[letterCount];
                letterCount += 1;
            },
            repeat: text.length - 1,
            delay: 30
        });
    }
}

