import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.createCurrency();
  }

  createCurrency() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const {
      currency,
      addExpenses,
      saveExpenses,
      expense: { value, description },
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
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
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
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  currency: globalState.currencies,
});

export default connect(mapStateToProps)(WalletForm);
