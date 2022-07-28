const skipLoad=true;
const config={
    width:928,
    height:793,
    backgroundColor:0x000000,
    scene:[LoadingScene,TitleScreen,GamePlayScene,SettingsScene,CreditsScene],
    pixelArt:true,
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    }
};
const credits=[
    {
        asset:"Font",
        name:"Luis Zuno",
        link:"https://www.youtube.com/c/LuisZuno"
    },
    {
        asset:"Forest Background",
        name:"edermunizz",
        link:"https://edermunizz.itch.io/free-pixel-art-forest"
    },
    {
        asset:"Industry Background & Audio",
        name:"ansimuz",
        link:"https://ansimuz.itch.io/industrial-parallax-background"
    },
    {
        asset:"Forest Audio",
        name:"Basar Under",
        link:"https://www.youtube.com/watch?v=8f7d_BSDoKA"
    }
]


const Backgrounds=[
   /* new Background("Cyberpunk","preview","Nightlife",
        ["far-buildings","back-buildings","foreground"],
        [[.2,0],[0.4,0],[0.5,0]]),*/
    new Background("Forest","preview","Forest",
        ["F1","F2","F3","F4","F5","F6","F7","F8","F9"],
        [[.2,0],[.4,0],[.6,0],[.8,0],[1,0],[1.2,0],[1.4,0],[1.6,0],[1.8,0]]),
    new Background("Industry","preview","Industry",
        ["I1","I2","I3","I4"],
        [[.2,0],[0.4,0],[0.5,0],[0.6,0]]),
    new Background("Black","preview","Black",["Black"],[[0,0]])
];

const Balls=[
    "duke",
    "teacher",
    "ian",
    "nick",
    "doom"
];

const Music=[
    {
        name:"FOREST",
        file:"assets/audio/music/forest.mp3"//https://youtu.be/8f7d_BSDoKA definetly stolen
    },
    /*{
        name:"NIGHTLIFE",
        file:"assets/audio/music/nightlife.mp3"
    },*/
    {
        name:"INDUSTRIAL",
        file:"assets/audio/music/industrial.mp3"
    },
    {
        name:"NONE",
        file:""
    },
];
var CurrentBackground=Backgrounds[1];
var CurrentBall=Balls[0];
var CurrentMusic=Music[1];

var assetsLoaded=false;
if(skipLoad)
    config.scene.shift()
var game;
window.onload=function(){
    game=new Phaser.Game(config);
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
    rect.fillAlpha=0;
    rect.setInteractive()
    rect.on("pointerover", () => {
        rect.fillAlpha=1;
    });
    rect.on("pointerout", () => {
        rect.fillAlpha=0;
        rect.setStrokeStyle(2, 0, 0);
    });
    
    return rect;
}
function loadAssets(scene){
    if(assetsLoaded)
        return;
    assetsLoaded=true;
    scene.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml");  
    scene.load.image("Back Button","assets/back_button.png")
    Backgrounds.forEach(z=>z.load(scene));
    Balls.forEach(name => {
        scene.load.image(name,"assets/balls/"+name+".png");
    });
    Music.forEach(z=>{scene.load.audio(z.name,z.file)})
}
var currentMusicPlaying={
    name:"",
    music:null,
}
function playMusic(scene){
    console.log(currentMusicPlaying,CurrentMusic)
    if(currentMusicPlaying.name==CurrentMusic.name)
        return;
    if(currentMusicPlaying.name!=CurrentMusic.name && currentMusicPlaying.music!=null){
        currentMusicPlaying.music.stop();
    }else if(CurrentMusic.file==""){
        currentMusicPlaying.name=CurrentMusic.name;
        return;   
    }
    
    currentMusicPlaying.name=CurrentMusic.name;
    if(true||scene.sound.sounds.find(z=>z.key==CurrentMusic.name)!=null){
        currentMusicPlaying.music=scene.sound.add(CurrentMusic.name)
        currentMusicPlaying.music.play(); 
        currentMusicPlaying.music.setLoop(true);
    }
    console.log(scene.sound)
}
function addBackToTitleButton(scene){
    var t=scene.add.bitmapText(50,77,"pixelFont","BACK",50);
    r=getTextRectangle(t,scene,7);
    r.x+=5;
    r.y+=5;
    t.depth=30;
    r.on("pointerdown",()=>{
        scene.scene.start("titleScreen")
     });
     return {
        text:t,
        rect:r
     }
}
function tintBackToTitleButton(button,tint){
    button.text.setTint(tint);
    button.rect.setStrokeStyle(5,tint,1);
}