import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let date = null;
let intervalId = null;

const refs = {
	calendar: document.querySelector('#datetime-picker'),
	startTimer: document.querySelector('[data-start]'),
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

flatpickr("#datetime-picker", refs.options)

refs.startTimer.addEventListener('click', onStartClick)


function onStartClick() {
	refs.startTimer.setAttribute('disabled', true)
	console.log(date);
	intervalId = setInterval(() => {
		console.log(convertMs(date - Date.now()))
	}, 1000)
}


function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}
