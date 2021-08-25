import axiosInstance from "../helpers/axios";
import { CategoryConstants } from "./constants";

export const getAllCategory = () => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.GET_CAT_REQUEST });
    const res = await axiosInstance.get('/category/view');
    console.log(res);
    if (res.status === 201) {

      const categoryList = res.data.catergorylist;
      console.log(res.data.catergorylist);
      // console.log("plss:", categoryList);
      dispatch({
        type: CategoryConstants.GET_CAT_SUCCESS,
        payload: { category: categoryList },
      })
    } else {
      dispatch({ type: CategoryConstants.GET_CAT_FAILURE, payload: { error: res.data.error } })
    }
  }
}

export const addCategory = (form) => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.ADD_NEW_CAT_REQUEST });
    const res = await axiosInstance.post('/category/create', form);
    if (res.status === 201) {
      dispatch({
        type: CategoryConstants.ADD_NEW_CAT_SUCCESS,
        payload: { category: res.data.cat}
      });
    } else {
      dispatch({ type: CategoryConstants.ADD_NEW_CAT_FAILURE, payload: res.data.error });
    }
    console.log(res);
  }
}