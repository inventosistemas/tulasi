import * as actionTypes from './actionTypes';
import { get_data, post_data, put_data, apiUrl } from './requestHelper';
import axios from 'axios';

//action types
export const HANDLE_LOGIN_DIV_PRESENTATION = "HANDLE_LOGIN_DIV_PRESENTATION"
export const POST_NEW_USER = "POST_NEW_USER"
export const POST_NEW_USER_RESET_MESSAGES = "POST_NEW_USER_RESET_MESSAGES"
export const POST_NEW_USER_ERROR = "POST_NEW_USER_ERROR"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR"

//password action types
export const PUT_FORGOT_PASSWORD = "PUT_FORGOT_PASSWORD"
export const PUT_FORGOT_PASSWORD_SUCCESS = "PUT_FORGOT_PASSWORD_SUCCESS"
export const PUT_FORGOT_PASSWORD_ERROR = "PUT_FORGOT_PASSWORD_ERROR"
export const SHOW_FORGOT_PASSWORD_FORM = "SHOW_FORGOT_PASSWORD_FORM"
export const CLEAR_FORGOT_PASSWORD_STATE = "CLEAR_FORGOT_PASSWORD_STATE"
export const GET_PASSWORD_RESET_VALIDATE_TOKEN = "GET_PASSWORD_RESET_VALIDATE_TOKEN"
export const GET_PASSWORD_RESET_VALIDATE_TOKEN_SUCCESS = "GET_PASSWORD_RESET_VALIDATE_TOKEN_SUCCESS"
export const GET_PASSWORD_RESET_VALIDATE_TOKEN_ERROR = "GET_PASSWORD_RESET_VALIDATE_TOKEN_ERROR"
export const PUT_NEW_PASSWORD = "PUT_NEW_PASSWORD"
export const PUT_NEW_PASSWORD_SUCCESS = "PUT_NEW_PASSWORD_SUCCESS"
export const PUT_NEW_PASSWORD_ERROR = "PUT_NEW_PASSWORD_ERROR"

//USER address actions
export const GET_USER_ADDRESS_CEP = "GET_USER_ADDRESS_CEP"
export const GET_USER_ADDRESS_CEP_ERROR = "GET_USER_ADDRESS_CEP_ERROR"
export const GET_USER_ADDRESS_SUCCESS = "GET_USER_ADDRESS_SUCCESS"

export const SAVE_CUPOM = "SAVE_CUPOM"
export const DELETE_CUPOM = "DELETE_CUPOM"

//http://localhost:54797/v1/cadastro/18085005/obterlogradourocep



//action creators
//----> Password
export const showForgotPasswordForm = (showStatus) => {
  return {
    type: SHOW_FORGOT_PASSWORD_FORM,
    showStatus
  }
}

const putForgotPassword = (email) => {
  return {
    type: PUT_FORGOT_PASSWORD,
    email
  }
}

const putForgotPasswordSuccess = (email, response) => {
  return {
    type: PUT_FORGOT_PASSWORD_SUCCESS,
    email,
    response
  }
}

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR
  }
}

const putForgotPasswordError = (email, error) => {
  return {
    type: PUT_FORGOT_PASSWORD_ERROR,
    email,
    error
  }
}

export const putForgotPasswordRequest = (email) => {
  return dispatch => {
    dispatch(putForgotPassword(email))

    //prepare the request
    const request = axios.put(`${apiUrl}/login/${email}/recuperarsenha`)

    return request
    .then(response => {
      //console.log("forgot password")
      //console.log(response)

      dispatch(putForgotPasswordSuccess(email, response))
    })
    .catch(error => {
      dispatch(putForgotPasswordError(email, error))
    })
  }
}

export const clearForgotPasswordState = () => {
  return {
    type: CLEAR_FORGOT_PASSWORD_STATE
  }
}

export const changePasswordSuccess = (user) => {
  return {
    type: actionTypes.RECOVER_PASSWORD_IS_EMAIL_VALID,
    user
  }
}

