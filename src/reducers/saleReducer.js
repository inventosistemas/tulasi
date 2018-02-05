import * as actionTypes from '../actions/actionTypes';

export const sale = (state = [], action) => {
  switch (action.type) {

    case actionTypes.SELECTED_PRODUCT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }
    case actionTypes.SELECTED_PRODUCT:
      return {
        ...state,
        currentProduct: action.currentProduct
      }
    case actionTypes.SELECTED_PRODUCT_TYPE_FILTER:
      return {
        ...state,
        currentProductTypeFilter: action.currentProductTypeFilter
      }

    case actionTypes.FETCH_BEST_SELLERS_PRODUCTS_SUCCESS:
      return {
        ...state,
        bestSellers: action.bestSellers
      }

    case actionTypes.FETCH_PRODUCTS_TYPES_SUCCESS:
      return {
        ...state,
        productTypes: action.productTypes
      }

    default:
      return state;
  }
};
