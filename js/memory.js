class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    if (!this.cards){
      return;
    }

    const shuffleArray = [];
    for(let i = 0; i < this.cards.length; i++){
      const randomCardIndex = Math.floor(Math.random() * this.cards.length);
      const randomCard = this.cards[randomCardIndex];
      shuffleArray.push(randomCard);
    }
    this.cards = shuffleArray;
  }

  checkIfPair(card1, card2) {
    this.pairsClicked ++;
    if (card1 === card2){
      this.pairsGuessed ++;
      return true;
    }
    else{
      return false;
    }
  }

  checkIfFinished() {
    if (this.pairsGuessed === (this.cards.length / 2)){
      return true;
    }
    return false;
  }
  
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
