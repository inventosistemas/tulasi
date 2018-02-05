import { apiUrl } from './requestHelper';
import axios from 'axios';

//action Types
export const UPDATE_SHOPPING_CART_PRODUCT= 'UPDATE_SHOPPING_CART_PRODUCT';
export const SELECT_SHOPPING_CART_ADDRESS = "SELECT_SHOPPING_CART_ADDRESS"

export const POST_ADD_PRODUCT_TO_CART = "POST_ADD_PRODUCT_TO_CART"
export const POST_ADD_PRODUCT_TO_CART_SUCCESS = "POST_ADD_PRODUCT_TO_CART_SUCCESS"
export const POST_ADD_PRODUCT_TO_CART_ERROR = "POST_ADD_PRODUCT_TO_CART_ERROR"

export const PUT_LINK_SHOPPING_CART_TO_LOGIN = "PUT_LINK_SHOPPING_CART_TO_LOGIN"
export const PUT_LINK_SHOPPING_CART_TO_LOGIN_SUCCESS = "PUT_LINK_SHOPPING_CART_TO_LOGIN_SUCCESS"
export const PUT_LINK_SHOPPING_CART_TO_LOGIN_ERROR = "PUT_LINK_SHOPPING_CART_TO_LOGIN_ERROR"

export const GET_SHOPPING_CART_SUCCESS = "GET_SHOPPING_CART_SUCCESS"
export const GET_SHOPPING_CART_ERROR = "GET_SHOPPING_CART_ERROR"
export const GET_SHOPPING_CART = "GET_SHOPPING_CART"

export const GET_PAYMENT_METHODS = "GET_PAYMENT_METHODS"
export const GET_PAYMENT_METHODS_SUCCESS = "GET_PAYMENT_METHODS_SUCCESS"
export const GET_PAYMENT_METHODS_ERROR = "GET_PAYMENT_METHODS_ERROR"

export const PUT_RETRY_PAYMENT = "PUT_RETRY_PAYMENT"
export const PUT_RETRY_PAYMENT_SUCCESS = "PUT_RETRY_PAYMENT_SUCCESS"
export const PUT_RETRY_PAYMENT_ERROR = "PUT_RETRY_PAYMENT_ERROR"

export const REMOVE_PRODUCT_FROM_SHOPPING_CART = 'REMOVE_PRODUCT_FROM_SHOPPING_CART';

export const PUT_CLEAR_CART = "PUT_CLEAR_CART"
export const PUT_CLEAR_CART_ERROR = "PUT_CLEAR_CART_ERROR"
export const PUT_CLEAR_CART_SUCCESS = "PUT_CLEAR_CART_SUCCESS"

export const POST_NOTIFY_USER_WHEN_AVALIABLE = "POST_NOTIFY_USER_WHEN_AVALIABLE"
export const POST_NOTIFY_USER_WHEN_AVALIABLE_SUCCESS = "POST_NOTIFY_USER_WHEN_AVALIABLE_SUCCESS"
export const POST_NOTIFY_USER_WHEN_AVALIABLE_ERROR = "POST_NOTIFY_USER_WHEN_AVALIABLE_ERROR"
export const CLEAR_SHOPPING_CART_SERVER = 'CLEAR_SHOPPING_CART_SERVER';

export const PUT_QUANTITY = 'PUT_QUANTITY';
export const PUT_QUANTITY_SUCCESS = 'PUT_QUANTITY_SUCCESS';
export const PUT_QUANTITY_ERROR = 'PUT_QUANTITY_ERROR';

export const GET_PAYMENT_CARDS = 'GET_PAYMENT_CARDS'
export const GET_PAYMENT_CARDS_SUCCESS = 'GET_PAYMENT_CARDS_SUCCESS'
export const GET_PAYMENT_CARDS_ERROR = 'GET_PAYMENT_CARDS_ERROR'

