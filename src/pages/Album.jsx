import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    artist: '',
    collection: '',
    image: '',
    arr: [],
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.getRequiMusic();
    const save = await getFavoriteSongs();
    this.setState({
      favoriteSongs: save,
    });
  }

  getRequiMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const resolve = await getMusics(id);
    this.setState({
      artist: resolve[0].artistName,
      collection: resolve[0].collectionName,
      image: resolve[0].artworkUrl100,
      arr: resolve,
    });
  };

  render() {
    const {
      artist,
      collection, image, arr, loading, favoriteSongs } = this.state;
    return (
      <section data-testid="page-album">
        <Header />
        <section>
          <div>
            <h2 data-testid="artist-name">{artist}</h2>
            <h3 data-testid="album-name">{`${collection} - ${artist}`}</h3>
            <img src={ image } alt={ artist } />
          </div>
          {arr.slice([1]).map((element) => (
            <MusicCard
              key={ element.trackId }
              objMusic={ element }
              trackId={ element.trackId }
              previewUrl={ element.previewUrl }
              trackName={ element.trackName }
              checkedSongs={ favoriteSongs }
            />
          ))}
          {loading && <Loading />}
        </section>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
