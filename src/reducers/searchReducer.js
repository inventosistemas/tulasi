import { POST_SEARCH_PRODUCTS } from '../actions/searchActions'

//aqui deve entrar no nome do estado
const SEARCH_STATE = { ProdutoBuscaItens: [], searchProps: {}, TotalRegistros: 0 }

//então tratar cada action
export const search = (state = SEARCH_STATE, action) => {
  switch (action.type) {

    case POST_SEARCH_PRODUCTS:
      return { searchProps: action.props, ...action.payload};

    default:
      return state;
  }
};
