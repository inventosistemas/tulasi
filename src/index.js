import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import * as productsActions from './actions/productsActions'
import * as baseActions from './actions/baseActions'
import * as homeActions from './actions/homeActions'
import * as sale from './actions/saleActions'
// import { getCategoriesRequest } from './actions/customizationActions'
import { loadState, saveState } from './actions/localStorage';
import throttle from 'lodash/throttle';

import configureStore from './store/configureStore';

//initial states
import { SHOPPING_CART_STATE } from './reducers/shoppingCartReducer'
import { LOGIN_STATE } from './reducers/loginReducer'

const store = configureStore(loadState());
store.dispatch(baseActions.fetchFooter());
store.dispatch(homeActions.fetchBanners());
store.dispatch(productsActions.fetchFeaturedProducts(12));
store.dispatch(baseActions.fetchProductCategories());
store.dispatch(baseActions.fetchProductMenu());
store.dispatch(productsActions.fetchProductsCategoriesByTag('popular'));
store.dispatch(homeActions.fetchWhyChooseUs('PORQUE NOS ESCOLHER'));
store.dispatch(productsActions.fetchFullProductsCategories());
store.dispatch(sale.fetchBestSellersProducts());
store.dispatch(sale.fetchProductsTypes());
// customization
// store.dispatch(getCategoriesRequest());

store.subscribe(throttle(() => {

  const onlyLogin = {
    ...LOGIN_STATE,
    token: store.getState().login.token,
    user: store.getState().login.user,
    cupom: store.getState().login.cupom
  }

  // console.log("onlyyyyy : ", onlyLogin.user.cupom);
  // console.log('555555555555555: ', store.getState().login.user.cupom)


  //1 checks if the user is not logged in, but there's a shopping cart
  if (store.getState().login.user === null && store.getState().shoppingCart.shoppingCartId) {
    saveState({
      shoppingCart: {
        ...SHOPPING_CART_STATE,
        shoppingCartId: store.getState().shoppingCart.shoppingCartId
      }
    })
    return;
  }
  // não chega aqui quando entra no primeiro if e quando chega apaga o shoppingCart do localStorage.
  saveState({
    login: onlyLogin
    //token: store.getState().login.token,
    //user: store.getState().login.user
  });
}, 1000)); // salvando dados no localStorage no máximo a cada 1 segundo, por qeustoes de performance.

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} onUpdate={() => { window.ga('set', window.location.pathname, window.location.pathname ); window.ga('send', window.location.pathname); window.scrollTo(0, 0) }} />
  </Provider>,
  document.getElementById('root')
);
