import {
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_SUBCATEGORIES,
  GET_CATEGORY_SUBCATEGORIES_ERROR,
  GET_CATEGORY_SUBCATEGORIES_SUCCESS
} from "../actions/categoryActions"

const CATEGORY_STATE = {
  currentCategory: null,
  isGettingCategorySubcategories : false,
  getCategorySubcategoriesSuccess: null,
  getCategorySubcategoriesError: null,
  subcategories: []
}

export const category = (state = CATEGORY_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY_BY_ID:
      return { ...state, currentCategory: action.payload }
    case GET_CATEGORY_SUBCATEGORIES:
      return {
        ...state,
        isGettingCategorySubcategories: true,
        getCategoryCategoriesSuccess: null,
        subcategories: [],
        getCategoryCategoriesError: null
      }
    case GET_CATEGORY_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        isGettingCategorySubcategories: false,
        getCategorySubcategoriesSuccess: action.response,
        subcategories: action.response.data,
        getCategorySubcategoriesError: null
      }
    case GET_CATEGORY_SUBCATEGORIES_ERROR:
      return {
        ...state,
        isGettingCategorySubcategories: false,
        getCategorySubcategoriesSuccess: null,
        subcategories: [],
        getCategorySubcategoriesError: action.error
      }

      //productsSubCategories: action.response
    default:
      return state
  }
}
