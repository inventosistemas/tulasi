import axios from 'axios'
import { apiUrl } from "./requestHelper"

//action types
export const RESET_USER_ADDRESS_FORM = "RESET_USER_ADDRESS_FORM"

export const DELETE_USER_ADDRESS = "DELETE_USER_ADDRESS"
export const DELETE_USER_ADDRESS_SUCCESS = "DELETE_USER_ADDRESS_SUCCESS"
export const DELETE_USER_ADDRESS_ERROR = "ERROR"

export const GET_USER_ADDRESS = "GET_USER_ADDRESS"
export const GET_USER_ADDRESS_ERROR = "GET_USER_ADDRESS_ERROR"

export const POST_USER_ADDRESS = "POST_USER_ADDRESS"
export const POST_USER_ADDRESS_SUCCESS = "POST_USER_ADDRESS_SUCCESS"
export const POST_USER_ADDRESS_ERROR = "POST_USER_ADDRESS_ERROR"

export const PUT_USER_ADDRESS = "PUT_USER_ADDRESS"
export const PUT_USER_ADDRESS_SUCCESS = "PUT_USER_ADDRESS_SUCCESS"
export const PUT_USER_ADDRESS_ERROR = "PUT_USER_ADDRESS_ERROR"

//get logic
export const getUserAddress = (user) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/cadastro/${user}/obterenderecos`)

  return dispatch => request
  .then( response => {
    //console.log("get endereço")
    //console.log(response)
    dispatch({
      type: GET_USER_ADDRESS,
      payload: response.data
    })
  })
  .catch( error => {
    dispatch({
      type: GET_USER_ADDRESS_ERROR,
      payload: error
    })
  })
}

//delete logic
export const deleteUserAddress = (userAddressIdToDelete) => {
  return {
    type: DELETE_USER_ADDRESS,
    userAddressIdToDelete
  }
}

export const deleteUserAddressSuccess = (userAddressId, payload) => {
  return {
    type: DELETE_USER_ADDRESS_SUCCESS,
    payload
  }
}

export const deleteUserAddressError = (userAddressId, error) => {
  return {
    type: DELETE_USER_ADDRESS_ERROR,
    error
  }
}

export const deleteUserAddressRequest = (userAddressId) => {
//http://tulasi.yaapbrasil.com.br:8092/v1/cadastro/55169/deletarendereco

  //console.log("deleteUserAddress")

  const request = axios.delete(`${apiUrl}/cadastro/${userAddressId}/deletarendereco`)

  return function(dispatch) {

    dispatch(deleteUserAddress(userAddressId));

    return request
    .then(response => {
      //console.log(response)
      dispatch(deleteUserAddressSuccess(userAddressId, response))
    })
    .catch(error => {
      //console.log(error)
      dispatch(deleteUserAddressError(userAddressId, error))
    })
  }
}

const putUserAddress = (userAddressIdToPut) => {
  return {
    type: PUT_USER_ADDRESS,
    userAddressIdToPut
  }
}

const putUserAddressSuccess = (userAddressId, payload) => {
  return {
    type: PUT_USER_ADDRESS_SUCCESS,
    payload
  }
}

const putUserAddressError = (userAddressId, error) => {
  return {
    type: PUT_USER_ADDRESS_ERROR,
    error
  }
}

export const putUserAddressRequest = (userAddressIdToPut) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.put(`${apiUrl}/cadastro/${userAddressIdToPut}/marcarenderercopadrao`)

  return dispatch => {
    dispatch(putUserAddress(userAddressIdToPut))

    return request
    .then(response => {
      //console.log(response)
      dispatch(putUserAddressSuccess(userAddressIdToPut, response))
    })
    .catch(error => {
      //console.log(error)
      dispatch(putUserAddressError(userAddressIdToPut, error))
    })
  }
}

const postUserAddress = (address, token) => {
  return {
    type: POST_USER_ADDRESS,
    address,
    token
  }
}

// const postUserAddressSuccess = (response) => {
//   return {
//     type: POST_USER_ADDRESS_SUCCESS,
//     response
//   }
// }

const postUserAddressError = (error) => {
  return {
    type: POST_USER_ADDRESS_ERROR,
    error
  }
}

export const postUserAddressRequest = (address, token) => {
  //console.log("post")
  //console.log(address)

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `bearer ${token}`
    }
  })

  const request = instance.post(`${apiUrl}/cadastro/adicionarendereco`, address)

  return dispatch => {

    dispatch(postUserAddress(address,token)) //need to set isPosting on reducer

    return request
    .then( response => {
      //console.log("post endereço")
      //console.log(response)
      dispatch({
        type: POST_USER_ADDRESS_SUCCESS,
        success: response.data
      })
    })
    .catch( error => {
      //console.log("error")
      //console.log(error)
      dispatch(postUserAddressError(error))
    })
  }
}

export const resetUserAddressForm = () => {
  return {
    type: RESET_USER_ADDRESS_FORM
  }
}
