import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from 'axios';
import { apiUrl } from '../../actions/requestHelper';
import moment from "moment"

import {
  getShippingOptionsRequest,
  getDeliverySuggestedPeriodRequest,
  getDeliveryPeriodsRequest,
  //getDelivery,
  selectShippingOption,
  selectDeliveryDate,
  selectDeliveryPeriod
} from '../../actions/deliveryActions'

import { SingleDatePicker } from 'react-dates';

import styled from 'styled-components'

const ChooseTitle = styled.p`
  padding: 0;
  font-size: 14px !important;
  text-transform: uppercase;

  @media only screen and (max-width: 40em) {
    font-size: 14px !important;
  }
`

const ChoosePeriodDiv = styled.div `

  @media only screen and (min-width: 1024px) {
    margin-top: -220px
  }
`

class DeliverySelect extends Component {
  constructor(props){
    super(props)
    this.state = {
      focused: false,
      selectedDeliveryPeriodIndex: 0,
      suggestedDate: null,
      customMessage: null,
      hasSelectedOnDate: false
    }
  }
  componentWillMount(){
    //console.log("delivery will mount")
    // 1 get shipping options
    if (this.props.shoppingCartSelectedAddress !== null) {
      this.props.getShippingOptionsRequest(this.props.shoppingCartId, this.props.shoppingCartSelectedAddress.CEP)
    }

    //defines the localization
    moment.updateLocale('pt-br', {
        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
        weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
        weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
        weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [às] LT',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : '%s atrás',
            s : 'segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        ordinal : '%dº'
    })

    moment.updateLocale('pt-br');
  }

  componentDidMount() {
    this.getCustomMessage()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.getSuggestedPeriodSucess !== null && this.props.getSuggestedPeriodSucess !== nextProps.getSuggestedPeriodSucess) {
      this.setState({ suggestedDate: moment(nextProps.getSuggestedPeriodSucess[0].DataDisponivel) }, () => {
        //Precisa ter um selectedDeliveryDate no redux para passar à próxima página, então deve chamar esse action creator.
        this.props.selectDeliveryDate(this.state.suggestedDate);
      })

    }

    if ((this.props.shippingOptions !== nextProps.shippingOptions) && nextProps.shippingOptions != null) {
      //console.log("mudou soptions pra")
      //console.log(nextProps.shippingOptions)
      this.props.selectShippingOption(nextProps.shippingOptions[0])
    }

    if (this.props.shoppingCartSelectedAddress !== nextProps.shoppingCartSelectedAddress) {
      //console.log("mudou endereço no delivery select")
      this.props.getShippingOptionsRequest(this.props.shoppingCartId, nextProps.shoppingCartSelectedAddress.CEP)
    }

    if ((this.props.selectedDeliveryDate !== nextProps.selectedDeliveryDate) && nextProps.selectedShippingOption !== null) {
      //console.log("mudou data")
      //need to request periods again
      this.props.getDeliveryPeriodsRequest(nextProps.selectedShippingOption, nextProps.shoppingCartServer.Id, nextProps.selectedDeliveryDate.format());
    }

    if ((this.props.selectedShippingOption !== nextProps.selectedShippingOption) && nextProps.selectedDeliveryDate !== null && nextProps.selectedShippingOption !== null) {
      //console.log("mudou shipping option")
      //need to request periods again
      this.props.getDeliveryPeriodsRequest(nextProps.selectedShippingOption, nextProps.shoppingCartServer.Id, nextProps.selectedDeliveryDate.format());
    }

    if (nextProps.selectedShippingOption !== null && this.props.selectedShippingOption !== nextProps.selectedShippingOption ) {
      this.props.getDeliverySuggestedPeriodRequest(nextProps.selectedShippingOption, nextProps.shoppingCartServer.Id);
    }

