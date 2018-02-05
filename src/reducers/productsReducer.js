import * as actionTypes from '../actions/actionTypes';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_CATEGORY_ERROR,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS
}  from '../actions/productsActions';

const PRODUCTS_STATE = {
  products: null,
  featuredProducts: null,
  productsCategories: null,
  productMenu: null,
  offerOfTheDay: null,
  isGettingProductsByCategory: false,
  getProductsByCategorySuccess: null,
  getProductsByCategoryError: null
}
export const products = (state = PRODUCTS_STATE, action) => {
  switch (action.type) {

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products
      }
    case actionTypes.FETCH_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        featuredProducts: action.products
      }
    case actionTypes.FETCH_PRODUCTS_CATEGORIES_BY_TAG_SUCCESS:
      return {
        ...state,
        productsCategories: action.productsCategories
      }

    case actionTypes.FETCH_PRODUCTS_CATEGORIES_SUCCESS:
      return {
        ...state,
        productsCategories: action.productsCategories
      }
    case actionTypes.FETCH_PRODUCTS_MENU_SUCCESS:
      return {
        ...state,
        productMenu: action.productMenu
      }
    case actionTypes.FETCH_OFFER_OF_THE_DAY_SUCCESS:
      return {
        ...state,
        offerOfTheDay: action.offerOfTheDay
      }
    case actionTypes.FETCH_FULL_PRODUCTS_CATEGORIES_SUCCESS:
      return {
        ...state,
        fullProductsCategories: action.fullProductsCategories
      }
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productsByCategory: action.productsByCategory
      }
    case actionTypes.FETCH_PRODUCTS_BY_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        productsBySubCategory: action.productsBySubCategory
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        currentProduct: action.payload
      }
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        isGettingProductsByCategory: true,
        getProductsByCategorySuccess: null,
        getProductsByCategoryError: null
      }
    case GET_PRODUCTS_BY_CATEGORY_ERROR:
      return {
        ...state,
        isGettingProductsByCategory: false,
        getProductsByCategorySuccess: null,
        getProductsByCategoryError: action.error
      }
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isGettingProductsByCategory: false,
        getProductsByCategorySuccess: action.response,
        getProductsByCategoryError: null,
        productsByCategory: action.response
      }
    default:
      return state;
  }
};
