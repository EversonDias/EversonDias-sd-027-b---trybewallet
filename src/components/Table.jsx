import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { user, total } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          {user}
        </p>
        <p
          data-testid="total-field"
        >
          {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}

Table.propTypes = {
  user: PropTypes.string,
  total: PropTypes.number,
};

Table.defaultProps = {
  user: 'test@test.com',
  total: 0,
};

export default Table;
