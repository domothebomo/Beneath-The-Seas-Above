class Lifeform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.name = sprite;
    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.biomass = 0;
    this.generateRate = 5;
    this.generateSpeed = 1000;
    this.maxBiomass = 50;
    this.generateBiomass = this.scene.time.addEvent({
      delay: this.generateSpeed, callback: this.gatherBiomass, callbackScope: this, repeat: -1
    });

    //this.notif = this.currScene.add.sprite(this.scene, this.x, this.y - this.height, 'notif');
    //this.notif = this.scene.physics.add.sprite(this.x, this.y - this.height * 0.75, 'notif').setOrigin(0.5,0.5);
    //this.notif.alpha = 0;
    this.createNotif();
  }

  update() {
    if (this.biomass == this.maxBiomass) {
      this.notif.alpha = 1;
      //console.log('full');
    }
  }

  gatherBiomass() {
    if (this.biomass < this.maxBiomass) {
      this.biomass += this.generateRate;
      //console.log(this.name+" has generated "+this.biomass+" biomass");
      //this.notif.alpha = this.biomass / this.maxBiomass;
      if (this.biomass == this.maxBiomass) {
        this.notif.alpha = 1;
        //console.log('full');
      }
    }
  }

  createNotif() {
    this.notif = this.scene.physics.add.sprite(this.x, this.y - this.height * 0.75, 'notif').setOrigin(0.5,0.5);
    this.notif.flipY = true;
    
    this.notif.setInteractive({
      useHandCursor: true
    });
    this.notif.on('pointerdown', () => {
      playerBiomass += this.biomass;
      this.biomass = 0;
      this.notif.alpha = 0;
    });
    
    this.notif.alpha = 0;
  }

}