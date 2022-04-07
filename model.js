'strict mode';
export let deck;

function createdeck() {
  const suit = ['&diams;', '&hearts;', '&clubs;', '&spades;'];

  const value = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];
  const deck = [];
  for (let s = 0; s < suit.length; s++) {
    for (let v = 0; v < value.length; v++) {
      deck.push(suit[s] + value[v]);
    }
  }
  return deck;
}
deck = createdeck();
const randomDeck = function (deck) {
  for (let i = 0; i < deck.length; i++) {
    const firstNum = deck[i];
    const randomNum = Math.floor(Math.random() * 52);
    deck[i] = deck[randomNum];
    deck[randomNum] = firstNum;
  }
};
randomDeck(deck);
