import axios from 'axios'
import { apiUrl } from './requestHelper'

export const POST_SEARCH_PRODUCTS = "POST_SEARCH_PRODUCTS"
export const defaultSearchParams = {
  "Chave": "",
  "Count": "10",
  "UltimoID": -1,
  "UltimoPreco": -1,
  "UltimaDescricao": "",
  "TipoOrdenacao": -1,
  "ProdutoID": -1,
  "ProdutoCategoriaID": -1,
  "ProdutoSubCategoriaID": -1,
}

export function postSearchProducts(props){
  //console.log("postSearch")
  //console.log(props)

  const instance = axios.create({
    headers: {
      'Content-Type': "application/json"
    }
  })

  const request = instance.post(`${apiUrl}/produto/buscar`, props)

  return (dispatch) => {
      request.then(({ data }) => {
        dispatch({
         type: POST_SEARCH_PRODUCTS,
         payload: data,
         props
       })
      })
  }
}
