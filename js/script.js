"use strict"
let rat = document.getElementById('rat');
let header = document.querySelector('.header');
let lastTime;
let clickValue = 0;
let chees;
let ratCoords;
let counter = -1;

rat.addEventListener('click', function(event) {
	let deltaTime = new Date() - lastTime; 
	lastTime = new Date();

	if ( !isFinite(deltaTime) ) {
		deltaTime = 0;
	}

	if(deltaTime < 600) {
		clickValue++; 
	} else {
		clickValue = 1;
	}

	if(clickValue >= 10) {
		document.body.innerHTML = 
		`<img src="img/rat.jpg" alt="" class="ratZaebal" id="rat" tabindex="-1">
		<h1 class="zaebal">Заебал кликать ЧОРТ ебать<h1>`;
	}
});

createChees();
rat.addEventListener('focus', function(event) {
	rat.onkeydown = function(event) {
		event.preventDefault();

		switch(event.code) {
			case 'ArrowUp':
				moveUp(event.target);
				break;
			case 'ArrowRight':
				moveRight(event.target);
				break;
			case 'ArrowDown':
				moveDown(event.target);
				break;
			case 'ArrowLeft':
				moveLeft(event.target);
				break;
			default: 
				return; 
		}
		eatChees();
	}
});

function moveUp(elem) {
	let crdAbs = getCoordsAbs(elem);
	let newTop = crdAbs.top - elem.offsetHeight;
	if(newTop < header.offsetHeight) {
		newTop = header.offsetHeight;	
	}
	elem.style.top = newTop + 'px';
}

function moveRight(elem) {
	let crdAbs = getCoordsAbs(elem);
	let widthEdge = document.documentElement.clientWidth - elem.offsetWidth;

	let newRight = crdAbs.left + elem.offsetWidth;

	if (newRight > widthEdge) {
		newRight = widthEdge; 
	}

	elem.style.left = newRight + 'px';
}

function moveDown(elem) {
	let crdAbs = getCoordsAbs(elem);
	let heightEdge = document.documentElement.clientHeight - elem.offsetHeight;

	let newBottom = crdAbs.top + elem.offsetHeight;

	if (newBottom > heightEdge) {
		newBottom =  heightEdge; 
	}

	elem.style.top = newBottom + 'px';
}

function moveLeft(elem) {
	let crdAbs = getCoordsAbs(elem);
	let newLeft = crdAbs.left - elem.offsetWidth;

	if(newLeft < 0 ){
		newLeft = 0;
	}

	elem.style.left = newLeft + 'px';
}

function getCoordsAbs(elem) {
	let crd = elem.getBoundingClientRect();

	return {
		top: crd.top + pageYOffset,
		right: crd.right + pageXOffset,
		bottom: crd.bottom + pageYOffset,
		left: crd.left + pageXOffset
	}
}

function createChees() {
	let widthScreen = document.documentElement.clientWidth;
	let heightScreen = document.documentElement.clientHeight;

	chees = document.createElement('img');
	chees.className = 'chees';
	chees.src = 'img/chees.png';
	document.body.append(chees);

	let newTop = getRandomIntInclusive(header.offsetHeight, heightScreen - chees.offsetHeight);
	let newLeft = getRandomIntInclusive(0, widthScreen - chees.offsetWidth);
	if(cheesSpawnLimit(newTop, newLeft)) {
		chees.remove();
		createChees();
	} else {
		counterPlus();
		issueAnAachievement();

		chees.style.left = newLeft + 'px';
		chees.style.top = newTop + 'px';
	}
}

function counterPlus() {
	let counterHTML = document.querySelector('.counter');
	counter++;
	counterHTML.innerHTML = counter;
}

function issueAnAachievement() {
	let achievements = document.querySelector('.achievements');
	console.log(counter, achievements);
	if (counter == 10) {
		achievements.innerHTML = 'Сырок';
	} else if (counter == 20) {
		achievements.innerHTML = 'Сырный любитель';
	} else if (counter == 30) {
		achievements.innerHTML = 'Сырный профи';
	} else if (counter == 40) {
		achievements.innerHTML = 'Сырный властелин';
	} else if (counter == 50) {
		achievements.innerHTML = 'Пацюк';
	} else if (counter == 65) {
		achievements.innerHTML = 'Великий пацюк';
	} else if (counter == 80) {
		achievements.innerHTML = 'Пацючиний генiй';
	} else if (counter == 100) {
		achievements.innerHTML = 'Пацючиний сирний король';
	} else if (counter == 110) {
		document.body.innerHTML = 
		`<img src="img/rat.jpg" alt="" class="ratZaebal" id="rat" tabindex="-1">
		<h1 class="zaebal">Хватит жрать сыр ЧОРТ ебать<h1>`;
	}
}

function cheesSpawnLimit(top, left) {
	ratCoords = rat.getBoundingClientRect();
	let isTop = (top >= ratCoords.top - chees.offsetHeight) && 
		(top <= ratCoords.top + rat.offsetHeight);
	let isLeft = (left >= ratCoords.left - chees.offsetWidth &&
		left <= ratCoords.left + rat.offsetWidth);
	
	return (isTop && isLeft) ? true : false;
}

function eatChees() {
	setTimeout(function() {
		if(cheesSpawnLimit(chees.getBoundingClientRect().top, chees.getBoundingClientRect().left)) {
		chees.remove();
		createChees();
		}
	}, 70);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}