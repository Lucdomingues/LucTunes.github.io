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
    return (
      <section>
        {loading ? <Loading /> : (
          <ul className="container-f">
            <li key={ trackName }>
              <h3 className="albums">{trackName}</h3>
              <audio
                className="btn btn-dark position-relative"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta elemento
                <code>audio</code>
              </audio>
              <div className="form-check form-switch">
                <label
                  htmlFor="flexSwitchCheckDefault"
                  className="favorite form-check-label "
                >
                  Favorita
                  <input
                    type="checkbox"
                    onChange={ this.HandleFavorites }
                    checked={ favoriteSongs
                      .some((element) => element.trackId === trackId) }
                    name="musicFavo"
                    data-testid={ `checkbox-music-${trackId}` }
                    className="form-check-input"
                    id="flexSwitchCheckDefault"
                  />
                </label>
              </div>
            </li>
          </ul>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  objMusic: PropTypes.objectOf(PropTypes.string).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
