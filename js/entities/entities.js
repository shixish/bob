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
		this.maxSpeed = 3;
    this.setMaxVelocity(this.maxSpeed, this.maxSpeed);
		this.gravity = 0;
		this.target = {x:this.pos.x, y:this.pos.y};
		this.direction = 'down';
		
		this.alwaysUpdate = true;
		this.collidable = true;
    // adjust the bounding box
    //this.updateColRect(-1, x, -1, y);
	
	var isSelected=false;	
			
		// Set animations.
		this.renderable.addAnimation("walk_down",   [ 0, 8,  16, 24 ]);
		this.renderable.addAnimation("walk_left",   [ 1, 9,  17, 25 ]);
		this.renderable.addAnimation("walk_up",     [ 2, 10, 18, 26 ]);
		this.renderable.addAnimation("walk_right",  [ 3, 11, 19, 27 ]);
		
		this.renderable.addAnimation("walk_down_select",   [ 16, 20,  24, 28 ]);
		this.renderable.addAnimation("walk_left_select",   [ 17, 21,  25, 29 ]);
		this.renderable.addAnimation("walk_up_select",     [ 18, 22, 26, 30 ]);
		this.renderable.addAnimation("walk_right_select",  [ 19, 23, 27, 31 ]);
		
		this.renderable.addAnimation("stand_down",  [ 0 ]);
		this.renderable.addAnimation("stand_left",  [ 1 ]);
		this.renderable.addAnimation("stand_up",    [ 2 ]);
		this.renderable.addAnimation("stand_right", [ 3 ]);
		
		this.renderable.addAnimation("stand_down_select",  [ 16 ]);
		this.renderable.addAnimation("stand_left_select",  [ 17 ]);
		this.renderable.addAnimation("stand_up_select",    [ 18 ]);
		this.renderable.addAnimation("stand_right_select", [ 19 ]);
		
		this.renderable.setCurrentAnimation("walk_right");
		//me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		me.game.viewport.pos.x = this.pos.x - me.game.viewport.hWidth;
		me.game.viewport.pos.y = this.pos.y - me.game.viewport.hHeight;
		
		var self = this;
		me.event.subscribe("/mouse/right", function(e){
			self.target = new me.Vector2d(e.gameX-16, e.gameY-36);
		});
		
		me.input.registerPointerEvent('mousedown', this.collisionBox, this.mouseDown.bind(this));
  },  
	
	
	mouseDown: function(e){
		if (e.button == 0)//left click
		{
			console.log('select me!');
			this.renderable.setCurrentAnimation("stand_down_select");
			isSelected=true;
		}
		
		
	},
	update : function(){
		//console.log('me.timer.tick: ', me.timer.tick);
		//var redraw = false;
		//if (me.input.isKeyPressed('action')){
		//	me.game.viewport.pos.x = this.pos.x - me.game.viewport.hWidth;
		//	me.game.viewport.pos.y = this.pos.y - me.game.viewport.hHeight;
		//	redraw = true;
		//}
		
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
			
			if (isSelected==false) {
				this.renderable.setCurrentAnimation("walk_"+this.direction);
			}
			else
			{
				this.renderable.setCurrentAnimation("walk_"+this.direction+"_select");
			}
			
			
			
		}else if (abs_dist_y > 0){
			if (dist_y > 0)
				this.direction = 'down';
			else
				this.direction = 'up';
			
			
			if (isSelected==false) {
				this.renderable.setCurrentAnimation("walk_"+this.direction);
			}
			else
			{
				this.renderable.setCurrentAnimation("walk_"+this.direction+"_select");
			}			
		}else if (isSelected==false){
			this.renderable.setCurrentAnimation("stand_"+this.direction);
		}
		else
		{
			this.renderable.setCurrentAnimation("stand_"+this.direction+"_select");
		}
		
		
		
		this.vel.x = dist_x;
		this.vel.y = dist_y;
		
		this.updateMovement();
		return true;
	},
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