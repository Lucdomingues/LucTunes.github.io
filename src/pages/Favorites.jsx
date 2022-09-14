import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
      </div>
    );
  }
}

export default Favorites;
