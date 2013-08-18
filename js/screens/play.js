/*
 * in game stuffs
 */
game.PlayScreen = me.ScreenObject.extend( {
	/*
	 * action to perform on state change
	 */
	onResetEvent: function() {
		// load a level
		me.levelDirector.loadLevel("earth");
	},
	/*
	 * action to perform when game is finished (state change)
	 */
	onDestroyEvent: function () {
		; //TODO // MIGHT not need anything here...
	}
});