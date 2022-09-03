import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: [],
    loading: false,
  };

  componentDidMount() {
    this.pegueUser();
  }

  pegueUser = async () => {
    this.startLoading();
    await getUser().then((resp) => {
      const response = resp.name;
      this.setState({
        user: response,
        loading: false,
      });
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
        <p data-testid="header-user-name">
          Usuário:
          {user}
        </p>
        <section>{loading && <Loading />}</section>
      </header>
    );
  }
}

export default Header;
