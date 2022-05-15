const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_ORDERED = "ICE_ORDERED";
const ICE_RESTOCKED = "ICE_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restocked(quan = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quan,
  };
}

function IceOrder(quan = 1) {
  return {
    type: "ICE_ORDERED",
    payload: quan,
  };
}
function IceRestocked(quan = 1) {
  return {
    type: "ICE_RESTOCKED",
    payload: quan,
  };
}

/* const initialState = {
  numOfCakes: 10,
  numOfIce: 20,
  anotherState: 1,
}; */

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceState = {
  numOfIce: 20,
};

const cakeReducer = (state = initialCakeState, actions) => {
  switch (actions.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + actions.payload,
      };

    default:
      return state;
  }
};

const iceReducer = (state = initialIceState, actions) => {
  switch (actions.type) {
    case ICE_ORDERED:
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    case ICE_RESTOCKED:
      return {
        ...state,
        numOfIce: state.numOfIce + actions.payload,
      };
    default:
      return state;
  }
};

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    case ICE_ORDERED:
      return {
        ...state,
        numOfIce: state.numOfIce - 1,
      };
    case ICE_RESTOCKED:
      return {
        ...state,
        numOfIce: state.numOfIce + action.payload,
      };

    default:
      return state;
  }
}; */

const rootReducer = combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, restocked, IceRestocked, IceOrder },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restocked(3);
actions.IceOrder();
actions.IceOrder();
actions.IceOrder();
actions.IceRestocked(5);

/* store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restocked(3)); */

unsubscribe();
