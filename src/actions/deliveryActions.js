import axios from 'axios';
import { apiUrl } from './requestHelper';
import moment from 'moment';

export const GET_SHIPPING_OPTIONS = "GET_SHIPPING_OPTIONS"
export const GET_SHIPPING_OPTIONS_SUCCESS = "GET_SHIPPING_OPTIONS_SUCCESS"
export const GET_SHIPPING_OPTIONS_ERROR = "GET_SHIPPING_OPTIONS_ERROR"

export const GET_DELIVERY_PERIODS = "GET_DELIVERY_PERIOD"
export const GET_DELIVERY_PERIODS_SUCCESS = "GET_DELIVERY_PERIODS_SUCCESS"
export const GET_DELIVERY_PERIODS_ERROR = "GET_DELIVERY_PERIODS_ERROR"

export const GET_DELIVERY_SUGGESTED_PERIOD = "GET_DELIVERY_SUGGESTED_PERIOD"
export const GET_DELIVERY_SUGGESTED_PERIOD_SUCCESS = "GET_DELIVERY_SUGGESTED_PERIOD_SUCCESS"
export const GET_DELIVERY_SUGGESTED_PERIOD_ERROR = "GET_DELIVERY_SUGGESTED_PERIOD_ERROR"

export const SELECT_SHIPPING_OPTION = "SELECT_SHIPPING_OPTION"
export const SELECT_DELIVERY_DATE = "SELECT_DELIVERY_DATE"
export const SELECT_DELIVERY_PERIOD = "SELECT_DELIVERY_PERIOD"

//GET ShippingOption methods
const getShippingOption = () => {
  return {
    type: GET_SHIPPING_OPTIONS,
  }
}

const getShippingOptionError = (error) => {
  return {
    type: GET_SHIPPING_OPTIONS_ERROR,
    error
  }
}

const getShippingOptionSuccess = shippingOptions => {
  return {
    type: GET_SHIPPING_OPTIONS_SUCCESS,
    shippingOptions
  }
}

export const getShippingOptionsRequest = (idCarrinho, cep) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/produto/${idCarrinho}/${cep}/programacaoentrega`)

  return (dispatch) => {
    dispatch(getShippingOption())

    return request
    .then(response => {
      dispatch(getShippingOptionSuccess(response.data))
    })
    .catch(error => {
      dispatch(getShippingOptionError(`CEP ${cep} não encontrado ou não atendido`))
    })
  }
}

const getDeliveryPeriods = () => {
  return {
    type: GET_DELIVERY_PERIODS
  }
}

const getDeliveryPeriodsSuccess = (periods) => {
  return {
    type: GET_DELIVERY_PERIODS_SUCCESS,
    periods
  }
}

const getDeliveryPeriodsError = (error) => {
  return {
    type: GET_DELIVERY_PERIODS_ERROR,
    error
  }
}

export const getDeliveryPeriodsRequest = (option, shoppingCartId, deliveryDate = moment(new Date()).add(1,'days').format()) => {
  //console.log("getDeliveryPeriodRequest");
  //console.log(deliveryDate)
  //console.log(option)

  // ProgramacaoEntregaID, PorAgendamento, Data, CarrinhoWebID
  const instance = axios.create({
    headers: {
      'Content-Type': "application/json"
    }
  })
  const request = instance.post(`${apiUrl}/produto/programacaoentrega`, {
    ProgramacaoEntregaID: option.ProgramacaoEntregaID,
    PorAgendamento: option.PorAgendamento,
    Data: deliveryDate,
    CarrinhoWebID: shoppingCartId,
  })

  return dispatch => {
    dispatch(getDeliveryPeriods())

    return request
    .then(response => {
      dispatch(getDeliveryPeriodsSuccess(response.data))
    })
    .catch(error => {
      dispatch(getDeliveryPeriodsError("As opções de entrega não foram encontradas"))
    })
  }
}


const getDeliverySuggestedPeriod = () => ({ type: GET_DELIVERY_SUGGESTED_PERIOD })

const getDeliverySuggestedPeriodSuccess = (periodSuggested) => ({ type: GET_DELIVERY_SUGGESTED_PERIOD_SUCCESS, periodSuggested })

const getDeliverySuggestedPeriodError = (error) => ({ type: GET_DELIVERY_SUGGESTED_PERIOD_ERROR, error })

export const getDeliverySuggestedPeriodRequest = (option, shoppingCartId) => {
  const instance = axios.create({
    headers: {
      'Content-Type': "application/json"
    }
  })
  const request = instance.post(`${apiUrl}/produto/programacaoentregadata`, {
    ProgramacaoEntregaID: option.ProgramacaoEntregaID,
    PorAgendamento: option.PorAgendamento,
    CarrinhoWebID: shoppingCartId,
  })

  return dispatch => {
    dispatch(getDeliverySuggestedPeriod())

    return request
    .then(response => {
      dispatch(getDeliverySuggestedPeriodSuccess(response.data))
    })
    .catch(error => {
      dispatch(getDeliverySuggestedPeriodError(error))
    })
  }
}

//user selections
export const selectShippingOption = (shippingOption) => {
  return {
    type: SELECT_SHIPPING_OPTION,
    shippingOption
  }
}

export const selectDeliveryDate = (deliveryDate) => {
  return {
    type: SELECT_DELIVERY_DATE,
    deliveryDate
  }
}

export const selectDeliveryPeriod = (selectedDeliveryPeriod) => {
  return {
    type: SELECT_DELIVERY_PERIOD,
    selectedDeliveryPeriod
  }
}
