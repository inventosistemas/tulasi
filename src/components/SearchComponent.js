import React, { Component } from 'react'
import Sidebar from './reusable/Sidebar';
import Breadcrumb from './reusable/breadcrumbComponent';
import { connect } from 'react-redux';
import { postSearchProducts, defaultSearchParams } from '../actions/searchActions';
import { Link } from 'react-router';

class Search extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchValue: '',
      currentPaginationIndex: 0,
      totalPagination: 1
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.searchProps !== nextProps.searchProps){
      ////console.log('NextProps', nextProps.searchProps)
      this.loadScript(nextProps.searchProps.Chave);
      ////console.log('Veio estado')
    }

  }

  handleChange(event) {
    ////console.log(event.target.value);
    this.setState({ ...this.state, searchValue: event.target.value})
  }

  Pagination(){
    //console.log("paginat")

    if (!this.props.searchTotalResults){
      return
    }

    //TODO: implement the pagination
    if (this.props.searchResults.length > 200) {
      return (
        <div id="pagination">
          <span className="page current">1</span>
          <span className="page"><Link to="/busca">2</Link></span>
          <span className="page"><Link to="/busca">3</Link></span>
          <span className="next"><Link to="/busca">Next »</Link></span>
        </div>
      )
    }
  }


  loadScript(chave) {
//Implementa o script do facebook pixel, porém this.props.searchValue neste ponto ainda é undefined
       ////console.log('Dentro do loadScript', chave)
       let script= document.createElement('script');
       script.type= 'text/javascript';                               //Aqui não traz o nome do produto que foi pesquisado
       script.textContent= "fbq('track', 'Search', { search_string:'"+chave+"', content_type:'product'});";
       script.async = true;
       script.setAttribute('id','Search');
       document.body.appendChild(script);
  }

  componentDidMount(){
    //Quando renderiza pela primeira vez o component, chama uma função que cria o script Facebook Pixel e o coloca no fim do body

  }

  componentWillUnmount(){
    //Quando retira o component do DOM remove também o script Facebook Pixel criado por ele
    let childScript = document.getElementById("Search");
    document.body.removeChild(childScript);
  }

  renderSearchProducts = (product) => {
    return (
      <li className="search-result" key={product.ID}>
        <div className="product_name">
          <Link to={`/produtos/${product.ID}`} title="Visualizar"> { product.Descricao} </Link>
        </div>
        <div className="search-result_container">
          <div className="search-result_image pull-left">
            <Link to={`/produtos/${product.ID}`} title="Visualizar">
              <img src={product.Imagem} alt={product.Descricao} className="img-busca"/>
            </Link>
          </div>
          <div className="product_desc">{product.DescricaoResumida ? product.DescricaoResumida : "product.DescricaoResumida -> Cadastrar no expert"}</div>
        </div>
      </li>
    )
  }

  render() {

    const { Chave } = this.props.searchProps;

    return (
      <div>
        <Breadcrumb pageTitle="Busca" />

        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content col-sm-9 col-sm-push-3">
                <div id="searchresults" className="search-scope">
                  <h1 className="page_heading futura"> { Chave ? `Resultado da busca por: ${ Chave }` : "Buscar produto" }</h1>
                  <form className="search_form clearfix" role="search">
		                <input className="form-control" type="text" name="q" value={this.state.value} placeholder="Buscar"
                      onChange={ this.handleChange }
                    />
	                    <button type="submit" onClick={e  => {
                        e.preventDefault();
                        ////console.log(this.props.defaultSearchParams);
                        ////console.log("fazer chamada");
                        this.props.postSearchProducts({ ...this.props.defaultSearchParams, Chave: this.state.searchValue })}}>
                        <i className="fa fa-search" ></i></button>
	                </form>
                  <ol className="search-results">
                    { /* time to map the reults */}
                    { this.props.searchResults.length > 0 ? this.props.searchResults.map(product => this.renderSearchProducts(product)) : <div className="alert alert-danger">{`Nenhum produto encontrado com o termo: ${Chave}`}</div> }
                  </ol>
                  <div className="clearfix"></div>
                  {this.Pagination()}
                </div>
              </div>
              <Sidebar className="col-sm-3 sidebar_left col-sm-pull-9" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchProps: state.search.searchProps,
    searchResults: state.search.ProdutoBuscaItens,
    searchTotalResults: state.search.TotalRegistros,
    defaultSearchParams: defaultSearchParams
  }
}

export default connect(mapStateToProps, { postSearchProducts })(Search)
