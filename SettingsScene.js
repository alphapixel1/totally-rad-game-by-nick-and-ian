class SettingsScene extends Phaser.Scene {
    constructor(){
        super("settings");
    }
    preload(){
        
    }
    create(){
        CurrentBackground.addBackground(this);
        this.titleText=this.add.bitmapText(0,50,"pixelFont","SETTINGS",120);
        centerTextScreen(this.titleText);
       
        this.mainRect=this.add.rectangle(config.width/2,450,600,600,0x00000)
        this.mainRect.setStrokeStyle(5,0xFFFFFF,1)
       
        this.backgroundText=this.add.bitmapText(0,160,"pixelFont","BACKGROUND",50);
        centerTextScreen(this.backgroundText);

        this.backgroundPreview=[];
        const bgXPos=[219,389,559];
        
        for(var i in Backgrounds){
            const bg=Backgrounds[i];
            bg.load(this);

            const borderRect=this.add.rectangle(bgXPos[i]-1,203,152,130,0xffffff)
            borderRect.setOrigin(0,0)

            const r=bg.getPreview(this,bgXPos[i],204);
            r.setOrigin(0,0);
            
            const txt=this.add.bitmapText(0,345,"pixelFont",bg.name,30);
            txt.x=r.x+(r.displayWidth-txt.getTextBounds(true).global.width)/2
            
            this.backgroundPreview.push({
                text:txt,
                img:r,
                background:bg,
                border:borderRect
            });
            borderRect.setInteractive()
            borderRect.on("pointerover", () => {
                if(CurrentBackground!=bg)
                borderRect.fillColor=0xff0000;
            });
            borderRect.on("pointerout", () => {
                if(CurrentBackground!=bg)
                borderRect.fillColor=0xffffff;
            });
            borderRect.on("pointerdown",()=>{
                //CurrentBackground.tiles.forEach(t=>t.destroy());
                CurrentBackground=bg;
                this.scene.start("settings");

            })
            
            console.log(r.displayWidth);
        }

        this.ballText=this.add.bitmapText(0,380,"pixelFont","BALL",50);
        centerTextScreen(this.ballText);
        

        //balls
        var ballXPos=[202,270,338,406,474,542,610,678];
        this.CirclePreviewes=[];
        for(var i in Balls){
            const b=Balls[i];
            alert("where cirlce")
            const bC=this.add.circle(ballXPos[i], 420,348, b[i]);
            console.log(bC);
        }

        const scene=this;
        TweenText(this,(tint=>{
            scene.titleText.setTint(tint);
            scene.backgroundText.setTint(tint);
            scene.ballText.setTint(tint);
            scene.mainRect.setStrokeStyle(5, tint, 1);
            scene.backgroundPreview.find(z=>z.background==CurrentBackground).border.fillColor=tint;
        }));

       
    }
    update(){
      CurrentBackground.parallax();
    }
    centerTextToSprite(text){

    }
}