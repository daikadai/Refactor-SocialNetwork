import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_SCREAM, STOP_LOADING_UI, SUBMIT_COMMENT } from "../types"
import Axios from "axios"


//Get all screams
export const getScreams = () => async dispatch => {
  dispatch({
    type: LOADING_DATA
  })

  try {
    const res = await Axios.get('/screams');
    dispatch({
      type: SET_SCREAMS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: SET_SCREAMS,
      payload: []
    })
  }
}

//Like a scream
export const likeScream = screamId => async dispatch => {
  try {
    const res = await Axios.get(`/scream/${screamId}/like`);
    dispatch({
      type: LIKE_SCREAM,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

//Like a scream
export const unlikeScream = screamId => async dispatch => {
  try {
    const res = await Axios.get(`/scream/${screamId}/unlike`);

    dispatch({
      type: UNLIKE_SCREAM,
      payload: res.data
    })
    
  } catch (error) {
    console.log(error);
  }
}

//Post a scream
export const postScream = text => async dispatch => {
  dispatch({
    type: LOADING_UI
  })
  try {
    const res = await Axios.post('/scream', text);
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    })

    dispatch({
      type: CLEAR_ERRORS
    })
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

//Set a scream
export const getScream = (screamId) => async dispatch => {
  dispatch({ type: LOADING_UI })
  try {
    const res = await Axios.get(`/scream/${screamId}`);
    dispatch({
      type: SET_SCREAM,
      payload: res.data
    })
    dispatch({ type: STOP_LOADING_UI })
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

//Submit a comment 
export const submitComment = (screamId, comment) => async dispatch => {
  try {
    const res = await Axios.post(`/scream/${screamId}/comment`, comment);
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

//Delete a scream
export const deleteScream = screamId => async dispatch => {
  try {
    await Axios.delete(`/scream/${screamId}`);
    dispatch({
      type: DELETE_SCREAM,
      payload: screamId
    })
  } catch (error) {
    console.log(error);
  }
}

//Get user profile screams
export const getUserData = userHandle => async dispatch => {
  dispatch({ type: LOADING_DATA})
  try {
    const res = await Axios.get(`/user/${userHandle}`);
    dispatch({
      type: SET_SCREAMS,
      payload: res.data.screams
    })
    
    return res.data.user;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: null
    })
  }
}

