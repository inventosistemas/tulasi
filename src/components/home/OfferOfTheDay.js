import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { postAddProductToCartRequest } from '../../actions/shoppingCartActions'
import QuickViewComponent from '../QuickViewComponent'

class OfferOfTheDay extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen : false })
  }

  render() {

    const { offerOfTheDay } = this.props;

    if (!offerOfTheDay || offerOfTheDay.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      )
    }

    //console.log("offer of the day")
    //console.log(offerOfTheDay)
    const product = offerOfTheDay[0].Itens[0].Produto;

    const Tags = (tags) => {
      if (!tags || tags.length === 0) {
        return (
          <div>
          </div>
        )
      } else {
        return (
          <div>
            {tags.map(tag => {
              return (
                <div>
                  <b>Tags: </b>
                    <span>{tag.Descricao}</span>
                </div>
                )
             })}
          </div>
        )
      }
    }

    return (
        <section className="product_offer_wrapper">
          <div className="container">
            <h2 className="section_header">Cesta Tulasi</h2>
            <p className="text">Uma cesta de alimentos orgânicos e artesanais. Você escolhe e a gente entrega!</p>
            <div className="product_offer__product">
              <div className="product_img col-sm-6">
                <Link to={`/produtos/${product.ID}`}>
                  <img src={product.Imagem} alt={product.ImagemAlt} />
                </Link>
              </div>
              <div className="product_info col-sm-6">
                <div className="title2">
                  <Link to={`/produtos/${product.ID}`}>
                    {product.Descricao}
                  </Link>
                </div>
                <div>
                  {product.DescricaoDetalhada}
                </div>
                <div className="product_price">
                  <span className="money">{`R$ ${product.PrecoVigente.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`}</span>
                </div>
                <div className="product_collections">
                  {product.Categoria === null ? null :
                    <div>
                      <b>Categoria: </b>
                      <Link to={`/produtos?categoria=${product.Categoria.ID}`}>
                        {product.Categoria.Descricao}
                      </Link>
                    </div>
                  }
                </div>
                <div className="product_tags">
                  {Tags(product.Subcategoria)}
                </div>
                <div className="product_links">
                  <form method="post">
                    <input name="id" defaultValue={28022369159} type="hidden" />
                    <button className="btn btn-cart" type="submit" title="Comprar"
                      onClick={
                        (e) => {
                          e.preventDefault();
                          this.props.postAddProductToCartRequest(this.props.shoppingCartId, this.props.user, 1, product.Skus[0].ID);
                          localStorage.getItem('state');
                        }
                      }>
                      <i className="icon tulasi-cesta-vetor" />Comprar
                  </button>
                  </form>
                  <div className="product_links_icons">
                    <button className="btn quick_view_btn btn_icon" title="Visualizar" onClick={() => this.openModal()}>
                      <i className="fl-outicons-eye130" aria-hidden="true" />
                    </button>
                    <QuickViewComponent
                      isOpen={this.state.isModalOpen}
                      onClose={() => this.closeModal()}
                      product={product}
                      onBuyClick={ amount => {
                        //console.log("onbuyclick product card");
                        //console.log(product)
                        this.props.postAddProductToCartRequest(this.props.shoppingCartId, this.props.user, amount, product.Skus[0].ID)
                      }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      offerOfTheDay: state.products.offerOfTheDay,
      shoppingCartId: state.shoppingCart.shoppingCartId,
      user: state.login.user,
    };
};

export default connect(mapStateToProps, { postAddProductToCartRequest })(OfferOfTheDay);
