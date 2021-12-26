'use strict'

const refs = {
	start: document.querySelector('button[data-start]'),
	stop: document.querySelector('button[data-stop]'),
	body: document.querySelector('body')
};

function getRandomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

let promId = null;

function onStartClick() {
	refs.start.setAttribute('disabled', true);
	refs.stop.removeAttribute('disabled');

	new Promise(resolve => {
		promId = setInterval(() => {
			resolve(refs.body.style.backgroundColor = getRandomColor())
		}, 1000)
	}
	)
}

function onStopClick() {
	refs.start.removeAttribute('disabled');
	refs.stop.setAttribute('disabled', true);

	clearInterval(promId);
}