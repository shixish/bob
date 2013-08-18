/*
 * all game entities here (or break up to more files for
 * organization)
 */
 
// unit selector
game.squad = me.ObjectEntity.extend({
	
});

// test unit
//game.Player = me.ObjectEntity.extend({
//	init: function(x, y, settings) {
//    // call the constructor
//    this.parent(x, y, settings);
//    // set the default horizontal & vertical speed (accel vector)
//    this.setVelocity(3, 15);
//    // adjust the bounding box
//    //this.updateColRect(8, 48, -1, 0);
//    // set the display to follow our position on both axis
//    //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
//  },
//	update : function(){
//	 return false;
//	}
//});

// test unit
game.Player = me.ObjectEntity.extend({
	init: function(x, y, settings) {
    // call the constructor
    this.parent(x, y, settings);
    // set the default horizontal & vertical speed (accel vector)
    this.setMaxVelocity(3, 3);
		this.gravity = 0;
		this.target = {x:this.pos.x, y:this.pos.y};
		this.direction = 'down';
    // adjust the bounding box
    //this.updateColRect(-1, x, -1, y);
		
			
		// Set animations.
		this.renderable.addAnimation("walk_down",   [ 0, 4,  8, 12 ]);
		this.renderable.addAnimation("walk_left",   [ 1, 5,  9, 13 ]);
		this.renderable.addAnimation("walk_up",     [ 2, 6, 10, 14 ]);
		this.renderable.addAnimation("walk_right",  [ 3, 7, 11, 15 ]);
		
		this.renderable.addAnimation("stand_down",  [ 0 ]);
		this.renderable.addAnimation("stand_left",  [ 1 ]);
		this.renderable.addAnimation("stand_up",    [ 2 ]);
		this.renderable.addAnimation("stand_right", [ 3 ]);
		
		this.renderable.setCurrentAnimation("walk_right");
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		var self = this;
		me.event.subscribe("/mouse/right", function(e){
			self.target = {x:e.gameX, y:e.gameY};
		});
		
		me.input.registerPointerEvent('mousedown', this.collisionBox, this.mouseDown.bind(this));
  },  
	
	
	mouseDown: function(e){
		if (e.button == 0)//left click
			console.log('select me!');			
			
	},
	update : function(){
		var dist_x = this.target.x - this.pos.x, dist_y = this.target.y - this.pos.y;
		var abs_dist_x = Math.abs(dist_x), abs_dist_y = Math.abs(dist_y);
		if (dist_x == 0 && dist_y == 0) {
			return false;
		}
		
		
		
		if (abs_dist_x > 0 && abs_dist_x > abs_dist_y) {
			if (dist_x > 0)
				this.direction = 'right';
			else
				this.direction = 'left';
			this.renderable.setCurrentAnimation("walk_"+this.direction);
			this.vel.x = dist_x;
			this.vel.y = 0;
		}else if (abs_dist_y > 0){
			if (dist_y > 0)
				this.direction = 'down';
			else
				this.direction = 'up';
			this.renderable.setCurrentAnimation("walk_"+this.direction);
			this.vel.y = dist_y;
			this.vel.x = 0;
		}else{
			this.renderable.setCurrentAnimation("stand_"+this.direction);
			this.vel.y = 0;
			this.vel.x = 0;
		}
		
		this.updateMovement();
		return this.parent();
	}
});

// test unit
game.Marine = me.ObjectEntity.extend({
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

game.Zombie = me.ObjectEntity.extend({
	init: function(x, y, settings) {
    // call the constructor
    this.parent(x, y, settings);
    // set the default horizontal & vertical speed (accel vector)
    this.setVelocity(3, 15);
    // adjust the bounding box
    //this.updateColRect(8, 48, -1, 0);
    // set the display to follow our position on both axis
    //me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
  },
	 
	/* 
	 * update position
	 */
	
		// check & update movement
	 
		// check for collision 
		
		// update animation if necessary
		
		// if animation not updated, return false
});