import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../../pages/Wallet';
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
      expenses: firstExpense,
    },
  };
  it('tem um texto email na tela', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getTextEmail = screen.getByText(validEmail);
    expect(getTextEmail).toBeInTheDocument();
  });

  it('tem um text Value na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getTextValue = screen.getByText('Value');
    expect(getTextValue).toBeInTheDocument();
  });

  it('tem um text BRL na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getTextBRL = screen.getByText('BRL');
    expect(getTextBRL).toBeInTheDocument();
  });

  it('tem um texto Description na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getTextDescription = screen.getByText('Description');
    expect(getTextDescription).toBeInTheDocument();
  });

  it('tem um input na tele que recebe um valor', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getInputValue = screen.getByTestId('value-input');
    userEvent.type(getInputValue, '11');
    const getInput = screen.getByTestId('value-input');
    expect(getInput).toHaveValue('11');
  });

  it('tem um input na tele que recebe a description', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getInputDescription = screen.getByTestId('description-input');
    userEvent.type(getInputDescription, 'coxinha');
    const getInput = screen.getByTestId('description-input');
    expect(getInput).toHaveValue('coxinha');
  });

  it('tem um select na tele que recebe um array de currency', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getSelectCurrency = screen.getByTestId('currency-input');
    expect(getSelectCurrency).toHaveLength(2);
  });

  it('tem um select na tele que recebe um array de method', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getSelectMethod = screen.getByTestId('method-input');
    expect(getSelectMethod).toHaveLength(3);
  });

  it('tem um select na tele que recebe um array de method', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const getSelectTeg = screen.getByTestId('tag-input');
    expect(getSelectTeg).toHaveLength(5);
  });
});
