var Worm = function(canvaswidth, canvasheight) {
	this.canvasheight = canvasheight;
	this.canvaswidth = canvaswidth;
	this.turning = 0;
	this.alive = true;
	this.positions = [{'x': Math.random()*this.canvaswidth, 'y': Math.random()*this.canvasheight, 'paint': true}];
	this.color = '#'+ Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	this.width = 4;
	this.d = Math.random()*2*Math.PI; // Direction in radians. Unit circle.
	
	this.newx = 0;
	this.newy = 0;
	this.hole = 0;
	
	this.updateposition = function(game) {
		if(this.alive === true)
		{
			this.d += this.turning * RADIUS;
			
			if(Math.random() < HOLECHANCE) {
				this.hole = Math.floor(Math.random() * (MAXHOLE - MINHOLE + 1) + MINHOLE);
			}
			
			this.newx = this.positions.last()['x'] + Math.cos(this.d) * SPEED;
			this.newy = this.positions.last()['y'] + Math.sin(this.d) * SPEED;
			
			if(game.checkposition(this.newx, this.newy) === false) {
				this.die();
			} 
			
			if(this.hole > 0) {
				this.positions.push({'x': this.newx, 'y': this.newy, 'paint': false});
				this.hole--;
			}
			else {
				this.positions.push({'x': this.newx, 'y': this.newy, 'paint': true});
			}
			
		}
	};
	
	this.die = function() {
		this.alive = false;
	};
};
	
