import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { postSearchProducts } from '../actions/searchActions';
import { getShoppingCartRequest } from '../actions/shoppingCartActions'

//images
//import tulasiLogo from '../images/logo-tulasi.png'
import tulasiLogo from '../images/logo-tulasi.png'

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props){
    super(props)
    this.state = {
      isSearchOpen: false,
      searchValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //need only to load the shoppingCart to get the length and print to the user
    if (this.props.user !== null) {
      const { CarrinhoId } = this.props.user

      if (CarrinhoId && CarrinhoId !== null) {
        this.props.getShoppingCartRequest(CarrinhoId)
      }
    } else {
      //not logged in, but may have a shopping cart
      const { shoppingCartId } = this.props
      if (this.props.shoppingCartId !== null) {
        this.props.getShoppingCartRequest(shoppingCartId)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
      //loads the shopping cart, if there's one
      const { CarrinhoId } = nextProps.user
      if (CarrinhoId && CarrinhoId !== null) {
        nextProps.getShoppingCartRequest(CarrinhoId)
      }
    }
  }

  handleChange(event) {
    this.setState({ ...this.state, searchValue: event.target.value});
  }

  fetchSearchResults(){
    this.props.postSearchProducts({
      "Chave": this.state.searchValue,
      "Count": "6",
      "UltimoID": -1,
      "UltimoPreco": -1,
      "UltimaDescricao": "",
      "TipoOrdenacao": -1,
      "ProdutoID": -1,
      "ProdutoCategoriaID": -1,
      "ProdutoSubCategoriaID": -1,
    });

    this.context.router.push("/busca");
  }

  render() {

    return (

      <header>
        <div className="container">
          <div className="header_top">
            <div className="custom_header1">
              <ul className="header_social">
                <li><a target="_blank" href="https://www.facebook.com/tulasimercadoorganico/"><i className="fa fa-facebook header_icon" /></a><a target="_blank" href="https://www.instagram.com/tulasimercadoorganico/"><i className="fa fa-instagram header_icon" /></a>@tulasimercadoorganico</li>
                {/*<li><i className="fa fa-whatsapp header_icon" /> (81) 99816-1871 / 3072-8212 / 3223-5854 </li>*/}
                <li><i className="fa fa-phone header_icon" /> (81) 3072-8212 / 3223-5854 </li>
                <li><i className="fa fa-home header_icon" /> Rua das Graças, 178 – Recife/PE</li>
              </ul>
            </div>
            {/* LOGO */}
            <div id="logo" className="logo_main">
              <a href="#">
                <img src={tulasiLogo} alt="TULASI Orgânicos"/>
              </a>
            </div>
            {/* hello, user */}
            <div className="custom_header2">
              { this.props.user ?
                <ul>
                  <li className="bemvindo">Olá, {this.props.user.Parceiro.RazaoSocial}</li>
                </ul>
                :
                ""
              }
            </div>
          </div>

        </div>
        <div id="header_stack" className={this.props.fixedTopBar ? "megamenu_stuck" : null}>
          <div className="container">
            <div className="flexbox">
              {/* MEGAMENU */}
              <div id="megamenu" className="megamenu_desktop">
                <h2 id="megamenu_mobile_toggle">Fruit Gifts<i /></h2>
                <ul className="level_1 sf-js-enabled sf-arrows syligo-topbar-cursor">
                  <li className="level_1_item level_2_small__wrap">
                    <IndexLink to="/" className={"level_1_link sf-with-ul"} activeClassName={"level_1_link sf-with-ul active"}>
                      Home
                      <i className="level_1_trigger" />
                    </IndexLink>
                    <ul className="level_2_wrap level_2_small level_2_ul" style={{display: 'none'}}>
                      <li><a href="#">Cherries</a></li>
                      <li><a href="#">Fruit baskets</a></li>
                      <li><a href="#">Dipped Fruits</a></li>
                      <li><a href="#">Mangoes</a></li>
                      <li><a href="#">Oranges</a></li>
                      <li><a href="#">Organic Fruits</a></li>
                      <li><a href="#">Peaches</a></li>
                    </ul>
                  </li>

                  <li className="level_1_item">
                  <Link to="/produtos" className={"level_1_link sf-with-ul"} activeClassName={"level_1_link sf-with-ul active"}>
                    Produtos
                    <span className="menu_badge">Orgânicos</span>
                    <i className="level_1_trigger" />
                  </Link>
                  </li>
                  <li className="level_1_item">
                    <Link to="/casa" className={"level_1_link sf-with-ul"} activeClassName={"level_1_link sf-with-ul active"}>
                      Nossa Casa
                      <i className="level_1_trigger" />
                    </Link>
                  </li>
                  <li className="level_1_item">
                    <Link to="/parceiros" className={"level_1_link sf-with-ul"} activeClassName={"level_1_link sf-with-ul active"}>
                      Parceiros Amigos
                      <i className="level_1_trigger" />
                    </Link>
                    <ul className="level_2_wrap level_2_big" style={{display: 'none'}}>
                      <li className>
                        <div className="level_2 level_2_links">
                          <div className="column_item column_item__1">
                            <h6 className="level_2_trigger">Shop gifts<i /></h6>
                            <ul className="level_3 level_2_ul">
                              <li><a href="#" title>Cherries</a></li>
                              <li><a href="#" title>Fruit baskets</a></li>
                              <li><a href="#" title>Dipped Fruits</a></li>
                              <li><a href="#" title>Mangoes</a></li>
                              <li><a href="#" title>Oranges</a></li>
                              <li><a href="#" title>Organic Fruits</a></li>
                              <li><a href="#" title>Peaches</a></li>
                              <li><a href="#" title>Pears</a></li>
                              <li><a href="#" title>Desserts</a></li>
                            </ul>
                          </div>
                          <div className="column_item column_item__2">
                            <h6 className="level_2_trigger">Occasions<i /></h6>
                            <ul className="level_3 level_2_ul">
                              <li><a href="#" title>Fruit baskets</a></li>
                              <li><a href="#" title>Dipped Fruits</a></li>
                              <li><a href="#" title>Oranges</a></li>
                              <li><a href="#" title>Peaches</a></li>
                              <li><a href="#" title>Pears</a></li>
                              <li><a href="#" title>Cherries</a></li>
                            </ul>
                          </div>
                          <div className="column_item column_item__3">
                            <h6 className="level_2_trigger">Holidays<i /></h6>
                            <ul className="level_3 level_2_ul">
                              <li><a href="#" title>Dipped Fruits</a></li>
                              <li><a href="#" title>Oranges</a></li>
                              <li><a href="#" title>Organic Fruits</a></li>
                              <li><a href="#" title>Pears</a></li>
                              <li><a href="#" title>Fruit baskets</a></li>
                              <li><a href="#" title>Mangoes</a></li>
                            </ul>
                          </div>
                          <div className="column_item column_item__4">
                            <h6 className="level_2_trigger">Events<i /></h6>
                            <ul className="level_3 level_2_ul">
                              <li><a href="#" title>Pears</a></li>
                              <li><a href="#" title>Organic Fruits</a></li>
                              <li><a href="#" title>Mangoes</a></li>
                              <li><a href="#" title>Fruit baskets</a></li>
                              <li><a href="#" title>Oranges</a></li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="level_1_item">
                    <a href="http://blog.tulasiorganicos.com.br" target="_blank" className={"level_1_link sf-with-ul"}>
                      Mundo Tulasi
                      <i className="level_1_trigger" />
                    </a>
                  </li>
                  {/*<li className="level_1_item">
                    <a onClick={ () => {this.props.navigationChange('clube')}} className={this.isActive('clube')}>
                      Clube do Orgânico
                      <i className="level_1_trigger" />
                    </a>
                  </li>*/}
                  {/*<li className="level_1_item">
                    <a onClick={ () => {this.setState({activeOnTopbar: 'Sale'}); browserHistory.push('sale');} } className={this.isActive('Sale')}>
                      Venda
                      <i className="level_1_trigger" />
                    </a>
                    <ul className="level_2_wrap level_2_big" style={{display: 'none'}}>
                      <li>
                        <div className="level_2 level_2_products">
                          <div className="column_item column_item__1 ">
                            <div className="product_img">
                              <a href="index-8.html">
                                <img src="images/broadway_basketeers_fruit_and_nut_crate_gift_tray_1_large.png" alt="Broadway Basketeers Fruit and Nut Crate Gift Tray" />
                              </a>
                            </div>
                            <div className="product_info">
                              <div className="product_name">
                                <a href="index-8.html">Broadway Basketeers Fruit and Nut Crate Gift Tray</a>
                              </div>
                              <div className="product_price">
                                <span className="money" data-currency-usd="$30.00">$30.00</span>
                              </div>
                            </div>
                          </div>
                          <div className="column_item column_item__2 ">
                            <div className="product_img">
                              <a href="#">
                                <img src="images/broadway_basketeers_premium_dried_fruit_assortment_gift__002.png" alt="Broadway Basketeers Premium Dried Fruit Assortment Gift Tray" />
                              </a>
                            </div>
                            <div className="product_info">
                              <div className="product_name">
                                <a href="#">Broadway Basketeers Premium Dried Fruit Assortm...</a>
                              </div>
                              <div className="product_price">
                                From
                                <span className="money" data-currency-usd="$26.00">$26.00</span>
                                <span className="money compare-at-price" data-currency-usd="$36.00">$36.00</span>
                              </div>
                            </div>
                          </div>
                          <div className="column_item column_item__3 ">
                            <div className="product_img">
                              <a href="#">
                                <img src="images/broadway_basketeers_souring_saphire_sympathy_gift_tower_1_la.png" alt="Broadway Basketeers Souring Saphire Sympathy Gift Tower" />
                              </a>
                            </div>
                            <div className="product_info">
                              <div className="product_name">
                                <a href="#">Broadway Basketeers Souring Saphire Sympathy Gi...</a>
                              </div>
                              <div className="product_price">
                                <span className="money" data-currency-usd="$19.00">$19.00</span>
                                <span className="money compare-at-price" data-currency-usd="$26.00">$26.00</span>
                              </div>
                            </div>
                          </div>
                          <div className="column_item column_item__4 column_item__last">
                            <div className="product_img">
                              <a href="#">
                                <img src="images/cute_christmas_gift_basket_1_large.png" alt="Cute Christmas Gift Basket" />
                              </a>
                            </div>
                            <div className="product_info">
                              <div className="product_name">
                                <a href="#">Cute Christmas Gift Basket</a>
                              </div>
                              <div className="product_price">
                                <span className="money" data-currency-usd="$25.00">$25.00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>*/}
                  {/*<li className="level_1_item">
                    <a onClick={ () => {this.props.navigationChange('casa')}} className={this.isActive('casa')}>
                      A casa é sua
                    </a>
                  </li>*/}
                  <li className="level_1_item">
                  </li>
                </ul>
              </div>
              <div className="header_right">
                {/* HEADER SEARCH */}
                <div className="header_search">
                  <form method="get" className={`search_form ${ this.state.isSearchOpen ? 'search_opened' : ''}`}>
                    <input id="search-field" name="q" placeholder="Buscar na loja" className="hint" defaultValue="" type="text" onChange={this.handleChange} onBlur={ (e) => {
                      if (this.state.isSearchOpen) {
                        //console.log("hora de fechar busca");
                        //console.log(e)
                        this.setState({
                          isSearchOpen: !this.state.isSearchOpen
                        })
                      }
                    }}/>
                    <button id="search-submit" type="submit" onClick={ (e) => {
                      e.preventDefault();
                      if (this.state.isSearchOpen) {
                        //console.log("fazer pesquisa");
                        this.fetchSearchResults();
                      } else {
                        this.setState({
                          isSearchOpen: !this.state.isSearchOpen
                        })
                      }
                    }}>
                      <span className={`icon tulasi-search ${this.state.isSearchOpen ? 'tulasi-search-button-opened' : ''}`}/>
                    </button>
                  </form>
                </div>
                {/* USER MENU */}
                <span className="header_user_item">
                  <Link to="/login" title="Minha conta"><span className="icon tulasi-user" /></Link>
                </span>
                {/* <span className="wishlist header_user_item"><a href="#" title="Wishlist"><span className="icon tulasi-heart" /></a></span> */}
                {/* HEADER CART */}
                <div className="header_cart">
                  <Link to={`/carrinho`}>
                    <span className="icon tulasi-cesta-vetor" /><span id="cart_items">{this.props.shoppingCartServer === null ? 0 : this.props.shoppingCartServer.Itens.length}</span>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div><div className="pseudo_sticky_block" style={{position: 'relative', height: 0}} />
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      footer: state.base.footer,
      shoppingCartServer: state.shoppingCart.shoppingCartServer,
      shoppingCartId: state.shoppingCart.shoppingCartId,
      user: state.login.user
    };
};

export default connect(mapStateToProps, { postSearchProducts, getShoppingCartRequest })(Header);
