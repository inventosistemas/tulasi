import * as actionTypes from '../actions/actionTypes';

export const home = (state = [], action) => {
  switch (action.type) {

    case actionTypes.FETCH_BANNERS_SUCCESS:
      return {
        ...state,
        banners: action.banners
      }
    case actionTypes.FETCH_WHY_CHOOSE_US_SUCCESS:
      return {
        ...state,
        whyChooseUs: action.whyChooseUs
      }
    default:
      return state;
  }
};
