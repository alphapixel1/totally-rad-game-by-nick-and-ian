var parallaxInt;
class Background{
    constructor(name,preview,folderName,images,speeds){
        this.preview=preview;
        this.name=name;
        this.folderName=folderName;
        this.tiles=[];
        this.images=images;
        this.speeds=speeds;
        if(images.length!=speeds.length)
            throw `Background Error:${name} images length (${images.length}) does not equal speeds length (${speeds.length})`;
    }
    load(scene){
        
        for(var i=0;i<this.images.length;i++){
            scene.load.image(this.name+"_background_"+i,`/assets/background/${this.folderName}/${this.images[i]}`);
        }        
        scene.load.image(this.name+"_background_preview",`/assets/background/${this.folderName}/${this.preview}`);
        console.log(`/assets/background/${this.folderName}/${this.preview}`)
    }
    addBackground(scene){
      /*  if(this.tiles.length>0)
            throw "Background.js: Tiles have already been loadeded what do maybe tile.destroy"*/
        this.tiles=[];
        for(var i=0;i<this.images.length;i++){
            this.tiles.push(scene.add.tileSprite(config.width/2,config.height/2,config.width,config.height,this.name+"_background_"+i));
        }
        
    }
    //to be called by the update method
    parallax(){
       // console.log("parallaxing")
        for(var i=0;i<this.tiles.length;i++){
            let speeds=this.speeds[i];
            let tile=this.tiles[i];
            //console.log(tile.tilePositionX);
            tile.tilePositionX+=speeds[0];
            tile.tilePositionY+=speeds[1];
        }
       
    }
    getPreview(scene,x,y){
        return scene.add.sprite(x,y,this.name+"_background_preview");
    }

}