
var game = {
	// Run on page load.
	"onload" : function () {
    
	},
	// Run when loaded.
	"loaded" : function () {
    
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