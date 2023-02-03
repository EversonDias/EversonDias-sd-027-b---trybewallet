import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const {
      addExpenses,
      saveExpenses,
      currency,
      description,
      value,
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
          {currency.map((data) => (
            <option
              key={ data.code }
              value={ data.code }
            >
              {data.code}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ addExpenses }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de Débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ addExpenses }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="saude">Saúde</option>
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
  addExpenses: PropTypes.func,
  saveExpenses: PropTypes.func,
  currency: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  description: PropTypes.string,
  value: PropTypes.string,
};

WalletForm.defaultProps = {
  addExpenses: () => {},
  saveExpenses: () => {},
  currency: [],
  description: 'description',
  value: 'value',
};

export default WalletForm;
