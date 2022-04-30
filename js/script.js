"use strict"
let rat = document.getElementById('rat');
let lastTime;
let clickValue = 0;

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
	console.log(clickValue);
});

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
	}
});

function moveUp(elem) {
	let crdAbs = getCoordsAbs(elem);
	elem.style.top = crdAbs.top - elem.offsetHeight + 'px';
	console.log(elem.style.top);
}

function moveRight(elem) {
	let crdAbs = getCoordsAbs(elem);
	elem.style.left = crdAbs.left + elem.offsetWidth + 'px';
}

function moveDown(elem) {
	let crdAbs = getCoordsAbs(elem);
	elem.style.top = crdAbs.top + elem.offsetHeight + 'px';
	console.log(elem.style.top);
}

function moveLeft(elem) {
	let crdAbs = getCoordsAbs(elem);
	elem.style.left = crdAbs.left - elem.offsetWidth + 'px';
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