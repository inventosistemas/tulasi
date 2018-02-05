import React, { Component } from "react";
import { Link } from 'react-router';

export default class Breadcrumb extends Component {
  render() {
    const backToHomeMessage ="De volta à página inicial";

    return (
      <div>
        <div className="breadcrumb_wrap">
          <div className="container">
            <ul className="breadcrumb">
              {/* TODO: mudar state */}
              <li>
                <Link to="/" className="homepage-link" title={backToHomeMessage}>Home</Link>
              </li>
              <li><span className="page-title">{this.props.pageTitle}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
