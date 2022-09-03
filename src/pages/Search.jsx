import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    search: '',
  };

  HandleInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  render() {
    const { search } = this.state;
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
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
