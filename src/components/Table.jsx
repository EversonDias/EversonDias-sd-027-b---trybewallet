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
          {user.email}
        </p>
        <p
          data-testid="total-field"
        >
          {total}
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

Table.proptypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  total: PropTypes.number.isRequired,
};

export default Table;
