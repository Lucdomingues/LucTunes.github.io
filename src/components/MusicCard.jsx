import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const save = await getFavoriteSongs();
    this.setState({
      favoriteSongs: save,
    });
  }

  HandleFavorites = ({ target }) => {
    const { objMusic } = this.props;
    if (target.checked === true) {
      this.setState({ loading: true }, async () => {
        await addSong(objMusic);
        const save = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteSongs: save,
        });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await removeSong(objMusic);
        const save = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoriteSongs: save,
        });
      });
    }
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
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
                checked={ favoriteSongs
                  .some((element) => element.trackId === trackId) }
                name="musicFavo"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </li>
        </ul>
      </section>);
    return loading ? <Loading /> : elementoHtml;
  }
}

MusicCard.propTypes = {
  objMusic: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