export const DELETE_PAYMENT_CARD = 'DELETE_PAYMENT_CARD'
export const DELETE_PAYMENT_CARD_SUCCESS = 'DELETE_PAYMENT_CARD_SUCCESS'
export const DELETE_PAYMENT_CARD_ERROR = 'DELETE_PAYMENT_CARD_ERROR'

//action creators
export const clearShoppingCartServer = () => {
  return {
    type: CLEAR_SHOPPING_CART_SERVER
  }
}

export const updateShoppingCartProduct = (product, quantity = 1) => {
  //console.log("entrou no updateShoppingCart")
  //TODO: devemos checar se o usuário está logado
  //2: se logado, tratar diretamente com o webservice
  //3: se não logado, manter apenas no cookie
  return {
    type: UPDATE_SHOPPING_CART_PRODUCT,
    product,
    quantity: quantity
  }
}

//--- GET ShoppingCart

const getShoppingCart = () => {
  return {
    type: GET_SHOPPING_CART
  }
}

const getShoppingCartSuccess = (shoppingCart) => {
  return {
    type: GET_SHOPPING_CART_SUCCESS,
    shoppingCart
  }
}

const getShoppingCartError = (error) => {
  return {
    type: GET_SHOPPING_CART_ERROR
  }
}

export const getShoppingCartRequest = (id) => {
  let request = axios.get(`${apiUrl}/carrinho/${id}`)

  return (dispatch) => {
    dispatch(getShoppingCart())

    return request
    .then(response => {
      dispatch(getShoppingCartSuccess(response.data))
    })
    .catch(error => {
      //console.log("error getShoppingCart")
      dispatch(getShoppingCartError(error))
      // throw(error);
    })
  }
}
//---

export const deleteItemFromShoppingCartRequest = (cartItemId, cartId) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  // const requestBody = {
  //   "CarrinhoItemID" : cartItemId
  // }

  const request = instance.request({
    url: `${apiUrl}/carrinho/item/${cartItemId}/delete`,
    method: 'delete',
    // data: requestBody
  })

  return dispatch => {
    dispatch({
      type: REMOVE_PRODUCT_FROM_SHOPPING_CART,
      cartItemId
    })

    //console.log(request)
    return request
    .then(response => {
      //console.log("delete shopping car item")
      //console.log(response)
      dispatch(getShoppingCartRequest(cartId))
    })
    .catch(error => {
      //console.log("error deleting item")
      //console.log(error)
    })
  }
}

//clear cart
const putClearCart = (cartId) => {
  return {
    type: PUT_CLEAR_CART,
    cartId
  }
}

const putClearCartError = (error) => {
  return {
    type: PUT_CLEAR_CART_ERROR,
    error
  }
}

const putClearCartSuccess = (response) => {
  return {
    type: PUT_CLEAR_CART_SUCCESS,
    payload: response

  }
}

export const putClearCartRequest = (cartId) => {
  return dispatch => {
    dispatch(putClearCart(cartId))

    const request = axios.put(`${apiUrl}/carrinho/${cartId}/limpar`)

    return request
    .then(response => {
      dispatch(putClearCartSuccess(response))
    })
    .catch(error => {
      dispatch(putClearCartError(error))
    })
  }

}


//----- link shopping cart to login action creators
const putLinkShoppingCartToLogin = () => {
  return {
    type: PUT_LINK_SHOPPING_CART_TO_LOGIN
  }
}

const putLinkShoppingCartToLoginSuccess = () => {
  return {
    type: PUT_LINK_SHOPPING_CART_TO_LOGIN_SUCCESS
  }
}

const putLinkShoppingCartToLoginError = () => {
  return {
    type: PUT_LINK_SHOPPING_CART_TO_LOGIN_ERROR
  }
}

export const putLinkShoppingCartToLoginRequest = (CarrinhoID, LoginID) => {
  //console.log(`entrou no putlinkreq com cartId: ${CarrinhoID} ${LoginID}`)

  let requestBody = {
    CarrinhoID,
    LoginID
  }

  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.put(`${apiUrl}/carrinho/adicionarlogin`, requestBody)

  return dispatch => {
    //console.log("dispatch putlink")
    dispatch(putLinkShoppingCartToLogin())

    return request
    .then(response => {
      //console.log("linkou user?")
      //console.log(response)
      dispatch(putLinkShoppingCartToLoginSuccess())
    })
    .catch(error => {
      //console.log("putlink error")
      //console.log(error)
      dispatch(putLinkShoppingCartToLoginError())
    })
  }
}
//------

