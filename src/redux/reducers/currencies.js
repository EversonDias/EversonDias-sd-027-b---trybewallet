import { ADD_CURRENCY } from '../actions';

const initialState = [];

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CURRENCY:
    return action.value;
  default:
    return state;
  }
};

export default currencyReducer;
