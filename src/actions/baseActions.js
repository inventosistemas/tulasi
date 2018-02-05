import * as actionTypes from './actionTypes';
import { get_data } from './requestHelper';

export const fetchFooterSuccess = (footer) => {
  return {
    type: actionTypes.FETCH_FOOTER_SUCCESS,
    footer
  }
}

export const fetchProductCategoriesSuccess = (productsCategories) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_CATEGORIES_SUCCESS,
    productsCategories
  }
}

export const fetchProductMenuSuccess = (productMenu) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_MENU_SUCCESS,
    productMenu
  }
}


export const fetchFooter = () => {
  return (dispatch) => {
    get_data('/rodape')
      .then(response => {
        let unhandledResponse = response.data;
        let handledResponse = {};

        unhandledResponse.forEach(element => {
          switch (element.Descricao) {
            case "DÚVIDAS":
              handledResponse.doubts = element.Itens
              break;
            case "POLITICA FRETE":
              handledResponse.policy = element.Itens
              break;
            case "PORQUE NOS ESCOLHER":
              handledResponse.corporate = element.Itens
              break;
            case "REDES SOCIAIS":
              handledResponse.socialMedia = element.Itens
              break;
            case "TOPO":
              handledResponse.top = element.Itens;
              break;
            case "INFORMAÇÕES":
              handledResponse.contentInfo = element.Itens;
              break;
            default:
              handledResponse[element.Descricao] = element.Itens
              break;
          }
        })

        dispatch(fetchFooterSuccess(handledResponse))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchProductCategories = () => {
  return (dispatch) => {
    get_data('/vitrine/obtermenucategoriaproduto')
      .then(response => {
        dispatch(fetchProductCategoriesSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchProductMenu = () => {
  return (dispatch) => {
    get_data('/vitrine/obtermenu')
      .then(response => {
        dispatch(fetchProductMenuSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}
