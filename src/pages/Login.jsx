import React from 'react';

function Login() {
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

export default Login;
