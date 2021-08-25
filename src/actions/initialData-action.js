import axiosInstance from "../helpers/axios";
import { CategoryConstants, productConstants ,initialDataConstants } from "./constants";

export const getInitialData = () => {
  return async dispatch => {
    const res = await axiosInstance.post('/initialData');
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: CategoryConstants.GET_CAT_SUCCESS,
        payload: { categories }
      })
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: { products }
      })
    }
    console.log(res);

  }
}