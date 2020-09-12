import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from "../types"

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const { comments } = state.scream
      return {
        ...state,
        screams: state.screams.map(scream => scream.screamId === action.payload.screamId ? action.payload : scream),
        scream: state.scream.screamId === action.payload.screamId && {...action.payload, comments}
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        screams: state.screams.map(scream => scream.screamId === action.payload.screamId ? {...scream, commentCount: scream.commentCount + 1} : scream),
        scream: {
          ...state.scream,
          likeCount: state.scream.likeCount + 1,
          comments: [action.payload, ...state.scream.comments]
        }
      }
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(scream => scream.screamId !== action.payload)
      }
    default: 
      return state;
  }
}

export default dataReducer