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


        this.addButtons(250,"start","START","game");
        this.addButtons(375,"settings","SETTINGS","settings");
        this.addButtons(500,"credits","CREDITS","credits");


        
        this.broscreen=this.add.bitmapText(10,config.height-30,"pixelFont","DEVELOPED BY 2 F**KHEADS",30);
        
        const scene=this;
        TweenText(this,(tint=>{
            //let tint="0xffff"+Math.floor(tween.getValue()).toString(16).padStart(2,"0")
            scene.startText.setTint(tint);
            scene.titleText.setTint(tint);
            scene.settingsText.setTint(tint);
            scene.broscreen.setTint(tint);
            scene.creditsText.setTint(tint);
            if(scene.startRect.fillAlpha==1)
                scene.startRect.setStrokeStyle(5, tint, 1);
            if(scene.settingsRect.fillAlpha==1)
                scene.settingsRect.setStrokeStyle(5, tint, 1);
            if(scene.creditsRect.fillAlpha==1)
                scene.creditsRect.setStrokeStyle(5, tint, 1);
        }))    
        
        
    }
    update(){
        CurrentBackground.parallax();
     //   this.transitionTitleTextColor();
        
        //this.b.tilePositionX+=.5;
    }
    addButtons(y,baseName,text,destination){
        const tb=this.add.bitmapText(0,y,"pixelFont",text,90)
        this[baseName+"Text"]=tb;
        centerTextScreen(tb);
        
        const rect=getTextRectangle(tb,this,5);
        this[baseName+"Rect"]=rect;
        rect.on("pointerdown",()=>{
            this.scene.start(destination);
        });
        tb.depth=30;
    }
 
}