import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Category from "./CategoryComponent"
import {currentCategory} from '../actions/saleActions';
import {fetchProductsSubCategoriesById } from '../actions/categoryActions';

import Breadcrumb from './reusable/breadcrumbComponent';
import "../css/syligo.css"

class Products extends Component {

  render() {
    const pageTitle = "Produtos";

    const { categories } = this.props;
    if (!categories || categories.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      )
    }

    //checks the subroute -> ProductComponent
    if (this.props.children) {
      return this.props.children
    }

    //handle the category query ->
    if (this.props.location.query.categoria) {
      return (
          <Category categoryId={this.props.location.query.categoria}/>
      )
    }

    return (
      <div>
        {/* BREADCRUMBS */}
        <Breadcrumb pageTitle={pageTitle}/>
        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-12">
                <h1 className="page_heading">Categorias</h1>
                <div className="collection_listing_main">
                  <div className="row">
                    {categories.map(category => {
                      return (
                        <span key={category.ID}>
                          <div className="col-xs-6 col-sm-3 collection_listing_item ">
                            <div className="collection_img">
                              <Link to={`/produtos?categoria=${category.ID}`}>
                                <img src={category.Imagem} alt={category.ImagemAlt} />
                              </Link>
                            </div>
                            <div className="collection_info">
                              <Link to={`/produtos?categoria=${category.ID}`}>
                                <p className="collection_name">{category.Descricao}</p>
                                <p className="collection_desc">{`${category.Texto.substring(0,60)}...`}</p>
                                <span className="btn">
                                  VER PRODUTOS
                                </span>
                              </Link>
                            </div>
                          </div>
                        </span>
                      )
                    })}
                  </div>
                </div>
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
      categories: state.products.fullProductsCategories
    };
};

export default connect(mapStateToProps, {currentCategory, fetchProductsSubCategoriesById})(Products);
