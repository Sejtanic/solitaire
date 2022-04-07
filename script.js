import * as model from '/model.js';
import { view } from '/view.js';
import { Events } from '/DOMEvents.js';
const btn = document.querySelector('.btn');
const clearAreas = (el) => {
  [...document.querySelectorAll(`${el}`)].forEach(
    (element) => (element.innerHTML = '')
  );
};
const clearArea = (el) => {
  document.querySelector(`${el}`).innerHTML = '';
};
// clear playing fields
const clearGame = function () {
  clearAreas('.final-playing-area');
  clearAreas('.main-playing-area');
  clearArea('.main-deck');
  clearArea('.new-deck-card');
};

// start game
const init = function () {
  view.makeCorectDeck(model.deck);
  view.mainAreaRender();
  view.renderCardOnMainDeck();
  view.turnCard();
  Events();
};
init();
btn.addEventListener('click', function () {
  clearGame();
  init();
});
