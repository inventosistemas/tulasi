
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import {
  getUserAddressWithZipRequest,
} from "../../actions/loginActions"
import {
  putUserAddressRequest,
  postUserAddressRequest,
  getUserAddress,
  resetUserAddressForm
} from "../../actions/userAddressActions"
import MaskedInput from 'react-text-mask'
import { ModalComponent } from "../reusable/ModalComponent";

class AddressAddForm extends Component {
  static propTypes = {
    userAddress: PropTypes.object,
    isEditing: PropTypes.bool,
    className: PropTypes.string,
    showCancelButton: PropTypes.bool,
    onClose: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      destinatario: {
        value: null,
        error: null
      },
      identificacao: {
        value: null,
        error: null
      },
      cep: {
        value: null,
        error: null
      },
      logradouro: {
        value: null,
        error: null
      },
      numero: {
        value: null,
        error: null
      },
      complemento: {
        value: null,
        error: null
      },
      bairro: {
        value: null,
        error: null
      },
      cidade: {
        value: null,
        error: null
      },
      principal: {
        value: false,
        error: null
      },
      phone: {
        value: null,
        error: null
      },
      isModalOpen: false
    }

    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleCheckBox(e) {
    this.setState({
      ...this.state,
      principal: {
        value: e.target.checked
      }
    })
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  componentWillMount() {
    if (this.props.userAddress) {
      //received an userAddress to pre fulfill the form
      //update the fields
      const { userAddress } = this.props
      ////console.log("componentWillMount")
      ////console.log(this.props)
      this.populateFormWith(userAddress)
    } else {
      this.props.resetUserAddressForm()
    }
  }

  componentWillReceiveProps(nextProps) {
    ////console.log("willreci")

    if (nextProps.isFromAccount) {
      this.setState({
        ...this.state,
        principal: {
          value: true,
        }
      })
    }

    //handles the received stuff
    if (this.props.isPosting === true && nextProps.isPosting === false) {
      //console.log("post finished")
      if (nextProps.postError !== null) {
        //console.log("erro ao adicionar endereço")
      }

      if (nextProps.postSuccess !== null) {
        //console.log("sucesso ao adicionar endereço")
        this.props.getUserAddress(this.props.parceiroId);
        this.setState({
        destinatario: {
          value: null,
          error: null
        },
        identificacao: {
          value: null,
          error: null
        },
        cep: {
          value: null,
          error: null
        },
        logradouro: {
          value: null,
          error: null
        },
        numero: {
          value: null,
          error: null
        },
        complemento: {
          value: null,
          error: null
        },
        bairro: {
          value: null,
          error: null
        },
        cidade: {
          value: null,
          error: null
        },
        principal: {
          value: false,
          error: null
        },
        phone: {
          value: null,
          error: null
        },
        isModalOpen: false
        });
      }
    }

    if (this.props.userAddressWithZipNotFound !== nextProps.userAddressWithZipNotFound) {
      this.setState({isModalOpen: nextProps.userAddressWithZipNotFound})
    }

    if (nextProps.userAddressWithZip !== this.props.userAddressWithZip && nextProps.userAddressWithZip !== null) {
        this.setState({
          ...this.state,
          logradouro: {
            value: `${nextProps.userAddressWithZip.Tipo} ${nextProps.userAddressWithZip.Nome}`,
            error: null
          },
          cidade: {
            value: nextProps.userAddressWithZip.Cidade.Nome,
            error: null
          }
        })
    }
  }

  //custom methods
  populateFormWith = userAddress => {
    //console.log("populateFormWith")
    ////console.log(userAddress)

    const principalValue = (userAddress.Tipo === 0 ? true : false)

    this.setState({
      ...this.state,
      destinatario: {
        value: userAddress.Destinatario,
        error: null
      },
      // identificacao: {
      //   value: userAddress.Identificacao,
      //   error: null
      // },
      cep: {
        value: userAddress.CEP,
        error: null
      },
      logradouro: {
        value: userAddress.Logradouro,
        error: null
      },
      numero: {
        value: userAddress.Numero,
        error: null
      },
      complemento: {
        value: userAddress.Complemento,
        error: null
      },
      bairro: {
        value: userAddress.Bairro,
        error: null
      },
      cidade: {
        value: userAddress.Cidade.Nome,
        error: null
      },
      principal: {
        value: principalValue,
        error: null
      },
      phone: {
        value: "0",
        error: null
      }
    })
  }

  //function to validate a field, based on an evetn
  validateField = (e, fieldName ) => {
    let errorMessage = null;

    let newState = { ...this.state };
    newState[fieldName].value = e.target.value;

    ////console.log("validando " + fieldName);

    switch (fieldName) {
      case "destinatario":
        if (e.target.value === "") {
          errorMessage = "Digite o nome do destinatário";
        }
        break
      case "identificacao":
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
      case "bairro":
        if (e.target.value === "") {
          errorMessage = "Digite o bairro"
        }
        break
      case "cep":
        if (e.target.value.length < 11) {
          errorMessage = "Digite um CEP válido"
        }
        break
      case "numero":
        if (e.target.value === "") {
          errorMessage = "Digite o número da residência"
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

  formHasError = () => {
    if (this.isEnabledCheck() === true) {
      return false
    }

    if (this.state.destinatario.value === null || this.state.destinatario.value === "") {
      return true
    }

    // if (this.state.identificacao.value === null || this.state.identificacao.value === "") {
    //   return true
    // }

    if (this.state.cep.value === null || this.state.cep.value === "") {
      return true
    }

    if (this.props.userAddressWithZip === null){
      return true
    }

    if (this.state.numero.value === null || this.state.numero.value === "") {
      return true
    }

    if (this.state.bairro.value === null || this.state.bairro.value === "") {
      return true
    }

    if (this.state.phone.value === null || this.state.phone.value === "") {
      return true
    }

    return false
  }

  onSubmitClick = () => {
    //if is editing
    if (this.props.isEditing && this.props.isEditing === true) {
      if (this.state.principal.value === true && this.props.userAddress.Tipo !== 0) {
        const { ID } = this.props.userAddress
        //console.log("isEditing to put: ")
        //console.log(ID)
        this.props.putUserAddressRequest(ID)
        return
      } else {
        return
      }
    }

    //remove dots and - from cpf:
    let { phone } = this.state

    const formattedDdd = phone.value.substring(1,3)
    const formattedPhone = phone.value.substring(4, phone.value.length)

    //0 create the object
    const newAddress = {
      "ParceiroID": this.props.parceiroId,
      "Destinatario": this.state.destinatario.value,
      "Identificacao": this.state.destinatario.value, //the same as destinatario
      "CEP": this.state.cep.value.replace("-", ""),
      "Logradouro": `${this.props.userAddressWithZip.Tipo} ${this.props.userAddressWithZip.Nome}`,
      "Numero": this.state.numero.value,
      "Complemento": this.state.complemento.value,
      "Bairro": this.state.bairro.value,
      "CidadeID": this.props.userAddressWithZip.Cidade.ID,
      "Principal": this.state.principal.value,
      "DDDTelefone": formattedDdd,
      "Telefone": formattedPhone
    }

    //1 post the object
    this.props.postUserAddressRequest({ ...newAddress }, this.props.accessToken)
  }

  isEnabledCheck = () => {
    if (this.props.isEditing && this.props.isEditing === true) {
      return true
    } else {
      return false
    }
  }

  postMessage = () => {
      if (this.props.isPosting === null) {
        return
      } else if (this.props.isPosting === true) {
        return "Salvando..."
      } else if (this.props.isPosting === false) {
        if (this.props.postSuccess !== null ){
          return "Endereço novo salvo com sucesso!"
        }

        if (this.props.postError !== null) {
          return "Não foi possível salvar o endereço"
        }
      }
  }

  zipCodeNotFoundModalTrial = (
    <div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
      <div className="fancybox-skin" style={{display: 'block', width: 'auto', height: 'auto'}}>
          <h1 style={{outline: "0px"}}>Ops</h1>
          {/* <img alt="" src={bandeiraVisa} width="80" /> */}
        <div>
          <p>CEP NÃO ENCONTRADO / AINDA NÃO REALIZAMOS ENTREGAS NO SEU ENDEREÇO</p>
        </div>

        <a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
          this.setState({
            ...this.state,
            isModalOpen: false
          })}} />
      </div>
    </div>
  )

  render() {
    return(
      <div className={this.props.className} style={this.props.style}>
        <form >
          <p className="alert-form-info" style={{ overflow: "hidden", display: "block" }}>* Todos os campos são de preenchimento obrigatório</p>
          {/* Destinatario */}
          <div className="form-group">
            <label className="control-label col-sm-4">Destinatário</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" disabled={this.isEnabledCheck()} maxLength={40} value={ this.state.destinatario.value ? this.state.destinatario.value : ""}
                onChange={e => {
                  this.validateField(e, "destinatario")
              }} />
            </div>
          </div>
          {/* Identificação */}
          {/* <div className="form-group">
            <label className="control-label col-sm-4">Identificação</label>
            <div className="col-sm-8">
              <input type="text" className="form-control"
                maxLength={40}
                value={this.state.identificacao.value ? this.state.identificacao.value : ""}
                onChange={ e => {
                  this.validateField(e, "identificacao")
                }}
                disabled={this.isEnabledCheck()}
              />
            </div>
          </div> */}
          {/* CEP */}
          <div className="form-group">
            <label className="control-label col-sm-4">CEP</label>
            <div className="col-sm-8">
              <MaskedInput mask={[/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]}
                type="text"
                className="form-control"
                value={this.state.cep.value ? this.state.cep.value : ""}
                onChange={e => this.validateField(e, "cep")}
                onBlur={e => this.props.getUserAddressWithZipRequest(this.state.cep.value.replace("-", ""))}
                disabled={this.isEnabledCheck()}
              />
            </div>
          </div>
          {/* Cidade */}
          <div className="form-group">
            <label className="control-label col-sm-4">Cidade</label>
            <div className="col-sm-8">
              <input type="text" disabled={true} placeholder="Digite seu CEP" className="form-control" maxLength={40} value={this.state.cidade.value !== null ? this.state.cidade.value : ""} />
            </div>
          </div>
          {/* Logradouro */}
          <div className="form-group">
            <label className="control-label col-sm-4">Logradouro</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" placeholder="Digite seu CEP" disabled={true}
                value={ this.state.logradouro.value !== null ? this.state.logradouro.value : "" }
                maxLength={40}
              />
            </div>
          </div>
          {/* Numero */}
          <div className="form-group">
            <label className="control-label col-sm-4">Número</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" maxLength={5}
                value={ this.state.numero.value ? this.state.numero.value : ""}
                onChange={e => {this.validateField(e, "numero")}}
                disabled={this.isEnabledCheck()}
              />
            </div>
          </div>
          {/* Complemento */}
          <div className="form-group">
            <label className="control-label col-sm-4">Complemento</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" maxLength={40}
              value={this.state.complemento.value ? this.state.complemento.value : ""}
              onChange={e => this.validateField(e, "complemento")}
              disabled={this.isEnabledCheck()}
            />
            </div>
          </div>
          {/* Bairro */}
          <div className="form-group">
            <label className="control-label col-sm-4">Bairro</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" maxLength={40}
              value={this.state.bairro.value ? this.state.bairro.value : ""}
              onChange={e => {this.validateField(e, "bairro")}}
              disabled={this.isEnabledCheck()}
            />
            </div>
          </div>
          {/* Telefone */}
          {!this.props.isEditing ?
            <div className="form-group">
              <label className="control-label col-sm-4">Telefone</label>
              <div className="col-sm-8">
                <MaskedInput mask={["(",/\d/, /\d/,")",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]}
                type="text"
                value={ this.state.phone.value }
                className="form-control"
                onChange={ e => this.validateField(e, "phone")}
                disabled={this.isEnabledCheck()}
              />
              </div>
            </div> : null
          }

          {/* Principal - Selector */}
          <div className="form-group">
  					<div className="col-sm-8 right padt20">
              <input id="box1" type="checkbox" disabled={this.props.isFromAccount ? true : false} checked={this.state.principal.value} onChange={this.handleCheckBox}/>
              <label htmlFor="box1">Marcar como endereço padrão?</label>
            </div>
				  </div>
          {/* botão */}
          <div className="col-sm-12 pad20">
						<button
              className="btn right"
              disabled={this.formHasError()}
              onClick={(e) => {
                e.preventDefault()
                this.onSubmitClick()
              }}> {(this.props.isEditing && this.props.isEditing === true) ? "Atualizar endereço" : "Adicionar endereço"}
            </button>
            {/* show error / success message */}
            <h3 className="alert-form-info" style={ this.props.isPosting === false ? { overflow: "hidden", display: "block", color: "#532D54" } : { overflow: "hidden", display: "none" }}>{this.postMessage()}</h3>
            <br />
            { this.props.showCancelButton ?
              <a className="syligo-topbar-cursor" id="address_add__cancel" onClick={() => {
                this.props.onClose()
              }}>Cancelar</a>
            :
              ""
            }
					</div>
        </form>
        { this.state.isModalOpen === true ? <ModalComponent> {this.zipCodeNotFoundModalTrial} </ModalComponent> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddressWithZip: state.login.userAddressWithZip,
    parceiroId: state.login.user.Parceiro.ID,
    accessToken: state.login.token.access_token,
    isPosting: state.userAddress.isPosting,
    postNewUserResponse: state.login.postNewUserResponse,
    postSuccess: state.userAddress.postSuccess,
    postError: state.userAddress.postError,
    userAddressWithZipNotFound: state.login.userAddressWithZipNotFound
  }
}

export default connect(mapStateToProps, {
  getUserAddressWithZipRequest,
  postUserAddressRequest,
  resetUserAddressForm,
  putUserAddressRequest,
  getUserAddress
})(AddressAddForm)
