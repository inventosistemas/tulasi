import React, { Component } from 'react';
import Sidebar from './reusable/Sidebar';
import Breadcrumb from './reusable/breadcrumbComponent';

class ClubeDoOrganico extends Component {
  render() {
    const pageTitle = "Clube do Orgânico";

    return (
      <div>
        <Breadcrumb pageTitle={pageTitle} />

        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-9 col-sm-push-3">
                <div className="page-scope">
                  <div className="page_header">
                    <h1 className="page_heading">{pageTitle}</h1>
                  </div>
                  <div className="page_content">
                    <div className="rte">
                      {/* -- Em breve ? */}
                      <p>
                        Em breve, o Tulasi estará oferecendo novos serviços pra ficar cada vez mais fácil de você receber seu alimento orgânico em casa, livre de agrotóxicos e complicações.
                      </p>
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

export default ClubeDoOrganico
