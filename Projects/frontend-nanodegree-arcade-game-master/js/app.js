// constants for player movement around board
const colSet = 101;
const rowSet = 83;

// Enemy class
class Enemy {
  constructor() {
    this.x = 0;
    this.y = 63;
    this.sprite = 'images/enemy-bug.png';
    this.speed = 200;
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.x < 500) {
      this.x += this.speed * dt;
    } else {
      this.x = -101;
    };

    //check for collision
    if (this.y === (player.y - 9)) {
      if ((Math.round(this.x) >= Math.round(player.x) - 70) &&
        (Math.round(this.x) <= Math.round(player.x) + 70)) {

        player.x = player.homeX;
        player.y = player.homeY;
        resetGame();
      }
    };

    if (player.y < -10) {
      winGame();
    };
  };

  // Render enemy
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

// Player class
class Player1 {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.homeX = rowSet * 2.4;
    this.homeY = colSet * 4;
    this.x = this.homeX;
    this.y = this.homeY;

  };

  // move player
  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - colSet : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - rowSet : this.y;
        break;
      case 'right':
        this.x = this.x < 400 ? this.x + colSet : this.x;
        break;
      case 'down':
        this.y = this.y < 400 ? this.y + rowSet : this.y;
        break;
      default:
        break;
    };
  };
  // render player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

// heart class
class Heart {
  constructor() {
    this.sprite = 'images/Heart.png';
    this.x = -100;
    this.y = -100;
    // this.speed = 500;
  };
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};

// create new instance of player and enemies
const player = new Player1();
const heart = new Heart();
let allEnemies = [];
createEnemies();

// create enemies function
function createEnemies() {
  for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 3; j++) {
      const enemy = new Enemy();
      enemy.speed = Math.floor(Math.random() * 200) + 20;
      enemy.y = (j * 83) - 20;
      allEnemies.push(enemy);
    }
  };
};

// reset game function
function resetGame() {
  player.x = player.homeX;
  player.y = player.homeY;
  allEnemies = [];
  createEnemies();
};

// Game win!
function winGame() {
  allEnemies = [];
  heart.x = 200;
  heart.y = 250;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});