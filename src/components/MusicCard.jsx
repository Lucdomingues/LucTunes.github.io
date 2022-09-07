import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  HandleFavorites = async ({ target }) => {
    this.loadingGo();
    const objectId = await getMusics(target.id);
    const favorite = await addSong(objectId);
    this.loadingGo();
    return favorite;
  };

  loadingGo = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  render() {
    const { arr } = this.props;
    const { loading } = this.state;
    const copyArr = arr.slice([1]);
    return (
      <section>
        <ul>
          {copyArr.map(({ trackName, previewUrl, trackId }) => (
            <li key={ trackName }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta elemento
                <code>audio</code>
              </audio>
              <form action="">
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    type="checkbox"
                    onClick={ this.HandleFavorites }
                    name="musicFavo"
                    id={ trackId }
                    data-testid={ `checkbox-music-${trackId}` }
                  />
                </label>
              </form>
            </li>
          ))}
        </ul>
        {loading && <Loading />}
      </section>
    );
  }
}

MusicCard.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func, PropTypes.func, PropTypes.object,
  ])).isRequired,
};

export default MusicCard;
