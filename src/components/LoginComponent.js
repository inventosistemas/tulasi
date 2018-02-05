import React, { Component } from 'react';
import { connect } from 'react-redux';
import Breadcrumb from "./reusable/breadcrumbComponent";
import { showForgotPasswordForm } from '../actions/loginActions';
import Signup from './account/SignupComponent';
import LoginForm from './account/LoginFormComponent';
import ResetPasswordForm from './account/ResetPasswordFormComponent'
import { ShoppingCartSteps } from './shoppingCart/ShoppingCartSteps'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPresentingCreateAccount: false,
      isPresentingMainDiv: true
    }
  }

  showStyle = (condition) => {
    if (condition === true) {
      return { display: 'block', overflow: 'hidden' }
    } else {
      return { display: 'none', overflow: 'hidden' }
    }
  }

  componentWillMount() {
    //if there's a current user, then goes to account
    if (this.props.user) {
        this.props.router.push("/conta")
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    //if received a user, login or signup, need to handle
    if (nextProps.user !== null) {
      ////console.log("login component, recebeu user")
      if (this.props.router.location.state && this.props.router.location.state.isFromShoppingCart)
        this.props.router.push({
          pathname: "/conta",
          state: {
            isFromShoppingCart: this.props.router.location.state.isFromShoppingCart
          }
        })
      else {
        this.props.router.push("/conta")
      }
    }
  }

  render() {
    ////console.log("render login")

    return (
      <div>
        <Breadcrumb pageTitle={'Login'} />
        {/* Main stuff */}
        <div id="main" role="main">
        <div className="container carrinho">
          <div className="row">
            <div className="main_content col-sm-12">
              <h1 className="page_heading">Fazer login ou criar uma conta</h1>
              {/* conditional div for cart */}
              {this.props.router.location.state && this.props.router.location.state.isFromShoppingCart ? <ShoppingCartSteps step={1} /> : null}

              {/* main div */}
              {this.state.isPresentingMainDiv === true ?
                <div id="account_login" style={{display: 'block', overflow: 'hidden'}}>
                  <div className="account_wrapper">
                    <div className="account_left">
                      <div className="account_section">
                        <h4>Novo aqui?</h4>
                        <p className="note">Registrar-se é gratuito e fácil!</p>
                        <ul>
                          <li>Compra mais rápida</li>
                          <li>Salve vários endereços de envio</li>
                          <li>Veja e acompanhe seus pedidos</li>
                        </ul>
                        <button id="account_register__link" className="btn" onClick={ () => {
                          this.setState({
                            ...this.state,
                            isPresentingCreateAccount: true,
                            isPresentingMainDiv: false
                          });
                        }}>Criar uma conta</button>
                      </div>
                    </div>
                    <div className="account_right">
                      <LoginForm />
                    </div>
                  </div>
                </div>
              :
                null
              }

              {/* signup div */}
              {this.state.isPresentingCreateAccount === true ? <Signup onClose={ () => {
                this.setState({
                  ...this.state,
                  isPresentingCreateAccount: false,
                  isPresentingMainDiv: true
                })
              }} /> : null }

              {/* forgot password div */}
              <ResetPasswordForm style={this.showStyle(this.props.isPresentingResetPassword)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      isPresentingResetPassword: state.login.isPresentingResetPassword,
      user: state.login.user,
    }
};

export default connect(mapStateToProps, { showForgotPasswordForm })(Login);
