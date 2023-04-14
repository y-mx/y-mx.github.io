const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5" ,"blue");
gradient.addColorStop("1.0", "red");

addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function Curve() {
	this.init = function() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
    
		this.xe = ((Math.random() * canvas.width / 5) - (canvas.width / 10)) + this.x;
		this.ye = ((Math.random() * canvas.height / 5) - (canvas.width / 10)) + this.y;
    		this.i = 0;
	}
	
	this.iter = function() {
		ctx.strokeStyle = gradient;
		ctx.beginPath();
      		ctx.moveTo(this.x, this.y);
		this.x1 = ((Math.random() * canvas.width / 5) - (canvas.width / 10)) + this.x;
		this.y1 = ((Math.random() * canvas.height / 5) - (canvas.width / 10)) + this.y;
		this.x2 = ((Math.random() * canvas.width / 5) - (canvas.width / 10)) + this.xe;
		this.y2 = ((Math.random() * canvas.height / 5) - (canvas.width / 10)) + this.ye;
		ctx.bezierCurveTo(this.x1, this.y1, this.x2, this.y2, this.xe, this.ye);
      		ctx.stroke();
      		setTimeout(() => {}, 100);
	};
	this.render = function() {
		this.iter();
    		this.i++;
    		if(this.i >= 10) {
      			setTimeout(() => {}, 200);
      		this.init();
    	}
	
}

const scrib = [];

const n = 20;

for(let i = 0; i < n; i++) {
	scrib[i] = new Curve();
  	scrib[i].init();
}

function anim() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(let i = 0; i < n; i++) {
		scrib[i].render();
	}
		
	requestAnimationFrame(anim);
}

anim();
