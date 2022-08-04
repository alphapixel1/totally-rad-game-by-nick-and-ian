class SettingsScene extends Phaser.Scene {
    constructor(){
        super("settings");
    }
    preload(){
       // this.load.image("teacher","assets/balls/t.png");
    }
    create(){
        
        CurrentBackground.addBackground(this);
        this.titleText=this.add.bitmapText(0,50,"pixelFont","SETTINGS",120);
        centerTextScreen(this.titleText);
       
        this.mainRect=this.add.rectangle(config.width/2,450,600,600,0x00000)
        this.mainRect.setStrokeStyle(5,0xFFFFFF,1) 
        
        
        this.addBackgrounds();
        //balls
        this.addBalls();
        //music
        this.addMusic();

        this.backButton=addBackToTitleButton(this);        

        var scene=this;
        TweenText(this,(tint=>{
            scene.titleText.setTint(tint);
            scene.backgroundText.setTint(tint);
            scene.ballText.setTint(tint);
         
            tintBackToTitleButton(scene.backButton,tint);
            this.MusicText.setTint(tint);
            scene.mainRect.setStrokeStyle(5, tint, 1);
            scene.selectedBackground.border.fillColor=tint;
            scene.selectedMusicBorder.setStrokeStyle(5,tint,1);
            
            scene.selectedBall.ballBorder.fillColor=tint;
        }));

       
    }
    update(){
      CurrentBackground.parallax();
    }
    addBalls(){
        this.ballText=this.add.bitmapText(0,380,"pixelFont","BALL",50);
        centerTextScreen(this.ballText);
        var ballXPos=[226,294,362,430,498,566,634,702];
        this.CirclePreviews=[];
        for(var i in Balls){
            const ballName=Balls[i];
            
            const ballBorder=this.add.circle(ballXPos[i],445,26,0x000000);
            
            const currentBallData={
                ballBorder:ballBorder,
                name:ballName
            };
            ballBorder.setInteractive();
            ballBorder.on("pointerover", () => {
                if(CurrentBall!=ballName){
                    ballBorder.fillColor=0xffffff;
                }
            });
            ballBorder.on("pointerout", () => {
                if(CurrentBall!=ballName){
                    ballBorder.fillColor=0x000000;
                }
            });
            ballBorder.on("pointerdown",()=>{
                const prevSelected=this.selectedBall;
                this.selectedBall=currentBallData;
                CurrentBall=ballName;
                prevSelected.ballBorder.fillColor=0x000000;
            });
            
            //this.add.circle(ballXPos[i],445,24,ballName);//main color ball
            this.add.sprite(ballXPos[i],445,ballName);

            this.CirclePreviews.push(currentBallData);
            if(ballName==CurrentBall)
                this.selectedBall=currentBallData;
        }
        //this.selectedBall=this.CirclePreviews.find(z=>z.color==CurrentBall);
     

    }
    addBackgrounds(){
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
        this.selectedBackground=this.backgroundPreview.find(z=>z.background==CurrentBackground);
    }
    addMusic(){
        this.MusicText=this.add.bitmapText(0,485,"pixelFont","MUSIC",50);
        centerTextScreen(this.MusicText);

        for(var i in Music){
            const song=Music[i];
            const text=this.add.bitmapText(0,545+(i*70),"pixelFont",song.name,40);
            centerTextScreen(text);
            const border=getTextRectangle(text,this,7);
            border.x+=5;
            border.y+=7;
            border.setInteractive();
            border.on("pointerover", () => {
                if(CurrentMusic!=song){
                    border.setStrokeStyle(5,0xFFFFFF,1)
                    //border.fillColor=0xff0000;
                }
            });
            border.on("pointerout", () => {
                if(CurrentMusic!=song){
                    //border.fillColor=0xffffff;
                    border.setStrokeStyle(5,0x000000,1)
                }
            });
            border.on("pointerdown",()=>{
                CurrentMusic=song;
                const old=this.selectedMusicBorder;
                this.selectedMusicBorder=border;
                old.setStrokeStyle(5,0x000000,1)
                playMusic(this);
            })
            text.depth=30;
            if(CurrentMusic==song)
                this.selectedMusicBorder=border;
        }
    }
}