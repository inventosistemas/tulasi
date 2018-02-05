import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { currentProductTypeFilter, currentCategory } from '../actions/saleActions';
import { getProductById } from '../actions/productsActions';
import { updateShoppingCartProduct, postAddProductToCartRequest } from '../actions/shoppingCartActions'
import { postSearchProducts, defaultSearchParams } from '../actions/searchActions'
import AddedToShoppingCartModal from './shoppingCart/AddedToShoppingCartModal';
import NotifyUserProductNotAvaliableModal from './NotifyUserProductNotAvaliableModal';
import Swiper from 'react-id-swiper';
import "../css/swiper.css"
import "../css/style.css"

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productQuantity: 1,
      isAddedToCartModalOpen: false,
      isNotifyUserModalOpen: false
    };
  }

  openNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: true })
  }

  closeNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: false })
  }

  openAddedToCartModal = () => {
    this.setState({ isAddedToCartModalOpen: true })
  }

  closeAddedToCartModal = () => {
    this.setState({ isAddedToCartModalOpen : false })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    ////console.log("productPage")
    //get product

    const { id } = this.context.router.params

    this.props.getProductById(id);
    this.loadScriptView(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    //need to update the product?
    if (nextProps.params.id !== this.props.params.id) {
      this.props.getProductById(nextProps.params.id)

    }

    //updates the related products
    if (nextProps.currentProduct !== this.props.currentProduct) {
      if (nextProps.currentProduct.Categoria !== null) {
          this.props.postSearchProducts({...defaultSearchParams, Count: 4, ProdutoCategoriaID: nextProps.currentProduct.Categoria.ID})
      }
    }

  }

    loadScriptView(id) {
         let script= document.createElement('script');
         script.type= 'text/javascript';
         script.textContent= "fbq('track', 'ViewContent', {content_ids: ['"+id+"'], content_type: 'product'});";
         script.async = true;
         script.setAttribute('id','ViewContent');
         document.body.appendChild(script);
    }

    loadScriptAdd(id){
      let script= document.createElement('script');
      script.type= 'text/javascript';
      script.textContent= "fbq('track', 'AddToCart', {content_ids: ['"+id+"'], content_type: 'product'});";
      script.async = true;
      script.setAttribute('id','AddToCart');
      document.body.appendChild(script);
    }

    componentWillUnmount(){
      //Quando retira o component do DOM remove também o script Facebook Pixel criado por ele
      let childScriptView = document.getElementById("ViewContent");
      let childScriptAdd = document.getElementById("AddToCart");
      document.body.removeChild(childScriptView);
      childScriptAdd === null ? console.log('no AddToCart') : document.body.removeChild(childScriptAdd);
    }

  render() {

    const { currentProduct, user, shoppingCartId } = this.props;

    if (!currentProduct || currentProduct.length === 0) {
      return (
        <p></p>
      )
    }

    const swiperParams = {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'
    }

    let swiperImages = [];
    for(let i = 1; i <= 4; i++) {
      if (currentProduct[`ImagemPlus${i}`]) {
        swiperImages.push(currentProduct[`ImagemPlus${i}`])
      }
    }

    return (
      <div>
        <div className="breadcrumb_wrap">
          <div className="container">
            <ul className="breadcrumb">
              <li><Link to="/" className="homepage-link" title="Voltar">Home</Link></li>
              <li><Link to="/produtos" title="Produtos">Produtos</Link></li>
              <li><span className="page-title">{currentProduct.Descricao}</span>
              </li>
            </ul>
          </div>
        </div>

        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-12">
                <div className="product_wrap">
                  <div className="row">
                    <div className="col-sm-5 col-md-4 product_images product_left">
                      <div className="elevatezoom_big_wrapper">
                        <div style={{height: 364, width: 364}} className="zoomWrapper">
                          <img id="elevatezoom_big" role="presentation" src={currentProduct.Imagem} data-zoom-image="//cdn.shopify.com/s/files/1/1436/8816/products/broadway_basketeers_fruit_and_nut_crate_gift_tray_1_grande.png?v=1471698189" style={{position: 'absolute'}} />
                        </div>
                        <div className="elevatezoom_big_clicker"></div>
                      </div>

                      <div id="elevatezoom_gallery" className="swiper-container swiper-container-horizontal">
                        {/* swiper trial, form react id  */}
                        {swiperImages.length > 0 ?
                          <Swiper { ...swiperParams } style={{transform: 'translate3d(-380px, 0px, 0px)', transitionDuration: '0ms'}}>
                            {swiperImages.map((img, i) => {
                              return (
                                <div key={i}>
                                  <img src={img} alt={currentProduct.Descricao} />
                                </div>
                              )
                            })}


                            {/* <a className="swiper-slide " href="#" data-swiper-slide-index={1} style={{width: 85, marginRight: 10}}>
                              <img src={currentProduct.ImagemPlus1} alt={currentProduct.Descricao} />
                            </a>
                            <a className="swiper-slide " href="#" data-swiper-slide-index={2} style={{width: 85, marginRight: 10}}>
                              <img src={currentProduct.ImagemPlus2} alt={currentProduct.Descricao} />
                            </a>
                            <a className="swiper-slide " href="#"  data-swiper-slide-index={3} style={{width: 85, marginRight: 10}}>
                              <img src={currentProduct.ImagemPlus3} alt={currentProduct.Descricao} />
                            </a>
                            <a className="swiper-slide " href="#" data-swiper-slide-index={4} style={{width: 85, marginRight: 10}}>
                              <img src={currentProduct.ImagemPlus4} alt={currentProduct.Descricao} />
                            </a> */}
                          </Swiper> : null
                        }

                      </div>
                    </div>

                    <div className="col-sm-7 col-md-8">
                      <form method="post" encType="multipart/form-data" id="product-actions">
                        <div className="product_info__wrapper">
                          <div className="product_info__left">
                            <h1 className="product_name">{currentProduct.Descricao}</h1>
                            <div className="options clearfix">
                              <div className="variants-wrapper hidden">
                                <div className="selector-wrapper">
                                 <select className="single-option-selector" data-option="option1" id="product-select-option-0">
                                   <option defaultValue="Default Title">Default Title</option>
                                 </select>
                                </div>
                                <select id="product-select" name="id" style={{display: 'none'}}>
                                  <option defaultValue={28022342279}>Default Title - $30.00</option>
                                </select>
                              </div>
                            </div>

                            <div className="product_details">
                              <p className="product_details__item product_weight"><b>Peso unitário:</b> <span id="product_weight">{currentProduct.Peso ? `${currentProduct.Peso} g` : "—"} </span></p>
                              <p className="product_details__item product_sku"><b>SKU:</b> <span id="product_sku">{currentProduct.Skus.length > 0 ? currentProduct.Skus[0].ID : "—" }</span></p>
                              <p className="product_details__item product_barcode"><b>Código:</b> <span id="product_barcode"> { currentProduct.Codigo || "—" } </span></p>
                            </div>

                            <div className="product_details">
                              <p className="product_details__item product_collections">
                                <b>Categorias: </b>
                                <Link to={`/produtos?categoria=${currentProduct.Categoria.ID}`}>{currentProduct.Categoria.Descricao}</Link>
                              </p>
                              {/* <p onClick={()=> {this.props.currentProductTypeFilter(currentProduct.ProdutoTipo); this.props.currentProductTypeFilter(currentProduct.ProdutoTipo.Descricao)}} className="product_details__item product_type">
                                <b>Tipo do produto: {currentProduct.ProdutoTipo || "—"}</b>
                              </p> */}
                              <p className="product_details__item product_vendor">
                                <b>Fornecedor: </b>
                                {currentProduct.Marca ? currentProduct.Marca.Descricao : "-"}
                              </p>
                              <p className="product_details__item product_tags"><b>Tags: </b>
                                {currentProduct.TagsBusca ? currentProduct.TagsBusca.map( tag => {
                                  return <span>{tag.Descricao}</span>
                                }) : "-"}
                              </p>
                            </div>
                         </div>
                         <div className="product_info__right">
                           <div id="product_price">
                            <p className="price product-price"><span className="money">{'R$ ' + this.props.currentProduct.PrecoVigente.toLocaleString('pt-br', { minimumFractionDigits: 2 }) + ' '}</span></p>
                            {/* <p className="product_details__item" id="product_quantity"><b className="aval_label">Disponibilidade:</b> <span className="notify_success"><b>{currentProduct.DisponivelLojaVirtual}</b> item(s)</span></p> */}
                            {this.props.currentProduct.Esgotado ?
                              <p className="alert-form-info" style={{ overflow: "hidden", display: "block" }}>Produto não disponível no estoque</p> : null
                            }
                          </div>
                          <div id="purchase">
                            {currentProduct.Esgotado ?
                              <button className="btn btn-cart" title="Avise-me" onClick={e => {
                                e.preventDefault();
                                this.openNotifyUserModal()

                              }}>Avise-me</button> :
                              <div>
                                <label htmlFor="quantity_form">Escolha a quantidade:</label>
                                <div className="quantity_box">
                                  <input id="quantity_form" name="quantity" value={this.state.productQuantity} readOnly="true" className="quantity_input" type="text" />
                                  <span onClick={() => this.state.productQuantity > 1 ? this.setState({...this.state, ProductQuantity: this.state.productQuantity--}) : this.state.productQuantity} className="quantity_modifier quantity_down"><i className="fa fa-minus" /></span>
                                  <span onClick={() => this.setState({ProductQuantity: this.state.productQuantity++})} className="quantity_modifier quantity_up"><i className="fa fa-plus" /></span>
                                </div>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  // disabled={this.props.currentProduct.Esgotado}
                                  this.openAddedToCartModal();
                                  // this.props.updateShoppingCartProduct(currentProduct, this.state.productQuantity);
                                  this.props.postAddProductToCartRequest(shoppingCartId, user, this.state.productQuantity, currentProduct.Skus[0].ID)
                                  this.loadScriptAdd(this.props.params.id);
                                }} className="btn btn-cart">Comprar</button>
                              </div>
                            }
                          </div>
                         </div>
                        </div>
                    </form>
                    </div>
                  </div>
                  {/*description, another row*/}
                  <div className="product_description">
                    <h3 className="product_description__title">Descrição</h3>
                    <div className="rte" itemProp="description">
                      <h4><span className="descricao">{currentProduct.Descricao}</span></h4>
                      <p>{currentProduct.DescricaoDetalhada}</p>
                      <p><strong>Você se surprenderá com nossos preços justos e entrega!</strong></p>
                    </div>
                  </div>
                  {/*description end, another row*/}
                  <p className="product_pagination">
                    <Link to={`/produtos/${currentProduct.ID + 1}`} className="btn product_next">Próximo Produto →</Link>
                  </p>

                  {/*related products*/}
                  <div className="widget_related_products">
                    <h3>Produtos relacionados</h3>
                    <div className="widget_content">
                      <ul className="row product_listing_main product_listing_related">
                        { this.props.relatedProducts ? this.props.relatedProducts.map(product => {
                          return (
                            <li className="col-sm-3 product product__1" key={product.ID}>
                              <div className="product_wrapper">
                                <div className="product_img">
                                  <Link to={`/produtos/${product.ID}`} title={product.Descricao}>
                                    <img src={product.Imagem} alt={product.Descricao} />
                                  </Link>
                                </div>
                                <div className="product_info">
                                  <div className="product_name">
                                    <Link to={`/produtos/${product.ID}`} title={product.Descricao}>{product.Descricao}</Link>
                                  </div>
                                  <div className="product_price"><span className="money">R$ {product.PrecoVigente.toLocaleString("pt-br", { minimumFractionDigits : 2})}</span></div>
                                </div>
                              </div>
                            </li>
                        )}) : ""}
                      </ul>
                    </div>
                  </div>
                </div>

                <AddedToShoppingCartModal
                   isOpen={this.state.isAddedToCartModalOpen}
                   onClose={() => this.closeAddedToCartModal()}
                   product={currentProduct}
                   productQuantity={this.state.productQuantity} />

              </div>
            </div>
          </div>
        </div>
        { this.state.isNotifyUserModalOpen === true ? <NotifyUserProductNotAvaliableModal
                                                        closeModal={this.closeNotifyUserModal}
                                                        productId={currentProduct.ID} /> : null }
      </div>
    );

  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      currentProduct: state.products.currentProduct,
      relatedProducts: state.search.ProdutoBuscaItens,
      user: state.login.user,
      shoppingCartId: state.shoppingCart.shoppingCartId
    };
};

// const mapDispatchProps = (dispatch) => {
//     return {
//       currentProductTypeFilter: type => dispatch(saleActions.currentProductTypeFilter(type)),
//       currentCategory: category => dispatch(saleActions.currentCategory(category)),
//       setCurrentProductTypeFilter: type => dispatch(saleActions.currentProductTypeFilter(type)),
//       getProductById: id => dispatch(getProductById(id)),
//       updateShoppingCartProduct: (product, quantity) => dispatch(updateShoppingCartProduct(product, quantity)),
//       postSearchProducts: (props) => dispatch(postSearchProducts(props))
//     };
// };

export default connect(mapStateToProps, {
  currentProductTypeFilter,
  currentCategory,
  getProductById,
  updateShoppingCartProduct,
  postSearchProducts,
  postAddProductToCartRequest
})(Product);