    if (this.props.deliveryPeriods !== nextProps.deliveryPeriods) {
      //deliveryPeriods have changed then just sets the first option as default
      if (nextProps.deliveryPeriods !== null && nextProps.deliveryPeriods.length > 0){
        this.setState({...this.state, selectedDeliveryPeriodIndex: 0})
        this.props.selectDeliveryPeriod(nextProps.deliveryPeriods[0])
      } else {
        this.setState({...this.state, selectedDeliveryPeriodIndex: 0})
        this.props.selectDeliveryPeriod(null)
      }
    }
  }

  getCustomMessage = () => {
    axios.get(`${apiUrl}/carrinho/obtermensagem`)
      .then(response => this.setState({ customMessage: response.data}))
      .then(error => console.log('Error on /carrinho/obtermensagem request: ', error))
  }

  renderShippingOptions = () => {
    //console.log("render shopping options")
    ////console.log(this.props.shippingOptions)
    if ( this.props.shippingOptions !== null && this.props.shippingOptions.length > 0 ) {
      //this case is ok, just render the items

      return (
        this.props.shippingOptions.map((option, i) => {
          //sets the first option as the selected shipping option
          // if (this.props.selectedShippingOption === null && i === 0) {
          //   this.props.selectShippingOption(option)
          // }

          return (
            <div key={i}>
              <input id={`question${i}`} name="question" type="radio" className="with-font"
                checked={this.props.selectedShippingOption === option}
                onChange={() => {
                  // has chosen a date
                  if (this.props.selectedDeliveryDate) {
                    this.props.getDeliveryPeriodsRequest(option, this.props.shoppingCartServer.Id, this.props.selectedDeliveryDate.format());
                  } else { // there's no date chosen
                    this.props.getDeliverySuggestedPeriodRequest(option, this.props.shoppingCartServer.Id)

                  }
                  this.props.selectShippingOption(option)
                }}/>
              <label htmlFor={`question${i}`}>{option.ProgramacaoEntregaDescricao}<span className="money">{`R$${option.ValorServicoEntrega.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span></label>
            </div>
            )
          }
        )
      )
    }else if( this.props.noShippingMethods !== null ){
      return (
        <div>
          <input id="question1" name="question" type="radio" className="with-font"
            checked={true}
            readOnly
          />

          <label htmlFor="question1">RETIRAR NA LOJA<span className="money">R$0,00</span></label>
        </div>
      )
    } else if (this.props.errorFetchingShippingMethods !== null) {
      //this case has error :(
      return (
        <p>{this.props.errorFetchingShippingMethods}</p>
      )
    } else if (this.props.isFetchingShippingMethods === true) {
      return (
        <p>Carregando...</p>
      )
    } else if (this.props.shoppingCartSelectedAddress === null) {
      return (
        <p>Selecione um endereço</p>
      )
    }
  }

  renderDeliveryPeriods = () => {
    //1 loading delivery periods:

    if (this.props.isFetchingDeliveryPeriods === true) {
      return (
        <p> Carregando... </p>
      )
    } else {
      //console.log("deliv periods:")
      //console.log(this.props.deliveryPeriods)
      // this.setState({paymentConfirmationRequirements: {}})


      if (this.props.deliveryPeriods === null || this.props.deliveryPeriods.map.length === 0 || this.props.errorFetchingDeliveryPeriods !== null) {
        if(  this.props.errorFetchingDeliveryPeriods !== null && this.props.errorFetchingDeliveryPeriods.indexOf("não encontrado") !== -1 ){
          return(
            <p>Tarde (13:00 às 18:00)</p>
          );
        }else{
          return (
            <p className="msg-error">NENHUM HORÁRIO DISPONÍVEL PARA ESTA OPÇÃO DE ENTREGA</p>
          )
        }
      }

      if (this.props.deliveryPeriods !== null){
        //there's something, then...
        return (
          <select value={this.state.selectedDeliveryPeriodIndex} onChange={(e) => {
            //console.log("onchange")
            //console.log(e.target.value);
            //console.log(this.props.deliveryPeriods[e.target.value])
            this.setState({...this.state, selectedDeliveryPeriodIndex: e.target.value})
            this.props.selectDeliveryPeriod(this.props.deliveryPeriods[e.target.value])
          }}>
            {this.props.deliveryPeriods.map((period, i) => {
                return <option value={i} key={i}>{period.ProgramacaoEntregaIntervaloDescricao}</option>
            })}
          </select>
        )
      }
    }
  }

  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-8 local-de-entrega">
        <div className="col-sm-12">
          <h5 className="title-local">Como você quer receber seu pedido?</h5>
        </div>
        {/* escolha entre as opçòes a seguir <ChooseTitle>Escolha entre as opções a seguir:</ChooseTitle> */}
        <div className="col-sm-6">

          <div className="tiposfrete">
            <label>
              {this.renderShippingOptions()}
            </label>
          </div>
        </div>
        {/* escolha a data */}
        <div className="col-sm-12 col-md-5">
          <ChooseTitle>Escolha uma data:</ChooseTitle>
         <SingleDatePicker
            placeholder="Data"
            numberOfMonths={1}
            monthFormat="MMMM YYYY"
            displayFormat="D MMM YYYY"
            id="date_input"
            date={this.props.selectedDeliveryDate ? this.props.selectedDeliveryDate : this.state.suggestedDate}
            focused={this.state.focused} // setar para true para deixar sempre aberto.
            onDateChange={(date) => {
              //console.log("trocou data para:")
              //console.log("##########$$$$$$$$$$$$",date)
              this.props.selectDeliveryDate(date)
              this.setState({ hasSelectedOnDate: true})
            }}
            onFocusChange={({ focused }) => { this.setState({ focused }); }}
          /><br/>
          {/* <b style={{'marginTop': "10px", 'display':'inline-block', 'color':'red'}}>{this.state.customMessage}</b> */}
          <img style={{'marginTop': "20px", maxWidth: 300, height: "auto"}} alt="detalhes sobre a data" src={this.state.customMessage}></img>
        </div>
        {/* escolha o período */}
        <ChoosePeriodDiv className="col-sm-12 col-md-5 padb60">
          <ChooseTitle>Escolha entre os períodos a seguir:</ChooseTitle>
          <div className="programacao select-style">
            {this.renderDeliveryPeriods()}
          </div>
        </ChoosePeriodDiv>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shoppingCartSelectedAddress: state.shoppingCart.shoppingCartSelectedAddress,
    shoppingCartServer: state.shoppingCart.shoppingCartServer,
    shippingOptions: state.delivery.shippingOptions,
    noShippingMethods: state.delivery.errorFetchingShippingMethods,
    errorFetchingShippingMethods: state.delivery.errorFetchingShippingMethods,
    isFetchingShippingMethods: state.delivery.isFetchingShippingMethods,
    isFetchingDeliveryPeriods: state.delivery.isFetchingDeliveryPeriods,
    deliveryPeriods: state.delivery.deliveryPeriods,
    errorFetchingDeliveryPeriods: state.delivery.errorFetchingDeliveryPeriods,
    selectedShippingOption: state.delivery.selectedShippingOption,
    selectedDeliveryDate: state.delivery.selectedDeliveryDate,
    getSuggestedPeriodSucess: state.delivery.getSuggestedPeriodSucess
  }
}

export default connect(mapStateToProps, {
  getDeliveryPeriodsRequest,
  getShippingOptionsRequest,
  selectShippingOption,
  selectDeliveryDate,
  selectDeliveryPeriod,
  getDeliverySuggestedPeriodRequest
})(DeliverySelect)
