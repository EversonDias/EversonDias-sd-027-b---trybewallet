import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const {
      wallet: { currencies },
      value,
      description,
      addExpenses,
      saveExpenses,
    } = this.props;
    return (
      <form>
        <label
          htmlFor="value"
        >
          Value
          <input
            type="text"
            id="value"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ addExpenses }
          />
        </label>
        <label
          htmlFor="description"
        >
          Description
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ addExpenses }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ addExpenses }
        >
          {[...currencies].map((data) => (
            <option
              key={ data }
              value={ data }
            >
              {data}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ addExpenses }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ addExpenses }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ saveExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  addExpenses: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
  expense: globalState.expense,
});

export default connect(mapStateToProps)(WalletForm);
