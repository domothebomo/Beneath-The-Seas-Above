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
    zoom: 2,
    scene: [ Habitat ]
    
}

const game = new Phaser.Game(config);