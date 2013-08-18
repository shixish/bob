// global vars for selection management
var allUnits = [];
var selectedUnits = [];
var downPos = null;
var upPos = null;

var width = 800, height = 600;
var game = {
	// Run on page load.
	"onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen", width, height, true, 'auto')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");
    
    me.sys.gravity = 0;
    
    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);
    
    // Load the resources.
    this.loadResources();
    //me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
	},
	// Run on game resources loaded.
  "loaded" : function () {
    //me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen(true));
    
    // add our player entity in the entity pool
    me.entityPool.add("Player", game.Player);
    //// add our object entities in the entity pool
    //me.entityPool.add("mainPlayer", game.PlayerEntity);
    //me.entityPool.add("CoinEntity", game.CoinEntity);
    //me.entityPool.add("EnemyEntity", game.EnemyEntity);
    
    // Key bindings.
    me.input.bindKey(me.input.KEY.UP,       "up");
    me.input.bindKey(me.input.KEY.LEFT,     "left");
    me.input.bindKey(me.input.KEY.DOWN,     "down");
    me.input.bindKey(me.input.KEY.RIGHT,    "right");
    me.input.bindKey(me.input.KEY.W,        "up");
    me.input.bindKey(me.input.KEY.A,        "left");
    me.input.bindKey(me.input.KEY.S,        "down");
    me.input.bindKey(me.input.KEY.D,        "right");
    me.input.bindKey(me.input.KEY.ENTER,    "action", true);
    me.input.bindKey(me.input.KEY.SPACE,    "action", true);
    me.input.bindKey(me.input.KEY.SHIFT,    "shift");
    me.input.bindKey(me.input.KEY.Z,        "attack", true);
    me.input.bindKey(me.input.KEY.ESC,      "skip", true);
    
    var canvas = me.video.getScreenCanvas();
    //canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    //if (canvas.requestPointerLock) {//safari doesn't have it.
    //  canvas.requestPointerLock();
    //}
    canvas.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
    
    me.input.registerPointerEvent('mousedown', me.game.viewport, this.mouseDown.bind(this));
    me.input.registerPointerEvent('mouseup', me.game.viewport, this.mouseUp.bind(this));
    //me.input.registerPointerEvent('mousemove', me.game.viewport, this.mouseMove.bind(this));

    // Start the game.
    me.state.change(me.state.PLAY);
  },
  "mouseDown": function(e){
    if (e.button == 0) {//left
      //console.log('left mouseDown', e);
      //me.event.publish("/mouse/left/down", [e]);

      //console.log(e);
      for(var j=0; j<selectedUnits.length; j++)
      {
          selectedUnits[j].isSelected = false;
      }
      selectedUnits = [];
      downPos = {X: e.gameX, Y: e.gameY};

    } else if (e.button == 2) {//right
      //console.log('right mouseDown', e);
      //me.event.publish("/mouse/right", [e]);
      //console.log(e);
      for(var i=0; i<selectedUnits.length; i++)
      {
          selectedUnits[i].move(e.gameX, e.gameY);
      }
    }
  },
  "mouseUp": function(e) {
      if (e.button == 0) { //left
          //me.event.publish("/mouse/left/up")
          //console.log(e);
          upPos = {X: e.gameX, Y: e.gameY};
          for(var i=0; i<allUnits.length; i++)
          {
              //console.log(e);
              if(allUnits[i].pos.x < Math.max(downPos.X, upPos.X) &&
                  allUnits[i].pos.x > Math.min(downPos.X, upPos.X) &&
                  allUnits[i].pos.y < Math.max(downPos.Y, upPos.Y) &&
                  allUnits[i].pos.y > Math.min(downPos.Y, upPos.Y))
              {
                  allUnits[i].isSelected = true;
                  allUnits[i].renderable.setCurrentAnimation("stand_down_select");
                  selectedUnits.push(allUnits[i]);
              }
          }
          console.log(selectedUnits);
      }
  },
  //"mouseMove": function(e){
    //console.log('mouseMove', e);
  //},
  "loadResources" : function loadResources() {
    // Set all resources to be loaded.
    var resources = [];
    
    // Graphics.
    this.resources["img"].forEach(function forEach(value) {
      resources.push({
        "name"  : value,
        "type"  : "image",
        "src"   : "data/img/" + value + ".png"
      })
    });
    
    // Maps.
    this.resources["map"].forEach(function forEach(value) {
      resources.push({
        "name"  : value,
        "type"  : "tmx",
        "src"   : "data/map/" + value + ".tmx"
      })
    });
    
    // Load the resources.
    me.loader.preload(resources);
    
  }
};