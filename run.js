class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = radius;
        this.rotation = 0;
        this.isDragging = false;

        const angle = Math.random() * 2 * Math.PI;
        const initialSpeed = 4 + Math.random() * 6;
        this.dx = Math.cos(angle) * initialSpeed;
        this.dy = Math.sin(angle) * initialSpeed;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
    }

    update(balls, canvasWidth, canvasHeight) {
        this.rotation += this.rotationSpeed;

        if (!this.isDragging) {
            this.x += this.dx;
            this.y += this.dy;
        }

        // Colisão com as paredes
        if (this.x + this.radius > canvasWidth) {
            this.x = canvasWidth - this.radius;
            this.dx = -Math.abs(this.dx) * 0.98;
            this.rotationSpeed = -this.rotationSpeed;
        }
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx = Math.abs(this.dx) * 0.98;
            this.rotationSpeed = -this.rotationSpeed;
        }
        if (this.y + this.radius > canvasHeight) {
            this.y = canvasHeight - this.radius;
            this.dy = -Math.abs(this.dy) * 0.98;
            this.rotationSpeed = -this.rotationSpeed;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy = Math.abs(this.dy) * 0.98;
            this.rotationSpeed = -this.rotationSpeed;
        }

        // Colisão com outras bolas
        for (let ball of balls) {
            if (ball === this) continue;

            let dx = ball.x - this.x;
            let dy = ball.y - this.y;
            let distance = Math.hypot(dx, dy);

            if (distance < this.radius + ball.radius) {
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                // Separar as bolas
                const overlap = (this.radius + ball.radius - distance) / 2;
                this.x -= overlap * cos;
                this.y -= overlap * sin;
                ball.x += overlap * cos;
                ball.y += overlap * sin;

                if (!this.isDragging && !ball.isDragging) {
                    // Rotacionar velocidades
                    let vx1 = this.dx * cos + this.dy * sin;
                    let vy1 = this.dy * cos - this.dx * sin;
                    let vx2 = ball.dx * cos + ball.dy * sin;
                    let vy2 = ball.dy * cos - ball.dx * sin;

                    const elasticity = 0.98;
                    const finalVx1 = ((this.mass - ball.mass) * vx1 + 2 * ball.mass * vx2) / (this.mass + ball.mass) * elasticity;
                    const finalVx2 = ((ball.mass - this.mass) * vx2 + 2 * this.mass * vx1) / (this.mass + ball.mass) * elasticity;

                    this.dx = finalVx1 * cos - vy1 * sin;
                    this.dy = vy1 * cos + finalVx1 * sin;
                    ball.dx = finalVx2 * cos - vy2 * sin;
                    ball.dy = vy2 * cos + finalVx2 * sin;

                    // Atualizar rotação
                    this.rotationSpeed = (Math.random() - 0.5) * 0.4;
                    ball.rotationSpeed = (Math.random() - 0.5) * 0.4;
                }
            }
        }

        // Fricção e limite de velocidade
        if (!this.isDragging) {
            this.dx *= 0.999;
            this.dy *= 0.999;

            let currentSpeed = Math.hypot(this.dx, this.dy);
            const minSpeed = 4.0;
            const maxSpeed = 10.0;

            if (currentSpeed < minSpeed || currentSpeed > maxSpeed) {
                const angle = Math.atan2(this.dy, this.dx);
                let targetSpeed = currentSpeed;
                if (currentSpeed < minSpeed) targetSpeed = minSpeed;
                else if (currentSpeed > maxSpeed) targetSpeed = maxSpeed;

                this.dx = Math.cos(angle) * targetSpeed;
                this.dy = Math.sin(angle) * targetSpeed;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#00aaff";
        ctx.fill();
        ctx.strokeStyle = "#004466";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
}

function initSoccerBalls(count, canvasWidth, canvasHeight) {
    const balls = [];
    for (let i = 0; i < count; i++) {
        const radius = 30;
        const x = Math.random() * (canvasWidth - radius * 2) + radius;
        const y = Math.random() * (canvasHeight - radius * 2) + radius;
        balls.push(new Ball(x, y, radius));
    }
    return balls;
}

// Setup Canvas
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const balls = initSoccerBalls(4, canvas.width, canvas.height);

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let ball of balls) {
        ball.update(balls, canvas.width, canvas.height);
        ball.draw(ctx);
    }
    requestAnimationFrame(animate);
}

animate();

// Exemplo de função de sanitização
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Adicionar token CSRF em formulários
const csrfToken = Math.random().toString(36).slice(2);
document.querySelectorAll('form').forEach(form => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = '_csrf';
    input.value = csrfToken;
    form.appendChild(input);
});
