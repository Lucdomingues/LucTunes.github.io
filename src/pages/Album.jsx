import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

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
  };

  async componentDidMount() {
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
    const {
      artist,
      collection, image, arr, loading } = this.state;
    return (
      <section data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <section className="search container-f">
            <div className="container autor ">
              <h1 data-testid="artist-name" className="f">{artist}</h1>
              <h2 data-testid="album-name">{`${collection} - ${artist}`}</h2>
              <img src={ image } alt={ artist } />
            </div>
            <div className="container container-b">
              {arr.slice([1]).map((element) => (
                <MusicCard
                  key={ element.trackId }
                  objMusic={ element }
                  trackId={ element.trackId }
                  previewUrl={ element.previewUrl }
                  trackName={ element.trackName }
                />
              ))}
            </div>
          </section>
        )}
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
