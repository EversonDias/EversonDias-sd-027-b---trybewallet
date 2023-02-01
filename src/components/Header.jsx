import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import Table from './Table';
import WalletForm from './WalletForm';

class Header extends Component {
  render() {
    // const { user } = this.props;
    const user = {
      email: 'test@test.com',
    };
    const total = 0;
    return (
      <header>
        <WalletForm />
        <Table
          user={ user }
          total={ total }
        />
      </header>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: state.user,
//   wallet: state.wallet,
// });

// Header.proptypes = {
//   user: PropTypes.shape({
//     email: PropTypes.string.isRequired,
//   }),
// };

// export default connect(mapStateToProps)(Header);
export default Header;
