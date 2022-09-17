import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    await this.pegueUser();
  }

  pegueUser = async () => {
    this.startLoading();
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  };

  startLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        <p data-testid="header-user-name">
          Usuário:
          {user.name}
        </p>
        <section>{loading && <Loading />}</section>
      </header>
    );
  }
}

export default Header;
