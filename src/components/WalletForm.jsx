import React, { Component } from 'react';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],
    };

    this.getCurrency = this.getCurrency.bind(this);
  }

  async componentDidMount() {
    await this.getCurrency();
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

  render() {
    const { currency } = this.state;
    return (
      <form>
        <label
          htmlFor="value"
        >
          Value
          <input
            type="text"
            id="value"
            data-testid="value-input"
          />
        </label>
        <label
          htmlFor="description"
        >
          Description
          <input
            type="text"
            id="description"
            data-testid="description-input"
          />
        </label>
        <select
          data-testid="currency-input"
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
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de Débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="saude">Saúde</option>
        </select>

      </form>
    );
  }
}

export default WalletForm;
