import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Breadcrumb from '../../components/reusable/breadcrumbComponent'
import { logoutUser } from '../../actions/loginActions'
import { getUserAddress } from '../../actions/userAddressActions'
import { getOrdersRequest } from '../../actions/ordersActions'
import AddressAddFormModalComponent from '../../components/account/AddressAddFormModalComponent';
import { clearShoppingCartServer } from '../../actions/shoppingCartActions'
import MyOrdersLog from './components/MyOrdersLog'

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  componentWillMount() {
    //console.log("wm /conta")
    if (this.props.user !== null) {
      this.props.getUserAddress(this.props.user.Parceiro.ID);
      this.props.getOrdersRequest(this.props.user.Parceiro.ID);
    } else {
      this.props.router.push('/login')
      return
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultUserAddress) {
      if (nextProps.defaultUserAddress !== this.props.defaultUserAddress ) {
        // eslint-disable-next-line
        if (nextProps.defaultUserAddress.Identificacao == "<FALTA INFORMAR>") {
          this.setState({ isModalOpen: true })
        }
        // eslint-disable-next-line
        if (nextProps.defaultUserAddress.Identificacao != "<FALTA INFORMAR>") {
          //at this point, received a new address, need to close the modal and then push accordingly
          //console.log("added default address")
          //console.log(this.props.router)

          if (this.props.router.location.state && this.props.router.location.state.isFromShoppingCart === true) {
            this.props.router.push("/carrinho")
          } else {
            this.setState({ isModalOpen: false })
          }
        }
      }
    }
  }

  closeModal = () => {
    this.setState({ isModalOpen : false, showSummaryModal: false, showLoginComponent: false})
  }

  //render
  render() {
    if (this.props.user === null) {
      return null
    }

    ////console.log(this.props.orders);
    const { Parceiro } = this.props.user

    if (this.props.children) {
      //console.log("tem children")
      //console.log(this.props.children)
      return this.props.children
    }

    return (
      <div>
        <Breadcrumb pageTitle="Minha conta" />

        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-12">
                <div className="account_area">
                  <div className="account_welcome">

                    <h2 className="page_heading"><span className="tulasi-user iconconta"></span>Minha conta <a className="link_logout syligo-topbar-cursor" onClick={ () => {
                      this.props.logoutUser();
                      this.props.clearShoppingCartServer();
                      this.props.router.push("/");
                    }}>Logout</a></h2>
                    <h3 className="account_welcome__name">Olá, {Parceiro.RazaoSocial}</h3>
                    <p className="account_welcome__desc">Na página "Minha conta" você pode ter uma visão geral das atividades em sua conta e atualizar suas informações.<br/>Escolha um link abaixo para visualizar ou editar suas informações.</p>
                  </div>
                  <div className="account_wrapper">
                    <div className="account_left">
                      <div className="account_section account_info">
                        <h4>Informações da conta</h4>
                        <table className="account_table table_info">
                          <tbody>
                            <tr>
                              <td>Nome</td>
                              <td>{Parceiro.RazaoSocial}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{Parceiro.Email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="account_right">
                      <div className="account_section account_default">
                        <h4>Endereço padrão
                          <span>
                            <Link className="link_edit" to="/conta/enderecos" style={{"color": "#00a5d3"}}>Editar</Link>
                          </span>
                        </h4>
                        <span className="note">
                          { (this.props.defaultUserAddress === null)  ?
                            "Você ainda não adicionou seu endereço padrão"
                             :
                             <div>
                               <p className="address_item address_location">{this.props.defaultUserAddress.Logradouro}, {this.props.defaultUserAddress.Numero} {this.props.defaultUserAddress.Complemento}, {this.props.defaultUserAddress.Cidade.Nome}, {this.props.defaultUserAddress.Cidade.Estado.Sigla}, Brasil, {this.props.defaultUserAddress.CEP}</p>
                               <p className="address_item address_phone">{this.props.defaultUserAddress.Telefone ? this.props.defaultUserAddress.Telefone : "Sem telefone"}</p>
                             </div>
                          }
                        </span>
                        <p className="address_all">
                          <Link to="/conta/enderecos" style={{"color": "#00a5d3"}}>{`Gerenciar endereços (${this.props.userAddresses ? this.props.userAddresses.length : 0})`}</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*Aqui começa o histórico:*/}
                  <MyOrdersLog orders={this.props.orders} onViewDetails={() => console.log("view details")} />
                  <AddressAddFormModalComponent
                    isOpen={this.state.isModalOpen}
                    onClose={() => this.closeModal()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    userAddresses: state.userAddress.userAddresses,
    defaultUserAddress: state.userAddress.defaultUserAddress,
    orders: state.orders.allOrders
  }
}
//Ao invés de usar mapDispatchToProps, passa as actions diretamente em um objeto de actions
export default connect(mapStateToProps, {
  getOrdersRequest,
  logoutUser ,
  getUserAddress,
  clearShoppingCartServer
} )(MyAccount)
