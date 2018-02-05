import { apiUrl } from './requestHelper';
import axios from 'axios';

//http://localhost:54797/v1/cadastro/18085005/obterlogradourocep
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_REQUEST_SUCCESS';
export const GET_ORDERS_ERROR = 'GET_ORDERS_REQUEST_ERROR';

export const CLEAR_ORDER = "CLEAR_ORDER"

export const POST_SAVE_ORDER = "POST_SAVE_ORDER"
export const POST_SAVE_ORDER_SUCCESS = "POST_SAVE_ORDER_SUCCESS"
export const POST_SAVE_ORDER_ERROR = "POST_SAVE_ORDER_ERROR"

export const IS_RETRYING_PAYMENT = "IS_RETRYING_PAYMENT";

//Action para o Container Histórico de Compras: by Caio Saldanha
const getOrders = () => {
  return {
    type: GET_ORDERS
  }
}

//Armazena o estado de sucesso
 const getOrdersSuccess = (payload) => {
  return {
    type: GET_ORDERS_SUCCESS,
    payload   //É o conteúdo da response
  }
}

const getOrdersError = (error) => {
  return {
    type: GET_ORDERS_ERROR,
    error //É o conteúdo do error
  }
}

export const getOrdersRequest = (user)=>{

  const instance = axios.create({
    "Content-Type" : "application/json"
  })
//Não está retornando nada do request aqui. De onde pego o userId?
  const request = instance.get(`${apiUrl}/pedido/${user}/meuspedidosheader`);

  return dispatch => {

    dispatch(getOrders())

    request
    .then( response => {
      //console.log("get orders")
      //console.log(response)
      dispatch(getOrdersSuccess(response))
    })
    .catch( error => {
      dispatch(getOrdersError(error))
    })
  }
}

//clear order. use it when the user is entering the shopping cart, to avoid reprocess payment
export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  }
}

//POST gravarpedido
const postSaveOrder = () => {
  return {
    type: POST_SAVE_ORDER
  }
}

const postSaveOrderSuccess = (response) => {
  return {
    type: POST_SAVE_ORDER_SUCCESS,
    response
  }
}

const postSaveOrderError = (error) => {
  return {
    type: POST_SAVE_ORDER_ERROR,
    error
  }
}

export const postSaveOrderRequest = (orderObject) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.post(`${apiUrl}/pedido/gravarpedido`, orderObject)

  return dispatch => {
    dispatch(postSaveOrder())

    return request
    .then( response => {
      //console.log("postsave")
      //console.log(response)
      dispatch(postSaveOrderSuccess(response))
    })
    .catch(error => {
      //console.log("postsave error")
      //console.log(error)
      dispatch(postSaveOrderError(error))
    })
  }
}

export const setRetryingPayment = condition => {

  return {
    type: IS_RETRYING_PAYMENT,
    condition
  }
}
