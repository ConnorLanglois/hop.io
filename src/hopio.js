var clientWidth = 350;
var clientHeight = clientWidth * 2560 / 1440;

var canvas;
var ctx;
var imgBall;
var imgBackground;

var ball;
var objects = [];

var score = 0;
var hiscore = 0;

var paused = false;

var keyMap = {};

var keyPressMap = {
	27: false
};

onKeyDown = onKeyUp = function (e) {
	keyMap[e.keyCode] = e.type == 'keydown';
}

onKeyPress = function(e) {
	console.log('here');

	keyPressMap[e.keyCode] = !keyPressMap[e.keyCode];
}

main();

function main() {
	init();

	setInterval(run, 1000 / 60);
}

function init() {
	canvas = createCanvas(clientWidth, clientHeight);
	
	ctx = canvas.getContext('2d');
	ctx.font = '20px Arial';

	imgBall = document.createElement('img');
	imgBall.id = 'ball';
	imgBall.src = 'ball.png';

	imgBackground = document.createElement('img');
	imgBackground.id = 'background';
	imgBackground.src = 'background.png';

	document.head.appendChild(imgBall);
	document.head.appendChild(imgBackground);

	document.getElementById('canvas').addEventListener('keydown', onKeyDown);
	document.getElementById('canvas').addEventListener('keyup', onKeyUp);
	document.getElementById('canvas').addEventListener('keypress', onKeyPress);

	setup();
}

function setup() {
	ball = new Ball();

	objects[0] = new Background(-3);
	objects[1] = new Background(-2);
	objects[2] = new Background(-1);
	objects[3] = new Background(0);
	objects[4] = new Background(1);

	objects[objects.length] = new Platform(0, true);

	for (var i = -5; i < 3; i++) {
		objects[objects.length] = new Platform(i);
	}
}


function run() {
	checkKeyPress();

	if (!paused) {
		update();
		render();

		for (object of objects) {
			if (object.pos[1] >= 0) {
				return;
			}
		}

		reset();
		setup();
	}
}

function createCanvas(width, height) {
    var canvas = document.createElement('canvas');

    canvas.id = 'canvas';
    canvas.tabIndex = '1';
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    canvas.style = 'border:1px solid #000000';

    document.body.appendChild(canvas);

    return canvas;
}

function checkKeyPress() {
	if (keyPressMap[27]) {
		paused = !paused;
	}
}

function update() {
	ball.update();

	for (var object of objects) {
		object.update();
	}

	score += 1;
	hiscore = score > hiscore ? score : hiscore;
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#27AE60';

	for (var object of objects) {
		object.render();
	}

	ctx.fillStyle = '#000000';

	ball.render();

	ctx.fillText('Score: ' + score, 1, 16);
	ctx.fillText('Hiscore: ' + hiscore, 1, 36);
}

function reset() {
	objects = [];
	score = 0;
}
