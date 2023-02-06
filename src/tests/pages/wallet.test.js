import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { mockData } from '../../../cypress/mocks/data';

describe('test da pagina wallet', () => {
  const validEmail = 'test@test.com';
  const firstExpense = {
    id: 0,
    value: '11',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    description: 'Onze dólares',
    exchangeRates: mockData,
  };
  const initialState = {
    user: {
      email: validEmail,
    },
    wallet: {
      currencies: ['USD', 'CAD'],
      expenses: [firstExpense],
    },
  };
  it('tem um texto email na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getTextEmail = screen.getByText(validEmail);
    expect(getTextEmail).toBeInTheDocument();
  });

  it('tem um text Value na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getTextValue = screen.getByText('Value');
    expect(getTextValue).toBeInTheDocument();
  });

  it('tem um text BRL na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getTextBRL = screen.getByText('BRL');
    expect(getTextBRL).toBeInTheDocument();
  });

  it('tem um texto Description na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getTextDescription = screen.getByText('Description');
    expect(getTextDescription).toBeInTheDocument();
  });

  it('tem um input na tele que recebe um valor', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getInputValue = screen.getByTestId('value-input');
    userEvent.type(getInputValue, '11');
    const getInput = screen.getByTestId('value-input');
    expect(getInput).toHaveValue('11');
  });

  it('tem um input na tele que recebe a description', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getInputDescription = screen.getByTestId('description-input');
    userEvent.type(getInputDescription, 'coxinha');
    const getInput = screen.getByTestId('description-input');
    expect(getInput).toHaveValue('coxinha');
  });

  it('tem um select na tele que recebe um array de currency', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getSelectCurrency = screen.getByTestId('currency-input');
    expect(getSelectCurrency).toHaveLength(2);
  });

  it('tem um select na tele que recebe um array de method', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getSelectMethod = screen.getByTestId('method-input');
    expect(getSelectMethod).toHaveLength(3);
  });

  it('tem um select na tele que recebe um array de method', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getSelectTeg = screen.getByTestId('tag-input');
    expect(getSelectTeg).toHaveLength(5);
  });

  it('exite um button de excluir quando tem uma despesa', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getButtonDelete = screen.getByTestId('delete-btn');
    expect(getButtonDelete).toBeInTheDocument();
  });

  it('ao adicionar uma despesa o valor total deve mudar', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getTotal = screen.getByTestId('total-field');
    expect(getTotal).toHaveTextContent(52.28);
  });

  it('ao click em excluir a despesa deve sumir da tela e o valo deve mudar', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const getButtonDelete = screen.getByTestId('delete-btn');
    userEvent.click(getButtonDelete);
    const getTotal = screen.getByTestId('total-field');
    expect(getTotal).toHaveTextContent(0.00);
  });
});
