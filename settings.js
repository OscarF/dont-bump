var FPS = 30;
var RENDERTIME = 1000 / FPS; // Milliseconds
var RADIUS = Math.PI / 50;
var SPEED = 2; // px per RENDERTIME
var HOLECHANCE = 0.009;
var MINHOLE = 5;
var MAXHOLE = 7;

Array.prototype.last = function() {return this[this.length-1];};