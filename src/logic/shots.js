export class Shots {
	

	constructor(ctx, width, color, speed, direction, radius = 10) {
		this.ctx = ctx;
		this.width = width + 10;
		this.color = color;
		this.speed = speed;
		this.direction = direction; //0 - влево, 1 - вправо
		this.shots = []; //Массив выстрелов
		this.radius = radius; //Радиус выстрела
	}

	//Добавляем новый выстрел в массив
	addShot = (x, y) => {
		this.shots.push({ x, y });
	}

	//Отрисовываем выстрел
	renderShot = (x, y) => {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
		this.ctx.fill();
	}

	//Двигаем выстрел
	moveShots = () => {
		this.shots.forEach((shot, index) => {
			if (shot.x < this.width && shot.x > 0) {
				if(this.direction === 0)
					shot.x -= this.speed;
				if(this.direction === 1)
					shot.x += this.speed;
				this.renderShot(shot.x, shot.y);
			}
			else
				this.shots.splice(index, 1); //Удаляем из массива выстрелы, вышедшие за экран
		});
	}

}