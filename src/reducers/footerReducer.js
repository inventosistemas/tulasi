import { GET_FOOTER_ITEM } from "../actions/footerActions"

const STATE_FOOTER = { currentFooterItem: null }

export const footer = (state = STATE_FOOTER, action) => {
  switch (action.type) {
    case GET_FOOTER_ITEM:
      return {
        ...state, currentFooterItem: action.payload
      }
    default:
      return state
  }
}
