let config = {
    type: Phaser.CANVAS,
    //width: 720,
    //height: 640,
    width: 1200,
    height: 800,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade'
    },
    scale: {
        //mode: Phaser.Scale.FIT
    },
    //zoom: 1.75,
    scene: [ Menu, Habitat ]
    
}

const game = new Phaser.Game(config);

let playerBiomass = 50;
let autogather = false;
let keySPACE, keyH;