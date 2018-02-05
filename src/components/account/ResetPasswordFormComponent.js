import React, { Component } from "react"
import { connect } from 'react-redux'
import {
  putForgotPasswordRequest,
  showForgotPasswordForm,
  clearForgotPasswordState
} from "../../actions/loginActions"

class ResetPasswordForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: null,
      errorMessage: null,
      sendDisabled: true
    }
  }

  //lifecycle
  componentWillMount() {
      this.props.clearForgotPasswordState()
  }

  handleEmailChange = e => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let errorMessage = null;
    let sendDisabled = false;

    if (e.target.value === "" || re.test(e.target.value) === false )  {
      errorMessage = "Digite um e-mail válido";
      sendDisabled = true
    }

    this.setState({
      ...this.state,
      email: e.target.value,
      errorMessage: errorMessage,
      sendDisabled: sendDisabled
    })
  }

  showResponseMessage = () =>{
    if (this.props.putForgotPasswordSuccessResponse && this.props.putForgotPasswordSuccessResponse !== null) {
      return (
        <div className="alert alert-success">
          <ul><li>E-mail enviado com sucesso.</li></ul>
        </div>
      )
    }

    if (this.props.putForgotPasswordErrorResponse && this.props.putForgotPasswordErrorResponse !== null ) {
      return(
        <div className="alert alert-danger">
          <ul><li>Não foi possível enviar o e-mail.</li></ul>
        </div>
      )
    }

    return
  }

  render() {
    return (
      <div style={this.props.style} className="account_section recuperarsenha">
        <h4>Recuperar senha
          <span><a className="link_close account_reset__cancel syligo-topbar-cursor" onClick={() => this.props.showForgotPasswordForm(false)}>Fechar</a></span>
        </h4>
        <p className="note">Nós enviaremos um e-mail para você recuperar sua senha.</p>
        <form>
          <div className="clearfix form-horizontal">
            {this.showResponseMessage()}
            <div className="form-group">
              <label htmlFor="email" className="large col-sm-4">E-mail </label>
              <div className="col-sm-6">
                <input className="form-control" type="email" maxLength={30} onChange={e => this.handleEmailChange(e)} value={ this.state.email === null ? "" : this.state.email}  /><p className="alert-form-info" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-4 col-sm-offset-4">
                <button className="btn" disabled={this.state.sendDisabled === true} onClick={e => {
                  e.preventDefault();
                  this.props.putForgotPasswordRequest(this.state.email)
                }}>Enviar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    putForgotPasswordRequesting: state.login.putForgotPasswordRequesting,
    putForgotPasswordSuccessResponse: state.login.putForgotPasswordSuccessResponse,
    putForgotPasswordErrorResponse: state.login.putForgotPasswordErrorResponse
  }
}

export default connect(mapStateToProps, { putForgotPasswordRequest, showForgotPasswordForm, clearForgotPasswordState })(ResetPasswordForm)
