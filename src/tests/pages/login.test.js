import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('test page login', () => {
  const validEmail = 'test@test.com';
  const invalidEmailType1 = 'test@test.';
  const invalidEmailType2 = 'testtest.com';
  const validPassword = '123456';
  const invalidPassword = '23456';
  const inputEmail = 'email-input';
  const inputPassword = 'password-input';

  function clickEnter() {
    const getInputEmail = screen.getByTestId(inputEmail);
    const getInputPassword = screen.getByTestId(inputPassword);
    const getButton = screen.getByText('Entrar');
    userEvent.type(getInputEmail, validEmail);
    userEvent.type(getInputPassword, validPassword);
    userEvent.click(getButton);
  }

  it('tem um texto email na tela', () => {
    renderWithRouterAndRedux(<App />);
    const getTextEmail = screen.getByText('Email');
    expect(getTextEmail).toBeInTheDocument();
  });

  it('tem um input que recebe um email', () => {
    renderWithRouterAndRedux(<App />);
    const getInputEmail = screen.getByTestId(inputEmail);
    userEvent.type(getInputEmail, validEmail);
    const getTextEmail = screen.getByTestId(inputEmail);
    expect(getTextEmail).toHaveValue(validEmail);
  });

  it('tem um input que recebe a senha', () => {
    renderWithRouterAndRedux(<App />);
    const getInputPassword = screen.getByTestId(inputPassword);
    userEvent.type(getInputPassword, validPassword);
    const getValuePassword = screen.getByTestId(inputPassword);
    expect(getValuePassword).toHaveValue(validPassword);
  });

  it('exiba um text Senha na tela', () => {
    renderWithRouterAndRedux(<App />);
    const getTextSenha = screen.getByText('Senha');
    expect(getTextSenha).toBeInTheDocument();
  });

  it('ao passar um email invalido o button se mantém desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const getInputEmail = screen.getByTestId(inputEmail);
    const getInputPassword = screen.getByTestId(inputPassword);
    const testEmail = [invalidEmailType1, invalidEmailType2];
    testEmail.forEach((email) => {
      userEvent.type(getInputEmail, email);
      userEvent.type(getInputPassword, validPassword);
      const getButton = screen.getByText('Entrar');
      expect(getButton).toHaveAttribute('disabled');
      userEvent.clear(getInputEmail);
    });
  });

  it('ao passar uma senha invalida o button se mantém desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const getInputEmail = screen.getByTestId(inputEmail);
    const getInputPassword = screen.getByTestId(inputPassword);
    userEvent.type(getInputEmail, validEmail);
    userEvent.type(getInputPassword, invalidPassword);
    const getButton = screen.getByText('Entrar');
    expect(getButton).toHaveAttribute('disabled');
  });

  it('ao passar um email e senha valida o button e liberado e ao clicar você e direcionado para a rota /carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    clickEnter();
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/carteira');
    });
  });

  it('ao fazer login o email e salvo no globalState com a chave email', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    clickEnter();
    const { getState } = store;
    const data = getState();
    const { user: { email } } = data;
    expect(email).toBe(validEmail);
  });

  it('ao fazer login e feito um requisição a api', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    clickEnter();
    await waitFor(() => {
      const { getState } = store;
      const data = getState();
      const { wallet: { currencies } } = data;
      expect([...currencies]).toHaveLength(15);
    });
  });
});
