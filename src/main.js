// BENEATH THE SEAS ABOVE
// 
// Developed By:
// Dominic Fanaris
// Sky Crockett
// Gavin Concepcion
//

let config = {
    type: Phaser.CANVAS,
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
        }
    },
    scene: [ Menu, Habitat, Credits]
    
}

const game = new Phaser.Game(config);

let playerBiomass = 50;
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
let lifeform_desc;
let evo_desc;
let music;
let keySPACE, keyH, keyW, keyD, keyC, keyESC;