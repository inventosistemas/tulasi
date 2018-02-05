import React, { Component } from "react";
import { connect } from 'react-redux';
import { postToken, clearLoginError, showForgotPasswordForm } from '../../actions/loginActions';

class LoginForm extends Component {
  //lifecycle
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: null,
        password: null
      }
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    //reset the server response
    this.props.clearLoginError()
  }

  //methods
  onSubmit(e) {
    e.preventDefault();
    this.props.postToken(this.state.email, this.state.password, this.props.cartId)
  }

  onChangeEmail(e) {
    let errors = { ...this.state.errors }
    if (e.target.value === "") {
      //console.log("erro emial");
      errors.email =  "Digite um e-mail válido"
    } else {
      errors.email = null
    }
    //console.log(errors)
    this.setState({ ...this.state, email: e.target.value, errors: {...errors} });
    //console.log(this.state)
  }

  onChangePassword(e) {
    let errors = { ...this.state.errors }
    if (e.target.value === "") {
      errors.password = "Digite sua senha"
    } else {
      errors.password = null
    }
    this.setState({ ...this.state, "password": e.target.value, errors: { ...errors } });
  }

  //this component will be shown when the server responds
  serverResponse = () => {
    if (this.props.loginFailureMessage) {
      return (
        <div className="alert alert-danger">
          <ul>
            <li>{this.props.loginFailureMessage}</li>
          </ul>
        </div>
      )
    } else {
      return
    }
  }

  render() {
    return (
      <div className="account_section">
        <form>
          {this.serverResponse()}
          <h4>Já possui conta?</h4>
          <div className="form-group">
            <label className="control-label">E-mail</label>
            <input type="email" value={this.state.email} className="form-control" maxLength={100} onChange={ e => {
              this.onChangeEmail(e)
            }}/>
            <p className="alert-form-info" style={ this.state.errors.email ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.errors.email}</p>
          </div>
          <div className="form-group">
            <label className="control-label">Senha</label>
            <input type="password" value={this.state.password} className="form-control" maxLength={16} onChange={ e => {
              this.onChangePassword(e)
            }} />
            <p className="alert-form-info" style={ this.state.errors.password ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.errors.password}</p>
          </div>
          <div className="form-group">
            <button className="btn" onClick={ e => {
              this.onSubmit(e)
            }}>Entrar</button><p className="alert-form-info" />
            <a className="syligo-topbar-cursor" onClick={() => {
              //console.log("quer recuperar a senha");
              this.props.showForgotPasswordForm(true)
            }}>Esqueceu a senha?</a>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginReponse: state.login.loginResponse,
    loginFailureMessage: state.login.loginFailureMessage,
    user: state.login.user,
    cartId: state.shoppingCart.shoppingCartId
  }
}

export default connect(mapStateToProps, {
  postToken,
  clearLoginError,
  showForgotPasswordForm,
})(LoginForm);
