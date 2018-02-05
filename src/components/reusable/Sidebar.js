import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as productsActions from '../../actions/productsActions';
import * as saleActions from '../../actions/saleActions';

class Sidebar extends Component {

  state = {
    activeCategory: '',
    activeType: -1
  }

  componentDidMount() {
    //console.log('MOUNTED')
    this.setState({activeCategory: this.props.currentCategoryData})

    // if (!this.props.categories || this.props.categories.length === 0) {
      //Caso seja digitado /casa ao invés de vir pela Route, o Redux-State não atualiza para uma subCategoria
      //this.props.fetchProductsSubCategoriesById(this.state.activeCategory); Comentando essa instrução retira o erro, mas não causa nenhum prejuízo ao componente
    // }
    if(this.props.currentCategoryData) {
      this.setState({activeCategory: this.props.currentCategoryData.Descricao})
    }
    if(this.props.currentProductTypeFilter) {
      this.setState({activeType: this.props.currentProductTypeFilter})
    }
  }

  render() {

    const { categories, bestSellers } = this.props;

    if (!categories || categories.length === 0) {

      return (
        <div>
          <p></p>
        </div>
      )
    }


    return (
      <div className="sidebar col-sm-3 sidebar_left col-sm-pull-9">
        <div className="sidebar_widget sidebar_widget__collections">
          <h3 className="widget_header">Categorias</h3>
          <div className="widget_content">
            <ul className="list_links syligo-topbar-cursor">

              {
                categories.map(category => {

                if (category.TotalProdutos > 0) {
                  return (
                    <li key={category.ID}>
                      <Link to={`/produtos?categoria=${category.ID}`} activeStyle={{ color: "#00a5d3" }}>{category.Descricao}</Link>
                      {/* <a onClick={() => {
                        //Caso seja digitado /casa ao invés de vir pela Route, o Redux-State não atualiza para uma subCategoria
                        //this.props.fetchProductsSubCategoriesById(category.ID); Comentando essa instrução retira o erro, mas não causa nenhum prejuízo ao componente
                        this.props.fetchProductsByCategory(category.ID);
                        this.props.currentCategory(category);
                        this.setState({activeCategory: category.Descricao})
                      }} title={category.Descricao}></a> */}
                    </li>
                  )
                } else {return null;}
              })}
            </ul>
          </div>
        </div>

        <div className="sidebar_widget sidebar_widget__products">
          <h3 className="widget_header">Campeões de vendas</h3>
          <div className="widget_content">
            <ul className="list_products">
              {bestSellers?bestSellers.map(productDetail => {
                const { Produto } = productDetail;
                const product = Produto;
                return (
                  <li className="product" key={product.ID}>
                    <div className="product_img">
                      <Link to={`/produtos/${product.ID}`} className="img_change button" onClick={() => this.props.currentProduct(product)}>
                        <img onClick={() => this.props.currentProduct(product)} src={product.Imagem} alt={product.Alt} />
                      </Link>
                    </div>
                    <div className="product_info">
                      <div className="product_name">
                        <Link to={`/produtos/${product.ID}`}>{product.Descricao}</Link>
                      </div>
                      <div className="product_price">
                        <span />
                        <span className="money" data-currency-usd="$30.00">{`R$ ${product.PrecoVigente.toLocaleString('pt-br', {minimumFractionDigits: 2})} `}</span>
                      </div>
                      <div className="product_links">
                        <Link to={`/produtos/${product.ID}`}>
                            <span className="btn">Visualizar</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              }):''} {/* caso na primeira renderização, antes de atualizar o estado da app, o bestSellers seja indefinido, não renderiza nada. Isso retira o erro de .map() undefined*/}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      categories: state.products.fullProductsCategories,
      currentCategoryData: state.sale.currentCategory,
      bestSellers: state.sale.bestSellers,
      currentProductTypeFilter: state.sale.currentProductTypeFilter,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
      currentCategory: category => dispatch(saleActions.currentCategory(category)),
      fetchProductsByCategory: categotyId => dispatch(productsActions.fetchProductsByCategory(categotyId)),
      setCurrentProductTypeFilter: type => dispatch(saleActions.currentProductTypeFilter(type)),
      currentProduct: product => dispatch(saleActions.currentProduct(product))
    };
};


export default connect(mapStateToProps, mapDispatchProps)(Sidebar);

/*
ESTE TRECHO DE CÓDIGO ESTAVA COMENTADO DENTRO DO RENDER, PORÉM PARTE DELE NÃO ERA COMPILADO COMO COMENTÁRIO
{<div className="sidebar_widget sidebar_widget__types">
  <h3 className="widget_header">Tipos de Produtos</h3>
  <div className="widget_content">
    <ul className="list_links">
      <li onClick={()=> {this.props.setCurrentProductTypeFilter(null); this.setState({"activeType": -1})}} className={this.state.activeType === -1 ? "Cherries active" : ""}><a title={"todos"}>Todos</a></li>
      {productTypes.map(type => {
        return (
          <li key={type.ID} onClick={()=> {this.props.setCurrentProductTypeFilter(type.Descricao); this.setState({"activeType": type.Descricao})}} className={this.state.activeType == type.Descricao ? "Cherries active" : ""}><a title="{type.Descricao}">{type.Descricao}</a></li>
        )
      })}

    </ul>
  </div>
</div>}
*/
