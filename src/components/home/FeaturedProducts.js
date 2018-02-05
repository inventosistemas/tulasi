import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../products/ProductCard';
import Swiper from "react-id-swiper";

class featuredProducts extends Component {
  render() {
    const { featuredProducts } = this.props;

    if (!featuredProducts || featuredProducts.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      )
    }

    const params = {
      // pagination: '.swiper-pagination', // pontinho
      paginationClickable: true,
      spaceBetween: 30,
      slidesPerView: 3
    }

    return (
      <div>
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content col-sm-12">
                <h2 className="section_header products_header">Campeões de Venda</h2>
                <section className="homepage_carousel">
                  <div id="homepage_carousel__1" className="swiper-container product_listing_main swiper-container-horizontal">
                    <div className="swiper-wrapper">
                      <div className="product product_homepage swiper-slide swiper-slide-duplicate">
                        <Swiper {...params}>
                          {featuredProducts.map(item => {
                            const { Produto } = item;
                            const product = Produto;
                            return (
                              <ProductCard fromFeaturedProducts={true} product={product} key={product.ID} openQuickViewModal={this.props.openQuickViewModal} openAddedToCartModal={this.props.openAddedToCartModal} productSelected={this.props.product}/>
                            )
                          })}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      featuredProducts: state.products.featuredProducts
    };
};


export default connect(mapStateToProps)(featuredProducts);
