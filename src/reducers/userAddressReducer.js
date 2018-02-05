import {
  GET_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_ERROR,
  PUT_USER_ADDRESS,
  PUT_USER_ADDRESS_ERROR,
  PUT_USER_ADDRESS_SUCCESS,
  POST_USER_ADDRESS,
  POST_USER_ADDRESS_ERROR,
  POST_USER_ADDRESS_SUCCESS,
  RESET_USER_ADDRESS_FORM
} from '../actions/userAddressActions'

const USER_ADDRESS_STATE = {
  userAddresses : [],
  defaultUserAddress: null,
  userAddressIdToDelete: null,
  isDeleting: false,
  deleteSuccess: null,
  deleteError: null,
  isPosting: null,
  postError: null,
  postSuccess: null,
}

export const userAddress = (state = USER_ADDRESS_STATE, action) => {
  switch(action.type) {
    case GET_USER_ADDRESS:

      if(action.payload === undefined || action.payload.Enderecos === undefined || action.payload.Enderecos === null) {
        //console.log('no address to get');
        return {
          ...state,
          userAddresses: [],
          defaultUserAddress: null
        }
      }

      //get the default address
      let defaultUserAddress = null
      // eslint-disable-next-line
      action.payload.Enderecos.map(userAddress => {
        if (userAddress.Tipo === 0) {
          defaultUserAddress = userAddress;
        }
      })

      return {
        ...state,
        userAddresses: action.payload.Enderecos,
        defaultUserAddress: defaultUserAddress
      }
    case DELETE_USER_ADDRESS:
      return {
        ...state,
        isDeleting: true,
        userAddressIdToDelete: action.userAddressIdToDelete
      }
    case DELETE_USER_ADDRESS_SUCCESS:
      //console.log("deleteuseraddress reducer")
      return {
        ...state,
        isDeleting: false,
        deleteSuccess: action.payload,
        deleteError: null
      }
    case DELETE_USER_ADDRESS_ERROR:
      return {
        ...state,
        isDeleting: false,
        deleteSuccess: null,
        deleteError: action.error
      }
      case PUT_USER_ADDRESS:
        return {
          ...state,
          isPutting: true,
          userAddressIdToPut: action.userAddressIdToPut
        }
      case PUT_USER_ADDRESS_SUCCESS:
        ////console.log("put reducer")
        return {
          ...state,
          isPutting: false,
          putSuccess: action.payload,
          putError: null
        }
      case PUT_USER_ADDRESS_ERROR:
        return {
          ...state,
          isPutting: false,
          putSuccess: null,
          putError: action.error
        }
      case POST_USER_ADDRESS:
        return {
          ...state,
          isPosting: true
        }
      case POST_USER_ADDRESS_ERROR:
        return {
          ...state,
          postSuccess: null,
          postError: action.error,
          isPosting: false
        }
      case POST_USER_ADDRESS_SUCCESS:
        return {
          ...state,
          postSuccess: action.success,
          postError: null,
          isPosting: false
        }
      case RESET_USER_ADDRESS_FORM:
        return {
          ...state,
          userAddressWithZip: null,
          isPosting: null,
          postError: null,
          postSuccess: null
        }
    default:
      return { ...state }
  }
}
