import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import QuickViewComponent from "../QuickViewComponent"
import { postAddProductToCartRequest } from '../../actions/shoppingCartActions'
import AddedToShoppingCartModal from '../shoppingCart/AddedToShoppingCartModal';
import NotifyUserProductNotAvaliableModal from '../NotifyUserProductNotAvaliableModal';
import styled from 'styled-components'

const SpanProductDiscount = styled.span`
    margin: 20px;
`

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isQuickViewModalOpen: false,
      isAddedToCartModalOpen: false,
      isNotifyUserModalOpen: false
    }
  }

  openQuickViewModal = () => {
    this.setState({ isQuickViewModalOpen: true })
  }

  openAddedToCartModal = () => {
    this.setState({ isAddedToCartModalOpen: true })
  }

  openNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: true })
  }

  closeQuickViewModal = () => {
    this.setState({ isQuickViewModalOpen : false })
  }

  closeAddedToCartModal = () => {
    this.setState({ isAddedToCartModalOpen : false })
  }

  closeNotifyUserModal = () => {
    this.setState({ isNotifyUserModalOpen: false })
  }

  render() {

    const { product, shoppingCartId, user } = this.props;

    const saleBadge = () => {
      if (product.PercentualDesconto !== undefined && product.PercentualDesconto !== 0) {
        return <SpanProductDiscount className="product_badge sale">{product.PercentualDesconto.toFixed(0) + '%' || ''}</SpanProductDiscount>
      }
    }

    return (
      <div className={this.props.customClass}>
        <div className="product_wrapper">
          <div className="product_img">
            <div className="img_change button">
              <span className="product_img__wrapper">
                <Link to={`/produtos/${product.ID}`}>
                  <img src={product.Imagem} alt={product.Alt} className={this.props.fromFeaturedProducts ? null : "syligo-product-card-image"} />
                </Link>
              </span>
              {product.Lancamento ? <span className="product_badge new">Lançamento</span> : ''}
              {saleBadge()}
            </div>
          </div>
          <div className="product_info">
            <div className="product_name">
              <Link to={`/produtos/${product.ID}`}>{product.Descricao}</Link>
            </div>
            <div className="product_price">
                <p>
                    {product.PercentualDesconto ?
                        <span>De<span className="money money_sale"> {product.PrecoDePor ? `R$ ${product.PrecoDePor.PrecoDe.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`: null}</span> por </span>
                    : null}
                    <span className="money">{`R$ ${product.PrecoVigente.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`}</span>
                </p>
            </div>
            <div>
              {product.Esgotado ?
                <p className="alert-form-info" style={{ overflow: "hidden", display: "block" }}>Produto não disponível</p>
                :
                <p className="alert-form-info" style={{ overflow: "hidden", display: "block", "color": "green" }}>Produto disponível</p>
              }
            </div>
            <div className="product_links">
              <form method="post">
                <input name="id" defaultValue={28022357255} type="hidden" />
                {product.Esgotado ?
                <button className="btn btn-cart" title="Avise-me" onClick={e => {
                  e.preventDefault();
                  this.openNotifyUserModal()

                }}>Avise-me</button> :
                <button onClick={(e) => {

                  this.setState({ isModalisAddedToShoppingCartModalOpenOpen: true });
                  // this.props.updateShoppingCartProduct(currentProduct, this.state.productQuantity);
                  e.preventDefault();


                  if(this.props.fromFeaturedProducts) {
                    this.props.productSelected(product)
                    this.props.openAddedToCartModal()
                  } else {
                    this.openAddedToCartModal()
                  }

                  if(this.props.fromFeaturedProducts && product.SkusID !== null) {
                    this.props.postAddProductToCartRequest(shoppingCartId, user, 1, product.SkusID[0].ID)
                  }

                  if (product.Skus !== null) {
                    ////console.log("quer comprar: skuid")
                    ////console.log(product.Skus)
                    this.props.postAddProductToCartRequest(shoppingCartId, user, 1, product.Skus[0].ID)
                  }

                }} className="btn btn-cart" title="Comprar">Comprar</button>
              }

              </form>
              <div className="product_links_icons">
                <button className="btn btn_icon quick_view_btn" href="" title="Visualizar" onClick={
                  () => {
                    if (this.props.fromFeaturedProducts) {
                      this.props.openQuickViewModal();
                      this.props.productSelected(product)
                    } else {
                      this.openQuickViewModal();
                    }
                  }
                }>
                  <i className="fl-outicons-eye130" aria-hidden="true" />
                </button>
                <AddedToShoppingCartModal
                   isOpen={this.state.isAddedToCartModalOpen}
                   onClose={() => this.closeAddedToCartModal()}
                   product={product} />

                <QuickViewComponent
                   isOpen={this.state.isQuickViewModalOpen}
                   openAddedToCartModal={this.openAddedToCartModal}
                   onBuyClick={ (amount=1) => {
                     this.props.postAddProductToCartRequest(shoppingCartId, this.props.user, amount, product.Skus[0].ID)
                   }}
                   onClose={() => this.closeQuickViewModal()}
                   product={product} />
              </div>
            </div>
          </div>
        </div>
        { this.state.isNotifyUserModalOpen === true ?
          <NotifyUserProductNotAvaliableModal
            closeModal={this.closeNotifyUserModal}
            productId={product.ID}
          />
          :
            null
          }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      user: state.login.user,
      shoppingCartId: state.shoppingCart.shoppingCartId,
    };
};

export default connect(mapStateToProps, {
  postAddProductToCartRequest,
})(ProductCard);
