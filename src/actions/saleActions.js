import * as actionTypes from './actionTypes';
import { get_data } from './requestHelper';

export const currentCategory = (currentCategory) => {
  return {
    type: actionTypes.SELECTED_PRODUCT_CATEGORY,
    currentCategory
  }
}

export const currentProduct = (currentProduct) => {
  return {
    type: actionTypes.SELECTED_PRODUCT,
    currentProduct
  }
}

export const currentProductTypeFilter = (currentProductTypeFilter) => {
  return {
    type: actionTypes.SELECTED_PRODUCT_TYPE_FILTER,
    currentProductTypeFilter
  }
}

export const fetchBestSellersProductsSuccess = (bestSellers) => {
  return {
    type: actionTypes.FETCH_BEST_SELLERS_PRODUCTS_SUCCESS,
    bestSellers : bestSellers[0].Itens
  }
}

export const fetchProductsTypesSuccess = (productTypes) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_TYPES_SUCCESS,
    productTypes
  }
}

export const fetchBestSellersProducts = () => {
  return (dispatch) => {
    get_data(`/produto/maisvendidos`)
      .then(response => {
        dispatch(fetchBestSellersProductsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchProductsTypes = () => {
  return (dispatch) => {
    get_data(`/produto/obterprodutotipos`)
      .then(response => {
        dispatch(fetchProductsTypesSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}
