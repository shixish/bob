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
    
    var canvas = me.video.getScreenCanvas();
    canvas.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
    
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
    me.state.set(me.state.PLAY, new game.PlayScreen());
    
    // add our player entity in the entity pool
    me.entityPool.add("Player", game.Player);
    me.entityPool.add("StartLocation", game.StartLocation);
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
    
    me.input.registerPointerEvent('mousedown', me.game.viewport, this.mouseDown.bind(this));
    //me.input.registerPointerEvent('mousemove', me.game.viewport, this.mouseMove.bind(this));

    // Start the game.
    me.state.change(me.state.PLAY);
  },
  "mouseDown": function(e){
    if (e.button == 0) {//left
      //console.log('left mouseDown', e);
      me.event.publish("/mouse/left", [e]);
    }else if (e.button == 2) {//right
      //console.log('right mouseDown', e);
      me.event.publish("/mouse/right", [e]);
    }
  },
  "mouseMove": function(e){
    console.log('mouseMove', e);
  },
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
}