import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
    this.saveLogin = this.saveLogin.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  saveState({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  saveLogin() {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  }

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
