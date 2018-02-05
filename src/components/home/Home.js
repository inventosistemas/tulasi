import React, { Component } from 'react';
import { connect } from 'react-redux';
import BannersSwiper from './BannersSwiper';
import PopularCategories from './PopularCategories';
import WhyChooseUs from './WhyChooseUs';
import FeaturedProducts from './FeaturedProducts';
import QuickViewComponent from "../QuickViewComponent";
import { postAddProductToCartRequest } from '../../actions/shoppingCartActions'
import AddedToShoppingCartModal from '../shoppingCart/AddedToShoppingCartModal';


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      productFromFeaturedProducts: null,
      isQuickViewModalOpen: false,
      isAddedToCartModalOpen: false,
      productQuantity: 1
    }
  }

  setProductFromFeaturedProducts = (product) => {
    //console.log("setProductFromFeaturedProducts");
    this.setState({productFromFeaturedProducts: product})
  }

  openQuickViewModal = () => {
    this.setState({ isQuickViewModalOpen: true })
  }

  openAddedToCartModal = (quantity) => {
    this.setState({ isAddedToCartModalOpen: true })
    if(Number.isInteger(quantity)) {
      this.setState({ productQuantity: quantity });
    }
  }

  closeQuickViewModal = () => {
    this.setState({ isQuickViewModalOpen : false })
  }

  closeAddedToCartModal = () => {
    this.setState({ isAddedToCartModalOpen : false })
  }


  render() {

    return (
      <div>
        <BannersSwiper />
        <PopularCategories />
        <WhyChooseUs />
        <FeaturedProducts openQuickViewModal={this.openQuickViewModal} openAddedToCartModal={this.openAddedToCartModal} product={this.setProductFromFeaturedProducts}/>
        <QuickViewComponent
          isOpen={this.state.isQuickViewModalOpen}
          openAddedToCartModal={this.openAddedToCartModal}
          onClose={() => this.closeQuickViewModal()}
          product={this.state.productFromFeaturedProducts}
          productSelected={this.setProductFromFeaturedProducts}
          onBuyClick={ amount => {
            //console.log("onbuyclick product card");
            //console.log(this.state.productFromFeaturedProducts)
            //console.log('this.props.shoppingCartId', this.props.shoppingCartId)
            this.props.postAddProductToCartRequest(this.props.shoppingCartId, this.props.user, amount, this.state.productFromFeaturedProducts.SkusID[0].ID)
          }}/>
        <AddedToShoppingCartModal
           isOpen={this.state.isAddedToCartModalOpen}
           onClose={() => this.closeAddedToCartModal()}
           product={this.state.productFromFeaturedProducts}
           productQuantity={this.state.productQuantity} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.login.user,
    shoppingCartId: state.shoppingCart.shoppingCartId
  }
}

export default connect(mapStateToProps, { postAddProductToCartRequest })(Home);
