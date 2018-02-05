import React, { Component } from 'react'
import { postNewUserRequest, postNewUserResetMessages } from '../../actions/loginActions'
import { connect } from 'react-redux'
import MaskedInput from 'react-text-mask'

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: {
        value: '',
        error: ''
      },
      lastName: {
        value: '',
        error: ''
      } ,
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      cpf: {
        value: '',
        error: ''
      },
      birthday: {
        value: '',
        error: ''
      },
      gender: {
        value: '',
        error: ''
      },
      phone: {
        value: '',
        error: ''
      }
    }

    //Conectando o contexto à função
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentWillMount(){
    //console.log("will mount");
    this.props.postNewUserResetMessages()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postNewUserSuccessMessage !== this.props.postNewUserSuccessMessage){
      ////console.log('----WILL RECEIVE PROPS - Received post new user success!-----');
      this.cleanUpForm();
    }
  }

  componentWillUnmount(){
    let childScript = document.getElementById("CompleteRegistration");
    if (childScript !== null) {
        document.body.removeChild(childScript)
    }
  }

  onSubmitClick() {
    //console.log("onsubmitlcick payload")

    //remove dots and - from cpf:
    let { cpf, phone } = this.state

    //console.log(cpf.value)
    //console.log(phone.value)

    const formattedCpf = `${cpf.value.substring(0,3)}${cpf.value.substring(4,3)}${cpf.value.substring(8,3)}${cpf.value.substring(12,2)}`
    const formattedDdd = phone.value.substring(1,2)

    const payload = {
      "CNPJ": cpf.value,
      "DataNascimento": this.state.birthday.value,
      "Email": this.state.email.value,
      "Fantasia": this.state.firstName.value,
      "RazaoSocial": `${this.state.firstName.value} ${this.state.lastName.value}`,
      "RG": "",
      "Sexo": this.state.gender.value,
      "DDDTelefone": formattedDdd,
      "Telefone": formattedCpf,
      "TipoPessoa": 1, //fisica
      "Senha": this.state.password.value
    }

    //this will create a new user, and if successful, will log in the user, then /conta will be pushed
    this.props.postNewUserRequest({ ...payload }, this.props.shoppingCartId)
  }

  validateField = (e, fieldName ) => {
    let errorMessage = '';

    let newState = { ...this.state };
    newState[fieldName].value = e.target.value;

    //console.log("validando " + fieldName);

    switch (fieldName) {
      case "firstName":
        if (e.target.value === "") {
          errorMessage = "Digite um nome válido";
        }
        break
      case "lastName":
        if (e.target.value === "") {
          errorMessage = "Digite um sobrenome válido";
        }
        break
      case "email":
        // eslint-disable-next-line
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value === "" || re.test(e.target.value) === false )  {
          errorMessage = "Digite um e-mail válido";
        }
        break
      case "password":
        if (e.target.value.length < 6 || e.target.value === "") {
          errorMessage = "Digite uma senha válida, com mais de 6 caracteres."
        }
        break
      case "cpf":
        if (e.target.value.length < 14) {
          errorMessage = "Digite um CPF"
        }
        break
      case "birthday":
        if (e.target.value === "") {
          errorMessage = "Inclua sua data de nascimento"
        }
        break
      case "gender":
        if (e.target.value === "") {
          errorMessage = "Selecione seu sexo"
        }
        break
      case "phone":
        if (e.target.value.length < 12) {
          errorMessage = "Insira um telefone válido"
        }
        break
      default: break
    }

    newState[fieldName].error = errorMessage;
    this.setState({ ...newState })
  }

  //this component will be shown when there is a error
  serverResponse = () => {
    if (this.props.postNewUserFailureMessage) {
      return (
        <div className="alert alert-danger">
          <ul>
            <li>{this.props.postNewUserFailureMessage}</li>
          </ul>
        </div>
      )
    } else if (this.props.postNewUserSuccessMessage) {
      return (
        <div className="alert alert-success">
          <ul>
            <li>{this.props.postNewUserSuccessMessage}</li>
          </ul>
        </div>
      )
    } else {
      return
    }
  }

  cleanUpForm() {
    //console.log('clean up form');
    this.setState({
      firstName: {
        value: '',
        error: ''
      },
      lastName: {
        value: '',
        error: ''
      } ,
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      cpf: {
        value: '',
        error: ''
      },
      birthday: {
        value: '',
        error: ''
      },
      gender: {
        value: '',
        error: ''
      },
      phone: {
        value: '',
        error: ''
      }
    })
    //console.log(this.state);
  }

  loadScript() {
         var script= document.createElement('script');
         script.type= 'text/javascript';
         script.textContent="fbq('track','CompleteRegistration');";
         script.async = true;
         script.setAttribute('id','CompleteRegistration');
         document.body.appendChild(script);
    }

  render() {
    //console.log("Novo ESTADO:");
    //console.log(this.state);

    return(
      <div>
      {/* create account div */}
      <div id="account_register" className="account_section" style={ {display: 'block', overflow: 'hidden'} }>
        <h4><span>Dados Pessoais </span><span><a className="link_close account_register__cancel syligo-topbar-cursor" onClick={() => {
          this.props.onClose();
          this.props.postNewUserResetMessages()
        }}>Fechar</a></span></h4>
        <div className="form-horizontal">
          <form id="create_customer">
            {/* show the server response */}
            {this.serverResponse()}
            {/* firstname */}

          <div className="campos-obrigatorios pad-campos"> * Todos os campos são de preenchimento obrigatório.</div>

            <div className="clearfix form-group">
              <label className="login control-label col-sm-4">Primeiro nome</label>
              <div className="col-sm-4">
                <input type="text" value={ this.state.firstName.value } className="form-control" onChange={ (e) => this.validateField(e, "firstName") }/>
                <p className="alert-form-info" style={ this.state.firstName.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.firstName.error}</p>
              </div>
            </div>
            {/* Surname */}
            <div className="clearfix form-group">
              <label className="login control-label col-sm-4">Sobrenome</label>
              <div className="col-sm-4">
                <input type="text" className="form-control" size={30} value={this.state.lastName.value} onChange={ (e) => this.validateField(e, "lastName") }/>
                <p className="alert-form-info" style={ this.state.lastName.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.lastName.error}</p>
              </div>
            </div>
            {/* e-mail */}
            <div className="clearfix form-group">
              <label htmlFor="email" className="login control-label col-sm-4">E-mail</label>
              <div className="col-sm-4">
                <input type="email" className="form-control" value={ this.state.email.value } onChange={ e => this.validateField(e, "email") } />
                <p className="alert-form-info" style={ this.state.email.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.email.error}</p>              </div>
            </div>
            {/* "Senha" */}
            <div className="clearfix form-group">
              <label className="login control-label col-sm-4">Senha</label>
              <div className="col-sm-4">
                <input type="password" value={this.state.password.value} className="form-control password" size={30} onChange={ e => this.validateField(e, "password")} />
                <p className="alert-form-info" style={ this.state.password.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.password.error}</p>
              </div>
            </div>
            {/* cpf */}
            <div className="clearfix form-group">
              <label htmlFor="first_name" className="login control-label col-sm-4">CPF</label>
              <div className="col-sm-4">
                {/* eslint-disable-next-line */}
                <MaskedInput mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}  type="text" value={ this.state.cpf.value } className="form-control" size={14} onChange={ (e) => this.validateField(e, "cpf")}/>
                <p className="alert-form-info" style={ this.state.cpf.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.cpf.error}</p>
              </div>
            </div>
            {/* birthday */}
            <div className="clearfix form-group">
              <label className="login control-label col-sm-4">Data de nascimento</label>
              <div className="col-sm-4">
                <input type="date" value={ this.state.birthday.value } className="form-control" onChange={ e => this.validateField(e, "birthday") }/>
                <p className="alert-form-info" style={ this.state.birthday.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.birthday.error}</p>
              </div>
            </div>
            {/* Sexo */}
            <div className="clearfix form-group">
              <label htmlFor="first_name" className="login control-label col-sm-4">Sexo</label>
              <div className="col-sm-4">
                <select className="form-control" value={ this.state.gender.value } onChange={ e => this.validateField(e, "gender")}>
                  <option value="">Selecione</option>
                  <option value="0">Feminino</option>
                  <option value="1">Masculino</option>
                </select>
                <p className="alert-form-info" style={ this.state.gender.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.gender.error}</p>
              </div>
            </div>
            {/* Telefone */}
            <div className="clearfix form-group">
              <label htmlFor="first_name" className="login control-label col-sm-4">Telefone</label>
              <div className="col-sm-4">
                <MaskedInput mask={["(",/\d/, /\d/,")",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]} type="text" value={ this.state.phone.value } className="form-control" onChange={ e => this.validateField(e, "phone")} />
                <p className="alert-form-info" style={ this.state.phone.error ? { overflow: "hidden", display: "block" } : {overflow: "hidden", display: "none" }}>{this.state.phone.error}</p>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-4">
                <button className="btn btn-primary" onClick={e => {
                  e.preventDefault();
                  this.onSubmitClick()
                  this.loadScript();
                }}>Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postNewUserFailureMessage: state.login.postNewUserFailureMessage,
    postNewUserSuccessMessage: state.login.postNewUserSuccessMessage,
    shoppingCartId: state.shoppingCart.shoppingCartId
  }
}

export default connect(mapStateToProps, {
  postNewUserRequest,
  postNewUserResetMessages
})(Signup)
