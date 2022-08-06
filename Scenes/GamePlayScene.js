class GamePlayScene extends Phaser.Scene {
    constructor(){
        super("game");
    }
    create(){
        var scene=this;
        CurrentBackground.addBackground(this);
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        this.paddleSpeed=400;
        this.level=1;
        this.paused=false;
        
        this.gameOver=false;
        this.levelPause=true;

        var topRect=this.add.rectangle(-5,-5,config.width+10,70+5,0x000000)
        topRect.setOrigin(0,0)

        this.scoreText=this.add.bitmapText(745,18,"pixelFont","00000000",50);
        this.score=0;

        var title=this.add.bitmapText(745,4,"pixelFont","BREAKOUT",100);
        centerTextScreen(title);

        this.ball=this.physics.add.sprite(config.width/2,650,CurrentBall);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setInteractive(this.input.makePixelPerfect())
        
        this.physics.world.setBounds(0,73,config.width,config.height-73);

        this.paddle=this.physics.add.sprite(config.width/2,707,"paddle")
        this.paddle.setCollideWorldBounds(true);
        this.paddle.setImmovable(true);
        this.paddle.setInteractive(this.input.makePixelPerfect())
        

     /*   this.paddle.on("pointerdown",()=>{
            while(this.bricks.children.entries.length>0)
                this.bricks.children.entries[0].destroy()
               this.nextLevel();
                
            
        });*/
        //space bar pause
       var keyobj=this.input.keyboard.addKey("Space");
       keyobj.on('down',function(event){
            console.log("Pause button",scene.gameStarted);
            if(scene.gameStarted && !scene.levelPause){
                if(scene.paused){
                    scene.paused=false;
                    scene.pressSpaceToStart(false,false,false);
                    scene.ball.setVelocity(scene.pauseSpeed.x,scene.pauseSpeed.y)
                }else{
                    console.log('ball body',scene.ball.body)
                    ///save the balls velocity  
                    let s=scene.ball.body.velocity;
                    scene.pauseSpeed={
                        'x':s.x,
                        'y':s.y
                    }
                    scene.ball.setVelocity(0);
                    scene.paused=true;
                    scene.paddle.setVelocity(0,0)
                    scene.pressSpaceToStart(true,true,false);
                }
            }
              
       })
       //ball and paddle collision \/
        this.physics.add.collider(this.ball,this.paddle, function (ball, paddle)
        {
            var diff = 0;
            const multiplier=4.5;
            if (ball.x < paddle.x)
            {
                diff = paddle.x - ball.x;
                ball.setVelocityX(-multiplier * diff);
            }
            else if (ball.x > paddle.x)
            {
                diff = ball.x -paddle.x;
                ball.setVelocityX(multiplier * diff);
            }
            else
            {
                ball.setVelocityX(2 + Math.random() * multiplier);
            }
          //  console.log(ball.body)
        })
        
        this.setupBackButton()

        this.rectToTween=[topRect];
        this.textToTween=[this.scoreText,title,this.paddle,this.backButton.text];
        
        this.addBricks();
        console.log(this.bricks,"bricks")
        //color changer \/
        TweenText(this,(tint=>{
            
            scene.rectToTween.forEach(z=>z.setStrokeStyle(5,tint,1));
            scene.textToTween.forEach(z=>z.setTint(tint))
            scene.bricks.children.entries.forEach(z=>z.setTint(tint));
            scene.backButton.rect.setStrokeStyle(scene.backHover? 5:0,tint,5);
            if(typeof scene.spaceText!=="undefined")
                this.spaceText.setTint(tint)
            if(scene.showRetryBorder){
                scene.retryRect.setStrokeStyle(5,tint,5);
            }
            if(typeof scene.nextLevelText!=="undefined")
                scene.nextLevelText.setTint(tint);
            
        }));
        
        this.pressSpaceToStart(true,false);
        
        this.cursorKeys=this.input.keyboard.createCursorKeys();
    }
    update(){
        CurrentBackground.parallax();
        if(!this.paused)
            this.movePaddle();

        if(!this.gameStarted){
            if(this.cursorKeys.space.isDown && !this.gameOver){
                this.pressSpaceToStart(false,false);
                let y=200+(Math.random()*150);
                let x=300-y
                this.ball.setVelocity(x,-y)   
            }else{
                this.ball.x=this.paddle.x;
                this.ball.y=650;
            }
        }else{
            if(this.ball.y>config.height){
                this.gameStarted=false;
                this.gameOver=true
                this.showGameOver();
            }
        
        }
        
    //    this.moveThing()//debug
    }
    movePaddle(){
        
        if(this.cursorKeys.left.isDown){
            this.paddle.setVelocity(-this.paddleSpeed,0);
        }else if(this.cursorKeys.right.isDown){
            this.paddle.setVelocity(this.paddleSpeed,0);
        }else{
            this.paddle.setVelocity(0,0);
        }
    }
    showGameOver(){
        this.gameOverRect=this.add.rectangle(config.width/2,300,800,350,0x0000);
        
        this.gameOverText=this.add.bitmapText(0,140,"pixelFont","GAME OVER",200);
        centerTextScreen(this.gameOverText);
        
        this.scoreText2=this.add.bitmapText(0,270,"pixelFont",this.score.toString().padStart(8,0),100);
        centerTextScreen(this.scoreText2);

        this.retryText=this.add.bitmapText(0,360,"pixelFont","Retry",120);
        centerTextScreen(this.retryText)
        this.retryRect=getTextRectangle(this.retryText,this,5)
        this.retryRect.x+=3;
        this.retryRect.y+=3;
        this.retryRect.on("pointerover", () => {
            this.showRetryBorder=true;
        });
        this.retryRect.on("pointerout", () => {
            this.showRetryBorder=false;
        });
        this.retryRect.on("pointerdown",()=>{
            this.scene.start("game")
        });
        this.retryText.depth=30;

        this.textToTween.push(this.scoreText2,this.retryText,this.gameOverText);
        this.rectToTween.push(this.gameOverRect);
    }
    /**
     * all bricks have been cleared
     */
    nextLevel(){
        this.ball.setVelocity(0,0);
        this.ball.x=this.paddle.x;
        this.ball.y=650
        //this.score+=500*this.level;
        //this.updateScore();
        this.levelPause=true;

        this.nextLevelText=this.add.bitmapText(745,545,"pixelFont",`LEVEL ${this.level} COMPLETE`,100);
        let vis=false;
        let delay=350;
        const scene=this;
        for(var i=0;i<7;i++){
            //console.log(vis);
            setTimeout(function(){
                //console.log("flash")

                scene.nextLevelText.setVisible(vis);
                vis=!vis;
                scene.score+=30;
                scene.updateScore();
            },i*delay)
        }
        setTimeout(function(){
            scene.nextLevelText.destroy();
            scene.nextLevelText=undefined;
            scene.addBricks();
            scene.pressSpaceToStart(true,true);
        },7*delay)
        this.level+=1;
        centerTextScreen(this.nextLevelText);
    }   

    updateScore(){
        this.scoreText.text=this.score.toString().padStart(8,0)
    }
    addBricks(){
        
        let brickRows=Math.round(Math.random())+4;
        let brickColumns=Math.round(Math.random())+5;
        let brickWidth=100;
        let brickHeight=50;       
        this.bricks=this.add.group();
        let start=((config.width/2)-((brickColumns*brickWidth)/2))+(brickWidth/2);
        for(let r=0;r<brickRows;r++){
            for(let c=0;c<brickColumns;c++){
                let b=this.physics.add.sprite(start+(c*brickWidth),150+(r*brickHeight),"brick");
                b.setImmovable(true);
                this.bricks.add(b);
        
            }
        }
        this.physics.add.collider(this.bricks,this.ball,(brick,ball)=>{
            brick.destroy()
            this.score+=15;
            this.updateScore();
            if(this.bricks.children.entries.length==0){
                this.nextLevel();
            }
        });
    }
    setupBackButton(){
        this.backButton=addBackToTitleButton(this);
        
        this.backButton.text.x=15;
        this.backButton.text.y=18;
        //this.backButton.text.text="BACK"
        
        this.backButton.rect.x=59;
        this.backButton.rect.y=33;
        console.log("backbutton width",this.backButton.rect.width)
        this.backButton.rect.on("pointerover", () => {
            this.backHover=true;
        });
        this.backButton.rect.on("pointerout", () => {
            this.backHover=false;
        });
        
    }
    pressSpaceToStart(show,isContinue,moveObjects=true){
        if(show){
            if(typeof this.spaceText !=='undefined'){
                this.spaceText.destroy();
            }
            if(moveObjects){
                this.ball.setVelocity(0,0);
                this.paddle.x=config.width/2;
                this.gameStarted=false;
                this.levelPause=true;
            }
            
            let text="";
            if(isContinue)
                    text="Continue"
                else
                    text="Start"
            this.spaceText=this.add.bitmapText(745,550,"pixelFont","Press Space To "+text,50);
            centerTextScreen(this.spaceText);
            //this.spaceBack=this.add.rectangle((config.width/2),500,200,200,0x00000);
            
        }else{
          //  console.log("spacetext",this.spaceText)
            let t=this.spaceText;
            t.setVisible(false);
            this.levelPause=false;
            this.spaceText=undefined;
            t.destroy();
            this.gameStarted=true;
            
        }
    }
    
}