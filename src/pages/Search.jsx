import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    search: '',
    loading: false,
    fraseArtista: false,
    searchSave: '',
    albumSave: [],
  };

  HandleInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  HandleRequest = async () => {
    this.setLoading();
    const { search } = this.state;
    const requisicao = await searchAlbumsAPI(search);
    this.setState({
      searchSave: search,
      search: '',
      loading: false,
      fraseArtista: true,
      albumSave: requisicao,
    });
  };

  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { search, loading, fraseArtista, searchSave, albumSave } = this.state;
    const MIN_NUMBER = 2;
    return (
      <section data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="pesquisa"
            id="pes"
            value={ search }
            onChange={ this.HandleInputSearch }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ !(search.length >= MIN_NUMBER && 'disabled') }
            onClick={ this.HandleRequest }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
          {loading && <Loading />}
          <div>
            {albumSave.length === 0 ? (
              'Nenhum álbum foi encontrado'
            ) : (
              <section>
                <p>
                  {fraseArtista && `Resultado de álbuns de: ${searchSave.toUpperCase()}`}
                </p>
                <ul>
                  {albumSave.map(
                    ({
                      artistId,
                      artistName,
                      collectionId,
                      collectionName,
                      collectionPrice,
                      artworkUrl100,
                      releaseDate,
                      trackCount,
                    }) => (
                      <li key={ collectionId }>
                        {artistId}
                        {artistName}
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          {collectionName}
                        </Link>
                        {collectionPrice}
                        <img src={ artworkUrl100 } alt="" />
                        {releaseDate}
                        {trackCount}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}
          </div>
        </form>
      </section>
    );
  }
}

export default Search;
