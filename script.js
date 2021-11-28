//Download only html structure
window.addEventListener('DOMContentLoaded', function() {
	'use strict';
	// Declaration of variables tab.
	// info - the field in which they are contained.
	// info - tabcontent - content
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabСontent = document.querySelectorAll('.info-tabcontent');

	//// Hides content starting with "a"
	function hideTabContent(a) {
		for (var i = a; i < tabСontent.length; i++) {
			tabСontent[i].classList.remove('show');
			tabСontent[i].classList.add('hide');
		}
	}
	//When you open the page, it opens all the tabs except 0.
	hideTabContent(1);
	//Verifies the item for display. Removes the "hide" tag and adds "show".
	function showTabContent(b) {
		if (tabСontent[b].classList.contains('hide')) {
			tabСontent[b].classList.remove('hide');
			tabСontent[b].classList.add('show');
		}
	}
	//Adding events for a block.
	info.addEventListener('click', function(event) {

		let target = event.target;
		//Handling when you press the float.
		if (target && target.classList.contains('info-header-tab')) {
			for (var i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					//Hide all blocks and open only i-th
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	})

	//Timer
	let deadlines = new Date();
	let newYear = new Date(deadlines.getFullYear()+1, 0, 1, 0, 0, 0, 0);

	function getTimeReaminig(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		let seconds = Math.floor((t / 1000) % 60);
		let minutes = Math.floor((t / 60000) % 60);
		let hours = Math.floor(t / 3600000 % 24);

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		
		};
	}

	function setClock(id = 'timer', deadline = newYear) {
		let timer = document.getElementById(id),
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds");
		updateClock();

		function updateClock() {
			let t = getTimeReaminig(deadline);

			hours.textContent = t.hours >= 10 ? t.hours : "0" + t.hours;
			minutes.textContent = t.minutes >= 10 ? t.minutes : "0" + t.minutes;
			seconds.textContent = t.seconds >= 10 ? t.seconds : "0" + t.seconds;
		}

	}
	setInterval(setClock, 1000);

	//Slider
	let slideIndex = 3,
		n = 3,
		slides = document.querySelectorAll(".slider-item"),
		prev = document.querySelector(".prev"),
		next = document.querySelector(".next"),
		dotsWrap = document.querySelector(".slider-dots"),
		dots = document.querySelectorAll(".dot");

	showSlides(n);

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slides.length;
		}
		slides.forEach((item) => item.style.display = 'none');
		dots.forEach((item) => item.classList.remove('dot-active'));
		// for (var i = 0; i < slides.length; i++) {
		// 	slides[i].style.display='none';
		// }

		slides[slideIndex - 1].style.display = '';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plussSlides(n = 1) {
		showSlides(slideIndex += n);
	}

	function minusSlides(n) {
		showSlides(slideIndex -= n);
	}

	function currentSlide(n) {
		showSlides(slideIndex = n)
	}
	prev.addEventListener('click', function() {
		plussSlides(-1);
	})
	next.addEventListener('click', function() {
		plussSlides(1);
	})
	dotsWrap.addEventListener('click', function() {
		for (var i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}

	});
	setInterval(plussSlides, 5000);
	//Calc
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personSum = 0,
		daysSum = 0,
		total = 0;
		totalValue.innerHTML = 0;

	persons.addEventListener('input', function() {
		personSum = this.value;
		total = daysSum * personSum * 5000;
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;

		} else {
			totalValue.innerHTML = total;
		}
		console.log(personSum)
	});
	restDays.addEventListener("input", function() {
		daysSum = this.value;
		total = daysSum * personSum * 5000;
		if (persons.value == ''|| restDays.value=='') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML  = total;
		}

	});
	place.addEventListener('change',function(){
		if(restDays.value==''||persons.value==''){
			totalValue.innerHTML=0;
		}else{
			let a=total;
			totalValue.innerHTML=a*this.options[this.selectedIndex].value;
		}
	})
})