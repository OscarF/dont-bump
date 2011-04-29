var Game = function() {
	this.worms = [];
	this.interval = 0;

	this.canvas1 = document.getElementById("canvas1");
	this.canvas2 = document.getElementById("canvas2");
	this.width = this.canvas1.width;
	this.height = this.canvas1.height;

	this.ctx1 = this.canvas1.getContext("2d");
	this.ctx2 = this.canvas2.getContext("2d");
	
	this.canvasid = 1;
	this.ctx = this.ctx1;
	this.activectx = this.ctx2;
};

Game.prototype.start = function() {
	this.worms.push(new Worm(this.width, this.height));
	this.worms.push(new Worm(this.width, this.height));
	
	window.addEventListener('onkeydown', this.keydown, false);
	window.addEventListener('onkeyup', this.keyup, false);
	
	var self = this;
	
	this.interval = setInterval(function() {self.render();}, RENDERTIME);
};

Game.prototype.stop = function() {
	clearInterval(this.interval);
};
	
Game.prototype.keydown = function(e) {
	if (e.keyCode == 37) {
		this.worms[0].turning = -1;
	}
	else if (e.keyCode == 39) {
		this.worms[0].turning = 1;
	}
	else if (e.keyCode == 65) {
		this.worms[1].turning = -1;
	}
	else if (e.keyCode == 83) {
		this.worms[1].turning = 1;
	}
};

Game.prototype.keyup = function(e) {
	if (e.keyCode == 37 || e.keyCode == 39) {
		this.worms[0].turning = 0;
	}
	if (e.keyCode == 65 || e.keyCode == 83) {
		this.worms[1].turning = 0;
	}
};

Game.prototype.checkposition = function(x,y) {
	if(x < 0 || y < 0 || x > this.width || y > this.height)
		return false;
	else if(this.activectx.getImageData(x, y, 1, 1).data[3] > 0)
		return false;
	else
		return true;
};

Game.prototype.render = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.worms.forEach(function(worm) {
		worm.updateposition(game);

		this.ctx.beginPath();
		this.ctx.moveTo(worm.positions[0]['x'], worm.positions[0]['y']);

		worm.positions.forEach(function(coordinates) {
			if(coordinates['paint'] == true) {
				this.ctx.lineTo(coordinates['x'], coordinates['y']);
			}
			else {
				this.ctx.moveTo(coordinates['x'], coordinates['y']);
			}
		}, this);
		this.ctx.strokeStyle = worm.color;
		this.ctx.lineWidth = worm.width;
		this.ctx.stroke();
	}, this);

	if(this.canvasid == 1) {
		this.ctx = this.ctx2;
		this.canvas1.style.zindex = 100;
		this.canvas2.style.zindex = 10;
		this.canvasid = 2;
		this.activectx = this.ctx1;
	}
	else {
		this.ctx = this.ctx1;
		this.canvas2.style.zindex = 100;
		this.canvas1.style.zindex = 10;
		this.canvasid = 1;
		this.activectx = this.ctx2;
	}
};