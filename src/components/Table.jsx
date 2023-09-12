import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

class Table extends Component {
  handleEdit({ target }) {
    console.log(target);
  }

  render() {
    const { wallet: { expenses }, deleteExpense } = this.props;
    return (
      <div className="overflow-x-auto">
        <table className="table">
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
                const coin = exchangeRates[currency].name;
                const convertedValue = Number(exchanger)
                  .toLocaleString('en-IN', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2,
                  });
                const conversionCurrency = (
                  Number(exchangeRates[currency].ask) * Number(value)
                )
                  .toLocaleString('en-IN', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2,
                  });
                const valueCurrency = Number(value)
                  .toLocaleString('en-IN', {
                    minimumFractionDigits: 2, maximumFractionDigits: 2,
                  });
                return (
                  <tr key={ id } className="hover">
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{valueCurrency}</td>
                    <td>{coin}</td>
                    <td>
                      {
                        convertedValue
                      }
                    </td>
                    <td>
                      {
                        conversionCurrency
                      }
                    </td>
                    <td>Real</td>
                    <td className="flex gap-4 text-2xl">
                      <button
                        type="button"
                        id={ id }
                        onClick={ this.handleEdit }
                        className="hover:text-green-500"
                      >
                        <FiEdit />
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        id={ id }
                        onClick={ deleteExpense }
                        className="hover:text-red-500"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }).isRequired,
    ),
  }).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

export default connect(mapStateToProps)(Table);
