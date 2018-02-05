import React, { Component } from 'react';
import ProductCard from '../products/ProductCard';

class ProductsList extends Component {

  render() {
    return (
      <span>
        {this.props.products.map(product => {
          return (
            <ProductCard
              customClass={"product col-xs-6 col-sm-12 col-md-4 product_collection item3_2 item2_2"}
              product={product}
              key={product.ID} />
          )
        })}
      </span>
    )

    }
}



export default ProductsList;
