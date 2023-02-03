import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';
import WalletForm from './WalletForm';
import { addRegister } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: [],
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
        price: '',
      },
    };

    this.somaTotal = this.somaTotal.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
  }

  async componentDidMount() {
    await this.getCurrency();
    this.somaTotal();
  }

  async getCurrency() {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseAPI = await data.json();
    const createListCurrency = [...Object.values(responseAPI)];
    const currency = createListCurrency.filter(({ codein }) => codein !== 'BRLT');
    this.setState({
      currency,
    });
  }

  addExpenses({ target: { value, name } }) {
    this.setState((oldState) => ({
      expense: {
        ...oldState.expense,
        [name]: value,
      },
    }));
  }

  async saveExpenses() {
    const { wallet, dispatch } = this.props;
    await this.getCurrency();
    const { expense, currency } = this.state;
    const price = currency.filter((data) => data.code === expense.currency)[0].ask;
    this.somaTotal(expense.value, price);
    const addId = {
      ...expense,
      id: [...wallet].length,
      price,
    };
    await dispatch(addRegister(addId));
    this.setState({
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
      },
    });
    this.somaTotal();
  }

  somaTotal() {
    const { wallet } = this.props;
    if ([...wallet].length > 0) {
      const valorConversion = [...wallet].map(
        ({ price, value }) => Number(price) * Number(value),
      );
      const total = valorConversion.reduce((previous, current) => previous + current);
      this.setState({
        total,
      });
    }
  }

  render() {
    const { total, user, expense: { description, value }, currency } = this.state;
    return (
      <header>
        <WalletForm
          saveExpenses={ this.saveExpenses }
          addExpenses={ this.addExpenses }
          description={ description }
          value={ value }
          currency={ currency }
        />
        <Table
          user={ user }
          total={ total }
        />
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (globalState) => ({
  user: globalState.user,
  wallet: globalState.wallet,
});

export default connect(mapStateToProps)(Header);
