import {
  ADD_EXPENSES,
  DELETE_REGISTER,
  ADD_CURRENCY,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const registerReducer = (state = initialState, { type, value }) => {
  switch (type) {
  case ADD_EXPENSES:
    return state.expenses ? {
      ...state,
      expenses: [...state.expenses,
        value],
    } : {
      ...state,
      expenses: [value],
    };
  case DELETE_REGISTER:
    return value ? {
      ...state,
      expenses: [value],
    } : {
      ...state,
      expenses: [],
    };
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: value,
    };
  default:
    return state;
  }
};

export default registerReducer;
