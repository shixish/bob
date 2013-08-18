/*
 * all game entities here (or break up to more files for
 * organization)
 */
 
// unit selector
game.squad = me.ObjectEntity.extend({
	
});

// test unit
game.Marine = me.ObjectEntity.extend({
	/*
	 * constructor
	 */
	 init: function(x, y, settings) {
	 
	 
	 }
	 
	/*
	 * select destination
	 */
	 var clickX; // click position
	 var clickY; // click position
	 var destX; // tile index
	 var destY; // tile index
	 
	me.input.registerMouseEvent('mousedown', me.game.viewport, this.clicked.bind(this)); // this should be a function thingy
	
		// to get the collision layer
		var layer = me.game.currentLevel.getLayerByName("collision");
		 
		// to get the Tile
		var myTile = layer.getTile(clickX, clickY);
		destX = myTile.x; // tile index
		destY = myTile.y; // tile index
		
		// access tile properties
		var myTile = layer.getTileProperties(myTile.tileId);
		
		// check if tile is acceptable destination (is passable)
		if (myTile.type != 'solid') {
			// TODO: path finding
		}
	
	
	 
	/* 
	 * update position
	 */
	
		// check & update movement
	 
		// check for collision
		
		// update animation if necessary
		
		// if animation not updated, return false

});

game.Zed = me.ObjectEntity.extend({
	/*
	 * constructor
	 */
	 
	/* 
	 * update position
	 */
	
		// check & update movement
	 
		// check for collision 
		
		// update animation if necessary
		
		// if animation not updated, return false
});