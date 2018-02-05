import {
  POST_CUPOM,
  POST_CUPOM_SUCCESS,
  POST_CUPOM_ERROR,
  DELETE_CUPOM
} from '../actions/cupomActions';

const CUPOM_STATE = {
  isPostingCupom: false,
  postCupomSuccess: null,
  postCupomError: null
}

export const cupom = (state = CUPOM_STATE, action) => {
  switch(action.type){
    case POST_CUPOM:
      return{
        ...state,
        isPostingCupom: true
      }
    case POST_CUPOM_SUCCESS:
      return{
        ...state,
        isPostingCupom: false,
        postCupomSuccess: action.response,
        postCupomError: null
      }
    case POST_CUPOM_ERROR:
      return{
        ...state,
        isPostingCupom: false,
        postCupomSuccess: null,
        postCupomError: action.error
      }
    case DELETE_CUPOM:
      return{
        ...state,
        isPostingCupom: false,
        postCupomSuccess: null,
        postCupomError: null
      }
    default:
      return{
        ...state
      }
  }
}
