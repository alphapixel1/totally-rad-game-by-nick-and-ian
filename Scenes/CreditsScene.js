class CreditsScene extends Phaser.Scene {
    constructor(){
        super("credits");
    }
    preload(){
        
    }
    create(){

        CurrentBackground.addBackground(this);
        this.titleText=this.add.bitmapText(0,50,"pixelFont","CREDITS",120);
        centerTextScreen(this.titleText);
        const scene=this;
        this.hoveredRect=null;
        this.creditsObj=[];
        const offset=205;
        for(var i=0;i<credits.length;i++){
            const credit=credits[i];
            const t=this.add.bitmapText(0,(i*125)+offset,"pixelFont",credit.asset,50);
            centerTextScreen(t);
            this.creditsObj.push(t);
            const c=this.add.bitmapText(0,(i*125)+offset+60,"pixelFont",credit.name,50);
            centerTextScreen(c);
            const r=getTextRectangle(c,this,5);
            r.x+=3;
            r.y+=5;
            c.depth=30;
            r.on("pointerover", () => {
               this.hoveredRect=r;
               r.setStrokeStyle(5,0xFFFFFF,1)
            });
            r.on("pointerout", () => {
                this.hoveredRect=null;
                r.setStrokeStyle(0,0x000000,0)
            });
            r.on("pointerdown",()=>{
               window.open(credit.link);
            });
        }
        this.backButton=addBackToTitleButton(this);
      


        TweenText(this,(tint=>{
            tintBackToTitleButton(scene.backButton,tint);
            
            scene.titleText.setTint(tint);
            scene.creditsObj.forEach(c=>c.setTint(tint))
            if(scene.hoveredRect!=null){
                scene.hoveredRect.setStrokeStyle(5,tint,1);
            }
        }))    
        
    }
    update(){
        CurrentBackground.parallax();

    }
}
