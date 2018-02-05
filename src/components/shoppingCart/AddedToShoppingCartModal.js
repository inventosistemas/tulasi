import React, { Component } from 'react'
import { Link } from "react-router"
import { connect } from 'react-redux'

class QuickViewComponent extends Component {

  renderModal() {
    const { isPostingAddProductToCart } = this.props;
    return (
      <div className="quick_view__left">
        {isPostingAddProductToCart ? <p>Adicionando à cesta</p> :
          <div>
            <div id="cart_added">
              <h4>Produto adicionado à cesta</h4>
              <div className="cart_added__row">
                <div className="cart_added__1" id="cart_added__img">
                  <img src={this.props.product.Imagem} alt={this.props.product.ImagemAlt} />
                </div>
                <div className="cart_added__2">
                  <span id="cart_added__name" className="product_name" />
                  <p id="cart_added__quantity">Quantidade: {this.props.productQuantity ? this.props.productQuantity : 1}
                    <span />
                  </p>
                  <Link className="btn" to="/carrinho">Ir para cesta</Link>
                  <a className="btn btn-alt" id="cart_added__close" onClick={e => this.close(e)}>Continuar comprando</a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderError() {
    return (
      <p>Não foi possível adicionar ao carrinho</p>
    )
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }
    
    return (
      <div className="fancybox-overlay fancybox-overlay-fixed" style={{display: 'block', width: 'auto', height: 'auto'}}>
        <div id="quick_view__wrap" className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center" tabIndex={-1} style={{width: 728, height: 'auto', position: 'relative', opacity: 1, overflow: 'visible'}}>
          <div className="fancybox-skin" style={{padding: 15, width: 'auto', height: 'auto'}}>
            <div className="fancybox-outer">
              <div className="fancybox-inner" style={{overflow: 'auto', width: 400, height: 'auto'}}>
                <div id="product_quick_view" style={{}}>
                  <div className="product_quick_wrapper">
                    {this.props.postAddProductToCartError ? this.renderError() : this.renderModal()}
                  </div>
                </div>
              </div>
            </div>
            {this.props.postAddProductToCartError ?
              <a title="Fechar" className="fancybox-item fancybox-close" onClick={e => this.close(e)} /> : null }
          </div>
        </div>
      </div>
    );
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isPostingAddProductToCart: state.shoppingCart.isPostingAddProductToCart,
    postAddProductToCartError: state.shoppingCart.postAddProductToCartError
  }
}

export default connect(mapStateToProps, null)(QuickViewComponent)
