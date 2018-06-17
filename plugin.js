// initialize variable
let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    mouse = {
        x: undefined,
        y: undefined
    },
    maxRaduis = 40,
    minRaduis = 3,
    colorArray = [
        '#08D9D6','#FF2E63','#EAEAEA', '#f1404b',
        '#252A34','#F5F7FA','#5BE7C4','#7A57D1'
    ];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// add event listener
window.addEventListener('mousemove', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
})
// making the responsive view
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})
// making circles Object
class Circle {
    constructor(x, y, dx, dy, raduis){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.raduis = raduis;
        this.minRaduis = raduis;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    // drawing function
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
		if (this.x + this.raduis > innerWidth || this.x - this.raduis < 0) {
		    this.dx = -this.dx;
		}
		if (this.y + this.raduis > innerHeight || this.y - this.raduis < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
        this.y += this.dy;
        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50  && mouse.y - this.y > -50) {
            if (this.raduis < maxRaduis ){
                this.raduis +=1
            }
        } else if (this.raduis > this.minRaduis) {
            this.raduis -= 1
        }
		this.draw();
	}
}

let circleArray = [];

function init() {
    circleArray = [];   
    for (let i = 0; i < 1000 ; i++) {
        let raduis = Math.random() * minRaduis + 3,
            x = Math.random() * (innerWidth - raduis * 2) + raduis,
            y = Math.random() * (innerHeight - raduis * 2) + raduis,
            dx = Math.random() - 0.5 * 2,
            dy = Math.random() - 0.5 * 2;

        circleArray.push(new Circle(x, y, dx, dy, raduis));
    } 
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}
animate();
init();