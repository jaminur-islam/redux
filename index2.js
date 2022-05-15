const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const INCREMENT_NUM = "INCREMENT_NUM";
const DECREMENT_NUM = "DECREMENT_NUM";
const PLAS_5 = "PLAS_5";

function increment() {
  return {
    type: INCREMENT_NUM,
  };
}
function decrement() {
  return {
    type: DECREMENT_NUM,
  };
}

function plas_5(quan = 1) {
  return {
    type: PLAS_5,
    playLoad: quan,
  };
}

const initialState = {
  num: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_NUM:
      return {
        num: state.num + 1,
      };
    case DECREMENT_NUM:
      return {
        num: state.num - 1,
      };
    case PLAS_5:
      return {
        num: state.num + action.playLoad,
      };

    default: 
      return state;
  }
};
const store = createStore(reducer);

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("update State", store.getState())
);

const actions = bindActionCreators({ decrement, plas_5 }, store.dispatch);
actions.decrement();
actions.plas_5(5);

// store.dispatch(decrement());
// store.dispatch(plas_5(5));

unsubscribe();
