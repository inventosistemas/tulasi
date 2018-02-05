import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ShoppingCartSteps } from './ShoppingCartSteps'
import Breadcrumb from "../reusable/breadcrumbComponent";
import { ModalComponent } from "../reusable/ModalComponent";
import { ShoppingCartSubtotal } from "./ShoppingCartSubtotalComponent"
import { ShoppingCartSummaryModal } from "./ShoppingCartSummaryModalComponent"

//actions
import { getPaymentMethodsRequest, putRetryPaymentRequest } from '../../actions/shoppingCartActions'
import { postSaveOrderRequest, setRetryingPayment } from '../../actions/ordersActions'

//images
import bandeiraVisa from "../../images/bandeira-visa.svg"
import bandeiraMaster from "../../images/bandeira-master.svg"
import bandeiraAmex from "../../images/bandeira-amex.svg"
import bandeiraElo from "../../images/bandeira-elo.svg"
import bandeiraDiners from "../../images/bandeira-diners.svg"
import errorCard from "../../images/invalid-card.png"
import SelectCard from './components/SelectCard'
import './css/carrinho.css'

export class ShoppingCartPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            cardNumber: "",
            expirationMonth: "",
            expirationYear: "",
            cvv: "",
            cardFlag: null,
            cardType: 0,
            //modals
            showCardErrorModal: false,
            showSummaryModal: false,
            showSavingOrderModal: false,
            showSavingOrderErrorModal: false,
            showPaymentGatewayErrorModal: false,
            showRetryingPaymentModal: false,
            cardChosenId: null,
            hasAgreedToSaveCard: false,
            paymentMethod: null,
            selectedCard: null
        }
    }

    componentWillMount() {
        //first check if user selection is fine
        if (this.userSelectionHasError() === true) {
            this.props.router.push("/carrinho")
        } else {
            //obterformaspagamentoloja
            if (this.props.shoppingCartServer) {
                if (this.props.shoppingCartServer.Total) {
                    // console.log(this.props.shoppingCartServer)
                    this.props.getPaymentMethodsRequest(this.props.shoppingCartServer.Total)
                }
            } else {
                this.props.getPaymentMethodsRequest()
            }
        }
    }

    componentDidMount() {
        function loadScript() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.textContent = "fbq('track', 'AddPaymentInfo');";
            script.async = true;
            document.body.appendChild(script);
        }
        loadScript();

    }

    componentWillReceiveProps(nextProps) {
        //logic to process the payment and gravarpedido
        if (this.props.isPostingSaveOrder === true && nextProps.isPostingSaveOrder === false) {
            //console.log("terminou de gravar pedido")
            //check the response
            if (nextProps.postSaveOrderSuccess !== null) {
                //probably success
                //console.log("sucesso ao gravar pedido")

                const { data } = nextProps.postSaveOrderSuccess
                //console.log(data)

                if (data.RetornoGateway === null) {
                    //it wasnt possible to complete the payment process, then reprocess
                    //console.log("não foi possível fazer o pagamento")
                    this.setState({
                        ...this.state,
                        showPaymentGatewayErrorModal: true,
                        showSavingOrderModal: false,
                        showSummaryModal: false
                    })
                } else {
                    //it was possible to complete the payment
                    //console.log("pagamento concluído")
                    this.props.router.push("/carrinho/concluido")
                }
            } else {
                console.log("erro ao gravar pedido")
                this.setState({
                    ...this.state,
                    showSavingOrderModal: false,
                    showPaymentGatewayErrorModal: true,
                    showSummaryModal: false
                })
            }
        }

        if (this.props.isPostingSaveOrder === false && nextProps.isPostingSaveOrder === true) {
            //console.log("vai começar a gravar o pedido")
            this.setState({ ...this.state, showSavingOrderModal: true })
        }

        //handle reprocessar pagamento
        if (this.props.isPuttingRetryPayment === true && nextProps.isPuttingRetryPayment === false) {
            //console.log("terminou de reprocessar")
            //console.log(this.props.putRetryPaymentSuccess)
            //console.log(this.props.putRetryPaymentError)

            //check the response
            if (nextProps.putRetryPaymentSuccess !== null) {
                //probably success
                //console.log("sucesso ao reprocessar pedido")

                const { data } = nextProps.putRetryPaymentSuccess
                //console.log(data)

                if (data.RetornoGateway === null) {
                    //it wasnt possible to complete the payment process, then reprocess
                    //console.log("não foi possível reprocessar o pagamento")
                    this.setState({
                        ...this.state,
                        showPaymentGatewayErrorModal: true,
                        showSavingOrderModal: false,
                        showSummaryModal: false,
                        showRetryingPaymentModal: false
                    })
                } else {
                    //it was possible to complete the payment
                    //console.log("reprocessamento pagamento concluído")
                    this.props.router.push("/carrinho/concluido")
                }
            }
        }

        if (this.props.isPuttingRetryPayment === false && nextProps.isPuttingRetryPayment === true) {
            //console.log("vai começar a reprocessar, mostrar modal")
            this.setState({ ...this.state, showRetryingPaymentModal: true })
        }
    }

    userSelectionHasError = () => {
        const { shoppingCartServer, shoppingCartSelectedAddress, selectedDeliveryDate, user, selectedDeliveryPeriod, /*selectedShippingOption*/ } = this.props
        if (shoppingCartServer === null || shoppingCartSelectedAddress === null || selectedDeliveryDate === null || user === null || selectedDeliveryPeriod === null /*|| selectedShippingOption === null*/) {
            return true
        } else {
            return false
        }
    }

    handleInput = (inputName, e) => {
        //console.log(inputName)
        //console.log(e.target)

        const newState = { ...this.state }
        newState[inputName] = e.target.value
        this.setState({ ...newState })

        //console.log(this.state)
    }

    handleCardSelection = (card) => {
        // console.log(card)
        if( card !== null ){
            this.setState({
                cardChosenId: card.ID,
                selectedCard: {
                    ...card
                },
                name: card.Nome || '',
                cardNumber: card.Numero || '',
                expirationMonth: card.Mes || '',
                expirationYear: card.Ano || '',
                cvv: card.CodigoSeguranca || ''
            }, () => {
                console.log("this.state", this.state);
                //const flag = this.identifyFlag(this.state.selectedCard.Numero);
                //const paymentMethod = this.findPaymentMethod(flag, this.props.paymentMethods);
            })
        }
    }

    //method to find the paymentMethod, based on the paymentDescrition, inside an array of payment methods
    findPaymentMethod = (paymentDescription, paymentMethods) => {
        let paymentMethodFound = null

        paymentMethods.map(paymentMethod => {
            if (paymentMethod.DescricaoSite === paymentDescription) {
                paymentMethodFound = paymentMethod
                //console.log("achou flag")
                //console.log(paymentMethod.DescricaoSite)
            }
            return paymentMethod
        })

        return paymentMethodFound
    }

    handleInputCard = (e) => {
        //1 checks if card length > 12
        //2 need to get the flag description
        //3 need to get the selectedPaymentMethod

        if (e.target.value.length > 12) {
            const flag = this.identifyFlag(e.target.value)
            const paymentMethod = this.findPaymentMethod(flag, this.props.paymentMethods)
            this.setState({ ...this.state, cardFlag: flag, cardNumber: e.target.value, paymentMethod: paymentMethod });
            //console.log("handleInputCard")
            //console.log(this.state)
        } else {
            this.setState({ ...this.state, cardFlag: null, cardNumber: e.target.value, paymentMethod: null })
        }
    }

    handleInputCardOnBlur = (e) => {
        if (this.state.cardFlag === -1 || this.state.cardFlag === null) {
            //show modal
            //console.log("modal de cartão errado")
            this.setState({ ...this.state, showCardErrorModal: true })
        }
    }

    handleExpirationMonth = (e) => {
        if (e.target.value < 13) {
            //console.log(e.target.value)
            this.setState({ ...this.state, expirationMonth: e.target.value })
        }
    }

    handleExpirationYear = (e) => {
        if (e.target.value < 2100) {
            //console.log(e.target.value)
            this.setState({ ...this.state, expirationYear: e.target.value })
        }
    }

    handleCvv = (e) => {
        this.setState({ ...this.state, cvv: e.target.value })
    }

    identifyFlag = (numCartao) => {
        if (/^(40117[89]|438935|451416|45763[12]|504175|506699|506717|50672[25-9]|50673[039]|50674[0-8]|50904[^1]|50905[012]|50906[46789]|509074|627780|636297|636368)/.test(numCartao) && numCartao.length <= 16) {
            //"elo";
            return "Elo";
        }
        if (/^(34|37)/.test(numCartao) && numCartao.length <= 15) {
            //"amex";
            return "Amex";
        }
        if (/^(4)/.test(numCartao) && numCartao.length <= 16) {
            //"visa";
            return "Visa Credito";
        }

        if (/^(5[1-5])/.test(numCartao) && numCartao.length <= 16) {
            //"mastercard";
            return "Master Credito";
        }

        if (/^(30[0-5]|3[68])/.test(numCartao) && numCartao.length <= 16) {
            //"dinersclub";
            return "Diners";
        }
        if (/^(60|384)/.test(numCartao) && (numCartao.length <= 16 || numCartao.length <= 13)) {
            //"hipercard";
            return "Hipercard";
        }

        return -1
    }

    disabledButton = () => {
        //TODO: arrumar esse check. Quando o usuário selecionar umc ard em SelectCard, deve preencher o state.
        if (this.state.cardChosenId === null || this.state.cardChosenId === 0) {

            //name
            if (this.state.name === "") {
                return true
            }
            //cardNumber
            if (this.state.cardFlag === null || this.state.cardFlag === -1) {
                return true
            }

            //month
            if (this.state.expirationMonth === "" || this.state.expirationMonth > 12) {
                return true
            }

            //year
            if (this.state.expirationYear === "" || this.state.expirationYear < 2017 || this.state.expirationYear > 2050) {
                return true
            }

            //cvv
            if (this.state.cvv === "" || this.state.cvv.length < 2) {
                return true
            }
        }
    }

    /**
     * Creates the order body, based on the first trial. If fails, see createPaymentBody.
     */
    createOrderBody = () => {
        //console.log(this.props.selectedShippingOption)

        return {
            LoginID: this.props.user.ID,
            EnderecoID: this.props.shoppingCartSelectedAddress.ID,
            PagamentoMetodoFormaID: this.state.paymentMethod ? this.state.paymentMethod.PagamentoMetodoFormaID : null,
            ClassificacaoPagto: this.state.cardType,
            Parcela: 1,
            "CarrinhoID": this.props.shoppingCartServer.Id,
            "CupomDesconto": this.props.cupom ? this.props.cupom : null,
            "DadosCartao": {
                "ID": this.state.cardChosenId || 0,
                "Titular": this.state.name,
                "Numero": this.state.cardNumber,
                "Mes": this.state.expirationMonth,
                "Ano": this.state.expirationYear,
                "CodigoSeguranca": this.state.cvv,
                "Hash": "",
                "SalvarCartao": this.state.hasAgreedToSaveCard ? 1 : 0
            },
            "ProgramacaoEntrega": {
                "ID": this.props.selectedShippingOption === null ? 3 : this.props.selectedShippingOption.ProgramacaoEntregaID, //this.props.
                "ValorFrete": this.props.selectedShippingOption === null ? 0 : this.props.selectedShippingOption.ValorServicoEntrega,
                "IntervaloID": this.props.selectedDeliveryPeriod === null ? 25 : this.props.selectedDeliveryPeriod.ProgramacaoEntregaIntervaloID,
                "Data":  this.props.selectedShippingOption ? this.props.selectedDeliveryDate.format() : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1), //selected delivery date
                "Hora": 0, //colocando no braço
                "Minuto": 0, //colocando no braço
            }
        }
    }

    /**
     * If the first requeest (orders) fails, then create a new payment body
     */
    createPaymentBody = () => {
        return {
            "PedidoVendaID": this.props.postSaveOrderSuccess.data.ID,
            "PagamentoMetodoFormaID": this.state.paymentMethod.PagamentoMetodoFormaID,
            "ClassificacaoPagto": this.state.cardType,
            "Parcela": this.state.paymentMethod.Parcela,
            "DadosCartao": {
                "Titular": this.state.name,
                "Numero": this.state.cardNumber,
                "Mes": this.state.expirationMonth,
                "Ano": this.state.expirationYear,
                "CodigoSeguranca": this.state.cvv
            }
        }
    }

    cardErrorModal = (
        <div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
            <div className="fancybox-skin" style={{ display: 'block', width: 'auto', height: 'auto' }}>
                <h1 className="h1errorCard" style={{ outline: "0px" }}>Ops!</h1>
                <img className="img imgerrorCard" alt="" src={errorCard} width="120" />

                <div>
                    <p className="textErrorCard">Número de cartão inválido</p>
                </div>
                <a title="Fechar" className="fancybox-item fancybox-close" onClick={() => { this.setState({ ...this.state, showCardErrorModal: false }) }} />
            </div>
        </div>
    )

    /**
     * Returns a simple modal showing the status of the saving order
     */
    savingOrderModal = (title, message) => (
        <div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
            <div className="fancybox-skin" style={{ display: 'block', width: 'auto', height: 'auto' }}>
                {  /*<h1 className="futura h1errorCard" style={{outline: "0px"}}>{title}</h1>
          <h1 className="h1errorCard" style={{outline: "0px"}}>{title}</h1>
            <img className="img imgerrorCard" alt="" src={errorCard} width="120" />
          <img alt="" src={bandeiraVisa} width="80" />*/}
                <div>
                    <p className="textErrorCard">{message}</p>
                </div>
                {/* <a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
          this.setState({
            ...this.state,
            showSavingOrderModal: false,
            showSavingOrderErrorModal: false
          });
        }} /> */}
            </div>
        </div>
    )

    /**
     * Renders a modal with the error message for the Gateway Error.
     */
    paymentGatewayErrorModal = () => {
        console.log("paymentGateway")
        console.log(this.props.postSaveOrderError)

        let errorMessage = "A transação não foi autorizada pela sua operadora."

        //handles error on postSaveOrderError
        if (this.props.postSaveOrderError !== null) {
            if (this.props.postSaveOrderError.response) {
                errorMessage = this.props.postSaveOrderError.response.data
                console.log("errinho:", errorMessage)
            }
        }

        return (
            <div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
                <div className="fancybox-skin" style={{ display: 'block', "maxWidth": "85%", height: 'auto' }}>
                    <h1 className="h1errorCard" style={{ outline: "0px" }}>Ops!</h1>
                    <img className="img imgerrorCard" alt="" src={errorCard} width="120" />
                    <div>
                        <p className="textErrorCard">{`${errorMessage}\nRevise seu carrinho.`}</p>
                    </div>
                    <a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
                        this.setState({
                            ...this.state,
                            showPaymentGatewayErrorModal: false,
                            showSummaryModal: false
                        })
                    }} />
                </div>
            </div>
        )
    }

    isAddNewCardDisabled = () => {
      if (this.state.cardChosenId === 0) {
        return false;
      }

      if (this.state.cardChosenId === null) {
        return false;
      }

      if (this.state.cardChosenId !== 0) {
        return true;
      }
    }

    render() {
        if (this.userSelectionHasError() === true) {
            return null
        }

        return (
            <div>
                {/* modals */}
                {/* erro no input de cartão */}
                {this.state.showCardErrorModal ? <ModalComponent>{this.cardErrorModal}</ModalComponent> : null}

                {/* erros ao gravar pedido / processar pagamento */}
                {(this.state.showSavingOrderModal === true || this.state.showRetryingPaymentModal === true) ? <ModalComponent>{this.savingOrderModal("Aviso", "Gravando pedido...")}</ModalComponent> : null}
                {this.state.showSavingOrderErrorModal === true ? <ModalComponent>{this.savingOrderModal("Aviso", "Erro ao salvar pedido. Tente novamente.")}</ModalComponent> : null}
                {this.state.showPaymentGatewayErrorModal === true ? <ModalComponent>{this.paymentGatewayErrorModal()}</ModalComponent> : null}

                {/* reprocessar pagamento  */}
                {/*this.state.showRetryingPaymentModal === true ? <ModalComponent>{this.savingOrderModal("Aviso", "Reprocessando pagamento...")}</ModalComponent> : null*/}

                {/* mostrar summary modal, ao clicar em continuar */}
                {this.state.showSummaryModal === true ?
                    <ShoppingCartSummaryModal
                        shoppingCartServer={this.props.shoppingCartServer}
                        shoppingCartSelectedAddress={this.props.shoppingCartSelectedAddress}
                        onClose={() => this.setState({ ...this.state, showSummaryModal: false })}
                        selectedShippingOption={this.props.selectedShippingOption}
                        onContinue={() => {
                            //add logic to reprocessar pagamento
                            if (this.props.postSaveOrderSuccess === null) {
                                //console.log("grava pedido normalmente")
                                const orderBody = this.createOrderBody();

                                console.log("////POSTING.........", orderBody);
                                this.props.postSaveOrderRequest(orderBody);
                            } else {
                                //console.log("vai reprocessar com pedido id:")
                                //console.log(this.props.postSaveOrderSuccess.data.ID)
                                this.props.setRetryingPayment(true);
                                const paymentBody = this.createPaymentBody();
                                this.props.putRetryPaymentRequest(paymentBody);
                            }
                        }}
                        isPostingSaveOrder={this.props.isPostingSaveOrder}
                    /> : null}
                {/* modals end */}

                <Breadcrumb pageTitle={"Pagamento"} />
                <div className="container carrinho">
                    <h1 className="page_heading">Carrinho de Compras</h1>
                    <ShoppingCartSteps step={2} />
                    <div className="flex-row payment-box">
                        {/* //select card */}
                        <div className="flex-col-xs-10 flex-col-sm-3">
                            <SelectCard userId={this.props.user.ID} onSelectCard={(card) => {
                                this.setState({ cardChosenId: card.ID }, () => this.handleCardSelection(card))
                            }} />
                        </div>

                        {/* //card data */}
                        <div className="flex-col-xs-12 flex-col-sm-6 col-sm-12">
                            <div className='flex-row'>
                                <div className='flex-col-xs-12'>
                                    <p className="titulo futura-bold">Dados do cartão</p>
                                </div>
                            </div>
                            {/* <div className='flex-row'>
                                <div className='flex-col-xs-6'>
                                    <input className='cartao-radio' type="radio" value='debito' id='debito' checked={this.state.cardType === 1} onChange={(e) => { console.log('debito'); this.setState({ cardType: 1 }) }} />
                                    <label className='cartao-radio' htmlFor="debito"><span></span>Cartão de Débito</label>
                                </div>
                                <div className='flex-col-xs-6'>
                                    <input className='cartao-radio' type="radio" value='credito' id='credito' checked={this.state.cardType === 0} onChange={(e) => { console.log('credito'); this.setState({ cardType: 0 }) }} />
                                    <label htmlFor="credito"><span></span>Cartão de Crédito</label>
                                </div>
                            </div> */}
                            <div className='flex-row'> {/* quando as linhas acima forem descomentadas, trocar o className para "flex-row infocartao1" */}
                                <div className='flex-col-xs-12'>
                                    <label>Nome (como no cartão)</label>
                                </div>
                                <div className='flex-col-xs-12'>
                                    <input type="text" className="col-xs-12 cartao" placeholder="Nome completo" disabled={ this.isAddNewCardDisabled() } value={this.state.name} onChange={e => this.handleInput("name", e)} />
                                </div>
                            </div>
                            <div className='flex-row'>
                                <div className='flex-col-xs-12'>
                                    <label>Número do cartão</label>
                                </div>
                                <div className='flex-col-xs-12 middle-xs'>
                                    <div className='box'>
                                        <div className='flex-row'>
                                            <div className='flex-col-xs-10'>
                                                <input id="numerocartao"
                                                    type="text"
                                                    className="box cartao"
                                                    value={this.state.cardNumber}
                                                    placeholder="Número do cartão"
                                                    maxLength={16}
                                                    onChange={e => this.handleInputCard(e)}
                                                    onBlur={e => this.handleInputCardOnBlur(e)}
                                                    disabled={ this.isAddNewCardDisabled() }
                                                />
                                            </div>
                                            <div className="pagamento-bandeira flex-col-xs-2">
                                                {this.state.cardFlag === "Visa Credito" ? <img alt="" src={bandeiraVisa} /> : null}
                                                {this.state.cardFlag === "Master Credito" ? <img alt="" src={bandeiraMaster} /> : null}
                                                {this.state.cardFlag === "Amex" ? <img alt="" src={bandeiraAmex} /> : null}
                                                {this.state.cardFlag === "Diners" ? <img alt="" src={bandeiraDiners} /> : null}
                                                {this.state.cardFlag === "Elo" ? <img alt="" src={bandeiraElo} /> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* //validation */}
                            <div className='flex-row infocartao2'>
                                <div className='flex-col-xs-3'>
                                    <label htmlFor="mes">Mês val.</label>
                                    <input id="mes" type="number" disabled={ this.isAddNewCardDisabled() } maxLength={2} max={12} style={{ width: '100%' }} min={1} className="col-sm-6 cartao" placeholder="MM" value={this.state.expirationMonth} onChange={(e) => this.handleExpirationMonth(e)} />
                                </div>
                                <div className='flex-col-xs-4'>
                                    <label htmlFor="ano">Ano val.</label>
                                    <input id="ano" type="number" disabled={ this.isAddNewCardDisabled() } min={2017} max={2050} style={{ width: '100%' }} className="col-sm-6 cartao" placeholder="AAAA" value={this.state.expirationYear} onChange={e => this.handleExpirationYear(e)} />
                                </div>
                                {this.isAddNewCardDisabled() ?
                                    // in case it is a saved card, fullfil input with saved text, otherwise accept a number input
                                    <div className='flex-col-xs-5'>
                                        <label htmlFor="cvv">Cód. de Segurança</label>
                                        <input id="cvv" type="text" disabled={ this.isAddNewCardDisabled() } maxLength={4} className="col-sm-6 cartao" style={{ width: '100%' }} placeholder="CVV" value={this.state.cvv} onChange={e => this.handleCvv(e)} />
                                    </div> :
                                    <div className='flex-col-xs-5'>
                                        <label htmlFor="cvv">Cód. de Segurança</label>
                                        <input id="cvv" type="number" disabled={ this.isAddNewCardDisabled() } maxLength={4} className="col-sm-6 cartao" style={{ width: '100%' }} placeholder="CVV" value={this.state.cvv} onChange={e => this.handleCvv(e)} />
                                    </div>
                                }
                            </div>
                            <div className='flex-row'>
                                <div className="salvarcartao">
                                    <input type="checkbox" id="salvarcartao" name="save-card" onClick={() => this.setState({ hasAgreedToSaveCard: !this.state.hasAgreedToSaveCard })} checked={this.state.hasAgreedToSaveCard} />
                                    <label htmlFor="salvarcartao">Salvar este cartão para compras futuras</label>
                                </div>
                            </div>
                        </div>
                        {/* third column, with the order summary */}
                        <div className='flex-col-xs-12 flex-col-sm-3'>
                            <ShoppingCartSubtotal shoppingCartServer={this.props.shoppingCartServer} selectedShippingOption={this.props.selectedShippingOption} />
                            <div className='flex-row center-xs'>
                                <div className="flex-col-xs-12 flex-col-sm-offset-2">
                                    <button type="button" className="btn" disabled={this.disabledButton()} onClick={() => {
                                        this.setState({ ...this.state, showSummaryModal: true }, () => console.log('CONTINUAR', this.state));
                                        console.log("-----this.createOrderBody()------", this.createOrderBody())
                                    }}>continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-row start-sm center-xs'>
                        <div className='flex-col-xs-6 flex-col-sm-3'>
                            <button type="button" className="btn marginr5" onClick={() => this.props.router.goBack()} > voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shoppingCartServer: state.shoppingCart.shoppingCartServer,
        shoppingCartSelectedAddress: state.shoppingCart.shoppingCartSelectedAddress,
        selectedDeliveryDate: state.delivery.selectedDeliveryDate,
        user: state.login.user,
        cupom: state.login.cupom,
        selectedDeliveryPeriod: state.delivery.selectedDeliveryPeriod,
        selectedShippingOption: state.delivery.selectedShippingOption,
        paymentMethods: state.shoppingCart.paymentMethods,
        isPostingSaveOrder: state.orders.isPostingSaveOrder,
        postSaveOrderError: state.orders.postSaveOrderError,
        postSaveOrderSuccess: state.orders.postSaveOrderSuccess,
        isPuttingRetryPayment: state.shoppingCart.isPuttingRetryPayment,
        putRetryPaymentError: state.shoppingCart.putRetryPaymentErroFr,
        putRetryPaymentSuccess: state.shoppingCart.putRetryPaymentSuccess
    }
}

export default connect(mapStateToProps, {
    postSaveOrderRequest,
    getPaymentMethodsRequest,
    putRetryPaymentRequest,
    setRetryingPayment,
})(ShoppingCartPayment)
