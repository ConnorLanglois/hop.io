function Background(i) {
	Background.prototype.update = update;
	Background.prototype.render = render;

	this.width = clientWidth;
	this.height = clientHeight;

	this.it = i;

	this.pos = [0, this.it * clientHeight];

	

	function update() {
		this.pos[1] += -ball.velY;

		if (this.pos[1] > 2 * clientHeight) {
			this.pos[1] = objects[(this.it + 4) % 5].pos[1] - clientHeight + 20;
		}
	}

	function render() {
		ctx.drawImage(document.getElementById('background'), 0, this.pos[1]);
	}
}
