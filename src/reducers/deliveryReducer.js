import {
  GET_SHIPPING_OPTIONS_SUCCESS,
  GET_SHIPPING_OPTIONS,
  GET_SHIPPING_OPTIONS_ERROR,
  GET_DELIVERY_PERIODS,
  GET_DELIVERY_PERIODS_SUCCESS,
  GET_DELIVERY_PERIODS_ERROR,
  SELECT_SHIPPING_OPTION,
  SELECT_DELIVERY_DATE,
  SELECT_DELIVERY_PERIOD,
  GET_DELIVERY_SUGGESTED_PERIOD,
  GET_DELIVERY_SUGGESTED_PERIOD_SUCCESS,
  GET_DELIVERY_SUGGESTED_PERIOD_ERROR
} from '../actions/deliveryActions'

const DELIVERY_STATE = {
  freightOptions: null,
  errorFetchingShippingMethods: null,
  deliveryPeriods: null,
  errorFetchingDeliveryPeriods: null,
  shippingOptions: null,
  selectedShippingOption: null,
  isFetchingShippingMethods: false,
  isFetchingDeliveryPeriods: false,
  selectedDeliveryDate: null,
  selectedDeliveryPeriod: null,
  isGettingSuggestedPeriod: false,
  getSuggestedPeriodSucess: null,
  getSuggestedPeriodError: null
}

export const delivery = (state = DELIVERY_STATE, action) => {
  switch(action.type) {
    case GET_SHIPPING_OPTIONS:
      return {
        ...state,
        isFetchingShippingMethods: true
      }
    case GET_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        shippingOptions: action.shippingOptions,
        isFetchingShippingMethods: false,
        errorFetchingShippingMethods: null,
      }
    case GET_SHIPPING_OPTIONS_ERROR:
      return {
        ...state,
        errorFetchingShippingMethods: action.error,
        isFetchingShippingMethods: false,
        shippingOptions: null,
        selectedShippingOption: null
      }
    case GET_DELIVERY_PERIODS:
      return {
        ...state,
        isFetchingDeliveryPeriods: true,
        deliveryPeriods: null,
        errorFetchingDeliveryPeriods: null
      }
    case GET_DELIVERY_PERIODS_SUCCESS:
      return {
        ...state,
        deliveryPeriods: action.periods,
        isFetchingDeliveryPeriods: false,
        errorFetchingDeliveryPeriods: null,
      }
    case GET_DELIVERY_PERIODS_ERROR:
      return {
        ...state,
        errorFetchingDeliveryPeriods: action.error,
        isFetchingDeliveryPeriods: false,
        deliveryPeriods: null
      }

    case SELECT_SHIPPING_OPTION:
      return {
        ...state,
        selectedShippingOption: action.shippingOption
      }
    case SELECT_DELIVERY_DATE:
      return {
        ...state,
        selectedDeliveryDate: action.deliveryDate
      }
    case SELECT_DELIVERY_PERIOD:
      return {
        ...state,
        selectedDeliveryPeriod: action.selectedDeliveryPeriod
      }

    case GET_DELIVERY_SUGGESTED_PERIOD:
      return {
        ...state,
        isGettingSuggestedPeriod: true,
        getSuggestedPeriodSucess: null,
        getSuggestedPeriodError: null
      }
    case GET_DELIVERY_SUGGESTED_PERIOD_SUCCESS:
      return {
        ...state,
        isGettingSuggestedPeriod: false,
        getSuggestedPeriodSucess: action.periodSuggested,
        getSuggestedPeriodError: null
      }
    case GET_DELIVERY_SUGGESTED_PERIOD_ERROR:
      return {
        ...state,
        isGettingSuggestedPeriod: false,
        getSuggestedPeriodSucess: null,
        getSuggestedPeriodError: action.error
      }
    default:
      return { ...state }
  }
}
