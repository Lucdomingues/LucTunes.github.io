import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artist: '',
    collection: '',
    image: '',
    arr: [],
  };

  componentDidMount() {
    this.getRequiMusic();
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
    const { artist, collection, image, arr } = this.state;
    return (
      <section data-testid="page-album">
        <Header />
        <section>
          <div>
            <h2 data-testid="artist-name">{artist}</h2>
            <h3 data-testid="album-name">{`${collection} - ${artist}`}</h3>
            <img src={ image } alt={ artist } />
          </div>
          <MusicCard arr={ arr } />
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
