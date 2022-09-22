import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    nome: '',
    emails: '',
    imagem: '',
    descricao: '',
    redirectTo: false,
    isSaveButtonDisabled: true,
    loading: false,
  };

  async componentDidMount() {
    this.setLoading();
    const { name, description, email, image } = await getUser();
    this.setState({
      nome: name,
      emails: email,
      imagem: image,
      descricao: description,
      loading: false,
    }, () => {
      this.disabledButton();
    });
  }

  HandleInput = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => {
      this.disabledButton();
    });
  };

  HandleClick = async () => {
    const { nome, imagem, emails, descricao } = this.state;
    this.setLoading();
    await updateUser({
      name: nome,
      image: imagem,
      description: descricao,
      email: emails,
    });
    this.setRedirect();
  };

  disabledButton = () => {
    const { nome, imagem, descricao, emails } = this.state;
    const re = /\S+@\S+\.\S+/;
    const validacion = re.test(emails);
    const disabledOn = (
      !nome
      || !imagem
      || !descricao
      || !validacion
    );
    this.setState({
      isSaveButtonDisabled: disabledOn,
    });
  };

  setLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  setRedirect = () => {
    this.setState({
      redirectTo: true,
    });
  };

  render() {
    const {
      nome, emails, descricao, imagem,
      redirectTo, isSaveButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="container-edit">
          {loading ? <Loading /> : (
            <form className="formEdit">
              <label htmlFor="imagem" className="form-label">
                Foto do Perfil
                <input
                  className="form-control"
                  type="text"
                  value={ imagem }
                  id="imagem"
                  data-testid="edit-input-image"
                  // placeholder={ image }
                  onChange={ this.HandleInput }
                />
              </label>
              <label htmlFor="nome" className="form-label">
                Nome
                <input
                  className="form-control"
                  type="text"
                  name="nome"
                  value={ nome }
                  id="nome"
                  data-testid="edit-input-name"
                  // placeholder={ name }
                  onChange={ this.HandleInput }
                />
              </label>
              <label htmlFor="email" className="form-label">
                Endereço de email
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={ emails }
                  id="emails"
                  data-testid="edit-input-email"
                  // placeholder={ email }
                  onChange={ this.HandleInput }
                />
              </label>
              <label htmlFor="descricao" className="form-label">
                Descrição
                <textarea
                  className="form-control"
                  name="descricao"
                  id="descricao"
                  value={ descricao }
                  cols="30"
                  rows="10"
                  data-testid="edit-input-description"
                  // placeholder={ description }
                  onChange={ this.HandleInput }
                />
              </label>
              <button
                className="btn btn-secondary btn-lg"
                disabled={ isSaveButtonDisabled }
                type="button"
                data-testid="edit-button-save"
                onClick={ this.HandleClick }
              >
                Salvar
              </button>
            </form>) }
        </div>
        {redirectTo && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
