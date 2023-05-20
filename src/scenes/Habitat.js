class Habitat extends Phaser.Scene {
    constructor() {
        super('habitatScene');
    }

    preload() {
        this.load.path = './assets/';
        //this.load.image('background', 'background.png');
        this.load.image('sand', 'sand.png');
        this.load.image('water', 'water.png');
        this.load.image('bubbles', 'bubbles.png');

        this.load.image('notif', 'rocket.png');
        this.load.image('select', 'select.png');
        this.load.image('lifeforms_panel', 'side_panel.png');
        this.load.image('lifeforms_tab', 'panel_tab.png');

        this.load.image('minoclops', 'minoclops.png');
        this.load.image('sea_stinger', 'sea_stinger.png');
        this.load.image('choral', 'choral.png');
    }

    create() {
        this.water = this.add.sprite(0, 0, 'water').setOrigin(0,0);
        //this.water = this.add.tileSprite(0, 0, 600, 400, 'water');
        this.bubbles = this.add.tileSprite(0, 0, 600, 400, 'bubbles').setOrigin(0,0);
        this.sand = this.add.sprite(0, 0, 'sand').setOrigin(0,0);

        this.lifeforms = [];        

        //this.fish1 = new Lifeform(this, 200, 250, 'minoclops').setOrigin(0.5,0.5);
        //this.fish2 = new Lifeform(this, 250, 350, 'sea_stinger').setOrigin(0.5,0.5);
        //this.plant = new Lifeform(this, 100, 325, 'choral').setOrigin(0.5,0.5);
        //this.lifeforms.push(new Lifeform(this, 200, 250, 'minoclops').setOrigin(0.5,0.5));
        //this.lifeforms.push(new Lifeform(this, 250, 350, 'sea_stinger').setOrigin(0.5,0.5));
        //this.lifeforms.push(new Lifeform(this, 100, 325, 'choral').setOrigin(0.5,0.5));

        this.biomassDisplay = this.add.text(25, 25, 'BIOMASS: '+playerBiomass, {});

        this.createLifeformsPanel();
    }

    update() {
        this.bubbles.tilePositionY += 0.25;

        this.biomassDisplay.text = 'BIOMASS: '+playerBiomass;

        //this.fish1.x += 1;
        //this.fish2.x += 1;
        //this.plant.x += 3;
        //this.fish1.update();
        //this.fish2.update();
        //this.plant.update();

        this.minoclopsIcon.update();
        this.seastingerIcon.update();
        this.choralIcon.update();
    }

    createLifeformsPanel() {
        this.lifeformsPanel = this.physics.add.sprite(game.config.width - 96 + 90, 16, 'lifeforms_panel').setOrigin(0,0);
        this.lifeformsPanel.alpha = 0.5;
        this.lifeformsTab = this.add.sprite(this.lifeformsPanel.x, this.lifeformsPanel.height / 2, 'lifeforms_tab').setOrigin(1, 0.5);
        this.lifeformsTab.alpha = 0.5;

        //this.minoclopsIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 50, 'minoclops').setOrigin(0.5,0);
        //this.seastingerIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 130, 'sea_stinger').setOrigin(0.5,0);
        //this.choralIcon = this.add.sprite(this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 210, 'choral').setOrigin(0.5,0);
        this.minoclopsIcon = new Icon(this, this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 50, 'minoclops', 50).setOrigin(0.5,0);
        this.seastingerIcon = new Icon(this, this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 130, 'sea_stinger', 75).setOrigin(0.5,0);
        this.choralIcon = new Icon(this, this.lifeformsPanel.x + 10 + this.lifeformsPanel.width / 2, this.lifeformsPanel.y + 210, 'choral', 100).setOrigin(0.5,0);

        this.lifeformPanelOpen = false;

        this.lifeformsTab.setInteractive({
            useHandCursor: true
        });
        this.lifeformsTab.on('pointerdown', () => {
            if (!this.lifeformPanelOpen) {
                this.lifeformPanelOpen = true;
                this.tweens.add({
                    targets: [this.lifeformsPanel, this.lifeformsTab],
                    duration: 200,
                    x: {from: game.config.width - 6, to: game.config.width - 96},
                    ease: 'Linear'
                });
                this.tweens.add({
                    targets: [this.minoclopsIcon, this.seastingerIcon, this.choralIcon],
                    duration: 200,
                    x: {from: this.minoclopsIcon.x, to: this.minoclopsIcon.x - 90},
                    ease: 'Linear'
                });
            } else {
                this.lifeformPanelOpen = false;
                this.tweens.add({
                    targets: [this.lifeformsPanel, this.lifeformsTab],
                    duration: 200,
                    x: {from: game.config.width - 96, to: game.config.width - 6},
                    ease: 'Linear'
                });
                this.tweens.add({
                    targets: [this.minoclopsIcon, this.seastingerIcon, this.choralIcon],
                    duration: 200,
                    x: {from: this.minoclopsIcon.x, to: this.minoclopsIcon.x + 90},
                    ease: 'Linear'
                });
            }
        });
    }
}