//----- POST AddProductToCart action creators
const postAddProductToCart = () => {
    return {
      type: POST_ADD_PRODUCT_TO_CART
    }
}

const postAddProductToCartSuccess = (responseData) => {
    return {
      type: POST_ADD_PRODUCT_TO_CART_SUCCESS,
      responseData
    }
}

const postAddProductToCartError = () => {
    return {
      type: POST_ADD_PRODUCT_TO_CART_ERROR
    }
}

export const postAddProductToCartRequest = (cartId = null, user = null, amount, SkuId) => {
  //prepares the request
  let instance = axios.create({
    "Content-Type" : "application/json"
  })

  let requestUrl = `${apiUrl}/carrinho/item/adicionaritem`

  //gets the carrinhoId
  let checkedCartId = cartId

  if (user !== null) {
      if (user.CarrinhoId && user.CarrinhoId !== null) {
        checkedCartId = user.CarrinhoId
      }
  }

  let requestBody = {
      CarrinhoID : checkedCartId,
      SkuId,
      Quantidade: amount
  }

  const request = instance.post(requestUrl, requestBody)

  return (dispatch) => {
    dispatch(postAddProductToCart())

    return request
    .then(response => {
      //creates a new cart
      //console.log(response)
      dispatch(postAddProductToCartSuccess(response.data))
      //console.log('check user.CarrinhoID: ', user);
      if (user !== null && user.CarrinhoId === null) {
        //console.log("tem usuário, precisa linkar o novo carrinho ao login")
        dispatch(putLinkShoppingCartToLoginRequest(response.data.Dados.CarrinhoID, user.ID))
      }
      return response.data.Dados.CarrinhoID
    })
    .then(id => {
      //console.log(`get cart for : ${id}`)
      dispatch(getShoppingCartRequest(id))
    })
    .catch(error => {
      //console.log("deu algum erro?")
      //console.log(error)
      dispatch(postAddProductToCartError(error))
    })
  }
}
//--------

//--- PUT CartItemQuantity

const putQuantity = () => {
  return {
    type: PUT_QUANTITY
  }
}

const putQuantitySuccess = (response) => {
  return {
    type: PUT_QUANTITY_SUCCESS,
    payload: response
  }
}

const putQuantityError = error => {
  return {
    type: PUT_QUANTITY_ERROR,
    error
  }
}

export const putCartItemQuantityRequest = (cartItemId, quantity, cartId) => {
  //console.log(`putCartItemQuantityRequest: ${cartItemId} ${quantity}`)

  const instance = axios.create({
    "Content-Type": "application/json"
  })

  const requestBody = {
    "CarrinhoItemID" : cartItemId,
    "Quantidade" : quantity
  }

  const request = instance.put(`${apiUrl}/carrinho/item/adicionarquantidade`, requestBody)

  return dispatch => {
    dispatch(putQuantity())

    return request
    .then(response => {
      //console.log("putCartItemQuantityRequest success")
      //need to get the shopping cart again
      dispatch(getShoppingCartRequest(cartId))
      //dispatches the success
      dispatch(putQuantitySuccess(response.data))
    })
    .catch(error => {
      //console.log("deu erro")
      console.log('ERRO DO PUT AQUI ----', error)
      if (error.response) {
        dispatch(putQuantityError(error.response.data))
      } else {
        dispatch(putQuantityError(error))
      }
    })
  }
}

export const selectShoppingCartAddress = (userAddress) => {
  return {
    type: SELECT_SHOPPING_CART_ADDRESS,
    userAddress
  }
}

//get formas de pagamento
const getPaymentMethods = () => {
  return {
    type: GET_PAYMENT_METHODS
  }
}

