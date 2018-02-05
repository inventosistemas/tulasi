import * as actionTypes from '../actions/actionTypes';
import {
  HANDLE_LOGIN_DIV_PRESENTATION,
  POST_NEW_USER,
  POST_NEW_USER_RESET_MESSAGES,
  POST_NEW_USER_ERROR,
  LOGIN_ERROR,
  LOGOUT_USER,
  GET_USER_ADDRESS_CEP,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_CEP_ERROR,
  CLEAR_LOGIN_ERROR,
  SHOW_FORGOT_PASSWORD_FORM,
  PUT_FORGOT_PASSWORD,
  PUT_FORGOT_PASSWORD_SUCCESS,
  PUT_FORGOT_PASSWORD_ERROR,
  CLEAR_FORGOT_PASSWORD_STATE,
  GET_PASSWORD_RESET_VALIDATE_TOKEN,
  GET_PASSWORD_RESET_VALIDATE_TOKEN_SUCCESS,
  GET_PASSWORD_RESET_VALIDATE_TOKEN_ERROR,
  PUT_NEW_PASSWORD,
  PUT_NEW_PASSWORD_SUCCESS,
  PUT_NEW_PASSWORD_ERROR,
  SAVE_CUPOM,
  DELETE_CUPOM
} from '../actions/loginActions'

export const LOGIN_STATE = {
  user: null,
  token: null,
  isPresentingResetPassword: false,
  postNewUserFailureMessage: null,
  postNewUserSuccessMessage: null,
  postNewUserResponse: null,
  loginFailureMessage: null,
  loginResponse: null,
  userAddressWithZip: null,
  //forgot password
  putForgotPasswordRequesting: false,
  putForgotPasswordSuccessResponse: null,
  putForgotPasswordErrorResponse: null,
  userAddressWithZipNotFound: false,
  isGettingPasswordResetValidateToken: false,
  getPasswordResetValidateTokenSuccess: null,
  getPasswordResetValidateTokenError: null,
  isPuttingNewPassword: false,
  putNewPasswordSuccess: null,
  putNewPasswordError: null,
  // extra
  cupom: null
 }

export const login = (state = LOGIN_STATE, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...state,
        user: action.user,
      }
    case actionTypes.SAVE_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case HANDLE_LOGIN_DIV_PRESENTATION:
      let newPresentation = {
        isPresentingResetPassword: false
      }
      newPresentation[action.divPresenting] = true
      return { ...state, ...newPresentation }
    case POST_NEW_USER:
      if (action.payload.Erro === true) {
        return {
          ...state,
          postNewUserResponse: { ...action.payload },
          postNewUserFailureMessage: action.payload.Mensagem,
          postNewUserSuccessMessage: null}
      } else {
        return {
          ...state,
          postNewUserResponse: { ...action.payload },
          postNewUserFailureMessage: null,
          postNewUserSuccessMessage: action.payload.Mensagem}
      }
    case POST_NEW_USER_RESET_MESSAGES:
      return {
        ...state,
        postNewUserResponse: null,
        postNewUserFailureMessage: null,
        postNewUserSuccessMessage: null
      }
    case POST_NEW_USER_ERROR:
      //console.log({ ...state})
      return {
        ...state,
        postNewUserFailureMessage: 'Erro ao cadastrar novo usuário.',
        postNewUserSuccessMessage: null,
        postNewUserResponse: { ...action.payload }
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginFailureMessage: action.payload,
        loginResponse: null
      }
    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        user: null
      }
    case GET_USER_ADDRESS_CEP:
      return {
        ...state,
        userAddressWithZip: null,
        userAddressWithZipError: null,
        userAddressWithZipNotFound: false
      }
    case GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        userAddressWithZip: action.payload,
        userAddressWithZipError: null,
        userAddressWithZipNotFound: false
      }
    case GET_USER_ADDRESS_CEP_ERROR:
      return {
        ...state,
        userAddressWithZip: null,
        userAddressWithZipError: action.payload,
        userAddressWithZipNotFound: true
      }
    case actionTypes.LOGIN_FROM_CHECKOUT:
      return {
        ...state,
        fromCheckout: action.isFromCheckout,
      }
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginFailureMessage: null
      }
    case SHOW_FORGOT_PASSWORD_FORM:
      return {
        ...state,
        isPresentingResetPassword: action.showStatus
      }
    case PUT_FORGOT_PASSWORD:
      return {
        ...state,
        putForgotPasswordRequesting: true,
        putForgotPasswordSuccessResponse: null,
        putForgotPasswordErrorResponse: null
      }
    case PUT_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        putForgotPasswordRequesting: false,
        putForgotPasswordSuccessResponse: action.response,
        putForgotPasswordErrorResponse: null
      }
    case PUT_FORGOT_PASSWORD_ERROR:
      return {
          ...state,
        putForgotPasswordRequesting: false,
        putForgotPasswordSuccessResponse: null,
        putForgotPasswordErrorResponse: action.error
      }
    case CLEAR_FORGOT_PASSWORD_STATE:
      return {
        ...state,
        putForgotPasswordRequesting: false,
        putForgotPasswordSuccessResponse: null,
        putForgotPasswordErrorResponse: null
      }
    case GET_PASSWORD_RESET_VALIDATE_TOKEN:
        return {
            ...state,
            isGettingPasswordResetValidateToken: true,
            getPasswordResetValidateTokenSuccess: null,
            getPasswordResetValidateTokenError: null
        }
    case GET_PASSWORD_RESET_VALIDATE_TOKEN_SUCCESS:
        return {
            ...state,
            isGettingPasswordResetValidateToken: false,
            getPasswordResetValidateTokenSuccess: action.payload,
            getPasswordResetValidateTokenError: null
        }
    case GET_PASSWORD_RESET_VALIDATE_TOKEN_ERROR:
        return {
            ...state,
            isGettingPasswordResetValidateToken: false,
            getPasswordResetValidateTokenSuccess: null,
            getPasswordResetValidateTokenError: action.error
        }
    case PUT_NEW_PASSWORD:
        return {
            ...state,
            isPuttingNewPassword: true,
            putNewPasswordError: null,
            putNewPasswordSuccess: null
        }
    case PUT_NEW_PASSWORD_ERROR:
        return {
            ...state,
            isPuttingNewPassword: false,
            putNewPasswordError: action.error,
            putNewPasswordSuccess: null
        }
    case PUT_NEW_PASSWORD_SUCCESS:
        return {
            ...state,
            isPuttingNewPassword: false,
            putNewPasswordError: null,
            putNewPasswordSuccess: action.response
        }
    case SAVE_CUPOM:
      return {
        ...state,
        cupom: action.cupom
      }
    case DELETE_CUPOM:
      return {
        ...state,
        cupom: null
      }
    default:
      return state;
  }
};
