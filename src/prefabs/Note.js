// Player prefab
class Note extends Phaser.Physics.Arcade.Sprite {
    
    
    constructor(scene, x,y,plat,dialog, image) {
        // call Phaser Physics Sprite constructor
        super(scene,x, y, plat); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.scene = scene;
        this.goup =true;
        this.godown = false; 
        this.ogposy = y;
        this.diff = 20;
        this.collected = false;
        this.dialog = dialog;

        this.im = image

        this.playOnce = true;

        this.nowui = false;
        //taken from phaser example
      
        

    }

    update() {

        if(this.collected)
        {
            if(this.playOnce)
            {
                this.fadein = this.scene.tweens.add({
                    targets: this.im,
                    alpha: {
                        from: 0,
                        to: 1
                    },
                    duration: 6000
                });
               
                this.playOnce = false;
            }
            console.log("in collected")

        }
}

    
}