import { LOADING_UI, CLEAR_ERRORS, SET_USER, SET_ERRORS } from "../types"
import Axios from "axios";

export const loginUser = (formData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await Axios.post('/login', formData);
    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
    Axios.defaults.headers.common['Authorization'] = FBIdToken;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS })
    history.push("/")
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

export const getUserData = () => async dispatch => {
  try {
    const res = await Axios.get('/user');
    dispatch({
      type: SET_USER,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}