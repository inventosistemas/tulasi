import React, { Component }  from "react";
import Breadcrumb from "./reusable/breadcrumbComponent"

class CasaSua extends Component {
  render() {
    const pageTitle = "A Casa é Sua";

    return (
      <div>
        <Breadcrumb pageTitle={pageTitle} />
        {/* MAIN */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content col-sm-10 col-sm-push-1">
                <div className="page-scope">
                  <div className="page_header">
                    <h1 className="page_heading">{pageTitle}</h1>
                  </div>
                  <div className="page_content">
                      A gente te quer aqui, dando ideia, participando, ocupando, ajudando-nos a fazer o mundo que queremos. Puxe uma cadeira e fique à vontade.
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p><img className="img-responsive center-block" src="images/about_1.png" alt="img1" />
                      </p>
                      <h4 style={{textAlign: 'center'}}>Programa</h4>
                      <p style={{textAlign: 'center'}}>Leia mais sobre o programa (definir texto)</p>
                    </div>
                    <div className="col-md-4">
                      <p><img className="img-responsive center-block" src="images/about_2.png" alt="img1" />
                      </p>
                      <h4 style={{textAlign: 'center'}}>Receitas</h4>
                      <p style={{textAlign: 'center'}}>Deu vontade de preparar algo gostoso? Veja nossas receitas.</p>
                    </div>
                    <div className="col-md-4">
                      <p><img className="img-responsive center-block" src="images/about_3.png" alt="img1" />
                      </p>
                      <h4 style={{textAlign: 'center'}}>Curiosidades</h4>
                      <p style={{textAlign: 'center'}}>Definir texto.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default CasaSua;
