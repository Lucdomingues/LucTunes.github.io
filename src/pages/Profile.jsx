import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Header from '../components/Header';

class Profile extends React.Component {
  state = {
    usuario: {},
  };

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({
      usuario,
    });
  }

  render() {
    const { usuario } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {usuario.name && (
          <section>
            <article>
              <Link to="/profile/edit">Editar perfil</Link>
              <img
                src={ usuario.image }
                alt={ usuario.name }
                data-testid="profile-image"
              />
            </article>
            <h2>Nome</h2>
            <p>{usuario.name}</p>
            <p>{ usuario.name }</p>
            <h2>Email</h2>
            <p>{usuario.email}</p>
            <h2>Descrição</h2>
            <p>{ usuario.description }</p>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
