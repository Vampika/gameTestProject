import { Shots } from "./shots.js";

export class Character {
    constructor(ctx, width, height, color, radius = 150, x = 780, y = 500, speed = 10, shotSpeed = 500) {
        this.ctx = ctx;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.color = color;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.shotSpeed = shotSpeed;
        this.direction = 1; 
        this.shotTimer = 0; 
        this.shots = new Shots(ctx, width, color, 1, (x > width / 2) ? 0 : 1);
    }

	//Отрисовываем героя
    renderCharacter = () => {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

	//Двигаем героя
    moveCharacter = (_, state, delta) => {
        const { mouseX, mouseY } = state;

        if (this.isMouseWithinBounds(mouseX)) {
            this.updateDirectionBasedOnMouse(mouseY, delta);
        }

        this.checkBoundaryCollision(delta);
        this.updatePosition(delta);
        this.renderCharacter();
    }

	//Проверяем столкновение с мышью
    isMouseWithinBounds(mouseX) {
        return this.x - this.radius < mouseX && mouseX < this.x + this.radius;
    }

	//Поворачиваем, если наткнулись на мышь
    updateDirectionBasedOnMouse(mouseY, delta) {
        if ((this.y - this.radius - this.speed * delta) <= mouseY && mouseY < (this.y - this.radius)) {
            this.direction = 1;
        } else if ((this.y + this.radius + this.speed * delta) >= mouseY && mouseY > (this.y + this.radius)) {
            this.direction = 0;
        }
    }

	//Проверка границ холста
    checkBoundaryCollision(delta) {
        if ((this.y + this.radius + this.speed * delta) >= this.canvasHeight) {
            this.direction = 0;
        }
        if ((this.y - this.radius - this.speed * delta) <= 0) {
            this.direction = 1;
        }
    }

	//Обновление позиции героя
    updatePosition(delta) {
        const newCords = this.direction ? this.speed * delta : -this.speed * delta;

        if (this.y + newCords > this.canvasHeight) {
            this.y = this.canvasHeight - this.radius;
        } else if (this.y - newCords < 0) {
            this.y = this.radius;
        } else {
            this.y += newCords;
        }
    }

	//Стрельба героя
    characterShot = () => {
        if (this.shotTimer === 0) {
            this.shots.addShot(this.x, this.y);
            this.shotTimer = this.shotSpeed;
        } else {
            this.shotTimer--;
        }
    }
}