import * as actionTypes from '../actions/actionTypes';
import {
  UPDATE_SHOPPING_CART_PRODUCT,
  SELECT_SHOPPING_CART_ADDRESS,
  POST_ADD_PRODUCT_TO_CART,
  POST_ADD_PRODUCT_TO_CART_SUCCESS,
  POST_ADD_PRODUCT_TO_CART_ERROR,
  PUT_LINK_SHOPPING_CART_TO_LOGIN,
  PUT_LINK_SHOPPING_CART_TO_LOGIN_SUCCESS,
  PUT_LINK_SHOPPING_CART_TO_LOGIN_ERROR,
  GET_SHOPPING_CART_SUCCESS,
  GET_SHOPPING_CART_ERROR,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_ERROR,
  GET_PAYMENT_METHODS_SUCCESS,
  PUT_RETRY_PAYMENT,
  PUT_RETRY_PAYMENT_SUCCESS,
  PUT_RETRY_PAYMENT_ERROR,
  PUT_CLEAR_CART,
  PUT_CLEAR_CART_ERROR,
  PUT_CLEAR_CART_SUCCESS,
  POST_NOTIFY_USER_WHEN_AVALIABLE_SUCCESS,
  POST_NOTIFY_USER_WHEN_AVALIABLE_ERROR,
  CLEAR_SHOPPING_CART_SERVER,
  PUT_QUANTITY,
  PUT_QUANTITY_SUCCESS,
  PUT_QUANTITY_ERROR,
  GET_PAYMENT_CARDS,
  GET_PAYMENT_CARDS_SUCCESS,
  GET_PAYMENT_CARDS_ERROR,
  DELETE_PAYMENT_CARD,
  DELETE_PAYMENT_CARD_SUCCESS,
  DELETE_PAYMENT_CARD_ERROR
} from '../actions/shoppingCartActions'

export const SHOPPING_CART_STATE = {
  shoppingCartSelectedAddress: null,
  products: [],
  shoppingStep: 0,
  shoppingCartId: null,
  isPostingAddProductToCart: false,
  isPuttingLinkShoppingCartToLogin: false,
  shoppingCartServer: null,
  isGettingPaymentMethods: false,
  getPaymentMethodsSuccess: null,
  paymentMethods: null,
  getPaymentMethodsError: null,
  isPuttingRetryPayment: false,
  putRetryPaymentSuccess: null,
  putRetryPaymentError: null,
  postNotifyUserWhenAvaliableSuccess: null,
  postNotifyUserWhenAvaliableError: null,
  isPuttingQuantity: false,
  putQuantitySuccess: false,
  putQuantityError: false,
  isDeletingPaymentCard: false,
  deletePaymentCardSuccess: null,
  deletePaymentCardError: null,
  isGettingPaymentCards: false,
  getPaymentCardsSuccess: null,
  getPaymentCardsError: null 
}

