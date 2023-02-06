import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableTotal extends Component {
  render() {
    const { user: { email }, total } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          {email}
        </p>
        <p
          data-testid="total-field"
        >
          {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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

TableTotal.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  user: globalState.user,
});

export default connect(mapStateToProps)(TableTotal);
