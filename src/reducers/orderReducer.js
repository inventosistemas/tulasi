import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  CLEAR_ORDER,
  POST_SAVE_ORDER,
  POST_SAVE_ORDER_SUCCESS,
  POST_SAVE_ORDER_ERROR,
  IS_RETRYING_PAYMENT
} from '../actions/ordersActions';

const ORDERS_STATE = {
  //Inicia o estado do Reducer
  allOrders: [],
  isGettingOrders: false,
  getOrdersSuccess: null,
  getOrdersError: null,
  isPostingSaveOrder: false,
  postSaveOrderError: null,
  postSaveOrderSuccess: null,
  isRetryingPayment: false
}

export const orders = (state = ORDERS_STATE, action) => {
  // //console.log('Action retornada ORDERS: ');
  // //console.log(action);

  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        isGettingOrders: true,
        getOrdersSuccess: null,
        getOrdersError: null
      }
    case GET_ORDERS_SUCCESS:
        //console.log('getOrders completed!');
        return {
          ...state,
          allOrders: action.payload.data,
          getOrdersSuccess: action.payload.data,
          isGettingOrders: false,
          getOrdersError: null
        }
    case GET_ORDERS_ERROR:
        //console.log('getOrders failed!');
        return{
          ...state,
          getOrdersError: action.payload.data,
          getOrdersSuccess: null,
          isGettingOrders: false
        }
    case POST_SAVE_ORDER:
      return {
        ...state,
        isPostingSaveOrder: true,
        postSaveOrderError: null,
        postSaveOrderSuccess: null
      }
    case POST_SAVE_ORDER_ERROR:
      return {
        ...state,
        isPostingSaveOrder: false,
        postSaveOrderError: action.error,
        postSaveOrderSuccess: null
      }
    case POST_SAVE_ORDER_SUCCESS:
      return {
        ...state,
        isPostingSaveOrder: false,
        postSaveOrderSuccess: action.response,
        postSaveOrderError: null
      }
    case IS_RETRYING_PAYMENT:
      return {
        ...state,
        isRetryingPayment: action.condition
      }
    case CLEAR_ORDER:
      return {
        ...ORDERS_STATE
      }
    default:
      return {...state}
  }
}