const getPaymentMethodsSuccess = (response) => {
  return {
    type: GET_PAYMENT_METHODS_SUCCESS,
    response
  }
}

const getPaymentMethodsError = (error) => {
  return {
    type: GET_PAYMENT_METHODS_ERROR,
    error
  }
}

export const getPaymentMethodsRequest = (valorPagamento = 1) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/pagamento/${valorPagamento}/obterformaspagamentoloja`)

  return dispatch => {
    dispatch(getPaymentMethods())

    return request.then(response => {
      //console.log("get payment")
      //console.log(response)
      dispatch(getPaymentMethodsSuccess(response))
    })
    .catch(error => {
      //console.log(error)
      dispatch(getPaymentMethodsError(error))
    })
  }
}

//reprocessa pagamento
const putRetryPayment = () => {
  return {
    type: PUT_RETRY_PAYMENT
  }
}

const putRetryPaymentSuccess = (response) => {
  return {
    type: PUT_RETRY_PAYMENT_SUCCESS,
    response
  }
}

const putRetryPaymentError = (error) => {
  return {
    type: PUT_RETRY_PAYMENT_ERROR,
    error
  }
}

export const putRetryPaymentRequest = (paymentObject) => {
  const instance = axios.create({
    "Content-Type": "application/json"
  })

  const request = instance.put(`${apiUrl}/pedido/reprocessarpagto`, paymentObject)

  return dispatch => {
    dispatch(putRetryPayment());

    return request
    .then(response => {
      dispatch(putRetryPaymentSuccess(response))
    })
    .catch(error=>{
      dispatch(putRetryPaymentError(error))
    })
  }
}

export const postNotifyUserWhenAvaliableSuccess = () => ({
  type: POST_NOTIFY_USER_WHEN_AVALIABLE_SUCCESS
})

export const postNotifyUserWhenAvaliableError = () => ({
  type: POST_NOTIFY_USER_WHEN_AVALIABLE_ERROR
})

export const postNotifyUserWhenAvaliableRequest = (Nome, Email, ProdutoID) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const requestUrl = `${apiUrl}/produto/avisemequandochegar`

  const requestBody = {
    Nome,
    Email,
    ProdutoID
  }

  const request = instance.post(requestUrl, requestBody);

  return dispatch => {

    return request
    .then(response => {
      dispatch(postNotifyUserWhenAvaliableSuccess(response.data))
    })
    .catch(error => {
      dispatch(postNotifyUserWhenAvaliableError(error))
    })
  }
}

const getPaymentCards = () => {
  return {
    type: GET_PAYMENT_CARDS
  }
}

const getPaymentCardsSuccess = (response) => {
  return {
    type: GET_PAYMENT_CARDS_SUCCESS,
    response
  }
}

const getPaymentCardsError = (error) => {
  return {
    type: GET_PAYMENT_CARDS_ERROR,
    error
  }
}

export const getPaymentCardsRequest = parceiroID => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/pedido/${parceiroID}/obterlistacartoes`)

  return dispatch => {
    dispatch(getPaymentCards())

    return request.then(response => {
      //console.log("get payment")
      //console.log(response)
      dispatch(getPaymentCardsSuccess(response.data))
    })
    .catch(error => {
      //console.log(error)
      dispatch(getPaymentCardsError(error))
    })
  }
}

const deletePaymentCard = () => ({ type: DELETE_PAYMENT_CARD })

const deletePaymentCardSuccess = response => ({ type: DELETE_PAYMENT_CARD_SUCCESS, response })

const deletePaymentCardError = error => ({ type: DELETE_PAYMENT_CARD_ERROR, error })

export const deletePaymentCardRequest = cardId => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })
  const request = instance.delete(`${apiUrl}/pedido/${cardId}/deletecartao`)

  return dispatch => {
    dispatch(deletePaymentCard())

    return request.then(response => {
      dispatch(deletePaymentCardSuccess(true))
    })
    .catch(error => dispatch(deletePaymentCardError(error)))
  }

}
