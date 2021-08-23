import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const cardTypes = [
  'fence',
  'wind',
  'leaf',
  'tea',
  'bush',
  'kite',
  'rainBoots',
  'shovel',
  'wineGlass',
  'sunflower',
  'pumpkin',
  'pear',
  'mushroom',
  'redleaf',
  'acorn',
  'squirrel',
  'grapes',
  'honeycomb',
];

const TIMER = 120;

const createCardsArr = (cardTypes) => {
  let arr = [];
  cardTypes.forEach((cardName) => {
    arr.push({ name: cardName, state: 'isClose' });
    arr.push({ name: cardName, state: 'isClose' });
  });
  return arr;
};

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

const cardsEntities = createCardsArr(cardTypes);
shuffleCards(cardsEntities);

//gamestatuses: idle, prepare, running, win, lose
const initialState = {
  cards: cardsEntities,
  score: cardsEntities.length / 2,
  gameStatus: 'idle',
  pairId: null,
  timer: TIMER,
  waitChoice: null,
  gameLoop: null,
  prepareTimeout: null,
  leaderbord: [
    { name: 'Василий', score: 60 },
    { name: 'Василий', score: 70 },
  ],
};

export const play = createAsyncThunk('game/play', async (arg, { getState, dispatch }) => {
  const prepareTimeout = setTimeout(() => {
    let cycle = setInterval(() => {
      let state = getState();
      if (state.game.gameStatus === 'win') dispatch(win());
      else if (state.game.timer <= 0) dispatch(lose());
      else dispatch(decrement());
    }, 1000);

    dispatch(start(cycle));
  }, 6000);

  dispatch(prepare(prepareTimeout));
});

export const choiceCard = createAsyncThunk('game/choiceCard', async (cardId, { getState, dispatch }) => {
  try {
    const state = getState();
    const { cards, gameStatus, pairId, score } = state.game;
    const card = cards[cardId];
    if (gameStatus !== 'running' || cards[cardId].state !== 'isClose') return;

    dispatch(openCard(cardId));
    if (pairId !== null) {
      const pair = cards[pairId];
      if (pair.name === card.name) {
        //win check
        if (score === 1) {
          setTimeout(() => dispatch(successChoice({ cardId, pairId })), 600);
          dispatch(win());
        } else {
          dispatch(setIdle());
          setTimeout(() => dispatch(successChoice({ cardId, pairId })), 600);
        }
      } else {
        //did not match
        dispatch(setIdle());
        setTimeout(() => dispatch(failChoice({ cardId, pairId })), 600);
      }
    } else {
      dispatch(setPairId(cardId));
      //waiting second card
      const waitChoice = setTimeout(() => {
        dispatch(closeCard(cardId));
        dispatch(deletePairId());
      }, 5000);

      dispatch(setWaitChoice(waitChoice));
    }
  } catch (error) {
    console.err(error);
  }
});

///REDUCERS
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: (state, { payload }) => {
      state.gameStatus = 'running';
      state.cards.forEach((card) => (card.state = 'isClose'));
      state.gameLoop = payload;
    },
    prepare: (state, { payload }) => {
      state.gameStatus = 'prepare';
      if (state.prepareTimeout) {
        clearTimeout(state.prepareTimeout);
      }
      state.prepareTimeout = payload;
      if (state.gameLoop) {
        clearInterval(state.gameLoop);
        state.gameLoop = null;
      }
      state.timer = TIMER;
      state.waitChoice = null;
      state.score = cardsEntities.length / 2;
      state.pairId = null;

      let cards = createCardsArr(cardTypes);
      shuffleCards(cards);
      cards.forEach((card) => (card.state = 'isOpen'));
      state.cards = cards;
    },
    decrement: (state) => {
      state.timer--;
    },
    openCard: (state, cardId) => {
      state.cards[cardId.payload].state = 'isOpen';
    },
    closeCard: (state, cardId) => {
      state.cards[cardId.payload].state = 'isClose';
    },
    setPairId: (state, paidId) => {
      state.pairId = paidId.payload;
    },
    deletePairId: (state) => {
      state.pairId = null;
    },
    win: (state) => {
      clearInterval(state.gameLoop);
      state.gameLoop = null;
      state.gameStatus = 'win';
    },
    lose: (state) => {
      clearInterval(state.gameLoop);
      state.gameLoop = null;
      state.gameStatus = 'lose';
    },
    successChoice: (state, { payload }) => {
      const { cardId, pairId } = payload;
      state.score--;
      state.cards[cardId].state = 'deleted';
      state.cards[pairId].state = 'deleted';
      state.pairId = null;
      clearTimeout(state.waitChoice);
      state.waitChoice = null;

      if (state.gameStatus === 'idle') {
        state.gameStatus = 'running';
      }
    },
    failChoice: (state, { payload }) => {
      const { cardId, pairId } = payload;
      state.cards[cardId].state = 'isClose';
      state.cards[pairId].state = 'isClose';
      state.pairId = null;
      clearTimeout(state.waitChoice);
      state.waitChoice = null;

      if (state.gameStatus === 'idle') {
        state.gameStatus = 'running';
      }
    },
    setIdle: (state) => {
      state.gameStatus = 'idle';
    },
    setWaitChoice: (state, { payload }) => {
      state.waitChoice = payload;
    },
    addRecord: (state, { payload }) => {
      state.leaderbord.push({ name: payload, score: state.timer });
    },
  },
});

export const {
  start,
  prepare,
  decrement,
  openCard,
  closeCard,
  setPairId,
  deletePairId,
  win,
  lose,
  successChoice,
  failChoice,
  setIdle,
  setWaitChoice,
  stopGame,
  addRecord,
} = gameSlice.actions;

export const selectCards = (state) => state.game.cards;
export const selectTimer = (state) => state.game.timer;
export const selectGameStatus = (state) => state.game.gameStatus;
export const selectLeaderboard = (state) => [...state.game.leaderbord].sort((a, b) => b.score - a.score);

export default gameSlice.reducer;
