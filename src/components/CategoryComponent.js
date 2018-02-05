import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from './reusable/Sidebar';
import ProductsList from './category/ProductsList';
import Breadcrumb from './reusable/breadcrumbComponent';
import { getProductsByCategoryRequest } from '../actions/productsActions';
import { fetchProductsSubCategoriesById } from '../actions/categoryActions'
import {  getCategoryById } from '../actions/categoryActions'
import ModalComponent from "./reusable/ModalComponent"

class Category extends Component {
  //1- deve checar se tem no state uma categoria
  //2- se não tiver, deve dar fetch da Categorias
  //3- se tiver, deve dar fetch da sidebar / render
  //4- se tiver, preencher a porção do meio
  //5 - mostrar loading

  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    activeTab: -1,
    numberOfProductsByPagination: 6,
    productsCardList: false,
    toggle: 'grid',
    paginationActivePage: 0,
    sortBy: 'availability'
  }

  tagActive = (index) => {
    return (index === this.state.activeTab) ? "active" : "";
  }

  componentWillMount(){
    const {fetchProductsSubCategoriesById, subcategories} = this.props;

    //1 check for category
    // if (!currentCategory) {
    //   //console.log("sem currentCategory")
    //   this.props.getCategoryById(this.props.categoryId)
    // }

    //1 gets the current category information
    this.props.getCategoryById(this.props.categoryId)

    //2 check for subcategories
    if (!subcategories || subcategories.length === 0) {
      fetchProductsSubCategoriesById(this.props.categoryId);
    }

    //3 gets all the products in this category
    this.props.getProductsByCategoryRequest(this.props.categoryId);
  }

  componentWillReceiveProps(nextProps){
      if (this.props.currentCategory !== nextProps.currentCategory) {
        this.setState({
          activeTab: -1,
          paginationActivePage: 0
        })
      }

      //if the category changed, then bring everything again
      if (nextProps.categoryId !== this.props.categoryId){
        //time to update the state
        this.props.getCategoryById(nextProps.categoryId)
        this.props.fetchProductsSubCategoriesById(nextProps.categoryId);
        this.props.getProductsByCategoryRequest(nextProps.categoryId);
      }
  }

  productsFilter(products) {

    let filtered = this.state.numberOfProductsByPagination === "all" ? products.ProdutoBuscaItens : products.ProdutoBuscaItens.slice(this.state.numberOfProductsByPagination * this.state.paginationActivePage, parseInt(this.state.numberOfProductsByPagination, 10) + this.state.paginationActivePage * parseInt(this.state.numberOfProductsByPagination, 10))

    if (this.state.sortBy === "price-ascending") {
      filtered = filtered.sort(function (a, b) {
        if (a.PrecoVigente > b.PrecoVigente) {
          return 1;
        }
        if (a.PrecoVigente < b.PrecoVigente) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    if(this.state.sortBy === "price-descending") {

      filtered = filtered.sort((a, b) => {
        if (a.PrecoVigente < b.PrecoVigente) {
          return 1;
        }
        if (a.PrecoVigente > b.PrecoVigente) {
          return -1;
        }
        return 0;
      })
    }

    if(this.state.sortBy === "title-ascending") {
      filtered.sort((a, b) => {
        var nameA = a.Descricao.toUpperCase();
        var nameB = b.Descricao.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })

    }

    if(this.state.sortBy === "title-descending") {
      filtered.sort((a, b) => {
        let nameA = a.Descricao.toUpperCase();
        let nameB = b.Descricao.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      })

    }

    if(!!this.props.currentProductTypeFilter) {
      filtered = filtered.filter((product) => {
        return product.ProdutoTipo.Descricao === this.props.currentProductTypeFilter;
      })
    }

    return filtered;

  }

  productsCount(products) {
    if (!products) {
      return;
    }
    return `${this.state.numberOfProductsByPagination * this.state.paginationActivePage+1}–${(parseInt(this.state.numberOfProductsByPagination, 10) + this.state.paginationActivePage * parseInt(this.state.numberOfProductsByPagination, 10)) <= products.ProdutoBuscaItens.length ? (parseInt(this.state.numberOfProductsByPagination, 10) + this.state.paginationActivePage * parseInt(this.state.numberOfProductsByPagination, 10)) : products.ProdutoBuscaItens.length} produtos de ${products.ProdutoBuscaItens.length}`
  }

  pagination(products) {
    if (!products) {
      return;
    }
    return [...Array(Math.ceil(products.ProdutoBuscaItens.length > this.state.numberOfProductsByPagination ? products.ProdutoBuscaItens.length / this.state.numberOfProductsByPagination : 1))].map((products, i) => {
      if(i === this.state.paginationActivePage) {
        return (
          <span key={i} className="page current">{i+1}</span>
        )
      }
      return (
        <span key={i} onClick={() => this.setState({paginationActivePage: i})} className="page"><a title="">{i+1}</a></span>
      )
    })
  }


  render() {

    const { subcategories, productsByCategory, currentCategory } = this.props;

    if (this.props.isGettingCategorySubcategories === true || !currentCategory) {
      console.log("sem subcategorias :(")
      //console.log(subCategories)
      return (
        <ModalComponent modalType="MODAL_LOADING" />
      )
    }

    //console.log("currentCategory")
    //console.log(currentCategory)

    return (
      <div>
        <Breadcrumb pageTitle="Produtos"/>

        {/* //Modal */}
        {this.props.isGettingProductsByCategory === true ? <ModalComponent modalType="MODAL_LOADING" /> : null}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content col-sm-9 col-sm-push-3">
                <h1 className="page_heading">{currentCategory.Descricao}</h1>
                <ul className="tags clearfix syligo-topbar-cursor">
                  {/* //botão todos */}
                  <li className={this.tagActive(-1)} onClick={() => {
                    this.setState({
                      ...this.state,
                      activeTab: -1,
                      paginationActivePage: 0
                    });
                    this.props.getProductsByCategoryRequest(currentCategory.ID);
                  }}>
                    <a>Todos</a>
                  </li>
                  {/* //demais tags */}
                  {subcategories.map(item => {
                    return (
                      <li className={this.tagActive(item.ID)} key={item.ID}>
                        <a onClick={() => {
                          this.props.getProductsByCategoryRequest(null, item.ID);
                          this.setState({activeTab: item.ID});
                          this.setState({paginationActivePage: 0})
                        }} title={item.Texto}>{item.Descricao}</a>
                      </li>
                    )
                  })}
                </ul>
                {/* //end of the topbar */}
                  <div className="row collection_info">
                    <div className="col-sm-5 collection_img">
                      <img src={currentCategory.Imagem} alt={currentCategory.Descricao} />
                    </div>
                    <div className="col-sm-7 collection_desc">
                      <div className="rte">
                        <div>
                          <p>{currentCategory.Texto}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* products sorting */}
                  <div className="product_listing_controls">
                    <div id="pagination_scrollto" />
                    <ul className="product_listing_toggle">
                      <li onClick={() => this.setState({toggle: "grid"})} id="toggle_grid" className={this.state.toggle === "grid" ? "active" : ""}><i className="fa fa-th" />
                      </li>
                      <li onClick={() => this.setState({toggle: "list"})} id="toggle_list" className={this.state.toggle === "list" ? "active" : ""}><i className="fa fa-th-list active" />
                      </li>
                    </ul>
                    <div className="sort_by">
                      <label>Organizar por</label>
                      <select value={this.state.sortBy} readOnly={true} onChange={ e => this.setState({sortBy: e.target.value})} id="sort_by_select" className="form-control">
                        {/*<option value="best-selling">Best selling</option>
                        <option value="title-ascending">Name: A to Z</option>
                        <option value="title-descending">Name: Z to A</option>
                        <option value="price-ascending">Price: low to high</option>
                        <option value="price-descending">Price: high to low</option>
                        <option value="created-ascending">Oldest to newest</option>
                        <option value="created-descending">Newest to oldest</option>*/}
                        <option value="title-ascending">Nome: A a Z</option>
                        <option value="title-descending">Nome: Z a A</option>
                        <option value="price-ascending">Preço: menor para maior</option>
                        <option value="price-descending">Preço: maior para menor</option>

                      </select>
                    </div>
                    <div className="show_products">
                      <label>Mostrar</label>
                      <select value={this.state.numberOfProductsByPagination} onChange={ e => this.setState({numberOfProductsByPagination: e.target.value})} id="show_products_select" className="form-control">
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={15}>15</option>
                        <option value={"all"}>Todos</option>
                      </select>
                    </div>
                  </div>
                  <div id="product_listing_preloader" className="loader_off">
                    <div className="global_loader" />
                  </div>
                  <div id="collection_sorted" style={{opacity: 1}}>
                    <div className={this.state.toggle === "list" ? "product_listing_main row view_list" : "product_listing_main row"}>
                      { !productsByCategory || productsByCategory.length === 0 ?
                        <div>
                          <p></p>
                        </div>
                      :
                        <ProductsList products={this.productsFilter(productsByCategory)} />
                      }
                    </div>
                    <div className="product_listing_controls">
                      <p className="products_count"> {this.productsCount(productsByCategory)} </p>
                      <div id="pagination">
                        {this.pagination(productsByCategory)}
                      </div>
                    </div>
                  </div>
                </div>
              {/* //adds the sidebar */}
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      isGettingProductsByCategory: state.products.isGettingProductsByCategory,
      subcategories: state.category.subcategories,
      productsByCategory: state.products.productsByCategory,
      currentCategory: state.category.currentCategory,
      categories: state.products.fullProductsCategories,
      currentProductTypeFilter: state.sale.currentProductTypeFilter,
      isGettingCategorySubcategories: state.category.isGettingCategorySubcategories
    };
}

export default connect(mapStateToProps, {
  fetchProductsSubCategoriesById,
  getCategoryById,
  getProductsByCategoryRequest
})(Category);
