import axios from 'axios';
import { apiUrl } from './requestHelper';
//TYPES
export const POST_CUPOM = 'POST_CUPOM';
export const POST_CUPOM_SUCCESS = 'POST_CUPOM_SUCCESS';
export const POST_CUPOM_ERROR = 'POST_CUPOM_ERROR';
export const DELETE_CUPOM = 'DELETE_CUPOM';

const postCupom = () => {
  return{
    type: POST_CUPOM
  }
}

const postCupomSuccess = (response) => {
  return{
    type: POST_CUPOM_SUCCESS,
    response
  }
}

const postCupomError = (error) => {
  return{
    type: POST_CUPOM_ERROR,
    error
  }
}

export const postCupomRequest = (payload) => {
  const instance = axios.create({
    headers: {
      'Contenty-Type':'application/json'
    }
  });

  const request = instance.post(`${apiUrl}/carrinho/utilizarcupom`, payload);

  return dispatch => {
    dispatch(postCupom());

    return request
      .then( response => {
        console.log('POST CUPOM SUCCESS');

        dispatch(postCupomSuccess(response));

      }).catch( error => {
        console.log('POST CUPOM ERROR');

        dispatch(postCupomError(error));

      });
  }
}

export const deleteCupom = () => ({ type: DELETE_CUPOM })
