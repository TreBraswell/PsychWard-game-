
class Level2 extends Phaser.Scene {
  
    constructor() {
          super("Level2Scene");






                //////////////////////////////////

      //DIALOG//////////////////////////

      this.DBOX_X = 0;			    // dialog box x-position
      this.DBOX_Y = 400;			    // dialog box y-position
      this.DBOX_FONT = 'basic_font';	// dialog box font key

      this.TEXT_X = 50;			// text w/in dialog box x-position
      this.TEXT_Y = 360;			// text w/in dialog box y-position
      this.TEXT_SIZE = 24;		// text font size (in pixels)
      this.TEXT_MAX_WIDTH = 715;	// max width of text within box

      this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
      this.NEXT_X = 775;			// next text prompt x-position
      this.NEXT_Y = 574;			// next text prompt y-position

      this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

      // dialog variables
      this.dialogConvo = 0;			// current "conversation"
      this.dialogLine = 0;			// current line of conversation
      this.dialogSpeaker = null;		// current speaker
      this.dialogLastSpeaker = null;	// last speaker
      this.dialogTyping = false;		// flag to lock player input while text is "typing"
      this.dialogText = null;			// the actual dialog text
      this.nextText = null;			// player prompt text to continue typing

      // character variables
      this.psych = null;
      this.psych2 = null;

      this.isTalking = false;
      this.firstType = true;





      this.noteGroup = null
    this.goalGroup =null

     this.playerGroup =  null
    this.enemyGroup = null
          
      }
      preload() {
        this.load.audio('backsound', './assets/psych2.wav');
        this.load.image('player', './assets/psychright.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('door', './assets/door.png');
        this.load.tilemapTiledJSON('map', './assets/psychward2.json');
        this.load.image('tiles1', './assets/lvl2.png');
        this.load.image('A', './assets/A.png');







        
      }
      create() {
        //text
        this.tilediff = 32;
       this.cursors =  this.input.keyboard.createCursorKeys();
        this.keySPACE= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /*
        this.bgm = game.sound.add('backsound');
        this.bgm.loop = true;
        this.bgm.play();*/


        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('level2', 'tiles1');
        this.layer = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        this.layer2 = this.map.createDynamicLayer('House', this.tileset, 0, 0);
        //this.layer2 = this.map.createStaticLayer('Background', this.tileset, 0, 0);
        //  Un-comment this on to see the collision tiles
        // layer.debug = true;
    
       this.difficultyTimer = this.time.addEvent({
          delay: 1000,
          callback: this.timerBump,
          callbackScope: this,
          loop: true
    
    
        });
        //groups
        this.noteGroup = this.add.group({
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
     // this.addEnemy();
      let tempdialog = this.cache.json.get('level2-1Dialog')
      this.addNote(480, 300,'A', tempdialog);
      tempdialog = this.cache.json.get('level2-2Dialog')
      this.addNote(580, 300,'O', tempdialog);
      this.addGoal();
      //setting collision
     
      //

      this.physics.add.collider(this.player, this.layer2);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.TEXT_X = 	this.cameras.main.scrollX
      this.TEXT_Y = this.cameras.main.scrollY





///////////////// dialog stuff





      //console.log(this.dialog);

      // add dialog box sprite
      //this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);

      // initialize dialog text objects (with no text)

      dialog_cursor = this.input.keyboard.createCursorKeys();

  }
  addPlayer(){
    this.player = new Player(this,380, 280, 'player',this.input.keyboard.createCursorKeys());
    this.playerGroup.add(this.player);
  }
  addNote(x, y,string, dialog){
    let note = new Note(this,x, y, string, dialog);
    this.noteGroup.add(note);
  }
  addEnemy(){
    var Ene;
    if(this.enemies == 1)
    {
      Ene = new Enemy(this,320, 240, 'monster',this.layer2,true);
      
    }
    else
    {
      Ene = new Enemy(this,320, 240, 'monster',this.layer2,false);
    }
    
    this.enemyGroup.add(Ene);
    this.enemies++;
  }
  addGoal(){
    this.goal = new Goal(this,400,480,'door');
    this.goalGroup.add(this.goal);
  }
    update() {

      this.TEXT_X = game.playerCoord.x - 400
      this.TEXT_Y = game.playerCoord.y +100

      if(!this.isTalking)
      
     {

      if(this.cursors.left.isDown) {
        var tile = this.layer2.getTileAtWorldXY(this.player.x -this.tilediff, this.player.y, true);
        //console.log(tile.index);
        if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        { 
        this.player.x-= 2;
       }

    } else if(this.cursors.right.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x +this.tilediff, this.player.y, true);
      //console.log(tile.index);
      if(tile == null ||tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
        {

        }
        else
        {
        this.player.x+= 2;
        }

} if(this.cursors.up.isDown) {
  var tile = this.layer2.getTileAtWorldXY(this.player.x, this.player.y-this.tilediff, true);
  //console.log(tile.index);
  if(tile == null || tile.index == -1||tile.index == 11||tile.index==4||tile.index==2 )
    {

    }
    else
    {
       this.player.y-= 2;
    }
        
    }
    else if(this.cursors.down.isDown) {
      var tile = this.layer2.getTileAtWorldXY(this.player.x , this.player.y+this.tilediff, true);
      //console.log(tile.index);
      if(tile == null||tile.index == -1||tile.index == 11 ||tile.index==4||tile.index==2)
        {

        }
        else
        {
        this.player.y+= 2;
        } 
    }


    this.physics.add.overlap( this.noteGroup,this.playerGroup,function(note, player){

      game.level2.currDialog = note.dialog
      note.scene.isTalking = true;

      game.wordIndex.collected = true;
      note.destroy();

  });
      
  }


  else
  {
    if(this.firstType)
    {
      this.dialog = game.level2.currDialog;
      this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
      this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
    this.typeText()
    this.firstType = false;
  }

    
    this.noteGroup.runChildUpdate = false;
    this.goalGroup.runChildUpdate = false;
     this.playerGroup.runChildUpdate = false;
    this.enemyGroup.runChildUpdate = false;
    if(Phaser.Input.Keyboard.JustDown(dialog_cursor.space) && !this.dialogTyping) {
      // trigger dialog
      this.typeText();
  }






  }
}

typeText() {
  // lock input while typing
  this.dialogTyping = true;

  // clear text
  this.dialogText.text = '';
  this.nextText.text = '';

  /* Note: In my conversation data structure: 
          - each array within the main JSON array is a "conversation"
          - each object within a "conversation" is a "line"
          - each "line" can have 3 properties: 
              1. a speaker
              2. the dialog text
              3. an (optional) flag indicating if this speaker is new
  */

  // make sure there are lines left to read in this convo, otherwise jump to next convo
  if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
      this.dialogLine = 0;
      // I increment conversations here, but you could create logic to exit the dialog here
      this.dialogConvo++;
  }
  
  // make sure we haven't run out of conversations...
  if(this.dialogConvo >= this.dialog.length) {
      // here I'm simply "exiting" the last speaker and removing the dialog box,
      // but you could build other logic to change game states here
      console.log('End of Conversations');
      // tween out prior speaker's image
      // if(this.dialogLastSpeaker) {
      //     this.tweens.add({
      //         targets: this[this.dialogLastSpeaker],
      //         x: this.OFFSCREEN_X,
      //         duration: this.tweenDuration,
      //         ease: 'Linear'
      //     });
      // }
      // make text box invisible
      //this.dialogbox.visible = false;
      this.isTalking = false
      this.firstType = true



      this.noteGroup.runChildUpdate = true;
      this.goalGroup.runChildUpdate = true;
       this.playerGroup.runChildUpdate = true;
      this.enemyGroup.runChildUpdate = true;



      this.dialogConvo = 0;			// current "conversation"
      this.dialogLine = 0;			// current line of conversation
      this.dialogSpeaker = null;		// current speaker
      this.dialogLastSpeaker = null;	// last speaker
      this.dialogTyping = false;		// flag to lock player input while text is "typing"
      this.dialogText = null;			// the actual dialog text
      this.nextText = null;			// player prompt text to continue typing

  } else {
      // if not, set current speaker
      this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
      // check if there's a new speaker (for exit/enter animations)
      // if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
      //     // tween out prior speaker's image
      //     if(this.dialogLastSpeaker) {
      //         this.tweens.add({
      //             targets: this[this.dialogLastSpeaker],
      //             x: this.OFFSCREEN_X,
      //             duration: this.tweenDuration,
      //             ease: 'Linear'
      //         });
      //     }
      //     // tween in new speaker's image
      //     this.tweens.add({
      //         targets: this[this.dialogSpeaker],
      //         x: this.DBOX_X + 50,
      //         duration: this.tweenDuration,
      //         ease: 'Linear'
      //     });
      // }

      // build dialog (concatenate speaker + line of text)
      this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': \n' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

      // create a timer to iterate through each letter in the dialog text
      let currentChar = 0; 
      this.textTimer = this.time.addEvent({
          delay: this.LETTER_TIMER,
          repeat: this.dialogLines.length - 1,
          callback: () => { 
              // concatenate next letter from dialogLines
              this.dialogText.text += this.dialogLines[currentChar];
              // advance character position
              currentChar++;
              // check if timer has exhausted its repeats 
              // (necessary since Phaser 3 no longer seems to have an onComplete event)
              if(this.textTimer.getRepeatCount() == 0) {
                  // show prompt for more text
                  this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                  // un-lock input
                  this.dialogTyping = false;
                  // destroy timer
                  this.textTimer.destroy();
              }
          },
          callbackScope: this // keep Scene context
      });
      
      // set bounds on dialog
      this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

      // increment dialog line
      this.dialogLine++;

      // set past speaker
      this.dialogLastSpeaker = this.dialogSpeaker;
  }
}






  timerBump()
{
  this.timers++;
}




}


