import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { currentCategory } from '../../actions/saleActions';

class PopularCategories extends Component {

  render() {
    const { popularCategories } = this.props;

    if (!popularCategories || popularCategories.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      )
    }

    return (
      <section className="homepage_collections container">
        <h2 className="section_header">Principais Categorias</h2>
        <div className="row">
          <div className="flexbox">
            {popularCategories.map((category, i) => {
              return (
                <div className={`homepage_collection homepage_collection__${i+1} col-sm-4`} key={category.ID}>
                  <Link to={`/produtos?categoria=${category.ID}`} className="inside" onClick={() => {
                    //updates the state
                    this.props.currentCategory(category);
                  }}>
                    <div className="collection_text_wr">
                      <h4>{category.Descricao}</h4>
                      {/* <p className="collection_products">{category.QtdeProdutos} produto{category.QtdeProdutos > 1 ? "s" : ""}</p> */}
                    </div>
                  </Link>
                  <div className="collection_img"><img alt="Categoria" src={category.Imagem} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      popularCategories: state.products.productsCategories
    };
};

export default connect(mapStateToProps, { currentCategory })(PopularCategories);
