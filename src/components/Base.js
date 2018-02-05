import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

//css shit
import "../css/css.css"
import "../css/css_002.css"
import "../css/css_003.css"
import "../css/assets.css"
import "../css/style.css"
import "../css/responsive.css"
import "../css/styles.css"
import "../css/syligo.css"
import "../css/syligo-fd.css"
import "../css/flexboxgrid.css"
//import "../css/swiper.css"

class Base extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixedTopBar: false
    };
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {

  if (window.scrollY > 184) {
    this.setState({
      fixedTopBar: true
    });
  } else if (window.scrollY < 184) {
      this.setState({
        fixedTopBar: false
      });
    }
  }

  render() {
    return (
      <div>
        <Header fixedTopBar={this.state.fixedTopBar}/>
          {/*{React.cloneElement(this.props.children, this.props)}*/}
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Base;
