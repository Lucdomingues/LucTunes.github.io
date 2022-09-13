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
                checked={ checkedSongs.some(
                  (elment) => elment.trackName === trackName
                ) }
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
  objMusic: PropTypes.objectOf(PropTypes.number).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import {
//   addSong,
//   getFavoriteSongs,
//   removeSong,
// } from "../services/favoriteSongsAPI";
// import Loading from "./Loading";

// export default class MusicCard extends Component {
//   state = {
//     loading: false,
//     favorites: [],
//   };

//   componentDidMount() {
//     this.getFavorites();
//   }

//   setFavorite = async ({ target }) => {
//     const { music } = this.props;
//     if (target.checked) {
//       this.setState({ loading: true });
//       await addSong(music);
//       await this.getFavorites();
//       this.setState({ loading: false });
//     }
//     if (!target.checked) {
//       this.setState({ loading: true });
//       await removeSong(music);
//       await this.getFavorites();
//       this.setState({ loading: false });
//     }
//   };

//   getFavorites = async () => {
//     const response = await getFavoriteSongs();
//     this.setState({ favorites: response });
//   };

//   render() {
//     const { trackName, previewUrl, trackId } = this.props;
//     const { loading, favorites } = this.state;
//     const musicCardComp = (
//       <li>
//         {trackName}{" "}
//         <audio data-testid="audio-component" src={previewUrl} controls>
//           <track kind="captions" />O seu navegador não suporta o elemento{" "}
//           <code>audio</code>
//         </audio>
//         <label htmlFor="checkbox-favorite">
//           Favorita
//           <input
//             type="checkbox"
//             name="favorite"
//             id="checkbox-favorite"
//             data-testid={`checkbox-music-${trackId}`}
//             checked={favorites.some((elem) => elem.trackName === trackName)}
//             onChange={this.setFavorite}
//           />
//         </label>
//       </li>
//     );
//     return loading ? <Loading /> : musicCardComp;
//   }
// }

// MusicCard.defaultProps = {
//   favorites: {},
// };

// MusicCard.propTypes = {
//   trackName: PropTypes.string.isRequired,
//   previewUrl: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   music: PropTypes.shape({}).isRequired,
//   favorites: PropTypes.shape({}),
// };
