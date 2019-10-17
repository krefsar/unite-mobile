import { FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, START_LOGIN } from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  token: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
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