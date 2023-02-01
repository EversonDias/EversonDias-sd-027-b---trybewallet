import { LOGIN } from '../actions';

const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return action.value;
  default:
    return state;
  }
};

export default loginReducer;
