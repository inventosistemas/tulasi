import * as actionTypes from './actionTypes';
import { get_data } from './requestHelper';

export const fetchBannersSuccess = (banners) => {
  return {
    type: actionTypes.FETCH_BANNERS_SUCCESS,
    banners
  }
}

export const fetchWhyChooseUsSuccess = (whyChooseUs) => {
  return {
    type: actionTypes.FETCH_WHY_CHOOSE_US_SUCCESS,
    whyChooseUs
  }
}

export const fetchBanners = () => {
  return (dispatch) => {
    get_data('/banner')
      .then(response => {
        const data = response.data

        let bannerData = {
          data: data,
          model: {
            phrases : [],
            images : []
          }
        };

        //check the data length
        if (data.length > 0) {
          if (data[0].BannerItens.length > 0) {
            const bannerItems = data[0].BannerItens;

            bannerItems.forEach(element => {
              bannerData.model.phrases.push(element.Descricao)
              bannerData.model.images.push(element.Imagem)
            });
          }
        }
        dispatch(fetchBannersSuccess(bannerData))
      })
      .catch(error => {
        throw(error);
      })
  }
}

export const fetchWhyChooseUs = (tag) => {
  return (dispatch) => {
    get_data(`/${tag}/rodape/`)
      .then(response => {
        dispatch(fetchWhyChooseUsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      })
  }
}
