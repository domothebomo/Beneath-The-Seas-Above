class Lifeform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.name = sprite;
    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    this.moveSpeed = 50;
    this.direction = 1;

    this.biomass = 0;
    this.generateRate = 5;
    this.generateSpeed = 1000;
    this.maxBiomass = 50;
    this.autogather = autogather;
    this.setUpStats();
    this.generateBiomass = this.scene.time.addEvent({
      delay: this.generateSpeed, callback: this.gatherBiomass, callbackScope: this, repeat: -1
    });
    if (this.name != 'choral') {
      this.movement = this.scene.time.addEvent({
        delay: 2000, callback: () => {
          this.direction = this.direction * -1;
          if (this.name == 'minoclops') {
            this.flipX = this.direction == 1 ? true : false;
          } else {
            this.flipX = this.direction == 1 ? false : true;
          }
        }, callbackScope: this, repeat: -1
      });
    }

    //this.notif = this.currScene.add.sprite(this.scene, this.x, this.y - this.height, 'notif');
    //this.notif = this.scene.physics.add.sprite(this.x, this.y - this.height * 0.75, 'notif').setOrigin(0.5,0.5);
    //this.notif.alpha = 0;
    this.createNotif();
  }

  update() {
    this.autogather = autogather;
    if (this.biomass >= this.maxBiomass) {
      this.notif.alpha = 1;
      if (this.autogather = true) {
        playerBiomass += this.biomass;
        this.biomass = 0;
        this.notif.alpha = 0;
      }
      //console.log('full');
    }
    if (this.name != 'choral') {
      this.setVelocity(this.moveSpeed * this.direction, 0);
    }
    this.notif.x = this.x;
  }

  setUpStats() {
    switch(this.name) {
      case 'minoclops':
        //console.log('mino');
        this.generateRate = 2;
        this.generateSpeed = 500;
        this.maxBiomass = 10;
        //this.flipX = true;
        this.direction = -1;
        break;
      case 'sea_stinger':
        //console.log('mino');
        this.generateRate = 5;
        this.generateSpeed = 500;
        this.maxBiomass = 50;
        this.moveSpeed = 25;
        break;
      case 'choral':
        //console.log('mino');
        this.generateRate = 20;
        this.generateSpeed = 1000;
        this.maxBiomass = 100;
        break;
    }
  }

  gatherBiomass() {
    if (this.biomass < this.maxBiomass) {
      this.biomass += this.generateRate;
      //console.log(this.name+" has generated "+this.biomass+" biomass");
      this.notif.alpha = this.biomass / this.maxBiomass;
      if (this.biomass >= this.maxBiomass && this.autogather == true) {
        //this.notif.alpha = 1;
        //console.log('full');
        playerBiomass += this.biomass;
        this.biomass = 0;
        this.notif.alpha = 0;
      }
    }
  }

  createNotif() {
    this.notif = this.scene.physics.add.sprite(this.x, this.y - this.height * 0.75, 'notif').setOrigin(0.5,0.5);
    //this.notif.flipY = true;
    
    this.notif.setInteractive({
      useHandCursor: true
    });
    this.notif.on('pointerdown', () => {
      playerBiomass += this.biomass;
      this.biomass = 0;
      this.notif.alpha = 0;
      this.scene.collectSound.play();
    });
    
    this.notif.alpha = 0;
  }

}