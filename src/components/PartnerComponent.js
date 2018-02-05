import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './reusable/Sidebar';
import Breadcrumb from './reusable/breadcrumbComponent';
import ModalComponent from "./reusable/ModalComponent"
import { getArticleContentIdRequest, getCategoriesRequest } from '../actions/customizationActions'

//images - produtores e empresas Parceiras
// import prod1 from '../images/parceiro_1.png'
// import prod2 from '../images/parceiro_2.png'
// import prod3 from '../images/parceiro_3.png'
// import prod4 from '../images/parceiro_4.png'
// import corp1 from '../images/logo_aecia.png'
// import corp2 from '../images/logo_ecobio.png'
// import corp3 from '../images/logo_mae.jpg'
// import corp4 from '../images/logo_nopote.png'

const sectionNameToId = {
  "Parceiros Amigos": 4,
  "Produtores": 5
}


class Partner extends Component {

  componentDidMount() {
    if (this.props.getCategoriesSuccess === null) {
      // this.props.getCategoriesRequest([sectionNameToId["Parceiros Amigos"], sectionNameToId["Produtores"]])
      this.props.getCategoriesRequest()
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.getCategoriesSuccess !== null && nextProps.getCategoriesSuccess !== this.props.getCategoriesSuccess ||
  //     (nextProps.getCategoriesSuccess !== null && nextProps.hasArticlesBeenDeleted === true && nextProps.hasArticlesBeenDeleted !== this.props.hasArticlesBeenDeleted)) {
  //       this.props.getArticleContentIdRequest(sectionNameToId["Parceiros Amigos"]);
  //       this.props.getArticleContentIdRequest(sectionNameToId["Produtores"]);
  //   }
  // }

  findCategoryNameById = id => this.props.getCategoriesSuccess.find(category => category.ID === id).Descricao
  findArticleById = id => {
    const content = this.props.getArticleContentSuccess.filter(article => article.Categoria.ID === id)
    if (content.length === 1) {
      return content[0]
    }
    return content;
  }

  getAllManufacturers = () => {
    let manufactures = [];
    this.props.getArticleContentSuccess.map(article => {
      if (article.Categoria.ID === sectionNameToId["Produtores"]) {
        manufactures = [...manufactures, article]
      }
      return null;
    })
    return manufactures;
  }


  render() {

    //const articleContent = this.props.getArticleContentSuccess;
    if (this.props.isGettingCategories === true || this.props.getCategoriesSuccess === null) {
      return (
        <ModalComponent modalType="MODAL_LOADING" />
      )
    }
    return (
      <div>
        <Breadcrumb pageTitle={this.findArticleById(sectionNameToId["Parceiros Amigos"]).Titulo} />

        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-9 col-sm-push-3">
                <div className="page-scope">
                  <div className="page_header">
                    <h1 className="page_heading">{this.findArticleById(sectionNameToId["Parceiros Amigos"]).Titulo}</h1>
                  </div>
                  <div className="page_content">
                    <div className="rte">
                      {/* <h5 className="text-align: center;">Parceiros amigos</h5> */}
                      <p>{this.findArticleById(sectionNameToId["Parceiros Amigos"]).Texto}</p>

                      <h3 style={{textAlign: 'center'}}>{this.findCategoryNameById(sectionNameToId["Produtores"])}</h3>
                      <div className="row">
                        {this.getAllManufacturers().map(manufacture => {
                          return (
                            <div className="col-md-3" key={manufacture.Titulo}>
                              <p>
                                <img className="img-responsive center-block" src={manufacture.Imagem} alt={manufacture.Titulo} />
                              </p>
                              <h4 style={{textAlign: 'center'}}>{manufacture.Titulo}</h4>
                              <h5 className="produtores">{manufacture.Autor}</h5>

                              <p className="produtores">{manufacture.Texto}</p>
                            </div>
                          )
                        })}
                        {/* <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={prod1} alt="img1" />
                          </p>
                          <h4 style={{textAlign: 'center'}}>Edinaldo José da Costa</h4>
                          <h5 className="produtores">Sítio Porteira Um, Pombos-PE</h5>

                          <p className="produtores">Planta orgânicos desde 2003.<br/>É casado, tem 2 filhos. “Planto orgânicos porque é melhor pra minha saúde, pra minha família e no meio ambiente, pois eu vivo nele também”.</p>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={prod2} alt="img1" />
                          </p>
                          <h4 style={{textAlign: 'center'}}>João Juarez da Silva</h4>
                          <h5 className="produtores">Sítio Guilherme, Glória do Goitá - PE</h5>
                          <p className="produtores">Casado e pai de 2 filhos. “Planto orgânicos porque você não tem contato com agrotóxicos. É bom pra sua família, pra quem planta, pro consumidor, pro meio ambiente, pra tudo.”</p>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={prod3} alt="img1" />
                          </p>
                          <h4 style={{textAlign: 'center'}}>Dorgival do Vale Silva</h4>
                          <h5 className="produtores">Sítio Ladeira Grande, Glória do Goitá - PE</h5>
                          <p className="produtores">Planta orgânicos há cerca de 20 anos.
                          É casado há 32 anos e tem 3 filhos.
                          “A agricultura orgânica é importante porque preserva as matas e nascentes, além disso, é responsável por produtos de primeira qualidade.”</p><br/>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={prod4} alt="img1" /></p>
                          <h4 style={{textAlign: 'center'}}>Alonso Ferreira da Silva</h4>
                          <h5 className="produtores">Sítio Barro Branco Glória do Goitá - PE</h5>
                          <p className="produtores">Planta orgânicos desde 2010.<br/>
                            É separado, tem 10 filhos.
                            “Planto orgânico por amor a terra. Sou nordestino, sou brasileiro, agricultor, filho de agricultor e nunca iria agredir a terra. Saúde é o melhor para todos. Todos tem o direito de se alimentar e viver bem".
                          </p>
                        </div> */}
                      </div>

                      {/* <h5 style={{textAlign: 'center'}}>Empresas Parceiras</h5>
                       <div className="row">
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={corp1} alt="img1" />
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={corp2} alt="img1" />
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={corp3} alt="img1" />
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p><img className="img-responsive center-block" src={corp4} alt="img1" />
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>

      </div>

    );
  }
}

const mapStateToProps = state => ({
  getArticleContentSuccess: state.customization.getArticleContentSuccess,
  isGettingArticleContent: state.customization.isGettingArticleContent,
  getCategoriesSuccess: state.customization.getCategoriesSuccess,
  hasArticlesBeenDeleted: state.customization.hasArticlesBeenDeleted
})

export default connect(mapStateToProps, {
  getArticleContentIdRequest,
  getCategoriesRequest
})(Partner)
