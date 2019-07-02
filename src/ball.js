function Ball() {
	Ball.prototype.checkKeyPress = checkKeyPress;
	Ball.prototype.update = update;
	Ball.prototype.render = render;

	this.r = clientWidth / 20;
	this.pos = [clientWidth / 2, clientHeight - clientHeight / 3];
	this.velX = 0;
	this.velY = 0;
	this.accelY = 0.6;

	function checkKeyPress() {
		if (keyMap[37] && keyMap[39]) {
			this.velX = 0;
		} else if (keyMap[37]) {
			this.velX = -5;
		} else if (keyMap[39]) {
			this.velX = 5;
		}
	}

	function update() {
		this.checkKeyPress();

		this.velY += this.accelY;

		for (var i = 5; i < objects.length; i++) {
			if (this.pos[1] >= objects[i].pos[1] -  2 * this.r - 3 && this.pos[1] <= objects[i].pos[1] + this.velY && this.pos[0] + 0.7 * this.r >= objects[i].pos[0] - objects[i].width / 2 && this.pos[0] - 0.7 * this.r <= objects[i].pos[0] + objects[i].width / 2 && this.velY > 0) {
				this.velY = -20;

				break;
			}
		}

		this.pos[0] = Math.max(this.r, Math.min(this.pos[0] + this.velX, clientWidth - this.r));
		this.velX = 0;
	}

	function render() {
		ctx.drawImage(document.getElementById('ball'), this.pos[0] - this.r, this.pos[1]);
	}
}
