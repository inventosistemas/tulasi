import React, { Component } from 'react'
import Breadcrumb from '../reusable/breadcrumbComponent'
import { Link } from  'react-router'
import { connect } from 'react-redux'
import { deleteUserAddressRequest, getUserAddress } from '../../actions/userAddressActions'
import AddressAddForm from './AddressAddFormComponent'

class AddressesView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showAddAddressForm: false,
      showEditAddressForm: false,
      editingUserAddress: null
    }
  }

  componentWillMount(){
    this.props.getUserAddress(this.props.user.Parceiro.ID)
  }

  componentWillReceiveProps(nextProps){
    if ((this.props.isDeleting !== nextProps.isDeleting) && nextProps.isDeleting === false) {
      //refresh addresses
      this.props.getUserAddress(this.props.user.Parceiro.ID)
    }
  }

  onClose = () => {
    this.setState({
      ...this.state,
      showAddAddressForm: false,
      showEditAddressForm: false,
      editingUserAddress: null
    })
  }

  render() {
    return(
      <div>
        <Breadcrumb pageTitle="Minha conta"/>
        <div role="main" id="main">
          <div className="container">
            <div className="row">
              <div className="main_content col-sm-12">
                <div className="account_area">
                  <h2 className="page_heading">
                    Meus endereços
                    <Link to="/conta">Voltar a minha conta</Link>
                  </h2>
                  <div className="account_section account_address__add">
                    <h4>
                      Novo endereço
                      <span>
                        <a id="address_add__link" className="link_add syligo-topbar-cursor" style={ this.state.showAddAddressForm === true ? {display: 'none'} : {display: 'inline', color: "#00a5d3"}}
                          onClick={() => this.setState(
                            {
                              ...this.state,
                              showAddAddressForm: true,
                              showEditAddressForm: false
                            }
                          )}>Adicionar novo endereço</a>
                        <a id="address_add__close" className="link_close syligo-topbar-cursor" style={ this.state.showAddAddressForm === true ? {display: 'inline'} : {display: 'none'}} onClick={() => this.setState({...this.state, showAddAddressForm: false })}>Fechar</a>
                      </span>
                    </h4>
                    <div className="clearfix"></div>
                    {/* show AdressAdd new? */}
                    {this.state.showAddAddressForm === true ?
                      <AddressAddForm showCancelButton={true}
                        className="form form-horizontal"
                        style={ { display: "block", overflow: "hidden" } }
                        onClose={ () => this.onClose() }
                      />
                    :
                      null
                    }
                  {/* addresses list */}
                  </div>
                  { this.props.userAddresses.length === 0 ? null : this.props.userAddresses.map(userAddress => {
                      return (
                        <div className="account_section account_address__item" key={userAddress.ID}>
                          <h4>{userAddress.Destinatario} {userAddress.Tipo === 0 ? " (Endereço padrão)" : ""}
                            <span>
                              <a className="link_edit syligo-topbar-cursor"
                                style={ (this.state.showEditAddressForm === true && this.state.editingUserAddress.ID === userAddress.ID) ? {display: 'none'} : {display: 'inline', color: "#00a5d3"} }
                                onClick={() =>
                                  this.setState({
                                    ...this.state,
                                    showAddAddressForm: false,
                                    showEditAddressForm: true,
                                    editingUserAddress: userAddress
                                  })
                                }>Editar</a>
                              <a className="link_close syligo-topbar-cursor"
                                onClick={() =>
                                  this.setState({
                                    ...this.state,
                                    showEditAddressForm: false,
                                    editingUserAddress: null
                                  })
                                }
                                style={ (this.state.showEditAddressForm === true && this.state.editingUserAddress.ID === userAddress.ID) ? {display: 'inline'} : {display: 'none'}
                              }>Fechar</a>
                              {this.props.userAddresses.length > 1 ?
                                <a className="link_delete" href="#" onClick={() => {
                                  this.props.deleteUserAddressRequest(userAddress.ID);
                                }}>Remover</a> : null }

                            </span>
                          </h4>
                          <p className="address_item address_location">{userAddress.Logradouro}, {userAddress.Numero} {userAddress.Complemento}, {userAddress.Cidade.Nome}, {userAddress.Cidade.Estado.Sigla}, Brasil, {userAddress.CEP}</p>
                          <p className="address_item address_phone">{userAddress.Telefone ? userAddress.Telefone : "Sem telefone"}</p>
                          { (this.state.showEditAddressForm === true && this.state.editingUserAddress.ID === userAddress.ID) ?
                            <AddressAddForm
                              showCancelButton={true}
                              className="account_address__edit form-horizontal"
                              style={ { display: "block", overflow: "hidden" } }
                              userAddress={userAddress}
                              isEditing={true}
                              onClose={ () => this.onClose()}
                            />
                           : ""}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddresses: state.userAddress.userAddresses,
    deleteSuccess: state.userAddress.deleteSuccess,
    isDeleting: state.userAddress.isDeleting,
    user: state.login.user
  }
}

export default connect(mapStateToProps, {
  getUserAddress,
  deleteUserAddressRequest,
})(AddressesView)
