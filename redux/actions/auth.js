import {
  AsyncStorage,
} from 'react-native';

import { LOGOUT_USER, AUTHENTICATE_USER, SET_TOKEN, CLEAR_USER, FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, SET_USER, START_LOGIN } from './actionTypes';
import { SERVER_HOST } from '../../config/config';
import { apiFetch } from '../../util/api';
import storage from '../../util/storage';

function startLogin() {
  return {
    type: START_LOGIN,
  };
}

function finishLogin() {
  return {
    type: FINISH_LOGIN,
  };
}

function loginSuccess(userToken) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userToken,
    },
  };
}

function loginFailure(errorMsg) {
  return {
    type: LOGIN_ERROR,
    payload: {
      errorMsg,
    },
  };
}

function loginWithEmail({ email, password }) {
  return (dispatch) => {
    dispatch(startLogin());

    const url = `${SERVER_HOST}/auth/login`;
    return apiFetch(url, {
      method: 'POST',
      body: {
        email,
        password,
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw response.error;
        }

        const { userToken } = response;
        dispatch(loginSuccess(userToken));
      })
      .catch(err => {
        dispatch(loginFailure(err));
      })
      .finally(() => {
        dispatch(finishLogin());
      });
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function invalidateUser() {
  return async (dispatch) => {
    await storage.clearItem('user_token');
    dispatch(logoutUser());
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function loginWithToken({ token }) {
  return (dispatch) => {
    const url = `${SERVER_HOST}/users/me`; 

    return fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw response.error;
        }

        return true;
      })
      .catch(err => {
        return false;
      });
  }
}

export function getCurrentUser() {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    const url = `${SERVER_HOST}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setUser(response.user));
      });
  }
}

function signupWithEmail({ email, password, phoneNumber, username }) {
  return (dispatch) => {
    const url = `${SERVER_HOST}/users/create-user`;

    return apiFetch(url, {
      method: 'POST',
      body: {
        email,
        password,
        phone: phoneNumber,
        username,
      },
    })
      .then(response => {
        const { userToken } = response;
        dispatch(authenticateUser());
        storage.saveItem('user_token', userToken);
      });
  }
}

function authenticateUser() {
  return {
    type: AUTHENTICATE_USER,
  };
}

function loadToken(token) {
  return (dispatch) => {
    console.log('load token', token);
    if (token) {
      dispatch(authenticateUser());
    }
  };
}

function setUserToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export default {
  loadToken,
  loginWithEmail,
  loginWithToken,
  signupWithEmail,
}