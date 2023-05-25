let config = {
    type: Phaser.CANVAS,
    //width: 720,
    //height: 640,
    width: 600,
    height: 400,
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
    zoom: 1.75,
    scene: [ Habitat ]
    
}

const game = new Phaser.Game(config);

let playerBiomass = 50;
let autogather = false;
let keySPACE;