import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router"

class BannersSwiper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 1,
      interval: null
    };

    this.nextBanner = this.nextBanner.bind(this);
    this.previousBanner = this.previousBanner.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      "interval": setInterval(this.nextBanner, 3000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  nextBanner() {
    if (!this.props.banners) {
      return;
    }

    this.setState({swiperIndex: this.state.swiperIndex + 1 === this.props.banners.model.images.length + 1 ? 1 : this.state.swiperIndex + 1})

  }

  previousBanner() {
    if (!this.props.banners) {
      return;
    }

    this.setState({swiperIndex: this.state.swiperIndex - 1 === 0 ? this.props.banners.model.images.length : this.state.swiperIndex - 1})

  }

  render() {
    const { banners } = this.props;

    if (!banners || banners.length === 0) {
      return (
        <p></p>
      )
    }

    const bannerModel = banners.model;
    const { phrases, images } = bannerModel;

    return (
      <section id="swiper" className="swiper-container swiper-container-horizontal">
        <div className="swiper-wrapper" style={{transitionDuration: '0ms'}}>
          <div className="swiper-slide swiper-slide-duplicate swiper-slide-next" data-swiper-slide-index={2} style={{transform: 'translate3d(0px, 0px, 0px)', opacity: 1, transitionDuration: '0ms'}}>
            <img src={images[this.state.swiperIndex-1]} alt="Banner Tulasi"/>
            <div className="slider_caption ">
              <p>{phrases[this.state.swiperIndex-1]}</p>
              <Link className="btn" to="/produtos">Compre agora</Link>
              <Link className="btn btn_secondary" to="/casa" >Saiba mais</Link>
            </div>
          </div>
        </div>
        <div onClick={() => this.previousBanner} id="swiper_btn_prev" className="swiper_btn" />
        <div onClick={() => this.nextBanner} id="swiper_btn_next" className="swiper_btn" />
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      banners: state.home.banners
    };
};


export default connect(mapStateToProps, null)(BannersSwiper);
