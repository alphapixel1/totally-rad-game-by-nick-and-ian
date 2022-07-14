class TitleScreen extends Phaser.Scene {
    constructor(){
        super("titleScreen");
    }
    preload(){
        if(skipLoad){
            loadAssets(this);
        }
        console.log("preload complete")
        
        
        //this.load.image("background","/assets/background/Forest/F6.png");
    }
    create(){
        playMusic(this);
        CurrentBackground.addBackground(this);
        this.titleText=this.add.bitmapText(0,50,"pixelFont","BREAKOUT",120);
        centerTextScreen(this.titleText);

        this.startText=this.add.bitmapText(0,250,"pixelFont","START",90)
        centerTextScreen(this.startText);

        this.startRect=getTextRectangle(this.startText,this,5);
        this.startRect.on("pointerdown",()=>{
           // this.scene.start("game")
        })
        
        this.startText.depth=30;

        this.settingsText=this.add.bitmapText(0,375,"pixelFont","SETTINGS",90)
        centerTextScreen(this.settingsText);

        this.settingsRect=getTextRectangle(this.settingsText,this,5);
        this.settingsText.depth=30;
        this.settingsRect.on("pointerdown",()=>{
            this.scene.start("settings")
        })
        
        this.broscreen=this.add.bitmapText(10,config.height-30,"pixelFont","DEVELOPED BY 2 FUCKHEADS",30);
        
        const scene=this;
        TweenText(this,(tint=>{
            //let tint="0xffff"+Math.floor(tween.getValue()).toString(16).padStart(2,"0")
            scene.startText.setTint(tint);
            scene.titleText.setTint(tint);
            scene.settingsText.setTint(tint);
            scene.broscreen.setTint(tint);
            if(scene.startRect.fillAlpha==1)
                scene.startRect.setStrokeStyle(5, tint, 1);
            if(scene.settingsRect.fillAlpha==1)
                scene.settingsRect.setStrokeStyle(5, tint, 1);
        }))    
        
        
    }
    update(){
        CurrentBackground.parallax();
     //   this.transitionTitleTextColor();
        
        //this.b.tilePositionX+=.5;
    }
  
 
}