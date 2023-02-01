import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    const total = 0;
    return (
      <header>
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
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.proptypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default connect(mapStateToProps)(Header);
