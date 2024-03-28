var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var jjoImg = new Image();
jjoImg.src = 'jjo.png';

var jjo = {
    x: 10,
    y: 200,
    width: 100,
    height: 100,
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(jjoImg, this.x, this.y, this.width, this.height);
    }
}

var pickleImg = new Image();
pickleImg.src = 'pickle.png';

class Pickle {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 100;
    }
    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(pickleImg, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var pickleJar = [];
var jumpTimer = 0;
var animation;

function frameAnimation() { // 프레임마다 실행해주는 함수
    animation = requestAnimationFrame(frameAnimation)
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 === 0) {
        var pickle = new Pickle();
        pickleJar.push(pickle);
    }

    pickleJar.forEach((a, i, o) => {
        //x좌표가 0 미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x--;
        crash(jjo, a);
        a.draw();
    })

    if (jumping == true) {
        jjo.y--; //점프속도조절
        jumpTimer++;
    }

    if (jumping == false) {
        if (jjo.y < 200) {
            jjo.y++;
        }
    }

    if (jumpTimer > 100) {
        jumping = false;
        jumpTimer = 0;
    }

    jjo.draw();
}

frameAnimation();

function crash(jjo, pickle) { // 쪼랭과 피클이 충돌할때
    var distanceX = pickle.x - (jjo.x + jjo.width);
    var distanceY = pickle.y - (jjo.y + jjo.height);
    if (distanceX < 0 && distanceY < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jumping = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})