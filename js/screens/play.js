/*
 * in game stuffs
 */
game.PlayScreen = me.ScreenObject.extend( {
	/*
	 * action to perform on state change
	 */
	onResetEvent: function() {
		me.levelDirector.loadLevel("earth");// load a level
	},
	update: function(){
		//console.log(this, game);
		if (me.input.isKeyPressed('left')){
			me.game.viewport.pos.x -= 15;
		}else if (me.input.isKeyPressed('right')){
			me.game.viewport.pos.x += 15;
		}
		
		if (me.input.isKeyPressed('up')){
			me.game.viewport.pos.y -= 15;
		}else if (me.input.isKeyPressed('down')){
			me.game.viewport.pos.y += 15;
		}
		//this.updateMovement();
    //console.log('main update function');
		return true;
  },
	/*
	 * action to perform when game is finished (state change)
	 */
	onDestroyEvent: function () {
		; //TODO // MIGHT not need anything here...
	}
});