/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
	updateShoppingCartProduct,
	deleteItemFromShoppingCartRequest,
	selectShoppingCartAddress,
	getShoppingCartRequest,
	putCartItemQuantityRequest,
	putClearCartRequest
} from '../actions/shoppingCartActions';

import axios from 'axios';
import { apiUrl } from '../actions/requestHelper';

import { postCupomRequest, deleteCupom } from '../actions/cupomActions';

import { getShippingOptionsRequest } from '../actions/deliveryActions'
import { clearOrder } from '../actions/ordersActions'

import { getUserAddress } from '../actions/userAddressActions'
import { loginFromCheckout, saveCupom, deletePersistedCupom } from '../actions/loginActions'

//other components
import Breadcrumb from "./reusable/breadcrumbComponent";
import ChangeAddressModal from './shoppingCart/ChangeAddressModal';
import DeliverySelect from './shoppingCart/DeliverySelectComponent'
import CalculateFreightForm from './shoppingCart/CalculateFreightFormComponent'
import { ShoppingCartEmpty } from './shoppingCart/ShoppingCartEmptyComponent'
import { ShoppingCartItem } from './shoppingCart/ShoppingCartItemComponent'
import { ShoppingCartSteps } from './shoppingCart/ShoppingCartSteps'
import { ModalComponent } from './reusable/ModalComponent'
import styled from 'styled-components';

//images and css import
import 'react-dates/lib/css/_datepicker.css';

const CupomSpan = styled.span`
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	width: auto;

	@media(min-width: 770px){
		display: inline;
		height: auto;
		padding: 0px;
	}

	input{
		border: solid 1px grey;
		background-color: grey;
		color: black;
	}

	b{
		color: #FF0000;
		margin: 10px;
	}
`

const CupomDiv = styled.div `
	display: flex;
	justify-content: flex-end;

	@media(max-width: 768px){
		flex-direction: column;
		flex-grow: 1;
	}
`

