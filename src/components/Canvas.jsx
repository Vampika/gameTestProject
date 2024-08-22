import { getGameTimer } from "../logic/gameTimer.js";
import { Character } from "../logic/character.js";
import { useEffect, useRef } from "react";


//Ширина и высота холста
export const WIDTH = 900;
export const HEIGHT = 600;

//Состояние игры
const state = {
  mouseX: null,
  mouseY: null,
  score: [0],
};


function Canvas({ color, countState, setState, setModalActive, properties}) {
	//Получаем канвас
	const canvasRef = useRef();

	useEffect(() => {
		
		//const canvas = document.getElementById("canvas");
		const ctx = canvasRef.current.getContext("2d");

		console.log(properties[1].shotsSpeed);
		//Создаем двух персонажей
		const characters = [
		  new Character(ctx, WIDTH, HEIGHT, properties[0].color, 50, 780, 500, properties[0].speed, properties[0].shotsSpeed),
		  new Character(ctx, WIDTH, HEIGHT, properties[1].color, 50, 100, 500, properties[1].speed, properties[1].shotsSpeed),
		];
	
		//Очищаем сцену
		function clear(ctx) {
		  ctx.clearRect(0, 0, WIDTH, HEIGHT);
		}
	
		//Проверяем попадание пуль во врага
		function hitsCheck() {
		  characters.forEach((char, charIndex) => {
			char.shots.shots.forEach((shot, shotIndex) => {
			  //Так как персонажей всего двое и они имеют индексы 0 и 1 в массиве персонажей для получения вражеского персонажа нужно инвертировать индекс
			  const enemyChar = characters[charIndex ^ 1];
	
			  //Вычислим расстояние от центра персонажа до центра пули.
			  const distance = Math.sqrt(
				Math.pow(shot.x - enemyChar.x, 2) +
				  Math.pow(shot.y - enemyChar.y, 2)
			  );
			  //Если вычисленное расстояние будет меньше чем сумма радиусов персонажа и пули, значит произошло попадание
			  if (distance < char.shots.radius + enemyChar.radius) {
				state.score++;
				setState(state.score);
				console.log("Попал! ", state.score);
				char.shots.shots.splice(shotIndex, 1); //Удаляем из массива выстрелы, попавшие во врага
			  }
			});
		  });
		}
	
		//Инициализируем игру
		function initGame() {
		  // Массив функций, которые должны срабатывать каждый игровой шаг
		  const renderFunctions = [
			clear,
			hitsCheck,
			...characters.flatMap((char) => [
			  char.shots.moveShots,
			  char.moveCharacter,
			  char.characterShot,
			]),
		  ];
	
		  //Отслеживание положения мыши
		  canvasRef.current.onmousemove = (e) => {
			state.mouseX = e.offsetX;
			state.mouseY = e.offsetY;
		  };

		  canvasRef.current.addEventListener("click", (e) => {
			//Проверим что мы кликнули по герою
			const heroId = characters.findIndex((char) => 
				e.offsetX < char.x + char.radius && 
				e.offsetX > char.x - char.radius && 
				e.offsetY < char.y + char.radius && 
				e.offsetY > char.y - char.radius
			  );
			  if (heroId !== -1) {
				setModalActive({ status: true, x: e.clientX, y: e.clientY, charId: heroId });
			  }
		  });
	
		  //Создаем игровой таймер
		  const timer = getGameTimer(renderFunctions, ctx, state, 1000);
	
		  timer();
		}
	
		initGame();
	  }, [properties]);

	  return(<canvas
        className="canvas"
		ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
      ></canvas>)
}

export default Canvas;