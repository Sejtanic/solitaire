import {
  BUILD_UP_ARRAY,
  CARD_COLORE,
  suitToValue,
  MARGIN_VALUE,
} from './helper.js';
class View {
  #deckPlaceholder = document.querySelector('.main-deck');
  mainPlayingArea = document.querySelectorAll('main-playing-area');
  seve = document.querySelector('.seventh-card-place');
  card;

  deck = [];

  makeCorectDeck(deck) {
    deck.forEach((element) => {
      this.deck.push(element.split(';'));
    });
  }
  mainAreaRender() {
    BUILD_UP_ARRAY.forEach((element) => {
      this.fillPlayingArea(...element);
    });
  }

  // arhiceture of card element
  _renderCards(elements, i = 0) {
    return `
     
      <div class="turned playing-card-visual card ${CARD_COLORE(
        elements
      )} "  style="margin-top: ${
      i * MARGIN_VALUE
    }px" draggable="true" data-value="${suitToValue(
      elements[1]
    )}" data-color="${CARD_COLORE(elements)}" data-suit="${elements[0]}">
        <div class="inner hidden">    
          <div class="top-of-card">
            <div class="value">${elements[1]}</div>
            <div class="suit">${elements[0] + ';'}</div>
          </div>
          <div class="middle-of-card">
            <div class="suit-size">${elements[0] + ';'}</div>
          </div>
          <div class="bottom-of-card">
            <div class="value">${elements[1]}</div>
            <div class="suit">${elements[0] + ';'}</div>
          </div>
        </div>  
      </div>
      
      `;
  }
  //   fill playing area when game starts
  fillPlayingArea(parent, index) {
    for (let i = 0; i < index; i++) {
      const markup = this._renderCards(this.deck[i], i);
      document
        .querySelector(`.${parent}-card-place`)
        .insertAdjacentHTML('beforeend', markup);
      this.deck.splice(i, 1);
    }
  }
  renderCardOnMainDeck() {
    this.deck.forEach((element, index) => {
      const markup = this._renderCards(element);
      this.#deckPlaceholder.insertAdjacentHTML('afterbegin', markup);
    });
  }

  turnCard() {
    const element = document.querySelectorAll(`.main-playing-area`);
    element.forEach((mov) => {
      mov.lastElementChild.classList.remove('turned');
      mov.lastElementChild.lastElementChild.classList.remove('hidden');
    });
  }
}
export const view = new View();