class ShoppingCart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			totalPrice: 0,
			totalWeight: 0,
			isModalOpen: false,
			showLoginComponent: false,
			showSummaryModal: false,
			isErrorModalOpen: false,
			cupom: '',
			discount: 0,
			cupomMessage: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDiscount = this.handleDiscount.bind(this);
		this.handleCleanCupom = this.handleCleanCupom.bind(this);
	}

	//lifecycle
	componentWillMount() {
		let { shoppingCartId } = this.props
		//console.log(`will mount shp cart with ${shoppingCartId}`)

		//2 if there's a shopping cartid, then get it from server
		if (shoppingCartId !== null) {
			this.props.getShoppingCartRequest(shoppingCartId)
		}

		//3 if there's a user, get the user addresses
		if (this.props.user !== null) {
			//get the user addresses
			this.props.getUserAddress(this.props.user.Parceiro.ID)
		}
	}

	componentDidMount() {
		//Quando renderiza pela primeira vez o component, implementa e chama uma função que cria o script Facebook Pixel e o coloca no fim do body
		function loadScript() {
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.textContent = "fbq('track', 'InitiateCheckout');";
			script.async = true;
			script.setAttribute('id', 'InitiateCheckout');
			document.body.appendChild(script);
		}
		loadScript();
		if (this.props.cupom) {
			this.setState({ cupom: this.props.cupom })
		}
		if (this.props.shoppingCartId !== null && this.props.postCupomSuccess !== null) {
			this.setState({
				totalPrice: this.handleDiscount(this.props.postCupomSuccess.data.ValorTotalDesconto),
				discount: this.props.postCupomSuccess.data.ValorTotalDesconto
			});
		}
	}

	componentWillUnmount() {
		//Quando retira o component do DOM remove também o script Facebook Pixel criado por ele
		let childScript = document.getElementById("InitiateCheckout");
		document.body.removeChild(childScript);
	}

	componentWillReceiveProps(nextProps) {
		// Atualiza shoppingCartServer quando um cupom é usado
		if ( nextProps.postCupomSuccess !== null && nextProps.postCupomSuccess !== this.props.postCupomSuccess ) {
			this.props.getShoppingCartRequest(nextProps.shoppingCartId)
		}
		if ( this.props.shoppingCartId === null && nextProps.shoppingCartId !== null && nextProps.cupom !== null && nextProps.cupom !== "" ) {
			//Só faz request de cupom caso haja um número de cupom
			this.props.postCupomRequest({
				CarrinhoID: nextProps.shoppingCartId,
				NumeroCupom: this.state.cupom,
				ParceiroID: nextProps.user !== null ? nextProps.user.Parceiro.ID : null,
				cupomMessage: ''
			});
		}

		if (this.props.shoppingCartSelectedAddress === null && this.props.defaultUserAddress !== nextProps.defaultUserAddress) {
			this.props.selectShoppingCartAddress(nextProps.defaultUserAddress);
		}

		//get user address if user has logged in
		if (this.props.user !== nextProps.user && nextProps.user !== null) {
			this.props.getUserAddress(nextProps.user.Parceiro.ID)
		}

		if (this.props.shoppingCartServer !== nextProps.shoppingCartServer && this.props.shoppingCartSelectedAddress) {
			this.props.getShippingOptionsRequest(this.props.shoppingCartId, this.props.shoppingCartSelectedAddress.CEP);
		}

		if (this.props.isPuttingQuantity === true && nextProps.isPuttingQuantity === false && nextProps.putQuantityError) {
			//Caso não possa adicionar mais ítens ao carrinho (lógica no backend)

			this.setState({ isErrorModalOpen: true });
		}

		if( nextProps.shoppingCartServer && this.props.postCupomSuccess === null ){
			console.log("nextProps.shoppingCartServer")
			this.setState({
				totalPrice: nextProps.shoppingCartServer.Total
			});
		}

		if( this.props.isPostingCupom === true && nextProps.postCupomSuccess !== null ){

			if( nextProps.postCupomSuccess.data.Erro !== true ){
				console.log("totalPrice: this.handleDiscount(nextProps.postCupomSuccess.data.ValorTotalDesconto)");
				this.setState({
					totalPrice: this.handleDiscount(nextProps.postCupomSuccess.data.ValorTotalDesconto),
					discount: nextProps.postCupomSuccess.data.ValorTotalDesconto
				},() => {console.log('STATE ->', this.state)});
				this.props.saveCupom(this.state.cupom)
			}else{
				this.setState({
					cupomMessage: nextProps.postCupomSuccess.data.Mensagem,
					isErrorModalOpen: true
				}, () => {console.log('STATE ->', this.state)});
			}

		}
	}

	//custom methods, callbacks
	openModal = () => {
		this.setState({
			...this.state,
			isModalOpen: true
		})
	}

	closeModal = () => {
		this.setState({
			...this.state,
			isModalOpen: false,
			showSummaryModal: false,
			showLoginComponent: false
		})
	}

	getTotalWeight() {
		let weight = this.props.products.reduce((a, b) => {
			return a + (b.Peso * b.cartQuantity);
		}, 0);
		return `${weight.toLocaleString('pt-BR', { minimumFractionDigits: 3 })} Kg`
	}

	userSelectionHasError = () => {
		//1 - Check if user is logged
		if (this.props.user === null) {
			return false
		}

		//check shoppingCartSelectedAddress, selectedShippingOption, selectedDeliveryDate, selectedDeliveryPeriod
		if (this.props.shoppingCartSelectedAddress === null  || this.props.selectedDeliveryDate === null || this.props.selectedDeliveryPeriod === null) {
			return true
		} else {
			return false
		}
	}

	quantityErrorModal = data => (
		<div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
			<div className="fancybox-skin" style={{ display: 'block', width: 'auto', height: 'auto' }}>
				<h1 style={{ outline: "0px" }}>Ops</h1>
				{/* <img alt="" src={bandeiraVisa} width="80" /> */}
				<div>
					<p>{data.Message}</p>
				</div>

				<a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
					this.setState({
						...this.state,
						isErrorModalOpen: false
					})
				}} />
			</div>
		</div>
	)

	cupomErrorModal = message => (
		<div className="fancybox-wrap fancybox-desktop fancybox-type-inline fancybox-opened vertical-center col-sm-12">
			<div className="fancybox-skin" style={{ display: 'block', width: 'auto', height: 'auto' }}>
				<h1 style={{ outline: "0px" }}>Ops</h1>
				{/* <img alt="" src={bandeiraVisa} width="80" /> */}
				<div>
					<p>{message}</p>
				</div>

				<a title="Fechar" className="fancybox-item fancybox-close" onClick={() => {
					this.setState({
						...this.state,
						isErrorModalOpen: false
					})
				}} />
			</div>
		</div>
	)

	handleChange(e){
		let name = e.target.name;
		let value = e.target.value;

		console.log('name', name, 'value', value);

		this.setState({
			[name] : value
		});
	}

	handleDiscount(discount){
		//Aplica o desconto e retorna o novo total
		return this.props.shoppingCartServer.Total - discount;
	}

	handleCleanCupom(){

		this.props.deletePersistedCupom(); // delete persisted one
		this.props.deleteCupom() // clear redux state

		const instance = axios.create({
			headers: {
				"Content-Type": "application/json"
			}
		});

		const request = instance.post(`${apiUrl}/carrinho/limparcupom`, {
			"CarrinhoID": this.props.shoppingCartId
		});

		return request.then( response => {
			console.log('response->', response);
			// Atualiza shoppingCartServer carrinho quando um cupom é removido
			if (response.data.Erro === false) {
				this.props.getShoppingCartRequest(this.props.shoppingCartId)
				this.setState({
					totalPrice: this.props.shoppingCartServer.Total,
					discount: 0,
					cupom: ''
				})
			} else {
				this.setState({
					cupomMessage: 'Não foi possível limpar o cupom. '+response.data.Mensagem,
					isErrorModalOpen: true
				});
			}
		}).catch( error => {
			console.log('error->', error);

			this.setState({
				cupomMessage: 'Não foi possível limpar o cupom.',
				isErrorModalOpen: true
			});
		})

	}

	render() {
		if (this.props.children) {
			return (
				<div>
					{this.props.children}
				</div>
			)
		}

		const pageTitle = "Carrinho de Compras";
		const { shoppingCartServer, putCartItemQuantityRequest, deleteItemFromShoppingCartRequest } = this.props;

		if ((shoppingCartServer !== null && shoppingCartServer.Itens.length === 0) || (shoppingCartServer === null)) {
			return (
				<ShoppingCartEmpty />
			)
		}

		//calculates the total price, with shipping price
		let totalPrice = this.state.totalPrice;
		if (this.props.selectedShippingOption !== null) {
			totalPrice = totalPrice + this.props.selectedShippingOption.ValorServicoEntrega
		}
		//at this point, necessarily has a shoppingCartServer, then renders
		return (
			<div>
				<Breadcrumb pageTitle={pageTitle} />

				{/* //modals */}
				{this.state.isErrorModalOpen ? <ModalComponent> {this.quantityErrorModal(this.props.putQuantityError)} </ModalComponent> : null}
				{ this.state.isErrorModalOpen && this.state.cupomMessage !== null ? <ModalComponent> {this.cupomErrorModal(this.state.cupomMessage)} </ModalComponent> : null }



				<div role="main">
					{/* main content */}
					<div className="container carrinho">
						<div className="row">
							<div className="main_content col-sm-12">
								<div className="cart_page">
									<div id="cart_loader" className="loader_off">
										<div className="global_loader" />
									</div>
									<h1 className="page_heading">{pageTitle}</h1>

									<ShoppingCartSteps step={1} />
									<div id="cart_content">
										<form>
											<table className="cart_list">
												<thead>
													<tr>
														<th>Produto</th>
														<th>Preço</th>
														<th>Quantidade</th>
														<th>Subtotal</th>
														<th />
													</tr>
												</thead>
												<tbody>
													{shoppingCartServer === null ? "" : shoppingCartServer.Itens.map(item => {
														return <ShoppingCartItem
															key={item.Id}
															item={item}
															onQuantityChange={(carItemId, quantity) => putCartItemQuantityRequest(carItemId, quantity, this.props.shoppingCartId)}
															onExcludeItem={carItemId => deleteItemFromShoppingCartRequest(carItemId, this.props.shoppingCartId)} />
													})}
												</tbody>
												<tfoot>
													<tr className="cart_buttons">
														<td colSpan={5}>
															<Link to={'/produtos'} className="btn btn-alt cart_continue">Continuar comprando</Link>
															<a onClick={() => {
																this.props.putClearCartRequest(this.props.shoppingCartId);
																this.setState({ totalPrice: 0 });
																this.setState({ totalWeight: 0 })
															}}
																className="btn" id="cart_clear">Limpar carrinho</a>

														</td>

													</tr>
													{this.props.user ?
														<tr className="cart_buttons">
															<td colSpan={5}>
																<CupomDiv>
																	<CupomSpan>
																		<input type="text" maxLength="15" placeholder="Cupom" name="cupom" value={this.state.cupom} onChange={ (e) => this.handleChange(e) } />
																	</CupomSpan>
																	{
																		this.state.discount ?
																		<button onClick={(e) => {e.preventDefault(); this.handleCleanCupom();}}className="btn">Limpar Cupom</button>
																		:
																		<button
																			onClick={e => {
																				e.preventDefault()
																				this.props.postCupomRequest({
																					CarrinhoID: this.props.shoppingCartId,
																					NumeroCupom: this.state.cupom,
																					ParceiroID: this.props.user !== null ? this.props.user.Parceiro.ID : null,
																					cupomMessage: ''
																				});
																			}}
																			className="btn" >
																			{ this.props.isPostingCupom === true ? "AGUARDE..." : "Adicionar Cupom" }
																		</button>
																	}
																</CupomDiv>
															</td>
														</tr> : null
													}

													<tr className="cart_summary">
														<td colSpan={5}>
															{this.props.user === null ? <CalculateFreightForm className="col-sm-12 col-md-6 col-lg-4 calcular-frete" /> : ""}
															{/* subtotals summary */}
															<div className="col-sm-12 col-md-6 col-lg-8">
																<p className="cart_summary__row">Peso Total: <span>{shoppingCartServer.PesoTotal ? `${shoppingCartServer.PesoTotal.toFixed(3)} Kg` : "Peso total não disponível"}</span></p>
																<p className="cart_summary__row">Subtotal: <span className="money">{`R$${shoppingCartServer.SubTotal !== null ? shoppingCartServer.SubTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}`}</span></p>
																<p className="cart_summary__row">Cupom de desconto: <span className="money" style={{color: 'red'}}>{this.state.discount ? `- R$${this.state.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`: `-`}</span></p>
																<p className="cart_summary__row">Frete: <span className="money">{`R$${this.props.selectedShippingOption !== null ? this.props.selectedShippingOption.ValorServicoEntrega.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}`}</span></p>
																<p className="cart_summary__row">Preço Total: <span className="money">{`R$${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span></p>
															</div>
														</td>
													</tr>
												</tfoot>
											</table>
										</form>
									</div>

									{/* show delivery wrapper? */}
									{/* need my intervention here */}
									{this.props.user === null ? "" :
										<div className="row">
											<div className="col-sm-12 col-md-12 entrega paddingless">
												<div className="col-sm-12 col-md-12 paddingless">

													{/* local de entrega box */}
													<div className="col-sm-12 col-md-12 col-lg-4 local-entrega-box">
														<div className="col-sm-12 local-de-entrega">
															<div className="col-sm-12 grey lighter">
																<h5 className="title-local">Local de entrega</h5>
															</div>
															<div className="col-sm-12 address-box">
																<div className="title">
																	<div className="name">
																		<span>{this.props.shoppingCartSelectedAddress === null ? "Selecione um endereço" : this.props.shoppingCartSelectedAddress.Identificacao}</span>
																		<button type="button" className="btn float-right" onClick={() => {
																			//console.log("mostrar modal");
																			this.openModal()
																		}}>Trocar</button>
																		{/* //show change address modal */}
																		{
																			this.state.isModalOpen ?
																				<ChangeAddressModal
																					isFromShoppingCart={true}
																					userAddresses={this.props.userAddresses}
																					isOpen={this.state.isModalOpen}
																					onClose={() => this.closeModal()}
																					selectShoppingCartAddress={userAddress => this.props.selectShoppingCartAddress(userAddress)}
																				/>
																				: ""
																		}
																	</div>
																	<div className="description border-top">
																		{/* Avenida Paulista, 100, 100 - 01311000, paraiso */}
																		{/* SAO PAULO - SÃO PAULO */}
																		{this.props.shoppingCartSelectedAddress === null ?
																			<p>Selecione um endereço</p>
																			//  "Cidade.Nome, Estado.Nome"
																			:
																			`${this.props.shoppingCartSelectedAddress.Logradouro}, ${this.props.shoppingCartSelectedAddress.Numero}
                                   - ${this.props.shoppingCartSelectedAddress.CEP} - ${this.props.shoppingCartSelectedAddress.Bairro}, \n
                                   ${this.props.shoppingCartSelectedAddress.Cidade.Nome} - ${this.props.shoppingCartSelectedAddress.Cidade.Estado.Nome}`

																		}
																	</div>
																</div>
															</div>
														</div>
													</div>
													{/* fim do local de entrega */}

													{/* configurar data de entrega, modo, etc... */}
													<DeliverySelect shoppingCartId={this.props.shoppingCartId} deliveryPeriods={this.props.deliveryPeriods} />
													{/* fim da data de entrega */}

												</div>
											</div>
										</div>
									}

									{/* footer */}
									<div className="row">
										<div className="cart_summary__checkout col-sm-12">
											<div className="cart_summary__checkout__button_wrapper col-sm-offset-10">
												<button onClick={() => {
													//removes the shoppingCartOrderSuccess, if any
													// console.log("clearOrder")
													this.props.clearOrder()

													if (this.props.token === null || this.props.user === null) {
														//there's no user, then show login component
														//this.setState({ showLoginComponent: true });
														this.props.router.push({
															pathname: "/carrinho/login",
															state: {
																isFromShoppingCart: true
															}
														})
													} else if (this.props.userAddresses.length === 0 || this.props.defaultUserAddress === null) {
														this.openModal()
													} else if (this.props.token && this.props.userAddresses.length > 0) {
														//this is a case where there's an user and the user has at least one address
														//{this.state.showSummaryModal === false ? this.setState({...this.state, showSummaryModal: true}) : ""}
														this.props.router.push("/carrinho/pagamento")
													}
												}} className="btn" disabled={this.userSelectionHasError()}>Finalizar compra</button>
											</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		token: state.login.token,
		cupom: state.login.cupom,
		user: state.login.user,
		shoppingCartStep: state.shoppingCart.shoppingCartStep,
		shoppingCartId: state.shoppingCart.shoppingCartId,
		shoppingCartSelectedAddress: state.shoppingCart.shoppingCartSelectedAddress,
		shoppingCartServer: state.shoppingCart.shoppingCartServer,
		defaultUserAddress: state.userAddress.defaultUserAddress,
		userAddresses: state.userAddress.userAddresses,
		deliveryPeriods: state.delivery.deliveryPeriods,
		shippingOptions: state.delivery.shippingOptions,
		selectedShippingOption: state.delivery.selectedShippingOption,
		selectedDeliveryDate: state.delivery.selectedDeliveryDate,
		selectedDeliveryPeriod: state.delivery.selectedDeliveryPeriod,
		putQuantityError: state.shoppingCart.putQuantityError,
		isPuttingQuantity: state.shoppingCart.isPuttingQuantity,
		isPostingCupom: state.cupom.isPostingCupom,
		postCupomSuccess: state.cupom.postCupomSuccess,
		postCupomError: state.cupom.postCupomError
	};
};

export default connect(mapStateToProps, {
	deleteItemFromShoppingCartRequest,
	updateShoppingCartProduct,
	loginFromCheckout,
	getUserAddress,
	selectShoppingCartAddress,
	getShoppingCartRequest,
	putCartItemQuantityRequest,
	putClearCartRequest,
	getShippingOptionsRequest,
	clearOrder,
	postCupomRequest,
	saveCupom,
	deletePersistedCupom,
	deleteCupom
})(ShoppingCart);
