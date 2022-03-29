const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards); //*initiating a new game.

//* Grabbing from the DOM all the elements of the score board: the number of pairs clicked, 
//*the number of pairs guessed and a restart button that will be hidden until the game ends.

const pairsClicked = document.querySelector('#pairs-clicked');
const pairsGuessed = document.querySelector('#pairs-guessed');
//const restartBtn = document.querySelector('.restart');

//* On page load, the game starts/restarts.
window.addEventListener('load', (event) => {
   //* At the begining of the game, we must shuffle the cards and display each of them, in a variable called "html"
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach((card) => {
    html += `
      <div class="card" data-card-name="${card.name}">
        <div class="back" name="${card.img}"></div>
        <div class="front" style="background: url(img/${card.img}) no-repeat"></div>
      </div>
    `;
  });
//* Having defined each card, we assign all of them together (the previous "html" varible), 
//*to our board game, aka the DOM element with the id="memory-board".
  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  //* The function bellow updates the score. Meaning, updates the value of our previously defined 
  //*variables holding the DOM elements of the score board and cleans the pickedCards array after each move.
  function updateScore() {
    pairsClicked.textContent = memoryGame.pairsClicked;
    pairsGuessed.textContent = memoryGame.pairsGuessed;
    memoryGame.pickedCards = [];//*empty pickedCards array
  }

  //* The function bellow will reload the page. It will be usefull to restart the game after winning.
  function resetGame() {
    restartBtn.addEventListener('click', () => {
      location.href = './index.html';
    });
  }

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    // TODO: write some code here

    if(memoryGame.pickedCards.length < 2) {
     card.classList.toggle('turned');
     //*Turn cards when clicked
      //console.log(`Card clicked: ${card}`);
      memoryGame.pickedCards.push(card);
      //*push turned cards to pickedCards array

      if (memoryGame.pickedCards.length === 2) {
        let firstPick = memoryGame.pickedCards[0];
        let secondPick = memoryGame.pickedCards[1];
        let firstPickName = firstPick.getAttribute('data-card-name');
        let secondPickName = secondPick.getAttribute('data-card-name');
        //*get names to compare every time 2 cards are turned

        if (!memoryGame.checkIfPair(firstPickName, secondPickName)) { //*if result of comparing is = false,
          //*we must turn them off again. To do that, we will target all of the DOM elements with the class "turned", 
          //*but NOT with the class "blocked". Additionally, we must update the score board, using the previously defined updateScore() function.
        setTimeout(() => {
          firstPick.setAttribute('class', 'card'); //*cards turn down
          secondPick.setAttribute('class', 'card');
        }, 600); //* cards will turn again in 0.6 sec
        updateScore();
      }else {
        //* If they match, we will target all of the DOM elements with class "turned" (will be only those 2 cards, 
        //*plus the ones already "blocked"), and add the class "block", so that they freeze turned on. Additionally, 
        //*we must update the score board, using the previously defined updateScore() function.
        firstPick.classList.add('blocked'); //*cards will stay up
        secondPick.classList.add('blocked');
        updateScore();
       }     

//* Lastly, we must then check if, with this last pair of cards, the user has finished the game, aka matched all of the pairs

    /*  if (memoryGame.checkIfFinished()) {
        setTimeout(() => {
          restartBtn.classList.remove('hidden');
          restartBtn.onclick = () => {
            resetGame();
          };
        }, 1000);
      }*/
    }
  }
    });
  });

});
