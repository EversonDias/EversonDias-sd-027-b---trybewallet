export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_REGISTER = 'DELETE_REGISTER';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const LOGIN = 'LOGIN';

export const addRegister = (value) => ({ type: ADD_EXPENSES, value });

export const deleteRegister = (value) => ({ type: DELETE_REGISTER, value });

export const login = (value) => ({ type: LOGIN, user: value });

export const addCurrency = (value) => ({ type: ADD_CURRENCY, value });

export const fetchCurrency = () => async (dispatch) => {
  const dataAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await dataAPI.json();
  const currency = [...Object.values(data)];
  const listCode = currency.map(({ code, codein }) => codein !== 'BRLT' && code);
  const code = listCode.filter((keyCode) => keyCode !== false);
  dispatch(addCurrency(code));
};
