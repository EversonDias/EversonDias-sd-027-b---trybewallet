import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { deleteRegister } from '../redux/actions';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };

    this.deleteExpense = this.deleteExpense.bind(this);
    this.addTotal = this.addTotal.bind(this);
  }

  totalSum() {
    const { wallet: { expenses } } = this.props;
    const listOfExchangeRates = [...expenses].map(({
      exchangeRates,
      currency,
      value,
    }) => {
      const { ask } = exchangeRates[currency];
      return Number(ask) * Number(value);
    });
    const total = listOfExchangeRates.reduce((acc, cur) => acc + cur);
    this.setState({
      total,
    });
  }

  deleteExpense({ target: { id } }) {
    const { wallet: { expenses }, dispatch } = this.props;
    if ([...expenses].length === 1) {
      dispatch(deleteRegister());
      this.setState({
        total: 0,
      });
    } else {
      const newExpenses = [...expenses].filter((data) => data.id !== Number(id));
      newExpenses.forEach(async (data) => {
        await dispatch(deleteRegister(data));
        this.totalSum();
      });
    }
  }

  addTotal(total) {
    this.setState({
      total,
    });
  }

  render() {
    const { total } = this.state;
    return (
      <div>
        <Header
          addTotal={ this.addTotal }
          total={ total }
        />
        <Table
          deleteExpense={ this.deleteExpense }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }).isRequired,
    ),
  }).isRequired,
};

const mapStateToProps = ({ wallet }) => ({ wallet });

export default connect(mapStateToProps)(Wallet);
