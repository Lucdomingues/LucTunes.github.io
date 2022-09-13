import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  HandleFavorites = async ({ target }) => {
    const { objMusic } = this.props;

    if (target.checked === true) {
      this.setState({ loading: true });
      await addSong(objMusic);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(objMusic);
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl, trackId, checkedSongs } = this.props;
    const elementoHtml = (
      <section>
        <ul>
          <li key={ trackName }>
            {loading && <Loading />}
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                onChange={ this.HandleFavorites }
                checked={ checkedSongs.some((elment) => elment.trackName === trackName) }
                name="musicFavo"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </li>
        </ul>
      </section>
    );

    return loading ? <Loading /> : elementoHtml;
  }
}

MusicCard.propTypes = {
  checkedSongs: PropTypes.shape({
    some: PropTypes.func,
  }).isRequired,
  objMusic: PropTypes.objectOf(PropTypes.number).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
