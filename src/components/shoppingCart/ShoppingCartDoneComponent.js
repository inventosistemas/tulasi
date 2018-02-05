import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from "../reusable/breadcrumbComponent";
import { ShoppingCartSteps } from './ShoppingCartSteps'

class ShoppingCartDone extends Component {
    componentDidMount(){
        if (this.props.postSaveOrderSuccess === null) {
            // console.log("não tem pedidoId")
            this.props.router.push("/carrinho")
            return
        }

        //at this point there is a valid Order
        function loadScript() {
            var script= document.createElement('script');
            script.type= 'text/javascript';
            script.textContent="fbq('track', 'Purchase');";
            script.async = true;
            script.setAttribute('id','Purchase');
            document.body.appendChild(script);
        }

        /**
         * this function will add the google script to page
         */
        const addGoogleScriptToPage = () => {
            // console.log("adding google script")
            let googleScript = document.createElement("script")
            googleScript.type = "text/javascript"
            googleScript.textContent = `
                /* <![CDATA[ */
                var google_conversion_id = 882109974;
                var google_conversion_language = "en";
                var google_conversion_format = "3";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "1Tm8CP7y-nEQltzPpAM";
                var google_remarketing_only = false;
                /* ]]> */`
            googleScript.async = true
            googleScript.setAttribute("id", "googleScriptOne")
            document.body.appendChild(googleScript)

            let googleScriptTwo = document.createElement("script")
            googleScriptTwo.type = "text/javascript"
            googleScriptTwo.src = "//www.googleadservices.com/pagead/conversion.js"
            googleScript.setAttribute("id", "googleScriptTwo")
            document.body.appendChild(googleScriptTwo)
        }

        //checks before loading script
        let data;
        if (this.props.isRetryingPayment) {
            data = this.props.putRetryPaymentSuccess.data
        } else {
            data = this.props.postSaveOrderSuccess.data
        }

        if (data.RetornoGateway !== null && data.RetornoGateway.Erro !== true){
            loadScript(); //adds facebook pixel
            addGoogleScriptToPage() //adds google analytics
        } else {
            console.log("no t, no fbp");
        }
  }

    componentWillUnmount(){
        //removes facebook pixel
        const childScript = document.getElementById("Purchase");
        if (childScript !== null) {
            document.body.removeChild(childScript)
        } else {
            // console.log('no fbp script')
        }

        //remove google scripts
        const googleScriptOne = document.getElementById("googleScriptOne")
        if (googleScriptOne) {
            // console.log("removido gs1")
            document.body.removeChild(googleScriptOne)
        }

        //remove google scripts
        const googleScriptTwo = document.getElementById("googleScriptTwo")
        if (googleScriptTwo) {
            // console.log("removido gs2")
            document.body.removeChild(googleScriptTwo)
        }
    }

  validatePayment(data) {
    if (data.RetornoGateway !== null){
        if(data.RetornoGateway.Erro === true){
            return (
                <div>
                    <h6>Problemas com a transação de pagamento</h6>
                    <p>Pedido: {data.ID} - {data.Mensagem}</p>
                    <button type="button" className="fd-button fd-primary btn" onClick={() => this.props.router.goBack()}>Tentar novamente</button>
                </div>
            );
        } else {
            return(
                <div>
                    <h6>Operação realizada com sucesso</h6>
                    <p>Pedido: {data.ID} - {data.RetornoGateway.Mensagem}</p>
                    <button type="button" className="fd-button fd-secondary btn" onClick={() => this.props.router.push("/produtos")}>Continuar comprando</button>
                    <div style={{"display":"inline"}}>
                        <img height="1" width="1" style={{"border-style":"none"}} alt="" src="//www.googleadservices.com/pagead/conversion/882109974/?label=1Tm8CP7y-nEQltzPpAM&amp;guid=ON&amp;script=0"/>
                    </div>
                </div>
            );
        }
        } else {
            return (
                <div>
                    <h6>Problemas com a transação de pagamento</h6>
                    <p>Pedido: {data.ID} - {data.Mensagem}</p>
                    <button type="button" className="fd-button fd-primary btn" onClick={() => this.props.router.goBack()}>Tentar novamente</button>
                </div>
            )
        }
  }

    render() {
        if (this.props.postSaveOrderSuccess === null) {
            return (
                <div></div>
            )
        }

        //checks if the process is in the middle of retrying payment, then sets the correct data response.
        let data;
        if (this.props.isRetryingPayment) {
            data = this.props.putRetryPaymentSuccess.data
        } else {
            data = this.props.postSaveOrderSuccess.data
        }

        return(
            <div>
                <Breadcrumb pageTitle={"Pagamento"} />
                <div className="container carrinho">
                    <h1 className="page_heading">Carrinho de Compras</h1>
                    <ShoppingCartSteps step={3}/>
                    <div className="row carrinho-conclusao">
                        <div className="col-sm-12 columns medium-centered">
                            <div className="row sucesso">
                                <div className="col-sm-12 columns">
                                    {this.validatePayment(data)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      postSaveOrderSuccess: state.orders.postSaveOrderSuccess,
      putRetryPaymentSuccess: state.shoppingCart.putRetryPaymentSuccess,
      isRetryingPayment: state.orders.isRetryingPayment
    }
}

export default connect(mapStateToProps, null)(ShoppingCartDone)
