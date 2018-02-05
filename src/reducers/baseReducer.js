import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = { footer : null };

export const base = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case actionTypes.FETCH_FOOTER_SUCCESS:
      return {
        ...state,
        footer: action.footer
      }
    default:
      return state;
  }
};
