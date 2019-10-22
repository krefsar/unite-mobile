import { CLEAR_USER, FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, SET_USER, START_LOGIN } from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  token: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        token: null,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.errorMsg,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.payload.userToken,
      };

    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };

    case START_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case FINISH_LOGIN:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}