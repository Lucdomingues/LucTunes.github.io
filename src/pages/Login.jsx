import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    login: '',
    loading: false,
    redirectTo: false,
  };

  HandleInputLogin = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  HandleInputSave = async () => {
    this.setLoading();
    const { login } = this.state;
    await createUser({ name: login });
    this.setLoading();
    this.setRedirect();
  };

  setRedirect = () => {
    this.setState({
      redirectTo: true,
    });
  };

  setLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  };

  render() {
    const { login, loading, redirectTo } = this.state;
    const MIN_CHARACTER = 3;
    return (
      <div data-testid="page-login" className="container-login">
        <form className="container-form">
          {loading ? <Loading /> : (
            <img src="https://i.pinimg.com/originals/c3/c4/d1/c3c4d1f51d7120ae0ef6f5ca62f04ac2.gif" alt="headphones" className="img-login" />
          ) }
          <h1>
            LucTunes
          </h1>
          <input
            value={ login }
            className="form-control input-user"
            type="text"
            name="LOGIN_NAME"
            id="login"
            data-testid="login-name-input"
            onChange={ this.HandleInputLogin }
            placeholder="Username"
          />
          <button
            type="button"
            className="btn btn-outline-dark button"
            disabled={ !(login.length >= MIN_CHARACTER && login) }
            onClick={ this.HandleInputSave }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          {/* <section>{loading && <Loading />}</section> */}
          <section>{redirectTo && <Redirect to="/search" />}</section>
        </form>
      </div>
    );
  }
}

export default Login;
