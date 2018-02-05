import React from 'react'
import { connect } from 'react-redux'
import { getPaymentCardsRequest, deletePaymentCardRequest } from '../../../actions/shoppingCartActions'
//import deleteImg from './delete.svg'

/*
ID
ParceiroID
Bandeira
Nome
Numero
*/

class SelectCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardChosenId: '',
            sampleCards : [
                {
                    "ID": 2225,
                    "ParceiroID": 1405,
                    "Bandeira": "VISA",
                    "Nome": "CAIO SALDANHA",
                    "Numero": "4024007160758917"
                },
                {
                    "ID": 2226,
                    "ParceiroID": 1405,
                    "Bandeira": "VISA",
                    "Nome": "CAIO SALDANHA",
                    "Numero": "4929757127563737"
                }
            ]
        }
        this.deleteCards = this.deleteCards.bind(this);
    }

    componentDidMount() {
        console.log("time go get cards")
        this.props.getPaymentCardsRequest(this.props.parceiroId);
    }

    componentWillReceiveProps(nextProps){
        //Quando o request de delete for bem sucedido, força o update para renderizar o novo array de cartões salvos vindos do request.
        if( this.props.isDeletingPaymentCard === true && nextProps.deletePaymentCardSuccess !== null ){
            this.forceUpdate();
        }

        // Update cards
        if (nextProps.deletePaymentCardSuccess !== this.props.deletePaymentCardSuccess) {
          this.props.getPaymentCardsRequest(this.props.parceiroId);
        }
    }

    handleCardSelection = (card) => {
        if( card !== null ){
            this.setState({
                cardChosenId: card.ID,
                paymentMethod: {
                    ...card
                }
            }, () => console.log(this.state));
            //this is the callback time
            this.props.onSelectCard(card);
        }else{
            this.props.onSelectCard(card);
        }
    }
    //Verifica de onde deve deletar e qual ítem deve ser deletado
    deleteCards(id, source) {
        if( source === 'sample' ){
            let remainingCards = this.state.sampleCards.filter( (card) => {
                return card.ID !== id;
            });

            this.setState({
                sampleCards: remainingCards
            });
        }
    }

    render() {
        if (this.props.isGettingCards) {
            return (
                <div>
                    <p className="titulo futura-bold"> Meus cartões </p>
                    <p>Buscando cartões...</p>
                </div>
            )
        }

        return (

            <div >
                <p className="titulo futura-bold"> Meus cartões </p>
                {/* mappedcards */}
                {this.props.getPaymentCardsSuccess !== null ?
                    <div>
                        {this.props.getPaymentCardsSuccess.map((card, i) => (
                            <div className='flex-row around-xs' key={card.ID}>
                                <div className="flex-col-xs-10">
                                    <input className='cartao-radio' type="radio" id={card.Bandeira + i} name="radio-group" value={card.ID} checked={this.state.cardChosenId === card.ID} onClick={() => this.handleCardSelection(card)} />
                                    <label  htmlFor={card.Bandeira + i}>
                                        <span></span><b>{`${card.Bandeira} ${card.Numero}`}</b>
                                    </label>
                                </div>
                                {/* <img src={deleteImg} alt="Remover cartão"/> */}
                                <div className="flex-col-xs-2">
                                    <i className="fa fa-times" style={{color: "red", cursor: "pointer"}} aria-hidden="true" onClick={() => {this.props.deletePaymentCardRequest(card.ID); this.handleCardSelection({"ID": 0}) }} ></i>
                                </div>
                            </div>
                        ))}
                        <div className="flex-row">
                            <div className='flex-col-xs-12' >
                                <input className='cartao-radio' type="radio" id="no-card" name="radio-group" value={0} checked={this.state.cardChosenId === 0} onClick={() => this.handleCardSelection({"ID": 0})} />
                                <label htmlFor="no-card"><span></span>Outro cartão</label>
                            </div>
                        </div>
                    </div>

                :
                    <div className='flex-row start-xs'>
                       <div className='flex-col-xs-10'>
                           <p>Você ainda não tem cartões salvos :(</p>
                           <p>Preencha os dados do seu cartão para continuar com a compra.</p>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    getPaymentCardsSuccess: state.shoppingCart.getPaymentCardsSuccess,
    isGettingPaymentCards: state.shoppingCart.isGettingPaymentCards,
    parceiroId: state.login.user.Parceiro.ID,
    deletePaymentCardSuccess: state.shoppingCart.deletePaymentCardSuccess,
    isDeletingPaymentCard: state.shoppingCart.isDeletingPaymentCard
})

export default connect(mapStateToProps, {
    getPaymentCardsRequest,
    deletePaymentCardRequest
})(SelectCardComponent)
