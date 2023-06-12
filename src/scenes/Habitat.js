class Habitat extends Phaser.Scene {
    constructor() {
        super('habitatScene');
    }

    preload() {

        this.load.path = './assets/';

        // AUDIO
        this.load.audio('ambience', './audio/ambience.wav');
        this.load.audio('collect', './audio/pop.wav');
        this.load.audio('upgrade', './audio/upgrade.mp3');
        this.load.audio('denied', './audio/denied.wav');
        this.load.audio('select', './audio/sfx_spark.wav');
        this.load.audio('place', './audio/beam.wav');

        // BACKGROUND
        this.load.image('sand', 'sand2.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');

        // ICONS/MISC
        this.load.image('notif', 'syringe.png');
        this.load.image('select', 'select.png');
        this.load.image('select_invalid', 'select_invalid.png');
        this.load.image('check', 'check.png');
        this.load.image('biomass', 'biomass.png');
        this.load.image('bio_icon', 'bio_icon.png');
        this.load.image('exit', 'exit.png');

        // TECHNOLOGY ICONS
        this.load.image('report', 'report.png');
        this.load.image('species', 'species.png');
        this.load.image('evolution', 'evolve.png');
        this.load.image('unknown', 'unknown_tech.png');
        this.load.image('harvest', 'harvest.png');

        // MENU PANELS
        this.load.image('lifeforms_panel', 'side_panel2.png');
        this.load.image('lifeforms_tab', 'panel_tab.png');
        this.load.image('tech_panel', 'top_panel3.png');
        this.load.image('tech_tab', 'top_panel_tab.png');
        this.load.image('tutorial_panel', 'tutorial_panel.png');
        this.load.image('bio_panel', 'bio_panel.png');

        // BASE LIFEFORMS
        this.load.image('minoclops', 'minoclops.png');
        this.load.image('sea_stinger', 'sea_stinger.png');
        this.load.image('choral', 'choral.png');
        this.load.image('triangler', 'triangler.png');
        this.load.image('jellypede', 'jellyon.png');

        // EVOLUTIONS
        this.load.image('minorpedo', 'minorpedo.png');
        this.load.image('stud_stinger', 'chadorpion.png');
        this.load.image('chorctus', 'chorctus.png');
        this.load.image('triangron', 'triangron.png');
        this.load.image('jellygleam', 'jellygleam.png');

        // SILHOUETTES
        this.load.image('minoclops_shadow', 'minoclops_shadow.png');
        this.load.image('sea_stinger_shadow', 'sea_stinger_shadow.png');
        this.load.image('choral_shadow', 'choral_shadow.png');
        this.load.image('triangler_shadow', 'triangler_shadow.png');
        this.load.image('jellypede_shadow', 'jellyon_shadow.png');

        this.load.image('minorpedo_shadow', 'minorpedo_shadow.png');
        this.load.image('stud_stinger_shadow', 'stud_stinger_shadow.png');
        this.load.image('chorctus_shadow', 'chorctus_shadow.png');
        this.load.image('triangron_shadow', 'triangron_shadow.png');
        this.load.image('jellygleam_shadow', 'jellygleam_shadow.png');

    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0).setScale(2,2);
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0).setScale(2,2);
        this.sand = this.physics.add.sprite(0, 0, 'sand').setOrigin(0,0).setScale(2,2);
        this.sand.body.setSize(game.config.width, 75);
        this.sand.body.setOffset(0, game.config.height/2 - 70);

        // SOUNDS
        {
            this.ambience = this.sound.add("ambience", {
                volume: 0.25,
                loop: true
            });
            this.ambience.play();
            music.stop();
            music.play();
            this.collectSound = this.sound.add("collect", {
                volume: 0.5
            });
            this.upgradeSound = this.sound.add("upgrade", {
                volume: 0.5
            });
            this.denied = this.sound.add("denied", {
                volume: 0.5
            });
            this.select = this.sound.add("select", {
                volume: 0.5
            });
            this.place = this.sound.add("place", {
                volume: 0.5
            });
            this.toggle = this.sound.add("menu", {
                 volume: 0.75
            });
        }

        this.input.mouse.disableContextMenu();

        // LIFEFORMS GROUP
        this.lifeforms = [];   
        
        // PLAYER CURRENCY
        this.biomassIcon = this.add.sprite(20, 20, 'biomass').setOrigin(0,0).setScale(3,3);
        this.biomassDisplay = this.add.bitmapText(80, 20, 'unscreen_mk', playerBiomass, 39);

        this.createLifeformsPanel();

        this.createTechnologyPanel();

        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.tutorialDialogue = [
            'Welcome to Thalasso, professor. You were debriefed \nbefore arrival, but now that your team has set up your \nbase of operations, allow me to remind you of your \nassignment. As a newly promoted Senior Researcher of \nExtraterrestrial Marine Biology, your first assignment \nis a research study wherein you will grow an ecosystem \nfrom this planet\'s previously uninhabited waters.',
            'Let\'s start by getting you oriented. As you can see, your \ninterface provides a viewport to the environment outside \nthe station, and there are two tabs on the top and right \nsides of the screen. Try using your mouse to click the tab \nabove you.',
            'This menu is your Areas of Study. It is a tree of upgrades \nthat progresses from left to right, each of which will \nhelp you further your research. Go ahead and purchase \nyour first upgrade.',
            'Well done. Areas of Study are unlocked using Biomass, \nwhich is harvested from the lifeforms you place. Your \ncurrent Biomass supply is displayed on the top-left of \nyour interface. The technology you just purchased \nunlocked your first lifeform. Click on the tab on the \nright side of the screen to open up your Lifeforms Panel.',
            'Your Lifeforms Panel is where you will purchase and \nplace lifeforms into the environment. As you unlock more \nspecies, you will have more options here to choose from. \nClick on the Minoclops image to select it for purchase, \nthen click somewhere in the environment to place the \nlifeform. You may also right-click while a lifeform is \nselected to cancel the purchase.',
            'Good. Your lifeforms will slowly gather Biomass, which \nyou can extract by clicking the syringe above their \nheads. You can also toggle the Area of Study panel with \nthe W key, and the Lifeforms Panel with the D key. \nContinue to purchase lifeforms and progress through \nyour Areas of Study to complete your assignment. \nGood luck.',
            'Another thing to note. Some lifeforms, like your newly \ndiscovered Sea Stingers, are ground dwellers. Meaning, \nthey can only be placed on the ocean floor. When \nselecting a location to place your lifeform, the \nselection radius will glow green to indicate you can \nplace a specimen there, and red if you cannot.'
        
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

        this.paused = false;
        this.pauseText = this.add.bitmapText(game.config.width/2, game.config.height/2 - 100, 'unscreen_mk', 'PAUSED', 50).setOrigin(0.5,0.5).setDepth(202);
        
        this.resumeButton = this.add.image(game.config.width/2, game.config.height/2 - 30, 'pause').setOrigin(0.5,0.5).setScale(3.5,2).setDepth(202);
        this.resumeButtonText = this.add.bitmapText(this.resumeButton.x, this.resumeButton.y - 5, 'unscreen_mk', 'RESUME', 30).setOrigin(0.5, 0.5).setDepth(202);
        this.resumeButton.setInteractive({
            useHandCursor: true
        });
        this.resumeButton.on('pointerdown', () => {
            this.togglePause();
        });
        
        this.quitButton = this.add.image(game.config.width/2, game.config.height/2 + 40, 'pause').setOrigin(0.5,0.5).setScale(3.5,2).setDepth(202);
        this.quitButtonText = this.add.bitmapText(this.quitButton.x, this.quitButton.y - 5, 'unscreen_mk', 'QUIT TO MENU\n(LOSE PROGRESS)', 20, 1).setOrigin(0.5, 0.5).setDepth(202);
        this.quitButton.setInteractive({
            useHandCursor: true
        });
        this.quitButton.on('pointerdown', () => {
            this.ambience.stop();
            music.stop();
            this.toggle.play();
            this.scene.start('menuScene');
        });

        this.pauseText.alpha = 0;
        this.resumeButton.alpha = 0;
        this.resumeButtonText.alpha = 0;
        this.quitButton.alpha = 0;
        this.quitButtonText.alpha = 0;


        lifeform_desc = {
            'minoclops': 'The Minoclops is a small, yet agile fish. With its three \nfins and boomerang-like tail, the minoclops swiftly \nswims through the water. When they are traveling in a \nschool, they are able to overpower their predators.',
            'sea_stinger': 'The Sea Stinger is a scorpion-like creature that dwells \nalong the ocean floor. Their tail contains deathly \nvenom that is able to kill a horse in under a minute.',
            'choral': 'The Chorus is an alien plant that lives alongside the \nocean floor. The chorus is able to flourish from the \nradiation and microorganisms in the water.',
            'triangler': 'The Triangler is a large fish that has sharp \ntriangular fins riding along its back. When \nfeeling threatened, it sucks in air and \nenlarges itself.',
            'jellypede': 'The Jellypede is a three-bodied creature that \nholds special tentacles on its side that \nelectrifies anything it touches. It moves in a \ncalming manner and is not aggressive.'
        };
        evo_desc = {
            'minoclops': 'The Minorpedo is a larger and more agile version of \nthe Minoclops. With its three eyes and additional fins, \nthe minorpedo is more aware of its surroundings \nmaking it difficult to target.',
            'sea_stinger': 'The Stud Stinger, the next evolution of the Sea Stinger, \nis a more aggressive and deadly version that should \nnot be played around with. It carries large claws that \nare used to knock out its prey and then uses their \nstinger to execute its target.',
            'choral': 'The Chorctus, evolving from the Chorus, uses its \nnew mouth to attract potential prey. When close \nenough, it uses its arms to trap and spew out \nexcess radiation to weaken its prey to later \nconsume.',
            'triangler': 'The Triangron is a larger, fatter, more \nspiny-finned version of the triangler. With \nits larger body, it is able to absorb more \noxygen to propel itself towards their prey \nor away from their predators.',
            'jellypede': 'The jellypede becomes a more electrifying \nand dangerous passive creature under the \nname of Jellygleam. Although it still moves \nin a calming manner, it harbors more \nelectricity allowing it to project out an \nelectric force field to protect itself and \nalso to be used on the offensive.'
        };

        
        this.bioPanel = this.add.sprite(game.config.width/2, game.config.height/2, 'bio_panel').setScale(3,0).setOrigin(0.5,0.5).setDepth(201);
        this.bioTitle = this.add.bitmapText(this.bioPanel.x - this.bioPanel.width*1.5 + 60, this.bioPanel.y - this.bioPanel.height*1.5 + 60, 'unscreen_mk', 'MINOCLOPS', 50).setDepth(201).setScale(0,1);
        this.bioDesc = this.add.bitmapText(this.bioPanel.x - this.bioPanel.width*1.5 + 60, this.bioPanel.y - this.bioPanel.height*1.5 + 150, 'unscreen_mk', lifeform_desc['jellypede'], 20).setDepth(201).setScale(0,1);
        this.bioEvoDesc = this.add.bitmapText(this.bioPanel.x - this.bioPanel.width*1.5 + 60, this.bioPanel.y - this.bioPanel.height + 180, 'unscreen_mk', evo_desc['jellypede'], 20).setDepth(201).setScale(0,1);
        this.bioPic1 = this.add.sprite(game.config.width/2 + 330, game.config.height/2 - 60, 'minoclops_shadow').setScale(4,0).setOrigin(0.5,0.5).setDepth(201);
        this.bioPic2 = this.add.sprite(game.config.width/2 + 330, game.config.height/2 + 90, 'stud_stinger_shadow').setScale(4,0).setOrigin(0.5,0.5).setDepth(201);
        
        this.exitBio = this.add.sprite(game.config.width/2 + 460, game.config.height/2 - 120, 'exit').setScale(2,0).setOrigin(0.5,0.5).setDepth(201);
        this.exitBio.setInteractive({
            useHandCursor: true
        });
        this.exitBio.on('pointerdown', () => {
            this.closeBio();
        });

    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        // UPDATE PLAYER CURRENCY COUNTER
        this.biomassDisplay.text = playerBiomass;

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.togglePause();
        }

        if (!this.paused) {
            // MENU CONTROLS
            if (Phaser.Input.Keyboard.JustDown(keyW)) {
                this.toggleTechnologyPanel();
            }
            if (Phaser.Input.Keyboard.JustDown(keyD)) {
                this.toggleLifeformPanel();
            }
        }

        // UPDATE PANELS
        this.lifeformsTitle.x = this.lifeformsPanel.x + this.lifeformsPanel.width;
        this.techTitle.y = this.techPanel.y - 35;
        
        // UPDATE UPGRADES
        this.updateUpgrades();

        // UPDATE LIFEFORMS ON SCREEN
        for (let i = 0; i < this.lifeforms.length; i++) {
            this.lifeforms[i].update();
        }

        // UPDATE LIFEFORM ICONS
        this.minoclopsIcon.update();
        this.seastingerIcon.update();
        this.choralIcon.update();
        this.trianglerIcon.update();
        this.jellypedeIcon.update();

    }

    togglePause() {
        this.toggle.play();
        this.paused = this.paused ? false : true;
        if (this.paused) {
            if (this.lifeformPanelOpen) {
                this.toggleLifeformPanel();
            }
            if (this.techPanelOpen) {
                this.toggleTechnologyPanel();
            }
            this.pauseText.alpha = 1;
            this.resumeButton.alpha = 1;
            this.resumeButtonText.alpha = 1;
            this.quitButton.alpha = 1;
            this.quitButtonText.alpha = 1;
        } else {
            this.pauseText.alpha = 0;
            this.resumeButton.alpha = 0;
            this.resumeButtonText.alpha = 0;
            this.quitButton.alpha = 0;
            this.quitButtonText.alpha = 0;
        }
    }

    openBio(icon) {
        this.togglePause();
        this.togglePause();
        this.paused = true;
        this.bioTitle.text = icon.nameDisplay.text;
        this.bioDesc.text = lifeform_desc[icon.lifeform];
        this.bioPic1.setTexture(icon.lifeform);
        if (icon.evolved == true) {
            this.bioEvoDesc.text = evo_desc[icon.lifeform];
            this.bioPic2.setTexture(icon.texture.key);
        } else {
            this.bioEvoDesc.text = 'This lifeforms evolutionary properties are unknown.';
            switch(icon.lifeform) {
                case 'minoclops':
                    this.bioPic2.setTexture('minorpedo_shadow');
                    break;
                case 'sea_stinger':
                    this.bioPic2.setTexture('stud_stinger_shadow');
                    break;
                case 'choral':
                    this.bioPic2.setTexture('chorctus_shadow');
                    break;
                case 'triangler':
                    this.bioPic2.setTexture('triangron_shadow');
                    break;
                case 'jellypede':
                    this.bioPic2.setTexture('jellygleam_shadow');
                    break;
            }
        }

        this.tweens.add({
            targets: [this.bioPanel],
            duration: 100,
            scaleY: {from: 0, to: 3},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.bioTitle, this.bioDesc, this.bioEvoDesc],
            duration: 100,
            scaleX: {from: 0, to: 1},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.bioPic1, this.bioPic2],
            duration: 100,
            scaleY: {from: 0, to: 4},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.exitBio],
            duration: 100,
            scaleY: {from: 0, to: 2},
            ease: 'Linear'
        });
    }

    closeBio() {
        this.paused = false;
        this.tweens.add({
            targets: [this.bioPanel],
            duration: 100,
            scaleY: {from: 3, to: 0},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.bioTitle, this.bioDesc, this.bioEvoDesc],
            duration: 100,
            scaleX: {from: 1, to: 0},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.bioPic1, this.bioPic2],
            duration: 100,
            scaleY: {from: 4, to: 0},
            ease: 'Linear'
        });
        this.tweens.add({
            targets: [this.exitBio],
            duration: 100,
            scaleY: {from: 2, to: 0},
            ease: 'Linear'
        });
    }

    updateUpgrades() {
        this.upgrade1.update();
        this.upgrade2.update();
        this.upgrade3.update();
        this.upgrade4.update();
        this.benchmark1.update();
        this.upgrade5.update();
        this.upgrade6.update();
        this.upgrade7.update();
        this.upgrade8.update();
        this.upgrade9.update();
        this.benchmark2.update();
        this.upgrade10.update();
        this.upgrade11.update();
        this.upgrade12.update();
        this.upgrade13.update();
        this.upgrade14.update();
        this.upgrade15.update();
        this.benchmark3.update();
    }

    createLifeformsPanel() {
        this.lifeformsPanel = this.physics.add.sprite(game.config.width - 192 + 180, 16, 'lifeforms_panel').setOrigin(0,0).setScale(2,2);
        this.lifeformsPanel.alpha = 0.5;
        this.lifeformsPanel.setDepth(100);
        this.lifeformsTab = this.add.sprite(this.lifeformsPanel.x, this.lifeformsPanel.height - 16, 'lifeforms_tab').setOrigin(1, 0.5).setScale(2,2);
        this.lifeformsTab.alpha = 0.5;
        this.lifeformsTab.setDepth(100);

        this.lifeformsTitle = this.add.bitmapText(this.lifeformsPanel.x + this.lifeformsPanel.width, this.lifeformsPanel.y + 5, 'unscreen_mk', 'LIFEFORMS', 26).setOrigin(0.5, 0).setDepth(100);

        this.minoclopsIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 70, 'minoclops', 25).setOrigin(0.5,0).setDepth(100);
        this.seastingerIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 210, 'sea_stinger', 100).setOrigin(0.5,0).setDepth(100);
        this.choralIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 350, 'choral', 500).setOrigin(0.5,0).setDepth(100);
        this.trianglerIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 490, 'triangler', 750).setOrigin(0.5,0).setDepth(100);
        this.jellypedeIcon = new Icon(this, this.lifeformsPanel.x + 40 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 630, 'jellypede', 10000).setOrigin(0.5,0).setDepth(100);

        this.lifeformPanelOpen = false;

        this.lifeformsTab.setInteractive({
            useHandCursor: true
        });
        this.lifeformsTab.on('pointerdown', () => {
            if (!this.paused) {
                this.toggleLifeformPanel();
            }
        });
    }

    toggleLifeformPanel() {
        this.toggle.play();
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
        } else {
            this.lifeformPanelOpen = false;
            this.tweens.add({
                targets: [this.lifeformsPanel, this.lifeformsTab],
                duration: 200,
                x: {from: game.config.width - 192, to: game.config.width - 12},
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
            // UPGRADE 1
            this.upgrade1 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 50, this.techPanel.y - 105, 'species', 25, () => {
                if (this.dialogueCount == 2) {
                    this.dialogueCount += 1;
                    this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
                }
                this.minoclopsIcon.unlocked = true;
                this.upgrade2.unlocked = true;
            }, 'Research Minoclops').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade1.infoBorder.setSize(140, 14);
            this.upgrade1.unlocked = true;

            // UPGRADE 2
            this.upgrade2 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 110, this.techPanel.y - 105, 'species', 150, () => {
                this.seastingerIcon.unlocked = true;
                
                this.upgrade3.unlocked = true;
                this.upgrade4.unlocked = true;

                // TUTORIAL
                if (this.dialogueCount == 5) {
                    this.tweens.add({
                        targets: [this.tutorialPanel],
                        duration: 200,
                        scaleX: {from: 0, to: 1.5},
                        ease: 'Linear'
                    });
                    this.tweens.add({
                        targets: [this.dialogueText],
                        duration: 200,
                        scaleX: {from: 0, to: 1},
                        ease: 'Linear'
                    });
                    this.dialogueCount += 1;
                    this.rolloutDialogue(this.tutorialDialogue[this.dialogueCount]);
                    this.time.addEvent({
                        callback: () => {
                            this.tweens.add({
                                 targets: [this.tutorialPanel, this.dialogueText],
                                 duration: 200,
                                 scaleX: {from: 1, to: 0},
                                 ease: 'Linear'
                             });
                        },
                        repeat: 0,
                        delay: 20000
                    });
                }

            }, 'Research Sea Stingers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade2.infoBorder.setSize(150, 14);

            // UPGRADE 3
            this.upgrade3 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 170, this.techPanel.y - 75, 'evolution', 1000, () => {
                evolved['minoclops'] = true;
                this.minoclopsIcon.evolve();
                for (let i = 0; i < this.lifeforms.length; i++) {
                    if (this.lifeforms[i].name == 'minoclops') {
                        this.lifeforms[i].evolve();
                    }
                }

                this.benchmark1.unlocked = true;
            }, 'Evolve Minoclops').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade3.infoBorder.setSize(130, 14);

            // UPGRADE 4
            this.upgrade4 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 170, this.techPanel.y - 135, 'harvest', 750, () => {
                autogather['minoclops'] = true;

                this.benchmark1.unlocked = true;
            }, 'Automatically Harvest Minoclops').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade4.infoBorder.setSize(210, 14);

            // BENCHMARK 1
            this.benchmark1 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 230, this.techPanel.y - 105, 'report', 3000, () => {
                this.victoryText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'unscreen_mk', 'REPORT SUBMITTED', 60).setOrigin(0.5,0.5);
                this.time.addEvent({
                    delay: 3000, callback: () => {
                        this.tweens.add({
                            targets: [this.victoryText],
                            duration: 2000,
                            alpha: {from: 1, to: 0}
                        });
                    }
                });

                this.upgrade5.unlocked = true;
                this.upgrade6.unlocked = true;
            }, 'SUBMIT FIRST REPORT').setOrigin(0.5,0.5).setDepth(100);
            this.benchmark1.infoBorder.setSize(130, 14);

            // UPGRADE 5
            this.upgrade5 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 290, this.techPanel.y - 75, 'species', 8000, () => {
                this.trianglerIcon.unlocked = true;

                this.upgrade8.unlocked = true;
            }, 'Research Trianglers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade5.infoBorder.setSize(150, 14);

            // UPGRADE 6
            this.upgrade6 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 290, this.techPanel.y - 135, 'species', 5000, () => {
                this.choralIcon.unlocked = true;
                
                this.upgrade7.unlocked = true;
            }, 'Research Chorus').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade6.infoBorder.setSize(120, 14);

            // UPGRADE 7
            this.upgrade7 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 350, this.techPanel.y - 135, 'harvest', 15000, () => {
                autogather['sea_stinger'] = true;
                
                this.upgrade9.unlocked = true;
            }, 'Automatically Harvest Sea Stingers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade7.infoBorder.setSize(230, 14);

            // UPGRADE 8
            this.upgrade8 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 350, this.techPanel.y - 75, 'harvest', 20000, () => {
                autogather['choral'] = true;
                
                this.upgrade9.unlocked = true;
            }, 'Automatically Harvest Chorus').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade8.infoBorder.setSize(210, 14);

            // UPGRADE 9
            this.upgrade9 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 410, this.techPanel.y - 105, 'evolution', 30000, () => {
                evolved['sea_stinger'] = true;
                this.seastingerIcon.evolve();
                for (let i = 0; i < this.lifeforms.length; i++) {
                    if (this.lifeforms[i].name == 'sea_stinger') {
                        this.lifeforms[i].evolve();
                    }
                }

                this.benchmark2.unlocked = true;
            }, 'Evolve Sea Stingers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade9.infoBorder.setSize(150, 14);

            // BENCHMARK 2
            this.benchmark2 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 470, this.techPanel.y - 105, 'report', 50000, () => {
                this.victoryText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'unscreen_mk', 'REPORT SUBMITTED', 60).setOrigin(0.5,0.5);
                this.time.addEvent({
                    delay: 3000, callback: () => {
                        this.tweens.add({
                            targets: [this.victoryText],
                            duration: 2000,
                            alpha: {from: 1, to: 0}
                        });
                    }
                });
                
                this.upgrade10.unlocked = true;
            }, 'SUBMIT SECOND REPORT').setOrigin(0.5,0.5).setDepth(100);
            this.benchmark2.infoBorder.setSize(150, 14);

            // UPGRADE 10
            this.upgrade10 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 530, this.techPanel.y - 105, 'species', 60000, () => {
                this.jellypedeIcon.unlocked = true;
                
                this.upgrade11.unlocked = true;
                this.upgrade12.unlocked = true;
                this.upgrade13.unlocked = true;
            }, 'Research Jellypedes').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade10.infoBorder.setSize(150, 14);

            // UPGRADE 11
            this.upgrade11 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 590, this.techPanel.y - 150, 'evolution', 100000, () => {
                evolved['choral'] = true;
                this.choralIcon.evolve();
                for (let i = 0; i < this.lifeforms.length; i++) {
                    if (this.lifeforms[i].name == 'choral') {
                        this.lifeforms[i].evolve();
                    }
                }
                
                this.upgrade14.unlocked = true;
            }, 'Evolve Chorus').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade11.infoBorder.setSize(110, 14);

            // UPGRADE 12
            this.upgrade12 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 590, this.techPanel.y - 105, 'harvest', 100000, () => {
                autogather['triangler'] = true;
                
                this.upgrade14.unlocked = true;
                this.upgrade15.unlocked = true;
            }, 'Automatically Harvest Trianglers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade12.infoBorder.setSize(230, 14);

            // UPGRADE 13
            this.upgrade13 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 590, this.techPanel.y - 60, 'evolution', 100000, () => {
                evolved['triangler'] = true;
                this.trianglerIcon.evolve();
                for (let i = 0; i < this.lifeforms.length; i++) {
                    if (this.lifeforms[i].name == 'triangler') {
                        this.lifeforms[i].evolve();
                    }
                }
                
                this.upgrade15.unlocked = true;
            }, 'Evolve Trianglers').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade13.infoBorder.setSize(150, 14);

            // UPGRADE 14
            this.upgrade14 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 650, this.techPanel.y - 135, 'evolution', 250000, () => {
                evolved['jellypede'] = true;
                this.jellypedeIcon.evolve();
                for (let i = 0; i < this.lifeforms.length; i++) {
                    if (this.lifeforms[i].name == 'jellypede') {
                        this.lifeforms[i].evolve();
                    }
                }
                
                this.benchmark3.unlocked = true;
            }, 'Evolve Jellypedes').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade14.infoBorder.setSize(150, 14);

            // UPGRADE 15
            this.upgrade15 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 650, this.techPanel.y - 75, 'harvest', 300000, () => {
                autogather['jellypede'] = true
                
                this.benchmark3.unlocked = true;
            }, 'Automatically Harvest Jellypedes').setOrigin(0.5,0.5).setDepth(100);
            this.upgrade15.infoBorder.setSize(230, 14);

            // BENCHMARK 3
            this.benchmark3 = new Upgrade(this, this.techPanel.x - this.techPanel.width + 710, this.techPanel.y - 105, 'report', 1000000, () => {
                this.victoryText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'unscreen_mk', 'ASSIGNMENT COMPLETE', 60).setOrigin(0.5,0.5);
                this.victorySubText = this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 70, 'unscreen_mk', 'You\'ve completed all there is to offer,\n but feel free to continue playing!', 40, 1).setOrigin(0.5,0.5);
                this.time.addEvent({
                    delay: 10000, callback: () => {
                        this.tweens.add({
                            targets: [this.victoryText, this.victorySubText],
                            duration: 2000,
                            alpha: {from: 1, to: 0}
                        });
                    }
                });
            }, 'SUBMIT FINAL REPORT').setOrigin(0.5,0.5).setDepth(100);
            this.benchmark3.infoBorder.setSize(150, 14);
        }   

        this.techPanelOpen = false;

        this.techTab.setInteractive({
            useHandCursor: true
        });
        this.techTab.on('pointerdown', () => {
            if (!this.paused) {
                this.toggleTechnologyPanel();
            }
        });
    }

    toggleTechnologyPanel() {
        this.toggle.play();
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
        if (this.rollout) {
            this.rollout.destroy();
        }
        this.dialogueText.text = '';
        let text = dialogue;

        let letterCount = 0;
        this.rollout = this.time.addEvent({
            callback: () => {
                this.dialogueText.text += text[letterCount];
                letterCount += 1;
            },
            repeat: text.length - 1,
            delay: 30
        });
    }
}

