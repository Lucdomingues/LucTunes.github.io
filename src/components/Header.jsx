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
      <header data-testid="header-component" className="fixed-top">
        <nav>
          <Link className="logo" to="/search">LucTunes</Link>
          <ul className="nav-list">
            <li>
              <Link to="/search" data-testid="link-to-search">
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          <Link data-testid="header-user-name" to="/profile">
            <strong>Usuário:</strong>
            {user.name}
          </Link>
        </nav>
        <section>{loading && <Loading />}</section>
      </header>
    );
  }
}

export default Header;
