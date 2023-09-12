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
      <form className="flex flex-col lg:flex-row gap-8 justify-center items-end">
        <label
          htmlFor="value"
          className="flex flex-col w-full max-w-xs h-20 justify-end"
        >
          <span className="font-medium">Value: </span>
          <input
            type="text"
            id="value"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ addExpenses }
            className="input input-bordered input-accent  w-full max-w-xs"
          />
        </label>
        <label
          htmlFor="description"
          className="flex flex-col  w-full max-w-xs h-20 justify-end"
        >
          <span className="font-medium">Description: </span>
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ addExpenses }
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ addExpenses }
          className="select select-accent w-full max-w-xs"
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
          className="select select-accent w-full max-w-xs"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ addExpenses }
          className="select select-accent w-full max-w-xs"
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
          className="btn btn-success"
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
