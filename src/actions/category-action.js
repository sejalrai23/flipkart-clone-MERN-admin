import axiosInstance from "../helpers/axios";
import { CategoryConstants } from "./constants";

const getAllCategory = () => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.GET_CAT_REQUEST });
    const res = await axiosInstance.get('/category/view');
    console.log("getcat res", res);
    console.log(res.status);
    if (res.status === 201) {

      const categoryList = res.data.catergorylist;
      console.log(res.data.catergorylist);
      console.log("plss:", categoryList);
      dispatch({
        type: CategoryConstants.GET_CAT_SUCCESS,
        payload: { categories: categoryList },
      })
    } else {
      dispatch({ type: CategoryConstants.GET_CAT_FAILURE, payload: { error: res.data.error } })
    }
  }
}

export const addCategory = (form) => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.ADD_NEW_CAT_REQUEST });
    try {
      const res = await axiosInstance.post('/category/create', form);
      if (res.status === 201) {
        dispatch({
          type: CategoryConstants.ADD_NEW_CAT_SUCCESS,
          payload: { category: res.data.cat }
        });
      } else {
        dispatch({ type: CategoryConstants.ADD_NEW_CAT_FAILURE, payload: res.data.error });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  }
}

export const updateCategory = (form) => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.UPDATE_CAT_REQUEST });
    const res = await axiosInstance.post('/category/update', form);
    if (res.status === 201) {
      dispatch({ type: CategoryConstants.UPADTE_CAT_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: CategoryConstants.UPDATE_CAT_FAILURE, payload:{error: res.data.error}
      });
    }
    // console.log(res);
  }
}

export const deleteCategoryAction = (ids) => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.DELETE_CAT_REQUEST });
    const res = await axiosInstance.post('/category/delete', {
      payload: {
        ids
      }
    });
    if (res.status == 201) {
      dispatch({ type: CategoryConstants.DELETE_CAT_SUCCESS });
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: CategoryConstants.DELETE_CAT_FAILURE, payload: {error:res.data.error}
      });
    }


  }
}

export { getAllCategory }