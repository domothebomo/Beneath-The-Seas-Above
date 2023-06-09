class Lifeform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.name = sprite;
    this.scene = scene;

    // WORLD PHYSICS
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.setScale(2,2);

    // ADD COLLISION WITH OTHER LIFEFORMS
    for (let i = 0; i < this.scene.lifeforms.length; i++) {
      this.scene.physics.add.collider(this, this.scene.lifeforms[i], () => {
        if (!this.bounced && this.name != 'choral') {
          this.bounced = true;
          this.bounceDelay.elapsed = 0;
          this.movementTimer.elapsed = 0;
          this.flipDirection();
        }
      });
    }
    // PREVENT MOVEMENT FOR CHORUS
    if (this.name == 'choral') {
      this.body.immovable = true;
    }

    // ATTRIBUTES
    this.moveSpeed = 50;
    this.direction = 1;
    this.bounced = false;

    this.biomass = 0;
    this.generateRate = 5;
    this.generateSpeed = 1000;
    this.maxBiomass = 50;
    this.autogather = autogather;

    this.setUpStats();
    if (evolved[this.name]) {
      this.evolve();
    }

    // BIOMASS GENERATION
    this.generateBiomass = this.scene.time.addEvent({
      delay: this.generateSpeed, callback: this.gatherBiomass, callbackScope: this, repeat: -1
    });

    // CHANGE DIRECTION WHILE MOVING
    if (this.name != 'choral') {
      this.movementTimer = this.scene.time.addEvent({
        delay: 2000, callback: () => {
          this.flipDirection();
        }, callbackScope: this, repeat: -1
      });
    }

    // DELAY BETWEEN CHANGING DIRECTION
    this.bounceDelay = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.bounced = false;
      },
      repeat: -1
    })

    this.createNotif();
  }

  update() {

    // AUTOMATIC GATHERING IF ENABLED
    this.autogather = autogather[this.name];
    if (this.biomass >= this.maxBiomass) {
      this.notif.alpha = 1;
      if (this.autogather == true) {
        playerBiomass += this.biomass;
        this.biomass = 0;
        this.notif.alpha = 0;
      }
    }

    // MOVEMENT
    if (this.name != 'choral') {
      this.setVelocity(this.moveSpeed * this.direction, 0);
    }
    this.notif.x = this.x + 20;
  }

  flipDirection() {
    this.direction = this.direction * -1;
    if (this.name == 'minoclops') {
      this.flipX = this.direction == 1 ? true : false;
    } else {
      this.flipX = this.direction == 1 ? false : true;
    }
  }

  setUpStats() {
    switch(this.name) {
      case 'minoclops':
        this.generateRate = 2;
        this.generateSpeed = 500;
        this.maxBiomass = 10;
        this.direction = -1;
        break;
      case 'sea_stinger':
        this.generateRate = 5;
        this.generateSpeed = 500;
        this.maxBiomass = 50;
        this.moveSpeed = 25;
        break;
      case 'choral':
        this.generateRate = 20;
        this.generateSpeed = 1000;
        this.maxBiomass = 100;
        break;
      case 'triangler':
        this.generateRate = 50;
        this.generateSpeed = 50;
        this.maxBiomass = 500;
        this.moveSpeed = 75;
        break;
      case 'jellypede':
        this.generateRate = 500;
        this.generateSpeed = 5000;
        this.maxBiomass = 1000;
        this.moveSpeed = 25;
        break;
    }
  }

  evolve() {
    switch(this.name) {
      case 'minoclops':
        this.setTexture('minorpedo');
        this.generateRate = 20;
        this.generateSpeed = 500;
        this.maxBiomass = 100;
        break;
      case 'sea_stinger':
        this.setTexture('stud_stinger');
        this.generateRate = 50;
        this.generateSpeed = 500;
        this.maxBiomass = 300;
        this.moveSpeed = 25;
        break;
      case 'choral':
        this.setTexture('chorctus');
        this.generateRate = 125;
        this.generateSpeed = 1000;
        this.maxBiomass = 1000;
        break;
      case 'triangler':
        this.setTexture('triangron');
        this.generateRate = 150;
        this.generateSpeed = 50;
        this.maxBiomass = 2400;
        this.moveSpeed = 75;
        break;
      case 'jellypede':
        this.setTexture('jellygleam');
        this.generateRate = 10000;
        this.generateSpeed = 5000;
        this.maxBiomass = 30000;
        this.moveSpeed = 25;
        break;
    }
  }

  gatherBiomass() {
    if (this.biomass < this.maxBiomass) {
      this.biomass += this.generateRate;
      this.notif.alpha = this.biomass / this.maxBiomass;
      if (this.biomass >= this.maxBiomass && this.autogather == true) {
        playerBiomass += this.biomass;
        this.biomass = 0;
        this.notif.alpha = 0;
      }
    }
  }

  createNotif() {
    this.notif = this.scene.physics.add.sprite(this.x, this.y - this.height * 1.5, 'notif').setOrigin(0.5,0.5).setScale(2,2).setDepth(1);
    
    this.notif.setInteractive({
      useHandCursor: true
    });
    this.notif.on('pointerdown', () => {
      if (!this.scene.paused) {
        playerBiomass += this.biomass;
        this.biomass = 0;
        this.notif.alpha = 0;
        this.scene.collectSound.play();
      }
    });
    
    this.notif.alpha = 0;
  }

}