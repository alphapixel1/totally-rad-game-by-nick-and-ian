const skipLoad=true;
const config={
    width:928,
    height:793,
    backgroundColor:0x000000,
    scene:[LoadingScene,TitleScreen,GamePlayScene,SettingsScene],
    pixelArt:true,
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    }
};
var Backgrounds=[
    //constructor(name,icon,images,speeds){
    new Background("Forest","preview.png","Forest",
        ["F1.png","F2.png","F3.png","F4.png","F5.png","F6.png","F7.png","F8.png","F9.png"],
        [[.2,0],[.4,0],[.6,0],[.8,0],[1,0],[1.2,0],[1.4,0],[1.6,0],[1.8,0]]),
    new Background("Industry","preview.png","Industry",
        ["I1.png","I2.png","I3.png","I4.png"],
        [[.2,0],[0.4,0],[0.5,0],[0.6,0]]),
    new Background("Black","preview.png","Black",["Black.png"],[[0,0]])
];
var CurrentBackground=Backgrounds[1];
var Balls=[
    0xffffff,//white
    0x0000ff,//blue
    0xff0000,//red
    0x00ff00,//green
    0xffff00,//yellow
    0x5D3FD3,//purple
    0xFFC0CB,//pink
    0x964B00,//brown
];


if(skipLoad)
    config.scene.shift()
/*const gameSettings={
    playerSpeed:200,
};*/
window.onload=function(){
    var game=new Phaser.Game(config);
}

/**
 * global functions
*/

function TweenText(scene,tweenEvent){
    setTimeout(function(){
        scene.tweens.addCounter({
            from: 255,
            to: 0,
            duration: 1000,
            yoyo:true,
            repeat:-1,
            onUpdate: function (tween)
            {
                let tint="0xffff"+Math.floor(tween.getValue()).toString(16).padStart(2,"0")
                tweenEvent(tint);
            }
        });
    },200)
}
 //returns the center of the screen calculating the width
 function centerTextScreen(text){
    let width=text.getTextBounds(true).global.width;
    text.x= (config.width/2)-(width/2);
}
function getTextRectangle(text,scene,padding){
    let global=text.getTextBounds(true).global;
    let w=global.width + (padding*2);
    let h=global.height + (padding*2);
    let rect=scene.add.rectangle((text.x+(global.width/2))-(padding), (text.y+(global.height/2))-(padding*2), w, h, 0x00000);
   //let rect=scene.add.rectangle(text.x-padding, text.y-padding, w, h, 0x00000);
   // rect.setOrigin(0,0);
    rect.fillAlpha=0;
    rect.setInteractive()
    rect.on("pointerover", () => {
        rect.fillAlpha=1;
        
        //rect.setStrokeStyle(4, 0xefc53f);
    });
    rect.on("pointerout", () => {
        rect.fillAlpha=0;
        rect.setStrokeStyle(2, 0, 0);
        
        //rect.setStrokeStyle(4, 0xefc53f);
    });
    
    return rect;
}