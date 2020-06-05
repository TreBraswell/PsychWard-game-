class Level1 extends Phaser.Scene {
  
  constructor() {
        super("Level1Scene");
        
    }
    preload() {
      
      //note to future self use a spritesheet to make up down left right
      this.load.audio('backsound', './assets/psych2.wav');
      this.load.image('right', './assets/psychright.png');
      this.load.image('monster', './assets/monster.png');
      this.load.image('door', './assets/door.png');
      this.load.tilemapTiledJSON('map', './assets/psychward..json');
      this.load.image('tiles1', './assets/lvl1.png');
      this.load.image('down', './assets/psychdown.png');
      this.load.image('left', './assets/psychleft.png');
      this.load.image('up', './assets/psychup.png');


      this.load.image('A', './assets/A.png');
      this.load.image('G', './assets/g.png');
      this.load.image('O', './assets/o.png');
      this.load.image('R', './assets/r.png');
      //  this.load.image('A', './assets/A.png');
      this.load.image('P', './assets/p.png');
      this.load.image('H', './assets/h.png');
      //this.load.image('O', './assets/A.png');
      this.load.image('B', './assets/b.png');
      this.load.image('I', './assets/i.png');
      //this.load.image('A', './assets/A.png');
    }
    create() {
    


    


      //debug stuff
      this.zoomin = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.zoomout = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.follow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      this.following = false;
      this.zoomdiff = .01;
      this.cursors =  this.input.keyboard.createCursorKeys();
      this.scrollfac = 10;

      this.spawndoor = false;
      this.goalletters = 10;//number of letters if they are equal to letter ie letters collected the door will fade in and then progress to the next level
      this.letters = 0;
      this.tilediff= 32;
      //text
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '18px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      } 
      this.cursors =  this.input.keyboard.createCursorKeys();
      this.difftimer = false; 
      this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.bgm = game.sound.add('backsound');
      this.bgm.loop = true;
      this.bgm.play();


      this.map = this.make.tilemap({ key: 'map' });
      this.tileset = this.map.addTilesetImage('level1', 'tiles1');
      this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
      this.layer2 = this.map.createDynamicLayer('Maze', this.tileset, 0, 0);
      //this.layer2 = this.map.createStaticLayer('Background', this.tileset, 0, 0);
      //  Un-comment this on to see the collision tiles
      // layer.debug = true;
  
      this.enemies = 1;
      this.prevtime= -1;
      this.timers = 0;
     this.difficultyTimer = this.time.addEvent({
        delay: 1000,
        callback: this.timerBump,
        callbackScope: this,
        loop: true
  
  
      });
      //groups
      this.letterGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
    this.goalGroup = this.add.group({
      runChildUpdate: true    // make sure update runs on group children
  });
     this.playerGroup = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });
    this.enemyGroup = this.add.group({
      runChildUpdate: true    // make sure update runs on group children
  });
  this.layer2.setCollisionByProperty({ collide: true });
    this.addPlayer();
    this.addEnemy();
    this.addGoal();
    this.diffchar = 50;
    this.intialdiff  = 25;
    //setting collision
   
    //

    this.physics.add.collider(this.player, this.layer2);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    //this.bcText = this.add.text(580, 10, "press space to go to menu", menuConfig).setOrigin(0,0);
    this.test = this.add.sprite(0 ,0 , 'G');
    //first spell out the phobia now, then make it invisible, and then when player collects, change alpha back to 1
    this.a1 = this.add.sprite( this.cameras.main.scrollX  + this.intialdiff +this.diffchar*1,this.cameras.main.scrollY +10, 'A')
    this.a1.alpha = 0;
    this.test.x = this.cameras.main.scrollX+20;
    this.test.y = this.cameras.main.scrollY+20;

    this.g = this.add.sprite(this.cameras.main.scrollX + this.intialdiff +this.diffchar*2 ,this.cameras.main.scrollY +15, 'G')
    this.g.alpha = 0;

    this.o1 = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*3,this.cameras.main.scrollY +15, 'O')
    this.o1.alpha = 0;
    this.r = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*4,this.cameras.main.scrollY+15 , 'R')
    this.r.alpha = 0;

    this.a2 = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*5,this.cameras.main.scrollY +15, 'A')
    this.a2.alpha = 0;

    this.p = this.add.sprite(this.cameras.main.scrollX + this.intialdiff +this.diffchar*6,this.cameras.main.scrollY +15, 'P')
    this.p.alpha = 0;

    this.h = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*7 ,this.cameras.main.scrollY+15, 'H')
    this.h.alpha = 0;

    this.o2 = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*8 ,this.cameras.main.scrollY+15, 'O')
    this.o2.alpha = 0;

    this.b = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*9 ,this.cameras.main.scrollY+15, 'B')
    this.b.alpha = 0;

    this.i = this.add.sprite(this.cameras.main.scrollX + this.intialdiff +this.diffchar*10,this.cameras.main.scrollY+15 , 'I')
    this.i.alpha = 0;

    this.a3 = this.add.sprite(this.cameras.main.scrollX  + this.intialdiff +this.diffchar*11 ,this.cameras.main.scrollY+15, 'A')
    this.a3.alpha = 0;


    this.addLetter('A', 178,2702,this.a1);
    this.addLetter('G', 1748,2693,this.g);
    this.addLetter('O', 616,2072,this.o1);
    this.addLetter('R', 1639,1946,this.r);
    this.addLetter('A', 692,606,this.a2);
    this.addLetter('P', 1004,1130,this.p);
    this.addLetter('H', 383,1413,this.h);
    this.addLetter('O', 841,142,this.o2);
    this.addLetter('B', 1123,1453,this.b);
    this.addLetter('I', 1445,1068,this.i);
    this.addLetter('A', 1070,1982,this.a3);

}
addPlayer(){
  this.player = new Player(this,380, 280, 'down',this.input.keyboard.createCursorKeys());
  this.playerGroup.add(this.player);
}
addLetter(string, x, y, i){

  let letter = new Letter(this,x, y, string,i);

  this.letterGroup.add(letter);
}
addEnemy(x, y){
  var Ene;
  if(this.enemies == 1)
  {
    Ene = new Enemy(this,x, y, 'monster',this.layer2,true);
    
  }
  else
  {
    Ene = new Enemy(this,x, y, 'monster',this.layer2,false);
  }
  
  this.enemyGroup.add(Ene);
  this.enemies++;
}
addGoal(){
  this.goal = new Goal(this,400,480,'door');
  this.goalGroup.add(this.goal);
}
  update() {
    
    if(config.physics.arcade.debug)
    {
     
     if(this.follow.isDown ||this.following)
     {var point =  this.cameras.main.getWorldPoint(this.input.mousePointer.x,this.input.mousePointer.y)
      console.log( "this is cursor position : ("+point.x+","+point.y+")");
       this.following = true;
      this.cameras.main.stopFollow();
      if (this.cursors.up.isDown)
      {
        this.cameras.main.scrollY -= this.scrollfac;
      }
      else if (this.cursors.down.isDown)
      {
        this.cameras.main.scrollY += this.scrollfac;
      }
  
      if (this.cursors.left.isDown)
      {
        this.cameras.main.scrollX -= this.scrollfac;
      }
      else if (this.cursors.right.isDown)
      {
        this.cameras.main.scrollX += this.scrollfac;
      }
     }
      if(this.zoomin.isDown)
      {
        this.cameras.main.setZoom(this.cameras.main.zoom +this.zoomdiff);
      }
      else if(this.zoomout.isDown)
      {
        this.cameras.main.setZoom(this.cameras.main.zoom -this.zoomdiff);
      }
    }
    
    this.a1.setScrollFactor(0);
    /*this.a1.x = game.playerCoord.x - 300
    this.a1.y = game.playerCoord.y - 200
*/
  this.g.setScrollFactor(0);
    /*this.g.x = game.playerCoord.x - 250
    this.g.y = game.playerCoord.y - 200
    */
   this.o1.setScrollFactor(0);
   /* this.o1.x = game.playerCoord.x - 200
    this.o1.y = game.playerCoord.y - 200
    */
   this.r.setScrollFactor(0);/*
    this.r.x = game.playerCoord.x - 150
    this.r.y = game.playerCoord.y - 200*/
    this.a2.setScrollFactor(0);/*
    this.a2.x = game.playerCoord.x - 100
    this.a2.y = game.playerCoord.y - 200*/
    this.p.setScrollFactor(0);
    /*
    this.p.x = game.playerCoord.x - 50
    this.p.y = game.playerCoord.y - 200
*/
    this.h.setScrollFactor(0);
    /*
    this.h.x = game.playerCoord.x 
    this.h.y = game.playerCoord.y - 200
    */
    this.o2.setScrollFactor(0);/*
    this.o2.x = game.playerCoord.x + 50
    this.o2.y = game.playerCoord.y - 200
    */
    this.b.setScrollFactor(0);/*
    this.b.x = game.playerCoord.x + 100
    this.b.y = game.playerCoord.y - 200
    */
    this.i.setScrollFactor(0);/*
    this.i.x = game.playerCoord.x + 150
    this.i.y = game.playerCoord.y - 200
    */
    this.a3.setScrollFactor(0);
    /*
    this.a3.x = game.playerCoord.x + 200
    this.a3.y = game.playerCoord.y - 200
    */




   
    if(this.cursors.left.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
     //console.log(tile.index);
      if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      { 
        this.player.play('left');
        this.player.x-= 2;
      }

  } else if(this.cursors.right.isDown) {
    var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
   // console.log(tile.index);
    if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      {

      this.player.x+= 2;
      }

} if(this.cursors.up.isDown) {
var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
   // console.log(tile.index);
if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
  {

  }
  else
  {
     this.player.y-= 2;
  }
      
  }
  else if(this.cursors.down.isDown) {
    var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
       // console.log(tile.index);
    if(tile.index == 4 || tile.index == 7 ||tile.index == 2||tile.index == 8)
      {

      }
      else
      {

      this.player.y+= 2;
      } 
  }
    //this.bcText.x= this.player.x; 
    //this.bcText.y= this.player.y; 
    if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
      this.scene.start("menuScene");   

    
    }
    this.physics.add.overlap( this.letterGroup,this.playerGroup,function(letter, player){
      letter.collected = true
      game.wordIndex.collected = true;
      letter.alpha = 0


  });
  if(this.letters== this.goalletters)
  {
    this.goal.fadein = true;
    this.spawndoor = true;
  }
  this.physics.add.overlap( this.goalGroup,this.playerGroup,function(goal, player){
    if(this.spawndoor&& !this.goal.fadeintween.isPlaying())
    {
      //go to next scene
    }

});
    if( this.prevtime<this.timers-3)
    {
      this.enemyGroup.getChildren().forEach(element => {
        element.blinkwait = true;   
      })

    }
    if(this.timers%5==0&&this.timers!=this.prevtime)
    {
      this.prevtime = this.timers;
      this.enemyGroup.getChildren().forEach(element => {
        element.blink = true;   
      })
    
    }
    else
    {
      this.enemyGroup.getChildren().forEach(element => {
        element.blink = false;                
      })
    }
    var i ;
    //disableBody( [disableGameObject] [, hideGameObject])
    //folow the player using math and x y cordinates
    this.enemyGroup.getChildren().forEach(element => {

      if(element.x>this.player.x)
      {
        element.x--;
      }
      else
      {
        element.x++;
      }
      if(element.y>this.player.y)
      {
        element.y--;
      }
      else
      {
        element.y++;
      }
      // do something with element
  })
    
}
timerBump()
{
this.timers++;
}
}