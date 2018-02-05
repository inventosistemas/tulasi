import * as actionTypes from './actionTypes';
import { get_data, apiUrl } from './requestHelper';
import axios from 'axios'
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY"
export const GET_PRODUCTS_BY_CATEGORY_ERROR = "GET_PRODUCTS_BY_CATEGORY_ERROR"
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS = "GET_PRODUCTS_BY_CATEGORY_SUCCESS"

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products
  }
}

export const fetchFeaturedProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_FEATURED_PRODUCTS_SUCCESS,
    products
  }
}

export const fetchProductsCategoriesByTagSuccess = (productsCategories) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_CATEGORIES_BY_TAG_SUCCESS,
    productsCategories
  }
}

export const fetchOfferOfTheDaySucess = (offerOfTheDay) => {
  return {
    type: actionTypes.FETCH_OFFER_OF_THE_DAY_SUCCESS,
    offerOfTheDay
  }
}

export const fetchFullProductsCategoriesSucess = (fullProductsCategories) => {
  return {
    type: actionTypes.FETCH_FULL_PRODUCTS_CATEGORIES_SUCCESS,
    fullProductsCategories
  }
}



export const fetchProductsByCategorySuccess = (productsByCategory) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
    productsByCategory
  }
}

export const fetchProducts = () => {
  return (dispatch) => {
    get_data('/produto/1216/agrupamentoprodutotipo')
      .then(response => {
        dispatch(fetchProductsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchFeaturedProducts = (count) => {
  return (dispatch) => {
    get_data(`/vitrine/${count}`)
      .then(response => {
        dispatch(fetchFeaturedProductsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchProductsCategoriesByTag = (tag) => {
  return (dispatch) => {
    get_data(`/produto/${tag}/categoriaportag`)
      .then(response => {
        dispatch(fetchProductsCategoriesByTagSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchOfferOfTheDay = (code) => {
  return (dispatch) => {
    get_data(`/produto/${code}/categoriaespecial`)
      .then(response => {
        dispatch(fetchOfferOfTheDaySucess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchFullProductsCategories = () => {
  return (dispatch) => {
    get_data(`/vitrine/obtermenucategoriaprodutocompleto`)
      .then(response => {
        dispatch(fetchFullProductsCategoriesSucess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

// tags de filtro

export const fetchProductsByCategory = (id) => {
  return (dispatch) => {
    get_data(`/produto/${id}/produtocategoria`)
      .then(response => {
        dispatch(fetchProductsByCategorySuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const getProductsByCategory = () => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY
  }
}

export const getProductsByCategoryError = (error) => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY_ERROR,
    error
  }
}

export const getProductsByCategorySuccess = (response) => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    response
  }
}

export const getProductsByCategoryRequest = (id, produtoSubCategoriaID) => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  let request = null

  if (produtoSubCategoriaID !== undefined) {
    request = instance.get(`${apiUrl}/produto/${0}/produtocategoriasku`, {
      params: {
        produtoSubCategoriaID
      }
    })
  } else {
    request = instance.get(`${apiUrl}/produto/${id}/produtocategoriasku`)
  }

  return dispatch => {
    dispatch(getProductsByCategory())

    return request
    .then(response => {
      dispatch(getProductsByCategorySuccess(response.data))
    })
    .catch(error => {
      dispatch(getProductsByCategoryError(error))
    })
  }
}

export const getProductById = (id) => {
  //console.log("getProductById");

  const instance = axios.create({
    headers: {
      'Content-Type': "application/json"
    }
  })

  const request = instance.get(`${apiUrl}/produto/${id}`)

  return (dispatch) => {
    request.then(({ data }) => {
      //console.log("promessinha:")
      //console.log(data)
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data
      })
    })
  }
}
