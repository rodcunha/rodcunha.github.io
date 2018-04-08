'use strict';

const scoreElem = document.querySelector('#score'); //html score element
const livesElem = document.querySelector('#lives'); // html lives element
const startModal = document.querySelector('#start-game'); // starter modal
const gameWinModal = document.querySelector('#game-win'); // win game modal
const gameLooseModal = document.querySelector('#game-over'); // game over modal
const gameModal = document.querySelectorAll('.modal'); // start game Modal
const gameCanvas = document.getElementsByTagName('canvas'); // selects the canvas element
const startButtons = document.querySelectorAll('.btnStart'); // selects all the start buttons
const enemySprite = 'images/enemy-bug.png'; // enemy image
let allEnemies = []; // array to store the enemies
let gotToWater = 0;
let score = 0;
let gameIsRunning = false;

var random_speed = () => { // adds a random speed to the bugs
    return Math.floor(Math.random() * 100) + 100;
};

var random_x = () => { // creates a random position within the x axis for the bugs outside of the canvas
    return Math.floor(Math.random() * (900)) - 1000;
};

var random_y = () => { // create a random position on one of the three rows for the bugs
    const positions = [68, 151, 234];
    return positions[Math.floor(Math.random() * 3)];
};

class Element { // create the super class for all the elements of the game
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Element { //create the Enemy object and assigns the values
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.speed = random_speed();
    this.position = parseInt(Math.random()*300-500);
  }
  update(dt) {
    if (this.x > 600) {
      this.loopEnemy();
    }
    this.x += this.speed * dt;
  }
  loopEnemy() {
  //   allEnemies.forEach( bug => {
  //     if (bug.x > 600) {
  //       bug.x = random_x();
  //       bug.y = random_y();
  //       bug.speed = random_speed();
  //     }
  // });
         this.x = random_x();
         this.y = random_y();
         this.speed = random_speed();
  }
}

class Player extends Element { // Create the Player class as an extension of Element
  constructor(x, y, sprite) {
    super(x, y, sprite);
    this.lives = 3;
  }
  //update the player
  update(dt) {
    for(let i=0; i< allEnemies.length; i++){
      if ( (this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 35) && (this.x > allEnemies[i].x - 20) ) {
        this.die();
      }
    }
  }
  // gain a life when collecting a heart
  gainLife() {
    this.lives +=1;
  }
  // player loses a life when hit by a bug
  die() {
    this.lives -=1;
    pulsate(livesElem);
    this.resetPosition();
    // check that lives are zero and return game over modal
    if (this.lives +1 === 1) {
       console.log('GAME OVER!!!!!');
       gameIsRunning = false;
       closeModal();
       setTimeout( () => {
          showLooseModal();
       }, 30);
    }
    showLives();
  }
  //detects if the player has reached the water
  reachedWater() {
      score += 100;
      pulsate(scoreElem);
      showScore();
      this.resetPosition();
      this.hasWon();
  }
  //player wins the game
  hasWon() {
    if (score >= 1000) {
      gameIsRunning = false;
      setTimeout( () => {
        showWinModal();
      },30);
    }
  }
  //reset the player position when reaching the water or getting killed by a bug
  resetPosition() {
    this.x = 200;
    this.y = 400;
  }
  //handle the keypress
  handleInput(keyPress) {
    if (!gameIsRunning) {
      showStartModal();
      this.resetPosition();
    } else {
      this.hasWon();
      switch (keyPress) {
        case 'left':
          if (this.x > 0) {
            this.x -=100;
          }
          gems.getGem(this, gems);
          break;
        case 'right':
          if (this.x < 399) {
            this.x +=100;
          }
          gems.getGem(this, gems);
          break
        case 'up':
          if (this.y > 0) {
            this.y -=83;
            if (this.y < 68) {
              this.reachedWater();
            }
            gems.getGem(this, gems);
          }
          break;
        case 'down':
          if (this.y < 399) {
            this.y += 83;
            gems.getGem(this, gems);
          }
          break;
      }
    }
  }
}

// Array of gem sprites
const gemSprites = [
  {
    name: 'blue_gem',
    sprite: 'images/Gem_Blue.png'
  },
  {
    name: 'orange_gem',
    sprite: 'images/Gem_Orange.png'
  },
  {
    name: 'green_gem',
    sprite: 'images/Gem_Green.png'
  },
  {
    name: 'green_gem',
    sprite: 'images/Star.png'
  },
  {
    name: 'heart',
    sprite: 'images/Heart.png'
  }
];

