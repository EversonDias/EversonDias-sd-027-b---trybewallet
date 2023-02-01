import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label
            htmlFor="email"
          >
            Email
            <input
              type="email"
              data-testid="email-input"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              data-testid="password-input"
            />
          </label>
          <button>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
