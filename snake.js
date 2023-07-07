// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set up the snake
let snake = [{ x: 10, y: 10 }];
let dx = 10;
let dy = 0;

// Set up the food
let food = { x: 0, y: 0 };
spawnFood();

// Set up the game loop
let score = 0;
let gameLoop = setInterval(() => {
  // Move the snake
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop();
  }

  // Check for collision with walls or self
  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert(`Game over! Your score is ${score}.`);
  }

  // Draw the game
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}, 100);

// Set up keyboard controls
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      dx = -10;
      dy = 0;
      break;
    case "ArrowRight":
      dx = 10;
      dy = 0;
      break;
    case "ArrowUp":
      dx = 0;
      dy = -10;
      break;
    case "ArrowDown":
      dx = 0;
      dy = 10;
      break;
  }
});

// Helper function to spawn food
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvasHeight / 10)) * 10;
}