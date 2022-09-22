import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    listFavMusic: [],
    loading: false,
  };

  async componentDidMount() {
    this.loading();
    this.setState({
      listFavMusic: await getFavoriteSongs(),
      loading: false,
    });
  }

  async componentDidUpdate() {
    this.setState({
      listFavMusic: await getFavoriteSongs(),
      loading: false,
    });
  }

  loading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  render() {
    const { listFavMusic, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites">
          <div className="autor">
            <h1>Favorites</h1>
            {loading ? <Loading /> : listFavMusic
              .map((favorite) => (
                <MusicCard
                  key={ favorite.trackId }
                  objMusic={ favorite }
                  trackId={ favorite.trackId }
                  previewUrl={ favorite.previewUrl }
                  trackName={ favorite.trackName }
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
