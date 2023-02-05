import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchCurrency } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: '',
      },
      verifyPassword: false,
      verifyEmail: false,
    };
    this.saveLogin = this.saveLogin.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  verify(name, value) {
    if (name === 'email') {
      const verify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const verifyEmail = verify.test(value);
      this.setState({
        verifyEmail,
      });
    } else {
      const minPassword = 6;
      const verifyPassword = value.length >= minPassword;
      this.setState({
        verifyPassword,
      });
    }
  }

  saveState({ target: { name, value } }) {
    this.verify(name, value);
    this.setState((oldState) => ({
      user: {
        ...oldState.user,
        [name]: value,
      },
    }));
  }

  async saveLogin() {
    const { dispatch, history } = this.props;
    const { user } = this.state;
    dispatch(login(user));
    await dispatch(fetchCurrency());
    history.push('/carteira');
  }

  render() {
    const { verifyEmail, verifyPassword } = this.state;
    const disabled = verifyEmail && verifyPassword;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="email-input"
            name="email"
            id="email"
            onChange={ this.saveState }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.saveState }
          />
        </label>
        <button
          type="button"
          onClick={ this.saveLogin }
          disabled={ !disabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
