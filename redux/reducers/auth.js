import { LOGOUT_USER, AUTHENTICATE_USER, SET_TOKEN, CLEAR_USER, FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, SET_USER, START_LOGIN } from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  token: null,
  authenticated: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

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
        loading: false,
      };

    case SET_USER:
      return {
        ...state,
        currentUser: action.user,
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