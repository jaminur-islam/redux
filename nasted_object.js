const redux = require("redux");
const bindActionCreators = redux.bindActionCreators;
const produce = require("immer").produce;

const UPDATE_STREET = "UPDATE_STREET";

const initialState = {
  name: "Vishwas",
  address: {
    street: "1234 omuk house",
    city: "boston",
    state: "Ma",
  },
};

function updateStreet(street) {
  return {
    type: UPDATE_STREET,
    payload: street,
  };
}

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case UPDATE_STREET:
      /* return {
        ...state,
        address: {
          ...state.address,
          street: actions.payload,
        },
      }; */
      return produce(state, (draft) => {
        draft.address.street = actions.payload;
      });
    default:
      return state;
  }
};

const store = redux.createStore(reducer);

console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("update State", store.getState())
);

const actions = bindActionCreators({ updateStreet }, store.dispatch);
actions.updateStreet("nononono");
unsubscribe();
