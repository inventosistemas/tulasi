import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Base from './components/Base';
import Home from './components/home/Home';
import Products from './components/ProductsComponent';
import ContactUs from './components/contactUs/ContactUs';
import Partner from './components/PartnerComponent';
import Product from './components/ProductComponent';
import NossaCasa from './components/NossaCasaComponent';
import ShoppingCart from './components/ShoppingCartComponent';
import ShoppingCartPayment from './components/shoppingCart/ShoppingCartPaymentComponent';
import Login from './components/LoginComponent';
import Search from './components/SearchComponent'
import Corporate from './components/CorporateComponent'
import MyAccount from './scenes/myAccount/MyAccountComponent'
import AddressesView from './components/account/AddressesViewComponent'
import Checkout from './components/CheckoutComponent'
import ShoppingCartDone from './components/shoppingCart/ShoppingCartDoneComponent'
import PasswordResetForm from './components/account/PasswordResetFormComponent'

//www.tulasiorganicos.com.br/Login/RecuperarSenha?ID=312&ticket=73

export default (
  <Route path="/" component={Base}>
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/produtos" component={Products}>
      <Route path="/produtos/:id" component={Product} />
      {/* <Route path="/produtos/categoria?" component={Category} /> */}
    </Route>

    <Route path="contactus" component={ContactUs} />
    <Route path="casa" component={NossaCasa} />
    <Route path="parceiros" component={Partner} />
    <Route path="carrinho" component={ShoppingCart}>
      <Route path="/carrinho/pagamento" component={ShoppingCartPayment} />
      <Route path="/carrinho/concluido" component={ShoppingCartDone} />
      <Route path="/carrinho/login" component={Login} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="busca" component={Search} />
    <Route path="/corporativo" component={Corporate} />
    <Route path="/conta" component={MyAccount}>
      <Route path="/conta/enderecos" component={AddressesView} />
    </Route>
    
    <Route path="/login/recuperarSenha" component={PasswordResetForm} />
    <Route path="checkout" component={Checkout} />
  </Route>
);