export const shoppingCart = (state = SHOPPING_CART_STATE, action) => {
  switch (action.type) {

    case UPDATE_SHOPPING_CART_PRODUCT:

      //check if the product is inside the state

      const getProductIndex = () => {
        let productIndex = -1;
        let index = 0;

        for (var product of state.products) {
          //console.log("product: ")
          //console.log(product);
          //console.log(action);
          if (product.ID === action.product.ID) {
            productIndex = index;
            break;
          }
          index++;
        }

        return productIndex;
      }

      //will get the index to perform the slice and update
      //console.log("estadinho")
      const index = getProductIndex()

      if (index > -1) {

        //updates the product
        const updatedProduct = { ...state.products[index] };
        if (updatedProduct.cartQuantity) {
          updatedProduct.cartQuantity += action.quantity;
        } else {
          updatedProduct.cartQuantity = action.quantity;
        }

        return {
          ...state,
          products: [
            ...state.products.slice(0, index),
            updatedProduct,
            ...state.products.slice(index + 1)
          ]
        }
      } else {
        // in this case, no product inside the cart
        return {
          ...state,
          products: [
            ...state.products,
            {...action.product, cartQuantity: action.quantity }
          ]
        }
      }

    case actionTypes.REMOVE_PRODUCT_FROM_SHOPPING_CART:
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.index),
          ...state.products.slice(action.index + 1)
        ]
      }

    case CLEAR_SHOPPING_CART_SERVER:
      return {
        ...SHOPPING_CART_STATE
      }

    case GET_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        shoppingCartServer : action.shoppingCart,
        shoppingCartId: action.shoppingCart.Id
      }
    case GET_SHOPPING_CART_ERROR:
      return {
        ...state,
        shoppingCartServer : null,
        shoppingCartId: null
      }
    case SELECT_SHOPPING_CART_ADDRESS:
      return {
        ...state,
        shoppingCartSelectedAddress: action.userAddress
      }
    case POST_ADD_PRODUCT_TO_CART:
      return {
        ...state,
        isPostingAddProductToCart: true
      }
    case POST_ADD_PRODUCT_TO_CART_SUCCESS:
      //console.log(`reducer post add success`)
      //console.log('-----', action.responseData.Dados.CarrinhoID)
      return {
        ...state,
        isPostingAddProductToCart: false,
        shoppingCartId: action.responseData.Dados.CarrinhoID,
        postAddProductToCartError: false
      }
    case POST_ADD_PRODUCT_TO_CART_ERROR:
      //console.log(`reducer post add ERROR`)

      return {
        ...state,
        isPostingAddProductToCart: false,
        shoppingCartId: null,
        postAddProductToCartError: true
      }
    case PUT_LINK_SHOPPING_CART_TO_LOGIN:
      return {
        ...state,
        isPuttingLinkShoppingCartToLogin: true
      }
    case PUT_LINK_SHOPPING_CART_TO_LOGIN_SUCCESS:
      return {
        ...state,
        isPuttingLinkShoppingCartToLogin: false
      }
    case PUT_LINK_SHOPPING_CART_TO_LOGIN_ERROR:
      return {
        ...state,
        isPuttingLinkShoppingCartToLogin: false
      }
    case GET_PAYMENT_METHODS:
      return {
        ...state,
        isGettingPaymentMethods: true,
        getPaymentMethodsSuccess: null,
        getPaymentMethodsError: null
      }
    case GET_PAYMENT_METHODS_ERROR:
      return {
        ...state,
        isGettingPaymentMethods: false,
        getPaymentMethodsSuccess: null,
        paymentMethods: null,
        getPaymentMethodsError: action.error
      }
    case GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        isGettingPaymentMethods: false,
        getPaymentMethodsSuccess: action.response,
        paymentMethods: action.response.data,
        getPaymentMethodsError: null
      }
    case PUT_RETRY_PAYMENT:
      return {
        ...state,
        isPuttingRetryPayment: true,
        putRetryPaymentSuccess: null,
        putRetryPaymentError: null
      }
    case PUT_RETRY_PAYMENT_SUCCESS:
      return {
        ...state,
        isPuttingRetryPayment: false,
        putRetryPaymentSuccess: action.response,
        putRetryPaymentError: null
      }
    case PUT_RETRY_PAYMENT_ERROR:
      return {
        ...state,
        isPuttingRetryPayment: false,
        putRetryPaymentSuccess: null,
        putRetryPaymentError: action.error
      }
    case PUT_CLEAR_CART:
      return {
        ...state,
        isClearingCart: true,
        cartClearedSuccess: false,
        cartClearedError: false
      }
    case PUT_CLEAR_CART_ERROR:
      return {
        ...state,
        isClearingCart: false,
        cartClearedSuccess: false,
        cartClearedError: true
      }
    case PUT_CLEAR_CART_SUCCESS:
      return {
        ...state,
        isClearingCart: false,
        cartClearedSuccess: true,
        cartClearedError: false,
        shoppingCartServer: null
      }
    case POST_NOTIFY_USER_WHEN_AVALIABLE_SUCCESS:
      return {
        ...state,
        postNotifyUserWhenAvaliableSuccess: true,
        postNotifyUserWhenAvaliableError: false,
        postNotifyUserWhenAvaliablePayload: action.response
      }
    case POST_NOTIFY_USER_WHEN_AVALIABLE_ERROR:
      return {
        ...state,
        postNotifyUserWhenAvaliableSuccess: false,
        postNotifyUserWhenAvaliableError: true,
        postNotifyUserWhenAvaliablePayload: action.response
      }
    case PUT_QUANTITY:
      return {
        ...state,
        isPuttingQuantity: true,
        putQuantitySuccess: false,
        putQuantityError: false
      }
    case PUT_QUANTITY_SUCCESS:
      return {
        ...state,
        isPuttingQuantity: false,
        putQuantitySuccess: true,
        putQuantityError: false
      }
    case PUT_QUANTITY_ERROR:
      return {
        ...state,
        isPuttingQuantity: false,
        putQuantitySuccess: false,
        putQuantityError: action.error
      }
    case GET_PAYMENT_CARDS:
      return {
        ...state,
        isGettingPaymentCards: true,
        getPaymentCardsSuccess: null,
        getPaymentCardsError: null
      }
    case GET_PAYMENT_CARDS_SUCCESS:
      return {
        ...state,
        isGettingPaymentCards: false,
        getPaymentCardsSuccess: action.response,
        getPaymentCardsError: null
      }
    case GET_PAYMENT_CARDS_ERROR:
      return {
        ...state,
        isGettingPaymentCards: false,
        getPaymentCardsSuccess: null,
        getPaymentCardsError: action.error
      }
    case DELETE_PAYMENT_CARD:
      return {
        ...state,
        isDeletingPaymentCard: true,
        deletePaymentCardSuccess: null,
        deletePaymentCardError: null
      }
    case DELETE_PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        isDeletingPaymentCard: false,
        deletePaymentCardSuccess: action.response,
        deletePaymentCardError: null
      }
    case DELETE_PAYMENT_CARD_ERROR:
      return {
        ...state,
        isDeletingPaymentCard: false,
        deletePaymentCardSuccess: null,
        deletePaymentCardError: action.error
      }
    default:
      return state;
  }
};
