import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './reusable/Sidebar';
import Breadcrumb from './reusable/breadcrumbComponent';
import { getArticleContentIdRequest, getCategoriesRequest } from '../actions/customizationActions'
import ModalComponent from "./reusable/ModalComponent"

//images -> por que tulasi / nossa equipe
// import why1 from '../images/mundotulasi-organicos.png'
// import why2 from '../images/mundotulasi-entregafacil.png'
// import why3 from '../images/mundotulasi-comerciojusto.png'
// import team1 from '../images/nossa-equipe-renata.png'
// import team2 from '../images/nossa-equipe-annie.png'
// import team3 from '../images/nossa-equipe-pedro.png'

const sectionNameToId = {
  "Nossa Casa": 1,
  "Por que Tulasi?": 2,
  "Nossa Equipe": 3,
}


class NossaCasa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      renderPage: false
    }
  }

  componentDidMount() {
    if (this.props.getCategoriesSuccess === null) {
      // this.props.getCategoriesRequest([sectionNameToId["Nossa Casa"], sectionNameToId["Por que Tulasi?"], sectionNameToId["Nossa Equipe"]])
      this.props.getCategoriesRequest()
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.getCategoriesSuccess !== null && nextProps.getCategoriesSuccess !== this.props.getCategoriesSuccess) {
        // nextProps.getCategoriesSuccess.map(category => this.props.getArticleContentIdRequest(category.ID))
      // this.getArticles();
    }

    if (nextProps.isGettingArticleContent === true) {
      this.setState({
        renderPage: false
      })
    }
    if (nextProps.isGettingArticleContent === false) {
      this.setState({
        renderPage: true
      })
    }
  }

  // getArticles = () => {
  //   this.props.getArticleContentIdRequest(sectionNameToId["Nossa Casa"]);
  //   this.props.getArticleContentIdRequest(sectionNameToId["Por que Tulasi?"]);
  //   this.props.getArticleContentIdRequest(sectionNameToId["Nossa Equipe"]);
  // }

  findCategoryIdByName = categoryName => this.props.getCategoriesSuccess.find(category => category.Descricao === categoryName).ID
  findCategoryNameById = id => this.props.getCategoriesSuccess.find(category => category.ID === id).Descricao


  findArticleByCategory = category => {
    const content = this.props.getArticleContentSuccess.filter(article => article.Categoria.ID === this.findCategoryIdByName(category));
    if (content.length === 1) {
      return content[0]
    }
    return content;
  }

  findArticleById = id => {
    const content = this.props.getArticleContentSuccess.filter(article => article.Categoria.ID === id)
    if (content.length === 1) {
      return content[0]
    }
    return content;
  }


  render() {

    //const articleContent = this.props.getArticleContentSuccess;
    if (this.props.isGettingCategories === true || this.props.getCategoriesSuccess === null) {
      return (
        <ModalComponent modalType="MODAL_LOADING" />
      )
    }
    console.log('++ ', this.findArticleById(sectionNameToId["Nossa Equipe"]))

    return (
      <div>
        <Breadcrumb pageTitle={this.findArticleById(sectionNameToId["Nossa Casa"]).Titulo} />

        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-9 col-sm-push-3">
                <div className="page-scope">
                  <div className="page_header">
                    <h1 className="page_heading">{this.findArticleById(sectionNameToId["Nossa Casa"]).Titulo}</h1>
                  </div>
                  <div className="page_content">
                    <div className="rte">

                        <p>{this.findArticleById(sectionNameToId["Nossa Casa"]).Texto}</p>

                      {/*<p style={{textAlign: 'right'}}><strong>Renata Nascimento, fundadora da Tulasi</strong></p>*/}
                      {/* -- Por que Tulasi Section ? */}
                      <h3 style={{textAlign: 'center'}}>{this.findCategoryNameById(sectionNameToId["Por que Tulasi?"])}</h3>
                      <div className="row">
                        {this.findArticleById(sectionNameToId["Por que Tulasi?"]).length > 0 ? this.findArticleById(sectionNameToId["Por que Tulasi?"]).map(article => {
                          return (
                            <div className="col-md-4" key={article.ID}>
                              <p><img className="img-responsive center-block" src={article.Imagem} alt="img1" />
                              </p>
                              <h4 style={{textAlign: 'center'}}>{article.Titulo}</h4>
                              <p style={{textAlign: 'center'}}>{article.Texto}</p>
                            </div>
                          )
                        }) : null}
                      </div>
                      <h3 style={{textAlign: 'center'}}>{this.findCategoryNameById(sectionNameToId["Nossa Equipe"])}</h3>
                      <div className="row">
                        <div className="col-md-12">
                          <p><img className="img-responsive center-block" src={this.findArticleById(sectionNameToId["Nossa Equipe"]).Imagem} alt="Equipe Tulasi" />
                          </p>
                          <h4 style={{textAlign: 'center'}}>{this.findArticleById(sectionNameToId["Nossa Equipe"]).Titulo}</h4>
                          <p style={{textAlign: 'center'}}>{this.findArticleById(sectionNameToId["Nossa Equipe"]).Texto}</p>
                        </div>
                      </div>
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
  hasArticlesBeenDeleted: state.customization.hasArticlesBeenDeleted,
  isGettingCategories: state.customization.isGettingCategories
})

export default connect(mapStateToProps, {
  getArticleContentIdRequest,
  getCategoriesRequest
})(NossaCasa)