export const changePassword  = (newPassword, tokenId) => {
  return (dispatch) => {
    put_data(`login/alterarsenha`)
      .then(response => {
        dispatch(changePasswordSuccess(response.data,))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const recoverPasswordWithTokenSuccess = (isRecoverEmailValid) => {
  return {
    type: actionTypes.RECOVER_PASSWORD_IS_EMAIL_VALID,
    isRecoverEmailValid
  }
}

export const saveUser = (user) => {
  return {
    type: actionTypes.SAVE_USER,
    user
  }
}

export const recoverPasswordWithToken = (token) => {
  return (dispatch) => {
    get_data(`login/${-1}/{tokenId}/validartoken`)
      .then(response => {
        dispatch(saveUser(response.data, token))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const recoverPasswordIsEmailValidSuccess = (isRecoverEmailValid) => {
  return {
    type: actionTypes.RECOVER_PASSWORD_IS_EMAIL_VALID,
    isRecoverEmailValid
  }
}

export const fetchTokenSuccess = (token) => {
  return {
    type: actionTypes.SAVE_TOKEN,
    token,
  }
}

export const login = () => {
  return (dispatch) => {
    get_data('/login')
      .then(response => {
        dispatch(saveUser(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const getLogin = (token, cartId) => {
    const instance = axios.create({
      headers: {
        'Authorization' : `bearer ${token}`
      }
    })
    if (cartId) {
      return instance.get(`${apiUrl}/login/${cartId}`);
    }
    return instance.get(`${apiUrl}/login`)
}

export const postToken = (username, password, CarrinhoID = null, LoginID = null) => {
  return dispatch => {
    post_data('/Token', null, username, password)
    .then(response => {
      //console.log("post Token Response")
      return response.json()
    }).then(json => {
      //1 gets the token... or the error
      ////console.log('parsed json', json);
      if (json.error_description) {
         throw new Error(`Token error: ${json.error_description}`)
      }

      //at this point, no error and continue the login process
      dispatch(fetchTokenSuccess(json));
      return json.access_token
    }).then( jsonAccessToken => {
      //console.log("bloco para linkar carrinho promessado")

      if (CarrinhoID !== null && LoginID !== null) {
        // console.log(`link needed cart ${CarrinhoID} userId: ${LoginID}`)

        let requestBody = {
          CarrinhoID,
          LoginID
        }

        const instance = axios.create({
          "Content-Type" : "application/json"
        })

        const request = instance.put(`${apiUrl}/carrinho/adicionarlogin`, requestBody)
        return request.then( response => {
          //console.log(`putlink response`)
          //console.log(response.data)
          return getLogin(jsonAccessToken);
        })
      } else {
        // console.log('no link needed')
        return getLogin(jsonAccessToken, CarrinhoID);
      }
    }).then(({ data }) => {
      //2- gets the user info and saves
      //console.log("response login")
      dispatch(saveUser(data))
    }).catch(error => {
      //console.log('postToken failed')
      //console.log(error)

      if (error.data) {
        //error came from login
        dispatch({
          type: LOGIN_ERROR,
          payload: `Login error: ${error.data.Mensagem}`
        })
      } else {
        //error came from token
        dispatch({
          type: LOGIN_ERROR,
          payload: error.message
        })
      }
    })
  }
}

export const recoverPasswordIsEmailValid = (email) => {
  return (dispatch) => {
    put_data(`login/${email}/recuperarsenha`)
      .then(response => {
        dispatch(recoverPasswordIsEmailValidSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const handleLoginDivPresentation = (divPresenting) => {
  return {
    type: HANDLE_LOGIN_DIV_PRESENTATION,
    divPresenting: divPresenting
  }
}

export const postNewUserRequest = (user, shoppingCartId = null) => {
  const instance = axios.create({
    headers: {
        'Content-Type' : 'application/json'
    }
  })

  const request = instance.post(`${apiUrl}/cadastroparte1`, user)
  return dispatch => request
  .then(response => {
    //console.log("dispathcou")

    dispatch({
        type: POST_NEW_USER,
        payload: response.data
    })
    dispatch(postToken(user.Email, user.Senha, shoppingCartId, response.data.LoginID));
  })
  .catch(error => {
    //console.log("erro posting new user")
    //console.log(error)
    dispatch({
      type: POST_NEW_USER_ERROR,
      payload: error
    })
  })
}

export const postNewUserResetMessages = () => {
  return {
    type: POST_NEW_USER_RESET_MESSAGES
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

//USER address
const getUserAddressWithZipSuccess = (response) => {
  return {
    type: GET_USER_ADDRESS_SUCCESS,
    payload: response
  }
}

const getUserAddressWithZipError = (error) => {
  return {
    type: GET_USER_ADDRESS_CEP_ERROR,
    error
  }
}

const getUserAddressWithZip = (response) => {
  return {
    type: GET_USER_ADDRESS_CEP,
    payload: response
  }
}

export const getUserAddressWithZipRequest = (cep) => {
  //console.log("get cep:" + cep)

  //http://localhost:54797/v1/cadastro/18085005/obterlogradourocep
  const instance = axios.create({
    headers: {
      "Content-Type": 'application/json'
    }
  })

  const request = instance.get(`${apiUrl}/cadastro/${cep}/obterlogradourocep`)

  return dispatch => {
    dispatch(getUserAddressWithZip())

    return request
    .then( response => {
      //console.log("get cep:")
      //console.log(response)

      if (response.data === null) {
        throw new Error("CEP não encontrado")
      }
      //console.log('errr', response.data);

      dispatch(getUserAddressWithZipSuccess(response.data))

    })
    .catch( error => {
      //console.log("errinho")
      //console.log(error)
      dispatch(getUserAddressWithZipError())
    })
  }
}

export const loginFromCheckout = (isFromCheckout) => {
  return {
    type: actionTypes.LOGIN_FROM_CHECKOUT,
    isFromCheckout
  }
}

const getPasswordResetValidateToken = () => {
    return {
        type: GET_PASSWORD_RESET_VALIDATE_TOKEN
    }
}

const getPasswordResetValidateTokenSuccess = (payload) => {
    return {
        type: GET_PASSWORD_RESET_VALIDATE_TOKEN_SUCCESS,
        payload
    }
}

const getPasswordResetValidateTokenError = (error) => {
    return {
        type: GET_PASSWORD_RESET_VALIDATE_TOKEN_ERROR,
        error
    }
}

export const getPasswordResetValidateTokenRequest = (token) => {
    const request = axios.get(`${apiUrl}/login/-1/${token}/validartoken`)

    return dispatch => {
        dispatch(getPasswordResetValidateToken())

        return request
        .then(response => {
            console.log("response:", response.data)
            dispatch(getPasswordResetValidateTokenSuccess(response.data))
        })
        .catch(error => {
            dispatch(getPasswordResetValidateTokenError(error))
            return false
        })
    }
}

const putNewPassword = () => {
    return {
        type: PUT_NEW_PASSWORD
    }
}

const putNewPasswordSuccess = (response) => {
    return {
        type: PUT_NEW_PASSWORD_SUCCESS,
        response
    }
}

const putNewPasswordError = (error) => {
    return {
        type: PUT_NEW_PASSWORD_ERROR,
        error
    }
}

export const putNewPasswordRequest = (TokenID, NovaSenha) => {
    const instance = axios.create({
        "Content-Type" : "application/json"
    })

    const request = instance.put(`${apiUrl}/login/alterarsenha`, {
        LoginID: -1,
        TokenID,
        NovaSenha
    })

    return dispatch => {
        dispatch(putNewPassword())

        return request
        .then(response => {
            dispatch(putNewPasswordSuccess(response.data))
        })
        .catch(error => {
            dispatch(putNewPasswordError(error))
        })
    }
}

export const saveCupom = cupom => ({ type: SAVE_CUPOM, cupom})

export const deletePersistedCupom = cupom => ({ type: DELETE_CUPOM })
