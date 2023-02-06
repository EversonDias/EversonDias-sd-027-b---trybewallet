import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  handleEdit({ target }) {
    console.log(target);
  }

  handleDelete({ target }) {
    console.log(target);
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
          && [...expenses].map(
            ({
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            }) => {
              const exchanger = exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{currency}</td>
                  <td>
                    {
                      Number(exchanger)
                        .toLocaleString('en-IN', { maximumFractionDigits: 2 })
                    }
                  </td>
                  <td>
                    {
                      (Number(exchangeRates[currency].ask) * Number(value))
                        .toLocaleString('en-IN', { maximumFractionDigits: 2 })
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      id={ id }
                      onClick={ this.handleEdit }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      id={ id }
                      onClick={ this.handleDelete }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

export default connect(mapStateToProps)(Table);
