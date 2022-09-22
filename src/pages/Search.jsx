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
        {loading ? <Loading /> : (
          <div className="container  text-center">
            <form className="row align-items-center search">
              <input
                className="form-control input-user col"
                type="text"
                name="pesquisa"
                id="pes"
                value={ search }
                onChange={ this.HandleInputSearch }
                data-testid="search-artist-input"
                placeholder="Search"
              />
              <button
                type="button"
                disabled={ !(search.length >= MIN_NUMBER && 'disabled') }
                onClick={ this.HandleRequest }
                data-testid="search-artist-button"
                className="btn btn-secondary btn-lg button"
              >
                Pesquisar
              </button>
            </form>
            <div className="container albums">
              {albumSave.length === 0 ? (
                'Nenhum álbum foi encontrado'
              ) : (
                <section>
                  <p>
                    {
                      fraseArtista && (
                        <h1>{`Resultado de álbuns de: ${searchSave.toUpperCase()}`}</h1>
                      )
                    }
                  </p>
                  <ul className="container-album">
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
                        <li key={ collectionId } className="conteiner-cards">
                          <div className="card s text-bg-dark mb-3">
                            <img src={ artworkUrl100 } alt="" />
                            <div className="card-body">
                              <h5 className="card-title">{artistName}</h5>
                              <p
                                className="card-text"
                              >
                                <strong>Identificador:</strong>
                                {artistId}
                                <br />
                                <strong>Preço:</strong>
                                {collectionPrice}
                                <br />
                                <strong>Data:</strong>
                                {releaseDate}
                                <br />
                                <strong>Track:</strong>
                                {trackCount}
                              </p>
                              <Link
                                to={ `/album/${collectionId}` }
                                data-testid={ `link-to-album-${collectionId}` }
                                className="btn btn-primary"
                              >
                                {collectionName}
                              </Link>
                            </div>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Search;
