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
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scale: {
        //mode: Phaser.Scale.FIT
    },
    //zoom: 1.75,
    scene: [ Menu, Habitat ]
    
}

const game = new Phaser.Game(config);

//let playerBiomass = 50;
let playerBiomass = 1000000;
let autogather = {
    'minoclops': false,
    'sea_stinger': false,
    'choral': false,
    'triangler': false,
    'jellypede': false
}
let evolved = {
    'minoclops': false,
    'sea_stinger': false,
    'choral': false,
    'triangler': false,
    'jellypede': false
}
let keySPACE, keyH, keyW, keyD, keyC, keyESC;