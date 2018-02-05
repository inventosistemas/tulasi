/* eslint-disable */
import React, { Component } from 'react'
import { Link } from 'react-router'
import Swiper from "react-id-swiper";
import NotifyUserProductNotAvaliableModal from './NotifyUserProductNotAvaliableModal';


export default class QuickViewComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemQuantity: 1,
      isNotifyUserModalOpen: false
    }
  }

  openNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: true })
  }

  closeNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: false })
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    //for swiper
    // const swiperParams = {
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true,
    //   spaceBetween: 30,
    //   slidesPerView: 1
    // }

    const { product } = this.props;

    // let modalStyle = {
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   zIndex: '9999',
    //   background: '#fff'
    // }

    // let backdropStyle = {
    //   position: 'absolute',
    //   width: '100%',
    //   height: '100%',
    //   top: '0px',
    //   left: '0px',
    //   zIndex: '9998',
    //   background: 'rgba(0, 0, 0, 0.3)'
    // }

    const params = {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 30,
      slidesPerView: 3,
      autoHeight: true
    }

    let swiperImages = [];
    for(let i = 0; i <= 3; i++) {
      if (product[`ImagemPlus${i+1}`]) {
        swiperImages.push(product[`ImagemPlus${i+1}`])
      }
    }

    //console.log("quickview product:")
    //console.log(this.props.product)
    return (
      <div className="fancybox-overlay fancybox-overlay-fixed" style={{display: 'block', width: 'auto', height: 'auto'}}>
        <div id="quick_view__wrap" className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center" tabIndex={-1} style={{width: 728, height: 'auto', position: 'relative', opacity: 1, overflow: 'visible'}}>
          <div className="fancybox-skin aviseme" style={{padding: 15, width: 'auto', height: 'auto'}}>
            <div className="fancybox-outer">
              <div className="fancybox-inner" style={{overflow: 'auto', width: 668, height: 'auto'}}>
                <div id="product_quick_view" style={{}}>
                  <div className="product_quick_wrapper">
                    <div className="quick_view__left">
                      <div id="img_big"><img src={product.Imagem} alt={product.ImagemAlt} /></div>
                      <div className="product_images">
                        <div id="img_gallery" className="swiper-container swiper-container-horizontal">
                          {swiperImages.length > 0 ?
                            <Swiper {...params} style={{transform: 'translate3d(-312px, 0px, 0px)', transitionDuration: '0ms'}}>
                              <a className="swiper-slide swiper-slide-active" href={product.ImagemPlus1} data-swiper-slide-index={0} style={{width: 94, marginRight: 10}}><img src={product.ImagemPlus1} alt={product.ImagemAltPlus1} /></a>
                              <a className="swiper-slide swiper-slide-next" href={product.ImagemPlus2} data-swiper-slide-index={1} style={{width: 94, marginRight: 10}}><img src={product.ImagemPlus2} alt={product.ImagemAltPlus2} /></a>
                              <a className="swiper-slide" href={product.ImagemPlus3} data-swiper-slide-index={2} style={{width: 94, marginRight: 10}}><img src={product.ImagemPlus3} alt={product.ImagemAlt} /></a>
                            </Swiper> : null }

                          <div id="img_gallery__prev" className="swiper_btn btn_prev" />
                          <div id="img_gallery__next" className="swiper_btn btn_next" />
                        </div>
                      </div>
                    </div>
                    <div className="quick_view__right">
                      <div>{this.props.children}</div>
                      <form action="/cart/add" method="post" encType="multipart/form-data" id="product-actions" className="quick_view_form">
                        <p id="quick_view__name" className="product_name">
                          <Link to={`/produtos/${product.ID}`}>{product.Descricao}</Link>
                        </p>
                        {/* <p id="quick_view__type">
                          <label>Tipo do produto:</label>
                          <span>{product.ProdutoTipo ? product.ProdutoTipo.Descricao : ""}</span>
                        </p> */}
                        <p id="quick_view__vendor">
                          <label htmlFor>Marca:</label>
                          <span>{product.Marca ? product.Marca.Descricao : ""}</span></p>
                        <p id="quick_view__price" className="product_price">
                          <span className="money">R$ {product.PrecoVigente.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                        </p>
                        {product.Esgotado ?
                          <p className="alert-form-info" style={{ overflow: "hidden", display: "block" }}>Produto não disponível no estoque</p> : null
                        }
                        <div id="quick_view__form">
                          {!product.Esgotado ?
                            <div>
                              <label htmlFor="quantity">Escolha a quantidade:</label>
                              <div className="quantity_box">
                                <input min={1} type="text" name="quantity" value={this.state.itemQuantity} className="quantity_input" readOnly="readonly"/>
                                <span className="quantity_modifier quantity_down" onClick={() => { (this.state.itemQuantity > 1) ? this.setState({ ...this.state, itemQuantity: this.state.itemQuantity - 1 }) : 0 } }> <i className="fa fa-minus" /></span>
                                <span className="quantity_modifier quantity_up" onClick={() => { this.setState({...this.state, itemQuantity: this.state.itemQuantity + 1})}}><i className="fa fa-plus" /></span>
                              </div>
                            </div> : null }
                            {product.Esgotado ?
                              <button className="btn btn-cart" title="Avise-me" onClick={e => {
                                e.preventDefault();
                                this.openNotifyUserModal()

                              }}>Avise-me</button> :
                              <button className="btn btn-cart" id="quick_view__add"
                                onClick={
                                  (e) => {
                                    e.preventDefault();
                                    //console.log("vai adicionar ao comprar qv");

                                    if(this.props.onBuyClick) {
                                      this.props.onBuyClick(this.state.itemQuantity);
                                    }
                                    this.close(e);
                                    this.props.openAddedToCartModal(this.state.itemQuantity);

                                  }
                                }>Comprar</button>
                            }
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a title="Fechar" className="fancybox-item fancybox-close" onClick={e => this.close(e)} />
          </div>
        </div>
        { this.state.isNotifyUserModalOpen === true ? <NotifyUserProductNotAvaliableModal
                                                        closeModal={this.closeNotifyUserModal}
                                                        productId={product.ID} /> : null }
      </div>
    );
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
      this.setState({ itemQuantity: 1 })
    }
  }
};

