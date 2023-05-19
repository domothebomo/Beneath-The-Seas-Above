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
    this.maxBiomass = 50;
    this.generateBiomass = this.scene.time.addEvent({
      delay: 1000, callback: this.gatherBiomass, callbackScope: this, repeat: -1
    });
  }

  gatherBiomass() {
    if (this.biomass < this.maxBiomass) {
      this.biomass += this.generateRate;
      console.log(this.name+" has generated "+this.biomass+" biomass");
    }
  }

}