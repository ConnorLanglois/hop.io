function Platform(i, main = false) {
	Platform.prototype.update = update;
	Platform.prototype.render = render;

	this.width = 50;
	this.height = 5;

	this.pos = [];

	if (main == true) {
		this.pos[0] = clientWidth / 2;
		this.pos[1] = clientHeight - clientHeight / 20;
	} else {
		this.pos[0] = Math.floor(((clientWidth - this.width) * Math.random()) + this.width / 2);
		this.pos[1] = i * (clientHeight / 4);
	}

	function update() {
		this.pos[1] += -ball.velY;

		if (this.pos[1] > clientHeight + clientHeight / 15 && i != 0) {
			this.pos[0] = Math.floor(((clientWidth - this.width) * Math.random()) + this.width / 2);
			this.pos[1] = -6 * (clientHeight / 4) - ball.velY;
		}
	}

	function render() {
		ctx.fillRect(this.pos[0] - this.width / 2, this.pos[1], this.width, this.height);
	}
}
