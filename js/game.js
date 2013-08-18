var width = 100, height = 100;
var game = {
	// Run on page load.
	"onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen", width, height)) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

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
    canvas.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
    
    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);
   
    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
	},
	// Run when loaded.
	"loaded" : function () {
    console.log('loaded');
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
  }
}