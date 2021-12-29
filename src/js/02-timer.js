'use strict'

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let date = null;
let intervalId = null;

const refs = {
	calendar: document.querySelector('#datetime-picker'),
	startTimer: document.querySelector('[data-start]'),
	timerDay: document.querySelector('[data-days]'),
	timerHour: document.querySelector('[data-hours]'),
	timerMinute: document.querySelector('[data-minutes]'),
	timerSecond: document.querySelector('[data-seconds]'),
	options: {
		enableTime: true,
		time_24hr: true,
		defaultDate: new Date(),
		minuteIncrement: 1,
		onClose(selectedDates) {
			refs.startTimer.removeAttribute('disabled')
			clearInterval(intervalId)
			date = selectedDates[0]
			if (date <= refs.options.defaultDate.getTime()) {
				alert("Please choose a date in the future")
			}
		},
	}
}

flatpickr("#datetime-picker", refs.options);

refs.startTimer.addEventListener('click', onStartClick);

function onStartClick() {
	refs.startTimer.setAttribute('disabled', true);

	intervalId = setInterval(() => {
		const deltaTime = date - Date.now();
		const time = convertMs(deltaTime);

		if (date <= Date.now()) {
			clearInterval(intervalId)
		} else (updateClock(time))

	}, 1000)
}

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = pad(Math.floor(ms / day));
	const hours = pad(Math.floor((ms % day) / hour));
	const minutes = pad(Math.floor(((ms % day) % hour) / minute));
	const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

	return { days, hours, minutes, seconds };
}

function pad(value) {
	return String(value).padStart(2, '0')
}

function updateClock({ days, hours, minutes, seconds }) {
	refs.timerDay.textContent = `${days}`;
	refs.timerHour.textContent = `${hours}`;
	refs.timerMinute.textContent = `${minutes}`;
	refs.timerSecond.textContent = `${seconds}`;
}