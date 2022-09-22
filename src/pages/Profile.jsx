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
          <section className="container-profile">
            <div className="profile">
              <article>
                <img
                  src={ usuario.image }
                  alt={ usuario.name }
                  data-testid="profile-image"
                />
              </article>
              <p>
                <strong>Nome:</strong>
                {usuario.name}
              </p>
              <p>
                <strong>Email:</strong>
                {usuario.email}
              </p>
              <p>
                <strong>Descrição:</strong>
                {usuario.description}
              </p>
              <Link
                to="/profile/edit"
                className="btn btn-secondary btn-lg"
              >
                Editar perfil
              </Link>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
