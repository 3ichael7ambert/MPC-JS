// Get the canvas element and create a 2D drawing context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Set the canvas dimensions∑
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the music characters
var musicCharacters = "♩♪♫♬♭♮♯";

// Define the music columns
var columns = canvas.width / 20;

// An array to store the music drops
var drops = [];

// Create the music drops
for (var i = 0; i < columns; i++) {
  drops[i] = Math.floor(Math.random() * canvas.height);
}

// Draw the music animation
function drawmusic() {
  // Set the canvas background color to black
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set the font and color for the music characters
  ctx.font = "15px monospace";
  ctx.fillStyle = "#FFF";
  
  // Loop through the music columns
  for (var i = 0; i < columns; i++) {
    // Get a random music character
    var musicCharacter = musicCharacters[Math.floor(Math.random() * musicCharacters.length)];
    
    // Draw the music character at the current position
    ctx.fillText(musicCharacter, i * 20, drops[i] * 20);
    
    // Move the music drop down by 1
    drops[i]++;
    
    // If the music drop is outside the canvas, reset it to the top
    if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
}

// Call the drawmusic function every 50 milliseconds
setInterval(drawmusic, 50);
