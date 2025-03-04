let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"]; // Order matters: 1 = yellow, 2 = red, etc.
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Store audio in variables
const gameStartAudio = new Audio("GameStart.mp3");
const gameOverAudio = new Audio("GameOver.mp3");

document.addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		if (!started) {
			console.log("Game is started");

			// Stop the game over sound if it's still playing
			gameOverAudio.pause();
			gameOverAudio.currentTime = 0; // Reset to start

			// Play game start sound
			gameStartAudio.play();

			started = true;
		}
		levelUp();
	}

	// Handle number keys (1,2,3,4)
	if (e.key >= "1" && e.key <= "4") {
		let index = parseInt(e.key) - 1; // Convert "1" to 0, "2" to 1, etc.
		let color = btns[index]; // Get color from btns array
		let btn = document.querySelector(`.${color}`);

		if (btn) {
			btnPress.call(btn); // Simulate button click
		}
	}
});

function btnFlash(btn) {
	btn.classList.add("flash");

	setTimeout(function () {
		btn.classList.remove("flash");
	}, 250);
}

function userflash(btn) {
	btn.classList.add("userflash");

	setTimeout(function () {
		btn.classList.remove("userflash");
	}, 250);
}

function levelUp() {
	userSeq = [];
	level++;
	h2.innerText = `Level ${level}`;

	// Random button choose
	let ranIdx = Math.floor(Math.random() * 4);
	let randomColor = btns[ranIdx];
	let randBtn = document.querySelector(`.${randomColor}`);

	gameSeq.push(randomColor);
	console.log(gameSeq);

	btnFlash(randBtn);
}

function checkAns(idx) {
	console.log("Current level: ", level);

	if (userSeq[idx] === gameSeq[idx]) {
		console.log("Same value");
		if (userSeq.length == gameSeq.length) {
			setTimeout(levelUp, 1000);
		}
	} else {
		// Play game over sound
		gameOverAudio.currentTime = 0; // Restart from beginning
		gameOverAudio.play();

		h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Enter to start`;
		reset();
	}
}

function btnPress() {
	// Play button click sound
	const clickAudio = new Audio("./assets/ClickSound.mp3");
	clickAudio.play();

	console.log(this.classList[1]);
	let btn = this;
	console.log("Button is: ", btn.classList[1]);

	let userColor = btn.classList[1];
	console.log("User entered the color: ", userColor);
	userSeq.push(userColor);
	console.log(userSeq);
	userflash(btn);

	checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
	btn.addEventListener("click", btnPress);
}

function reset() {
	started = false;
	gameSeq = [];
	userSeq = [];
	level = 0;
}