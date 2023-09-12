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
      <div className="flex justify-center items-center min-h-screen wallpaper">
        <div
          className="w-72 h-96 flex flex-col items-center
          justify-center gap-8 rounded-xl shadow-2xl backdrop-blur-md"
        >
          <label htmlFor="email">
            <span className="text-white font-medium">Email:</span>
            <input
              type="email"
              data-testid="email-input"
              className="input input-bordered input-success w-full max-w-xs"
              name="email"
              id="email"
              onChange={ this.saveState }
            />
          </label>
          <label htmlFor="password">
            <span className="text-white font-medium">Senha:</span>
            <input
              type="password"
              name="password"
              className="input input-bordered input-success w-full max-w-xs"
              data-testid="password-input"
              onChange={ this.saveState }
            />
          </label>
          <button
            type="button"
            onClick={ this.saveLogin }
            disabled={ !disabled }
            className="btn btn-success"
          >
            Entrar
          </button>
        </div>
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
