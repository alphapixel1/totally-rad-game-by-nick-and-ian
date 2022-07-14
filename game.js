const skipLoad=true;
const config={
    width:256,
    height:272,
    backgroundColor:0x000000,
    scene:[LoadingScene,TitleScreen],
    pixelArt:true,
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    }
};
if(skipLoad)
    config.scene.shift()
/*const gameSettings={
    playerSpeed:200,
};*/
window.onload=function(){
    var game=new Phaser.Game(config);
}