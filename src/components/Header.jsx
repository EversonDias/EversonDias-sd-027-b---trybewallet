import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';
import { addRegister } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.addExpenses = this.addExpenses.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
    this.createId = this.createId.bind(this);
    this.addExchangeRates = this.addExchangeRates.bind(this);
    this.totalSum = this.totalSum.bind(this);
  }

  componentDidMount() {
    this.totalSum();
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
    if ([...expenses].length > 0) {
      const positionExpenses = [...expenses].length - 1;
      const id = [...expenses][positionExpenses].id + 1;
      this.setState((oldState) => ({
        expenses: {
          ...oldState.expenses,
          id,
        },
      }));
    }
  }

  async addExchangeRates() {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseAPI.json();
    return responseJSON;
  }

  totalSum() {
    const { wallet: { expenses }, addTotal } = this.props;
    if ([...expenses].length > 0) {
      const listOfExchangeRates = [...expenses].map(({
        exchangeRates,
        currency,
        value,
      }) => {
        const { ask } = exchangeRates[currency];
        return Number(ask) * Number(value);
      });
      const total = listOfExchangeRates.reduce((acc, cur) => acc + cur);
      addTotal(total);
    } else {
      addTotal(0);
    }
  }

  async saveExpenses() {
    this.createId();
    const exchangeRates = await this.addExchangeRates();
    const { expenses } = this.state;
    const { dispatch } = this.props;
    const addExpenses = {
      ...expenses,
      exchangeRates,
    };
    await dispatch(addRegister(addExpenses));
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
    } = this.state;
    const { user: { email }, total } = this.props;
    return (
      <header>
        <div className="max-w-[800px] flex justify-evenly">
          <p
            data-testid="email-field"
            className="font-medium"
          >
            {email}
          </p>
          <p
            data-testid="total-field"
          >
            {total.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
        <WalletForm
          addExpenses={ this.addExpenses }
          saveExpenses={ this.saveExpenses }
          description={ description }
          value={ value }
        />
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }).isRequired,
    ),
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
  addTotal: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
  user: globalState.user,
});

export default connect(mapStateToProps)(Header);
