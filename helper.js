export const BUILD_UP_ARRAY = [
  ['seventh', 7],
  ['sixth', 6],
  ['fifth', 5],
  ['forth', 4],
  ['third', 3],
  ['second', 2],
  ['first', 1],
];
export const CARD_COLORE = function (el) {
  return el[0] === '&diams' || el[0] === '&hearts' ? 'red' : 'black';
};
export const suitToValue = function (suit) {
  if (suit === 'K') return 13;
  if (suit === 'Q') return 12;
  if (suit === 'J') return 11;
  if (suit === 'A') return 1;
  return suit;
};

export const MARGIN_VALUE = 30;
