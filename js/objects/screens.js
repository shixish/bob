/*
 * Neverwell Moor, a fantasy action RPG
 * Copyright (C) 2012  Jason Oster
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Screen object supporting layer-animation */
game.AnimatedScreen = me.ScreenObject.extend({
    "animations" : {},
    "keys" : [],

    "init" : function init(animationspeed) {
        this.parent(true);
        this.isPersistent = true;
        this.animationspeed = animationspeed || this.animationspeed;
    },

    "update" : function update() {
        var isDirty = false;
        var self = this;

        if (game.wantsResort) {
            game.wantsResort = false;
            me.game.sort.defer(game.sort);
        }

        if (!self.keys.length) {
            return false;
        }

        self.keys.forEach(function forEach(key) {
            var animation = self.animations[key];
            if (++animation.count > animation.speed) {
                animation.count = 0;

                animation.layers[animation.idx].visible = false;
                ++animation.idx;
                animation.idx %= animation.layers.length;
                animation.layers[animation.idx].visible = true;

                isDirty = true;
            }
        });

        return isDirty;
    },

    "onLevelLoaded" : function onLevelLoaded() {
        var self = this;
        self.animations = {};
        self.keys = [];

        // Use `in` operator, so we can use 0, if we want. ;)
        var speed = (("animationspeed" in me.game.currentLevel) ?
            me.game.currentLevel.animationspeed :
            (me.sys.fps / 10));

        var layers = me.game.currentLevel.getLayers();
        layers.forEach(function forEach(layer, idx) {
            if (layer.name.toLowerCase().indexOf("animated ") === 0) {
                var key = layer.name.substr(9).replace(/\d+$/, "").trim();

                if (self.animations[key]) {
                    layer.visible = false;
                }
                else {
                    self.keys.push(key);
                    self.animations[key] = {
                        "speed" : me.game.currentLevel[key + " speed"] || speed,
                        "layers" : [],
                        "count" : 0,
                        "idx" : 0
                    };
                }
                self.animations[key].layers.push(layer);
            }
        });
    }
});

/* Informational screen */
game.InfoScreen = me.ScreenObject.extend({
    // True when fading.
    "fading" : false,

    // Which page to view.
    "currentPage" : 0,

    "init" : function init(pages, state, fade, duration, notify) {
        this.parent(true);
        this.pages = pages;
        this.font = new me.Font("Verdana", 16, "#fff");
        this.state = state || me.state.PLAY;
        this.fade = fade;
        this.duration = duration || 250;
        this.notify = notify;
    },
    

    "update" : function update() {
        var self = this;
        var skip = false;

        if (!self.fading && (me.input.isKeyPressed("action") || me.input.isKeyPressed("skip"))) {
            if (me.input.keyStatus("skip")) {
                skip = true;
            }

            function nextPage() {
                if (skip || (++self.currentPage >= self.pages.length)) {
                    self.fading = false;
                    me.state.change(self.state);
                }
                else if (self.fade) {
                    self.fading = true;
                    me.game.viewport.fadeOut(self.fade, self.duration, function fadeComplete() {
                        self.fading = false;
                    });
                }
            }

            if (self.fade) {
                self.fading = true;
                me.game.viewport.fadeIn(self.fade, self.duration, nextPage);
            }
            else {
                nextPage();
            }
        }

        return self.fading;
    },

    "draw" : function draw(context) {
        var self = this;

        context.fillStyle = "#000";
        context.fillRect(0, 0, c.WIDTH, c.HEIGHT);

        if (self.currentPage < self.pages.length) {
            var page = self.pages[self.currentPage];

            // Calculate the longest text width.
            var w = 0;
            page.messages.forEach(function forEach(message) {
                w = Math.min(Math.max(w, self.font.measureText(context, message).width), c.WIDTH);
            });

            var x = (c.WIDTH - w) / 2;
            var y = (c.HEIGHT - page.messages.length * 20) / 2;
            page.messages.forEach(function forEach(message) {
                self.font.draw(context, message, x, y);
                y += 20;
            });
        }
    }
});

/* Main game */
game.PlayScreen = game.AnimatedScreen.extend({
    "loading" : false,

    "onLevelLoaded" : function onLevelLoaded(settings) {
        this.loading = false;
        this.parent();

        game.rachel = me.game.getEntityByName("rachel")[0];

        if (settings.location) {
            var p = settings.location.split(",").map(function map(value) {
                return +value.trim();
            });
            game.rachel.body.setPos(cp.v(p[0], c.HEIGHT - p[1]));
        }

        if (settings.dir) {
            game.rachel.dir_name = settings.dir;
            game.rachel.setCurrentAnimation("stand_" + settings.dir);
        }

        if (settings.music) {
            me.audio.stopTrack();
            me.audio.playTrack(settings.music);
        }
    },

    "loadLevel" : function loadLevel(settings) {
        var fade;
        var self = this;

        if (self.loading) {
            return;
        }
        self.loading = true;

        // Handle outbound transitions.
        fade = settings.fade || settings.fadeIn;
        if (fade) {
            me.game.viewport.fadeIn(fade, +settings.duration || 250, fadeComplete);
        }
        else {
            fadeComplete();
        }

        function fadeComplete() {
            // Remove all Chipmunk bodies and shapes.
            cm.removeAll();

            // When level loads, start music and move Rachel to the proper location.
            me.game.onLevelLoaded = function onLevelLoaded() {
                self.onLevelLoaded(settings);
            };

            switch (settings.to) {
                case "rachels_house":
                    if (!game.stat.load("tutorial2")) {
                        me.event.publish("notify", [ "That's Jessica. We should say hi using the action key!" ]);
                        game.stat.save("tutorial2", true);
                    }
                    break;

                case "earth":
                    if (!game.stat.load("tutorial3")) {
                        me.event.publish("notify", [ "We should talk to some more people. Maybe we could help them with something!" ]);
                        me.event.publish("notify", [ "If you hold Shift, I promise to hurry as fast as I can!" ]);
                        game.stat.save("tutorial3", true);
                    }
                    break;

                case "general_store":
                    if (!game.stat.load("tutorial4")) {
                        me.event.publish("notify", [ "Let's look around a bit; there might be something here we can buy." ]);
                        game.stat.save("tutorial4", true);
                    }
                    break;

            }

            // Load the first level.
            me.levelDirector.loadLevel(settings.to);

            // Handle transitions.
            fade = settings.fade || settings.fadeOut;
            if (fade) {
                me.game.viewport.fadeOut(fade, +settings.duration || 250);
            }
        }
    },

    "onResetEvent" : function onResetEvent() {
        // Initialize some stuff.
        game.installHUD();
        game.installCoinHandler();
        game.installExitHandler();
        game.installBaddieHandler();

        if (!game.stat.load("tutorial1")) {
            me.event.publish("notify", [ "Hi, I'm Rachel. You can show me where to go using the arrow keys." ]);
            me.event.publish("notify", [ "Or if you prefer, the WASD keys also work." ]);
            me.event.publish("notify", [ "Open the chest with an action key. There may be something useful inside!" ]);
            game.stat.save("tutorial1", true);
        }

        // Load the level.        
            this.loadLevel({
                "to"        : "earth",
                "music"     : "zombie_snare",
                "fadeOut"   : "black",
                "duration"  : 1000
            });
        
    },

    "onDestroyEvent" : function onDestroyEvent() {
        // Remove the HUD.
        if (game.HUD) {
            me.game.remove(game.HUD);
        }
    }
});