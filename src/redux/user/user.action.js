import { LOADING_UI, CLEAR_ERRORS, SET_USER, SET_ERRORS, SET_UNAUTHENTICATED } from "../types"
import Axios from "axios";

export const loginUser = (formData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await Axios.post('/login', formData);
    setAuthorizationHeader(res.data.token)
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

export const signupUser = (formData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await Axios.post('/signup', formData);
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS })
    history.push('/')
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete Axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED })
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

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', `Bearer ${token}`);
  Axios.defaults.headers.common['Authorization'] = FBIdToken;
}