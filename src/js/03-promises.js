'use ctrict'

import Notiflix from 'notiflix';

const refs = {
	form: document.querySelector('form.form'),
}

refs.form.addEventListener('submit', onSubmitClick);
let position = 0;

function onSubmitClick(evt) {
	evt.preventDefault();

	let delay = Number(evt.currentTarget.elements.delay.value);
	const step = Number(evt.currentTarget.elements.step.value);
	const amount = Number(evt.currentTarget.elements.amount.value);

	setInterval(() => {
		if (position === amount) { return }

		position += 1;
		setTimeout(() => { delay += step; })

		createPromise(position, delay)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
			});
	}, delay);
}

function createPromise(position, delay) {
	const promise = new Promise((resolve, reject) => {

		setInterval(() => {
			const shouldResolve = Math.random() > 0.3;

			if (shouldResolve) {
				resolve({ position, delay });
			}
			reject({ position, delay });
		}, delay);
	})
	return promise;
};