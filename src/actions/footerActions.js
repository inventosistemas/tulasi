import axios from 'axios';
import { apiUrl } from './requestHelper';

export const GET_FOOTER_ITEM = "GET_FOOTER_ITEM"

export const getFooterItem = name => {
  const instance = axios.create({
    headers: {
      'Content-Type' : "application/json"
    }
  })

  const request = instance.get(`${apiUrl}/${name}/rodape`)

  return (dispatch) => {
    request.then( ({data}) => {
      dispatch({
        type: GET_FOOTER_ITEM,
        payload: data[0]
      })
    })
    .catch(error => {
      throw(error);
    })
  }
}
