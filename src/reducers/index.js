import { combineReducers } from 'redux';
import { products } from './productsReducer';
import { base } from './baseReducer';
import { home } from './homeReducer';
import { sale } from './saleReducer';
import { shoppingCart } from './shoppingCartReducer';
import { login } from './loginReducer';
import { search } from './searchReducer';
import { category } from './categoryReducer'
import { footer } from './footerReducer'
import { userAddress } from './userAddressReducer'
import { delivery } from './deliveryReducer'
import {orders} from './orderReducer';
import { cupom } from './cupomReducer';
import { customization } from './customizationReducer'

export default combineReducers({
  products,
  home,
  base,
  sale,
  shoppingCart,
  login,
  search,
  category,
  footer,
  userAddress,
  delivery,
  //adicionado o estado de compras feitas by Caio Saldanha
  orders,
  cupom,
  customization
})