let gemImage = gemSprites[Math.floor( Math.random() * Math.floor(gemSprites.length) )].sprite;
const gemXLocation = [0, 100, 200, 300, 400, -100]; // possible x locations for the gems minus 100 means that one location is off canvas
const gemRandomX = gemXLocation.length;

const getXLocation = (num) => {
  return gemXLocation[Math.floor( Math.random() * Math.floor(num) )];
};

const pulsate = (elem) => {
    elem.classList.add('pulsate');
  setTimeout( () => {
    elem.classList.remove('pulsate');
  }, 3000);
};

//Create the gems object (class)
class Gem extends Element {
  constructor(x, y, sprite) {
    super(x, y, sprite);
  }
  // issues the score
  gemPoints(sprite) {
    if ( sprite == 'images/Heart.png') {
      player.gainLife();
      this.clearGem();
      pulsate(livesElem);
    } else if (sprite == 'images/Gem_Blue.png') {
      score += 10;
      this.clearGem();
      pulsate(scoreElem);
    } else if ( sprite == 'images/Gem_Green.png') {
      score += 20;
      this.clearGem();
      pulsate(scoreElem);
    } else if ( sprite == 'images/Gem_Orange.png') {
      score += 30;
      this.clearGem();
      pulsate(scoreElem);
    } else if (sprite == 'images/Star.png') {
      score += 50;
      this.clearGem();
      pulsate(scoreElem);
    }
  }
  // checks if the player and the gem are in the same square and calls the points method
  getGem(player, gems) {
    if ( player.y ==  this.y && player.x == this.x ) {
      this.gemPoints(this.sprite);
    }
  }
  //sends the gem off screen and updates the score and lives
  clearGem() {
    this.x = -100;
    this.y = -100;
    showScore();
    showLives();
  }
}

// Instantiate the enemies function
const create_enemies = (num) => {

  for (var i = 0; i < num; i++) {
      var bug = new Enemy(random_x(), random_y(), enemySprite);
      bug.speed = random_speed();
      allEnemies.push(bug); // push to the enemies array
    }
};

allEnemies.forEach( e => {
  if (e.x >= 550) {
    e.loopEnemy();
  }
})

const closeModal = () => {
  gameModal.forEach( e => {
    e.style.display = 'none';
    allEnemies = [];
    player =new Player(-100, -100, 'images/char-boy.png');
    gems = new Gem(-99,-99,  gemImage);
  });
};

const showStartModal = () => { startModal.style.display = "block"; };
const showWinModal = () => { gameWinModal.style.display = "block"; };
const showLooseModal = () => { gameLooseModal.style.display = "block"; };
const closeAllModals = () => {
  gameModal.forEach( e => {
    e.style.display = "none";
  })
};

//modal trigger on load
window.onload = () => {
    showStartModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
    if (event.target == startModal) {
        closeModal();
    }
};

let player = new Player(200, 400, 'images/char-boy.png');
let gems = new Gem(getXLocation(gemRandomX), random_y(), gemImage);
let isIntervalRunning;

// start game function
function startGame() {
  allEnemies = [];
  closeAllModals();
  score = 0;  //resets score
  player.lives = 3; // resets lives
  gameIsRunning = true; // set gameIsRunning variable
  create_enemies(8); //creates the enemies in random locations
  player = new Player(200, 400, 'images/char-boy.png'); // creates a new player object
  gems = new Gem(getXLocation(gemRandomX), random_y(), gemImage);
  showLives();
  showScore();
  isIntervalRunning ? setTimeout( () => {isIntervalRunning = false}, 4001) : randomGem();
};

// create a gem every 4 seconds at a random location.
const randomGem = () => {
  if (!isIntervalRunning) {
     isIntervalRunning = true;
     const int = setInterval( () => {
        gemImage = gemSprites[Math.floor( Math.random() * Math.floor(gemSprites.length) )].sprite;
        gems = new Gem(getXLocation(gemRandomX), random_y(), gemImage);
    }, 4000);
  } else {
    setTimeout( () => {isIntervalRunning = false}, 4000);
  }
};

// Display the score on the header
const showScore = () => {
   scoreElem.innerText = score;
};

// display the number of lives of the player
const showLives = () => {
  livesElem.innerText = player.lives;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