/*
<div className="fancybox-overlay fancybox-overlay-fixed" style={{display: 'block', width: 'auto', height: 'auto'}}>
  <div id="quick_view__wrap" className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened" tabIndex={-1} style={{width: 728, height: 'auto', position: 'absolute', top: 243, left: 98, opacity: 1, overflow: 'visible'}}>
    <div className="fancybox-skin" style={{padding: 15, width: 'auto', height: 'auto'}}>
      <div className="fancybox-outer">
        <div className="fancybox-inner" style={{overflow: 'auto', width: 668, height: 'auto'}}>
          <div id="product_quick_view" style={{}}>
            <div className="product_quick_wrapper">
              <div className="quick_view__left">
                <div id="img_big"><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_1.png?v=1471698224" alt /></div>
                <div className="product_images">
                  <div id="img_gallery" className="swiper-container swiper-container-horizontal">
                    <div className="swiper-wrapper" style={{transform: 'translate3d(-312px, 0px, 0px)', transitionDuration: '0ms'}}>
                      <a className="swiper-slide swiper-slide-duplicate" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" data-swiper-slide-index={2} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-duplicate" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_4.png?v=1471698224" data-swiper-slide-index={3} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_4.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-duplicate swiper-slide-prev" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_5.png?v=1471698224" data-swiper-slide-index={4} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_5.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-active" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_1.png?v=1471698224" data-swiper-slide-index={0} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_1.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-next" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_2.png?v=1471698224" data-swiper-slide-index={1} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_2.png?v=1471698224" alt /></a>
                      <a className="swiper-slide" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" data-swiper-slide-index={2} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" alt /></a>
                      <a className="swiper-slide" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_4.png?v=1471698224" data-swiper-slide-index={3} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_4.png?v=1471698224" alt /></a>
                      <a className="swiper-slide" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_5.png?v=1471698224" data-swiper-slide-index={4} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_5.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-duplicate" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_1.png?v=1471698224" data-swiper-slide-index={0} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_1.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-duplicate" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_2.png?v=1471698224" data-swiper-slide-index={1} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_2.png?v=1471698224" alt /></a>
                      <a className="swiper-slide swiper-slide-duplicate" href="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" data-swiper-slide-index={2} style={{width: 94, marginRight: 10}}><img src="//cdn.shopify.com/s/files/1/1436/8816/produtos/cute_christmas_gift_basket_3.png?v=1471698224" alt /></a>
                    </div>
                    <div id="img_gallery__prev" className="swiper_btn btn_prev" />
                    <div id="img_gallery__next" className="swiper_btn btn_next" />
                  </div>
                </div>
              </div>
              <div className="quick_view__right">
                <form action="/cart/add" method="post" encType="multipart/form-data" id="product-actions" className="quick_view_form">
                  <p id="quick_view__name" className="product_name"><a href="/produtos/cute-christmas-gift-basket">Cute Christmas Gift Basket</a></p>
                  <p id="quick_view__type"><label htmlFor>Product type:</label> <span>Peaches</span></p>
                  <p id="quick_view__vendor"><label htmlFor>Vendor:</label> <span>Cute</span></p>
                  <p id="quick_view__variants" style={{display: 'none'}}><label htmlFor>Options:</label>
                  </p>
                  <div className="selector-wrapper">
                    <select className="single-option-selector" data-option="option1" id="product-select-option-0">
                      <option value="Default Title">Default Title</option>
                    </select>
                  </div>
                  <select id="product-select" name="id" className="hidden" style={{display: 'none'}}><option value={28022369159}>Default Title - 2500</option></select><p />
                  <p id="quick_view__price" className="product_price"><span className="money" data-currency-usd="$25.00">$25.00</span></p>
                  <p id="quick_view__availability"><label htmlFor>Availability:</label> <span className="notify_success"><b>1</b> item(s)</span></p>
                  <div id="quick_view__form"><label htmlFor="quantity">Choose quantity:</label>
                    <div className="quantity_box">
                      <input min={1} type="text" name="quantity" defaultValue={1} className="quantity_input" />
                      <span className="quantity_modifier quantity_down"><i className="fa fa-minus" /></span>
                      <span className="quantity_modifier quantity_up"><i className="fa fa-plus" /></span>
                    </div>
                      <button className="btn btn-cart" type="submit" id="quick_view__add">Add to cart</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a title="Close" id="quick_view__close" className="fancybox-item fancybox-close" href="javascript:;" />
    </div>
  </div>
</div>
*/
