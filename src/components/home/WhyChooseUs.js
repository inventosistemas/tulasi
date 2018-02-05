import React, { Component } from 'react';
import { connect } from 'react-redux';

//images
import mandala from "../../images/home-mandala-tulasi.png"

class WhyChooseUs extends Component {

  render() {

    const { whyChooseUs } = this.props;
    if (!whyChooseUs || whyChooseUs.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      )
    }

    const whyChooseUsTexts = whyChooseUs[0]

    return (
      <section className="homepage_custom_wrapper">
        <div className="container">
          <div className="flexbox">
            <div className="homepage_custom_img col-sm-7">
              <img src={mandala} alt="Por que Tulasi?" />
            </div>
            <div className="homepage_custom_textblock col-sm-5">
              <h2 className="section_header">Por que Tulasi?</h2>
              <div className="homepage_custom homepage_custom1">
                <span className="icon fl-bigmug-line-circular220" />
                <div className="textblock">
                  <span className="title2">{whyChooseUsTexts.Itens[0].Descricao}</span>
                  <div>
                    <span dangerouslySetInnerHTML={{__html: whyChooseUsTexts.Itens[0].Html}}></span>
                  </div>
                </div>
              </div>
              <div className="homepage_custom homepage_custom2">
                <span className="icon fl-outicons-truck72" />
                <div className="textblock">
                  <span className="title2">{whyChooseUsTexts.Itens[1].Descricao}</span>
                  <div>
                    <span dangerouslySetInnerHTML={{__html: whyChooseUsTexts.Itens[1].Html}}></span>
                  </div>
                </div>
              </div>
              <div className="homepage_custom homepage_custom3">
                <span className="icon fl-bigmug-line-trophy55" />
                <div className="textblock">
                  <span className="title2">{whyChooseUsTexts.Itens[2].Descricao}</span>
                  <div>
                    <span dangerouslySetInnerHTML={{__html: whyChooseUsTexts.Itens[2].Html}}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      whyChooseUs: state.home.whyChooseUs
    };
};


export default connect(mapStateToProps)(WhyChooseUs);
