import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { arr } = this.props;
    const copyArr = arr.slice([1]);
    return (
      <section>
        <ul>
          {copyArr.map(({ trackName, previewUrl }) => (
            <li key={ trackName }>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta elemento
                <code>audio</code>
              </audio>
            </li>
          ))}
        </ul>
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
