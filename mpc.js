let currentLoop = null;
let autoplay = false;
let rhythm = null;
let rhythmIndex = 0;
let rhythmTimeout = null;

const togglePad = (pad) => {
  pad.classList.toggle("active");
  const sound = document.getElementById(pad.id + "-sound");
  if (sound.paused) {
    sound.currentTime = 0;
    sound.play();
  }
};

const toggleLoop = (loop) => {
  if (currentLoop) {
    currentLoop.pause();
    currentLoop = null;
  }
  const loopAudio = document.getElementById(loop);
  loopAudio.currentTime = 0;
  loopAudio.play();
  currentLoop = loopAudio;
};

const toggleRhythm = () => {
  if (currentLoop) {
    currentLoop.pause();
    currentLoop = null;
  }
  if (rhythmTimeout) {
    clearTimeout(rhythmTimeout);
    rhythmTimeout = null;
  }
  const rhythmInput = document.getElementById("rhythm-input");
  rhythm = rhythmInput.value.trim().split("\n").map(row => row.trim());
  rhythmIndex = 0;
  playRhythm();
};

const playRhythm = () => {
  if (rhythmIndex >= rhythm.length) {
    rhythmIndex = 0;
  }
  const row = rhythm[rhythmIndex];
  for (let i = 0; i < row.length; i++) {
    const pad = document.getElementById("pad" + (i + 1));
    if (row[i] === "x") {
      togglePad(pad);
    }
  }
  rhythmIndex++;
  const interval = autoplay ? 500 : 1000;
  rhythmTimeout = setTimeout(playRhythm, interval);
};

const toggleAutoplay = () => {
  autoplay = !autoplay;
  const toggleButton = document.getElementById("toggle-autoplay");
  if (autoplay) {
    toggleButton.innerText = "Autoplay On";
    playRhythm();
  } else {
    toggleButton.innerText = "Autoplay Off";
    if (rhythmTimeout) {
      clearTimeout(rhythmTimeout);
      rhythmTimeout = null;
    }
  }
};

const toggleStop = () => {
  if (currentLoop) {
    currentLoop.pause();
    currentLoop = null;
  }
  if (rhythmTimeout) {
    clearTimeout(rhythmTimeout);
    rhythmTimeout = null;
  }
  const pads = document.getElementsByClassName("pad");
  for (let i = 0; i < pads.length; i++) {
    pads[i].classList.remove("active");
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const pads = document.getElementsByClassName("pad");
  for (let i = 0; i < pads.length; i++) {
    pads[i].addEventListener("click", function() {
      togglePad(this);
    });
  }
  const loop1Button = document.getElementById("toggle-loop1");
  loop1Button.addEventListener("click", function() {
    toggleLoop("loop1");
  });
  const loop2Button = document.getElementById("toggle-loop2");
  loop2Button.addEventListener("click", function() {
    toggleLoop("loop2");
  });
  const loop3Button = document.getElementById("toggle-loop3");
  loop3Button.addEventListener("click", function() {
    toggleLoop("loop3");
  });
  const loop4Button = document.getElementById("toggle-loop4");
  loop4Button.addEventListener("click", function() {
    toggleLoop("loop4");
  });
  const toggleAutoplayButton = document.getElementById("toggle-autoplay");
  toggleAutoplayButton.addEventListener("click", toggleAutoplay);
 
