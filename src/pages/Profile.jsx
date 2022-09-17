import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    usuario: {},
    // loading: false,
  };

  async componentDidMount() {
    // this.goLoading();
    const usuario = await getUser();
    this.setState({
      usuario,
      // loading: false,
    });
  }

  // goLoading = () => {
  //   const { loading } = this.state;
  //   this.setState({
  //     loading: !loading,
  //   });
  // };

  render() {
    const { usuario: { image, name, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {!name ? <Loading /> : (
          <section>
            <article>
              <Link to="/profile/edit">Editar perfil</Link>
              <img src={ image } alt={ name } data-testid="profile-image" />
            </article>
            <h2>Nome</h2>
            <p>{name}</p>
            <h2>Email</h2>
            <p>{email}</p>
            <h2>Descrição</h2>
            <p>{ description }</p>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
