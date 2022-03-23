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

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  let pairsClickedCount = document.querySelector('#pairs-clicked');
  let pairsGuessedCount = document.querySelector('#pairs-guessed');
  
  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    // TODO: write some code here

     card.classList.toggle('turned');
     //*Turn cards when clicked
      console.log(`Card clicked: ${card}`);
      memoryGame.pickedCards.push(card);
      //*push turned cards to pickedCards array

      if (memoryGame.pickedCards.length === 2) {
        let firstPick = memoryGame.pickedCards[0];
        let secondPick = memoryGame.pickedCards[1];
        let firstPickName = firstPick.getAttribute('data-card-name');
        let secondPickName = secondPick.getAttribute('data-card-name');

        if (!memoryGame.checkIfPair(firstPickName, secondPickName)) {
        const turnCards = setTimeout(() => {
          firstPick.setAttribute('class', 'card');
          secondPick.setAttribute('class', 'card');
        }, 1000);
      }else {
        firstPick.classList.add('blocked');
        secondPick.classList.add('blocked');
       }
      memoryGame.pickedCards = []; 
      }
      

      pairsClickedCount.innerHTML = memoryGame.pairsClicked;
      pairsGuessedCount.innerHTML = memoryGame.pairsGuessed;

      if (memoryGame.checkIfFinished()) {
        alert('You won!');
      }
    });
  });
});
