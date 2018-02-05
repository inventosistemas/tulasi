import React, { Component } from 'react';
import { ModalComponent } from './reusable/ModalComponent';
import { connect } from 'react-redux';
import { postNotifyUserWhenAvaliableRequest } from '../actions/shoppingCartActions';



class NotifyUserProductNotAvaliableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        errorMessage: null
      },
      email: {
        value: '',
        errorMessage: null
      },
      hasNameAndEmail: false
    }
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({ hasNameAndEmail: true })
      this.props.postNotifyUserWhenAvaliableRequest(this.props.user.Parceiro.Fantasia, this.props.user.Email, this.props.productId);
    }
  }

  onSubmitClick() {
    // eslint-disable-next-line
    if (this.state.name != '' && this.state.email != '') {
      this.setState({ hasNameAndEmail: true });
      this.props.postNotifyUserWhenAvaliableRequest(this.state.name.value, this.state.email.value, this.props.productId);
    }

  }

  validateField = (e, fieldName ) => {
    let errorMessage = null;

    let newState = { ...this.state };
    newState[fieldName].value = e.target.value;

    //console.log("validando " + fieldName);

    switch (fieldName) {
      case "name":
        if (e.target.value === "") {
          errorMessage = "Digite um nome válido";
        }
        break
      case "email":
        // eslint-disable-next-line
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value === "" || re.test(e.target.value) === false )  {
          errorMessage = "Digite um e-mail válido";
        }
        break
      default: break
    }

    newState[fieldName].errorMessage = errorMessage;
    this.setState({ ...newState })
  }

  nameAndEmailForm() {
    return (
      <div>
        <h1 style={{outline: "0px"}}>Avise-me</h1>
        {/* <img alt="" src={bandeiraVisa} width="80" /> */}
        <div className="form-horizontal">
          <form id="create_customer">
            <div>
              <div className="clearfix form-group">
                <label className="login control-label col-sm-4">Nome</label>
                <div className="col-sm-8">
                  <input type="text" value={ this.state.name.value } className="form-control" onChange={ (e) => this.validateField(e, "name") }/>
                  <p className="alert-form-info" style={ this.state.name.errorMessage ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.name.errorMessage}</p>
                </div>
              </div>

              <div className="clearfix form-group">
                <label htmlFor="email" className="login control-label col-sm-4">E-mail</label>
                <div className="col-sm-8">
                  <input type="email" className="form-control" value={ this.state.email.value } onChange={ e => this.validateField(e, "email") } />
                  <p className="alert-form-info" style={ this.state.email.errorMessage ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.email.errorMessage}</p>              </div>
              </div>

            </div>

            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-4">
                <button className="btn btn-primary"
                  onClick={e => {
                  e.preventDefault();
                  this.onSubmitClick()
                }}>Cadastrar</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }

  message() {
    return (
      <div>
        <h1 style={{outline: "0px"}}>Avise-me</h1>
        {/* <img alt="" src={bandeiraVisa} width="80" /> */}
        <div>
          {this.props.postNotifyUserWhenAvaliableSuccess ?
            <p>Um e-mail será enviado para você, quando o produto estiver disponível :)</p> : null }
          {this.props.postNotifyUserWhenAvaliableError ?
            <p>Houve um erro :( Tente novamente mais tarde! </p> : null }
        </div>
      </div>
    )
  }

  render() {
    return (
      <ModalComponent>
        <div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
          <div className="fancybox-skin" style={{display: 'block', width: 'auto', height: 'auto', 'text-align': 'center', padding: '50px'}}>
            {this.state.hasNameAndEmail ? this.message() : this.nameAndEmailForm()}
          <a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
            this.props.closeModal();
          }} />
          </div>
        </div>
      </ModalComponent>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      user: state.login.user,
      postNotifyUserWhenAvaliableSuccess: state.shoppingCart.postNotifyUserWhenAvaliableSuccess,
      postNotifyUserWhenAvaliableError: state.shoppingCart.postNotifyUserWhenAvaliableError
    };
};

export default connect(mapStateToProps, {
  postNotifyUserWhenAvaliableRequest
})(NotifyUserProductNotAvaliableModal);
