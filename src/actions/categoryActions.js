import axios from 'axios'
import { get_data, apiUrl } from './requestHelper'

export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID"

export const GET_CATEGORY_SUBCATEGORIES = "GET_CATEGORY_SUBCATEGORIES"
export const GET_CATEGORY_SUBCATEGORIES_ERROR = "GET_CATEGORY_SUBCATEGORIES_ERROR"
export const GET_CATEGORY_SUBCATEGORIES_SUCCESS = 'GET_CATEGORY_SUBCATEGORIES_SUCCESS';

//methods
export const getCategoryById = (id) => {
  const instance = axios.create({
    headers: {
      'Content-Type' : "application/json"
    }
  })

  const request = instance.get(`${apiUrl}/vitrine/${id}/obtersecaopelacategoria`)

  return (dispatch) => {
    request.then(( { data } ) => {
      dispatch({
        type: GET_CATEGORY_BY_ID,
        payload: data
      })
    })
    .catch(error => {
      throw(error);
    })
  }
}

export const getCategorySubcategories = () => {
  return {
    "type" : GET_CATEGORY_SUBCATEGORIES
  }
}

const getCategorySubcategoriesSuccess = (response) => {
  return {
    type: GET_CATEGORY_SUBCATEGORIES_SUCCESS,
    response
  }
}

const getCategorySubcategoriesError = (error) => {
  return {
    type: GET_CATEGORY_SUBCATEGORIES_ERROR,
    error
  }
}

export const fetchProductsSubCategoriesById = (categoryId) => {
  return (dispatch) => {
    console.log("getSubcatgori")

    dispatch(getCategorySubcategories())

    //makes the request
    get_data(`/produto/${categoryId}/subcategorias`)
    .then(response => {
      console.log(response)
      dispatch(getCategorySubcategoriesSuccess(response))
    })
    .catch(error => {
      dispatch(getCategorySubcategoriesError(error))
    })
  }
}
