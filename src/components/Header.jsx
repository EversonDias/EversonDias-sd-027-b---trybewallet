import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from './Table';
import WalletForm from './WalletForm';
import { addRegister } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        id: '0',
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
      },
      total: 0,
    };
    this.addExpenses = this.addExpenses.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
    this.createId = this.createId.bind(this);
    this.createASK = this.createASK.bind(this);
    this.totalSum = this.totalSum.bind(this);
  }

  addExpenses({ target: { name, value } }) {
    this.setState((oldState) => ({
      expenses: {
        ...oldState.expenses,
        [name]: value,
      },
    }));
  }

  createId() {
    const { wallet: { expenses } } = this.props;
    if (expenses) {
      this.setState((oldState) => ({
        expenses: {
          ...oldState.expenses,
          id: [...expenses].length,
        },
      }));
    }
  }

  async createASK() {
    const { expenses: { currency } } = this.state;
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseAPI.json();
    const listOfCurrency = [...Object.values(responseJSON)];
    const data = listOfCurrency.filter(
      ({ code, codein }) => code === currency && codein !== 'BRLT',
    );
    return data[0].ask;
  }

  totalSum() {
    const { wallet: { expenses } } = this.props;
    const currency = [...expenses].map(({ ask, value }) => Number(ask) * Number(value));
    const total = currency.reduce((acc, cur) => acc + cur);
    this.setState({
      total,
    });
  }

  async saveExpenses() {
    this.createId();
    const ask = await this.createASK();
    const { expenses } = this.state;
    const { dispatch } = this.props;
    const add = {
      ...expenses,
      ask,
    };
    await dispatch(addRegister(add));
    this.totalSum();
    this.setState((oldState) => ({
      expenses: {
        ...oldState.expenses,
        value: '',
        description: '',
      },
    }));
  }

  render() {
    const {
      expenses: { value, description },
      total,
    } = this.state;
    return (
      <header>
        <WalletForm
          addExpenses={ this.addExpenses }
          saveExpenses={ this.saveExpenses }
          description={ description }
          value={ value }
        />
        <Table
          total={ total }
        />
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
});

export default connect(mapStateToProps)(Header);
