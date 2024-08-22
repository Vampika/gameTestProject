export function getGameTimer(functions, ctx, state,) {
	//functions - это функции, которые должны срабатывать каждый игровой шаг, ctx - контекст канваса, state - состояние игры, которое будет использоваться функциями, step - длина игрового шага в мс
	let startTime = 0;

	function timer(timestamp = 0) {
		const delta = (timestamp - startTime) / 1000;

		startTime = timestamp;
		functions.forEach((fn) => {
			fn(ctx, state, delta);
		});

		requestAnimationFrame(timer);
	}

	return timer;
}