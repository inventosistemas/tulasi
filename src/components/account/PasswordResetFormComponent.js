import * as React from 'react'
import { withRouter, Link } from 'react-router'
import { getPasswordResetValidateTokenRequest, putNewPasswordRequest } from "../../actions/loginActions"
import { connect } from 'react-redux'
import Breadcrumb from '../reusable/breadcrumbComponent.js'

class PasswordResetForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            errorMessage: null,
            successMessage: null,
            isTokenValid: false,
            newPassword: "",
            newPasswordConfirm: ""
        }
    }

    componentDidMount(){
        //1 need to get the ticket (token)
        //if there's no token, then go to /home
        //if there's a token, check if it's valid
        //if valid, renders the page
        console.log(this.props.location.query)
        
        const { ticket } = this.props.location.query

        if (ticket !== undefined) {
            console.log("ticket:", ticket)
            this.props.getPasswordResetValidateTokenRequest(ticket)  
        } else {
            this.props.router.push("/home")
        }
    }

    componentWillReceiveProps(nextProps) {
        //handles the token validation
        if (this.props.isGettingPasswordResetValidateToken === true && nextProps.isGettingPasswordResetValidateToken === false) {
            //at this point, finished the request
            if (nextProps.getPasswordResetValidateTokenSuccess === null) {
                //mostrar mensagem de erro
                this.setState( { ...this.state, errorMessage: "Erro ao checar token" })
            } else {
                if (nextProps.getPasswordResetValidateTokenSuccess === false ) {
                    //mostrar mensagem de que o token não é válido / expirado
                    this.setState( { ...this.state, errorMessage: "Token invalido/expirado." })
                } else {
                    //permitir que troque a senha
                    console.log("token ok, continue")
                    this.setState( { ...this.state, errorMessage: null, isTokenValid: true })
                }
            }
        }

        //handles the submission
        if (this.props.isPuttingNewPassword === true && nextProps.isPuttingNewPassword === false) {
            //request ended
            if (nextProps.putNewPasswordSuccess === null) {
                this.setState({errorMessage : "Erro no servidor ao cadastrar nova senha"})
            } else {
                if (nextProps.putNewPasswordSuccess !== null) {
                    if (nextProps.putNewPasswordSuccess === true) {
                        this.setState({
                            successMessage : "Senha alterada com sucesso",
                            newPassword: "",
                            newPasswordConfirm: ""
                        })
                    } else {
                        this.setState({errorMessage : "Erro no servidor ao cadastrar nova senha"})
                    }
                }
            }
        }
    }

    handlePassword = (e) => {
        this.setState({
            ...this.state,
            newPassword : e.target.value
        })
    }

    handlePasswordConfirm = (e) => {
        this.setState({
            ...this.state,
            newPasswordConfirm : e.target.value
        })
    }

    handleSubmit = () => {
        //cleans the error message:
        this.setState({
            ...this.state,
            errorMessage: null
        })

        //check if password > 6 chars
        if (this.state.newPassword.length < 6) {
            this.setState({
                ...this.state,
                errorMessage: "Senha deve ter mais de 6 caracteres"
            })
            return
        }

        //check if confirmPassword = newPassword
        if (this.state.newPasswordConfirm !== this.state.newPassword) {
            this.setState({
                ...this.state,
                errorMessage: "Confirmação de senha não confere"
            })
            return
        }
    
        //submit
        this.props.putNewPasswordRequest(this.props.location.query.ticket, this.state.newPassword)
    }

    render() {
        return (
            <div>
                <Breadcrumb pageTitle="Alterar senha" />
                <div className="container">
                    <div className="row">
                        <div className="main_content col-sm-12">
                            <div id="account_reset_form" className="account_section">
                                <h1 className="page_heading">Alterar senha</h1>
                                <p className="note">Digite uma nova senha</p>
                                <form onSubmit={ e => e.preventDefault()}>
                                    <div className="clearfix form-horizontal">
                                        <div className="form-group">
                                            <label className="large col-sm-4">Nova senha</label>
                                            <div className="col-sm-4">
                                                <input type="password" placeholder="Nova senha" disabled={this.state.isTokenValid === false} value={this.state.newPassword} onChange={e => this.handlePassword(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="large col-sm-4">Confirme a nova senha</label>
                                            <div className="col-sm-4">
                                                <input type="password" disabled={this.state.isTokenValid === false} placeholder="Nova senha" value={ this.state.newPasswordConfirm} onChange={ e=> this.handlePasswordConfirm(e) }/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-4 col-sm-offset-4">
                                                <button className="btn" disabled={this.state.isTokenValid === false || this.props.isPuttingNewPassword === true} onClick={() => this.handleSubmit()}>{this.props.isPuttingNewPassword === false ? "Alterar senha" : "Aguarde..."}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {this.state.errorMessage !== null ?
                                    <div className="row">
                                        <div className="alert alert-danger">
                                            <ul>
                                                <li>{this.state.errorMessage}</li>
                                            </ul>
                                        </div>
                                    </div>
                                :
                                    null
                                }
                                {this.state.successMessage !== null ? 
                                    <div className="row">
                                        <div className="alert alert-success">
                                            <ul>
                                                <li>{this.state.successMessage}. <Link to="/login">Fazer login</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                :
                                    null
                                }
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
        isGettingPasswordResetValidateToken: state.login.isGettingPasswordResetValidateToken,
        getPasswordResetValidateTokenSuccess: state.login.getPasswordResetValidateTokenSuccess,
        getPasswordResetValidateTokenError: state.login.getPasswordResetValidateTokenError,
        isPuttingNewPassword: state.login.isPuttingNewPassword,
        putNewPasswordSuccess: state.login.putNewPasswordSuccess,
        putNewPasswordError: state.login.putNewPasswordError
    }
}

export default withRouter(connect(mapStateToProps, {getPasswordResetValidateTokenRequest, putNewPasswordRequest})(PasswordResetForm))