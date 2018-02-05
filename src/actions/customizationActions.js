import { apiUrl } from './requestHelper';
import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const GET_ARTICLE_CONTENT = 'GET_ARTICLE_CONTENT';
export const GET_ARTICLE_CONTENT_SUCCESS = 'GET_ARTICLE_CONTENT_SUCCESS'
export const GET_ARTICLE_CONTENT_ERROR = 'GET_ARTICLE_CONTENT_ERROR'

export const DELETE_ARTICLES = 'DELETE_ARTICLES'

const getArticleContent = () => ({ type: GET_ARTICLE_CONTENT })

const getArticleContentSuccess = content => ({ type: GET_ARTICLE_CONTENT_SUCCESS, content })

const getArticleContentError = error => ({ type: GET_ARTICLE_CONTENT_ERROR, error })

export const getArticleContentRequest = blogId => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/vitrine/blog/${blogId}/obterdetalheartigo`);

  return dispatch => {

    dispatch(getArticleContent())

    request
    .then( response => {
      dispatch(getArticleContentSuccess(response.data))
    })
    .catch( error => {
      console.log('error getting article content', error)
      dispatch(getArticleContentError(error))
    })
  }
}

export const getArticleContentIdRequest = categoryId => {
  const instance = axios.create({
    "Content-Type" : "application/json"
  })
  const request = instance.get(`${apiUrl}/vitrine/blog/${1}/${categoryId}/buscarcategoria`);

  return dispatch => {

    request
    .then( response => response.data.map(({ID}) => dispatch(getArticleContentRequest(ID))))
    .catch( error => {
      console.log('Error getting article id')
    })
  }
}

const getCategories = () => ({ type: GET_CATEGORIES })

const getCategoriesSuccess = categories => ({ type: GET_CATEGORIES_SUCCESS, categories })

const getCategoriesError = error => ({ type: GET_CATEGORIES_ERROR, error })

export const getCategoriesRequest = (categoriesId) => {

  const instance = axios.create({
    "Content-Type" : "application/json"
  })

  const request = instance.get(`${apiUrl}/vitrine/blog/categorias`);

  return dispatch => {

    dispatch(getCategories())

    request
    .then( response => {
      dispatch(getCategoriesSuccess(response.data))
      // tinha esse filtro antes, mas analisando bem, a ideia de SPA é carregar todo o conteúde de um vez, com esse filtro cada página acessada
      // teria que ter um request novo para trazer o seu conteúdo, mesmo que essa tela já tenha sido acessada antes.
      // response.data.filter(category => categoriesId.indexOf(category.ID) > -1).map(category => dispatch(getArticleContentIdRequest(category.ID)))
      response.data.map(category => dispatch(getArticleContentIdRequest(category.ID)))
    })
    .catch( error => {
      dispatch(getCategoriesError(error))
    })
  }
}


export const deleteCurrentArticles = () => ({ type: DELETE_ARTICLES })
