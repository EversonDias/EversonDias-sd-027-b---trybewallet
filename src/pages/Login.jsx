import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      verifyPassword: '',
      verifyEmail: '',
    };
    this.saveLogin = this.saveLogin.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  verify(name, value) {
    if (name === 'email') {
      const verify = /\S+@\S+\.\S+/;
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
    this.setState({
      [name]: value,
    });
  }

  saveLogin() {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login({ email }));
    history.push('/carteira');
  }

  render() {
    const { verifyEmail, verifyPassword } = this.state;
    const disabled = verifyEmail && verifyPassword;
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
        </form>
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
