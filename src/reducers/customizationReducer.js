import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,

  GET_ARTICLE_CONTENT,
  GET_ARTICLE_CONTENT_SUCCESS,
  GET_ARTICLE_CONTENT_ERROR,

  DELETE_ARTICLES

} from '../actions/customizationActions';

const CUESTOMIZATION_STATE = {
  isGettingCategories: false,
  getCategoriesSuccess: null,
  getCategoriesError: null,

  isGettingArticleContent: false,
  getArticleContentSuccess: [],
  getArticleContentError: null,

  hasArticlesBeenDeleted: false,
}

export const customization = (state = CUESTOMIZATION_STATE, action) => {

  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        isGettingCategories: true,
        getCategoriesSuccess: null,
        getCategoriesError: null
      }
    case GET_CATEGORIES_SUCCESS:
        //console.log('getOrders completed!');
        return {
          ...state,
          isGettingCategories: false,
          getCategoriesSuccess: action.categories,
          getCategoriesError: null
        }
    case GET_CATEGORIES_ERROR:
        //console.log('getOrders failed!');
        return {
          ...state,
          isGettingCategories: false,
          getCategoriesSuccess: null,
          getCategoriesError: action.error
        }


    case GET_ARTICLE_CONTENT:
      return {
        ...state,
        isGettingArticleContent: true,
        getArticleContentSuccess: [],
        getArticleContentError: null
      }
    case GET_ARTICLE_CONTENT_SUCCESS:

      return {
        ...state,
        isGettingArticleContent: false,
        getArticleContentSuccess: [...state.getArticleContentSuccess, action.content],
        getArticleContentError: null,
        hasArticlesBeenDeleted: false
      }
    case GET_ARTICLE_CONTENT_ERROR:
      return {
        ...state,
        isGettingArticleContent: false,
        getArticleContentSuccess: [],
        getArticleContentError: action.error
      }

    case DELETE_ARTICLES:
      return {
        ...state,
        isGettingArticleContent: false,
        getArticleContentSuccess: [],
        getArticleContentError: null,
        hasArticlesBeenDeleted: true
      }
    default:
      return {
        ...state
      }
  }
}
