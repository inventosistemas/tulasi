/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFooterItem } from '../actions/footerActions'
import Sidebar from './reusable/Sidebar';
import Breadcrumb from './reusable/breadcrumbComponent';

export class Corporate extends Component {
  //waiting for htmlContent prop
  componentWillMount(){

    //console.log(this.props.location.query.conteudo)
    if (!this.props.footerContent) {
      this.props.getFooterItem(this.props.location.query.conteudo)
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.query.conteudo !== this.props.location.query.conteudo){
      this.props.getFooterItem(nextProps.location.query.conteudo)
    }
  }
  render(){
    if (!this.props.footerContent) {
      return (
        <div>Carregando...</div>
      )
    }

    const { footerContent } = this.props
    const footerItem = footerContent.Itens[0]

    return(
      <div>
        <Breadcrumb pageTitle="Corporativo" />

        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-9 col-sm-push-3">
                <div className="page-scope">
                  <div className="page_header">
                    <h1 className="page_heading">{footerItem.Descricao}</h1>
                  </div>
                  <div className="page_content">
                    <div className="rte" dangerouslySetInnerHTML={ {__html: footerItem.Html}}>
                    </div>
                  </div>
                </div>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    footerContent : state.footer.currentFooterItem
  }
}

export default connect(mapStateToProps, { getFooterItem })(Corporate)
