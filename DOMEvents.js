let card;
let cardFrom;
let isLastChild;
// let repeat = 0;
let newDeck;
export const Events = function () {
  selectCards();
  mainAreaEvents();
  finalAreaEvents();
  mainDeckEvent();
  newDeckEvent();
};

const preventDefault = function (e) {
  e.preventDefault();
};

const selectCards = function () {
  const cardsArray = Array.from(document.querySelectorAll('.card'));
  cardsArray.forEach((mov) => {
    mov.addEventListener('dragstart', function (e) {
      cardFrom = mov.parentElement;
      card = mov;
      isLastChild = cardFrom.lastElementChild === card;
    });
  });
};

//handle all drag events for main playing area in restEvent function
const mainAreaEvents = function () {
  const MainPlayingArea = Array.from(
    document.querySelectorAll('.main-playing-area')
  ).forEach((el) => {
    el.addEventListener('dragenter', preventDefault);
    el.addEventListener('dragover', preventDefault);

    //event listener form main part drop event
    el.addEventListener('drop', function (e) {
      // selects place for drop
      const placement = e.target.closest('.main-playing-area');
      // calclate corect lenght from margin
      let marginLenght = Array.from(placement.querySelectorAll('.card')).length;
      // draging card color value
      const cardColore = card.dataset.color;
      const cardValue = +card.dataset.value;
      // last card in placement color
      const placementColore = placement.lastElementChild?.dataset.color;
      const placementCardValue = +placement.lastElementChild?.dataset.value;
      // test if card we drag have corect value to be placed
      if (cardValue !== placementCardValue - 1 && placement.lastElementChild)
        return;
      //test if both card have same color
      if (cardColore === placementColore && placement.lastElementChild) return;
      if (!placement.lastElementChild && cardValue !== 13) return;

      const cardArray = Array.from(cardFrom.children); //make array of all cards in parent element
      const sliceNumber = cardArray.length; // number that we use to calculate optimal number
      const index = cardArray.indexOf(card); // get starting position for splice method
      const optimalNubmer = sliceNumber - index; // calculate number that we need to splice
      // make final aray that we will loop over and push each element in new parent
      const finalArray = cardArray.splice(index, optimalNubmer);
      for (let i = 0; i < optimalNubmer; i++) {
        // calculate corect margin
        finalArray[i].style.marginTop = `${marginLenght * 30}px`;
        placement.append(finalArray[i]); // push element
        marginLenght += 1; // update margin for new element
        cardFrom?.lastElementChild?.classList.remove('turned'); // toggle classes
        cardFrom?.lastElementChild?.lastElementChild?.classList.remove(
          'hidden'
        );
      }
    });
  });
};

// final card placment events
const finalAreaEvents = function () {
  const finalPlayingArea = Array.from(
    document.querySelectorAll('.final-playing-area')
  ); // selects all elements

  finalPlayingArea.forEach((el) => {
    el.addEventListener('dragenter', preventDefault);
    el.addEventListener('dragover', preventDefault);

    el.addEventListener('drop', function (e) {
      const placement = el.closest('.final-playing-area');
      const cardValue = +card.dataset.value;
      const cardSuit = card.dataset.suit;
      const placementCardSuit = placement.lastElementChild?.dataset.suit;
      const placementCardValue = +placement.lastElementChild?.dataset.value;

      if (!isLastChild) return;
      if (!placement.lastElementChild && cardValue !== 1) return;
      if (cardValue !== placementCardValue + 1 && placement.lastElementChild)
        return;
      if (cardSuit !== placementCardSuit && placement.lastElementChild) return;
      card.style.marginTop = 0; // applay 0 margin to cards before apending
      placement.append(card); //   console.log(element);

      cardFrom?.lastElementChild?.classList.remove('turned');
      cardFrom?.lastElementChild?.lastElementChild?.classList.remove('hidden');
    });
  });
};

// transfer cards from main deck place to active deck card place
const mainDeckEvent = function () {
  const newDeckPacment = document.querySelector('.new-deck-card');
  const mainDeck = document.querySelector('.main-deck');
  const element = mainDeck.closest('.main-deck');
  element.addEventListener('click', function (e) {
    const optimalNumber = mainDeck.children.length;
    const value = optimalNumber < 3 ? optimalNumber : 3;
    if (!element.lastElementChild) return;
    for (let i = 0; i < value; i++) {
      newDeckPacment.append(element.lastElementChild);
      newDeckPacment.lastElementChild.classList.remove('turned');
      newDeckPacment.lastElementChild.lastElementChild.classList.remove(
        'hidden'
      );
    }
  });
};

//transfer cards from deck active place to main deck place
const newDeckEvent = function () {
  const element = (newDeck = document.querySelector('.new-deck-card')); //novo
  const mainDeck = document.querySelector('.main-deck');
  element.addEventListener('click', function (e) {
    const size = element.children.length;
    if (mainDeck.lastElementChild) return;
    for (let i = 0; i < size; i++) {
      mainDeck.append(element.lastElementChild);
      mainDeck.lastElementChild.style.marginLeft = 0;
      mainDeck.lastElementChild.classList.add('turned');
      mainDeck.lastElementChild.lastElementChild.classList.add('hidden');
    }
  });
};
