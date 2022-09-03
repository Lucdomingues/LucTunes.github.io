import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{console.log(getUser())}</p>
      </header>
    );
  }
}

export default Header;
