class LoadingScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }
    preload(){
        loadAssets(this);
    }
    create(){
        this.loadingCount=0;
        this.dotCount=0;
        this.loadingText=this.add.text(20,20,"Loading Game")
    }
    update(){
        if(this.loadingCount%20==0){
            this.dotCount++;
            this.loadingText.text="Loading game"+Array(this.dotCount%5).join('.');
        }
        if(this.loadingCount>160){
            this.scene.start("titleScreen")
            
        }

        this.loadingCount=(this.loadingCount+1)

    }
}