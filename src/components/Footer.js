import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//images
import idb from "../images/seloibd_selo-IBD.png"
import logo from "../images/logo-tulasi.png"
import syligo from "../images/syligo-logo.png"

class Footer extends Component {
  render() {
    const { footer } = this.props;

    if (!footer || footer.length === 0) {
      return (
        <footer>
          <p></p>
        </footer>
      )
    }

    const { corporate, socialMedia, contentInfo } = footer;
    const address = footer.top[1];


    function FooterItem(content) {
        if (!content || content.length === 0) {
          return(
            <div>
              "Footer Item"
            </div>
          )
        }

        return (
          <ul className="footer_links">
            {content.map(item => {
              return (
                <li key={item.ID}>
                  <Link to={`/corporativo?conteudo=${item.Descricao}`}>{item.Descricao}</Link>
                </li>
              )
            })}
          </ul>
        )
    }

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 footer_block footer_block__1">
              <div className="logo_main">
                <a href="#">
                  <img src={logo} alt="TULASI Orgânicos" />
                </a>
              </div>
              <div className="footer_contacts">
                <div className="contacts_address">
                  <h3 className="title2">{address.Descricao}</h3>
                  <a href="#">
                    <span>{address.Html}</span>
                  </a>
                </div>
                <div className="contacts_phone">
                  <a href="#">Telefone: (81) 3072-8212</a>
                </div>
                <div className="contacts_email">
                  <a href="#">tulasi@tulasiorganicos.com.br</a>
                </div>
              </div>
              <ul className="footer_social">
                <li><a href={socialMedia[0].Html}><i className="fa fa-facebook" /></a></li>
                <li><a href={socialMedia[1].Html}><i className="fa fa-instagram"/></a></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-6 footer_block footer_block__2">
              <h3 className="title2">INFORMAÇÕES</h3>
              {FooterItem(contentInfo)}
            </div>
            <div className="col-md-3 col-sm-6 footer_block footer_block__3">
              <h3 className="title2">PORQUE NOS ESCOLHER</h3>
              <ul className="footer_links">
                {FooterItem(corporate)}
              </ul>
              {/*IMAGEM SELO IDB*/}
              <img className="idb" src={idb} alt="TULASI Orgânicos - Selo IBD" />
            </div>
            <div className="col-md-3 col-sm-6 footer_block footer_block__4">
              <h3 className="title2">Facebook</h3>
              <div className="fb-page fb_iframe_widget" data-href="https://www.facebook.com/templatemonster" data-width={470} data-height={220} data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="true" style={{display: 'block'}}>
                <span style={{verticalAlign: 'bottom', width: 270, height: 220}}>
                  <iframe name="f2e51439cebf638" width="470px" height="220px" frameBorder={0} allowTransparency="true" allowFullScreen="true" scrolling="no" title="fb:page Facebook Social Plugin" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftulasimercadoorganico%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=362066134126147" style={{border: 'none', visibility: 'visible', width: 270, height: 220}} className />
                </span>
              </div>
            </div>
          </div>
          <div className="copyright footer-flexed">
            <p role="contentinfo" className="footer-main">© 2017 Tulasi | Mercado Orgânico. All rights reserved. Powered by Invento Sistemas.</p>
            <div className="footer-syligo">
              <a href="http://www.syligo.com" target="_blank">
                <img src={syligo} alt="Syligo - Connecting ideas"></img>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      footer: state.base.footer
    };
};

export default connect(mapStateToProps)(Footer);
