import {
  AsyncStorage,
} from 'react-native';

import { CLEAR_USER, FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, SET_USER, START_LOGIN } from './actionTypes';
import { SERVER_HOST } from '../../config/config';

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
    console.log('fetching url', url);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('got response', response);
        if (response.error) {
          throw response.error;
        }

        const { userToken } = response;
        dispatch(loginSuccess(userToken));
      })
      .catch(err => {
        console.log('got error', err);
        dispatch(loginFailure(err));
      })
      .finally(() => {
        dispatch(finishLogin());
      });
  }
}

function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

function setUser(user) {
  console.log('set user', user);
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function invalidateUser() {
  return async (dispatch) => {
    await AsyncStorage.removeItem('userToken');
    dispatch(clearUser());
  }
}

export function loginWithToken({ token }) {
  return (dispatch) => {
    const url = `${SERVER_HOST}/users/me`; 
    console.log('fetching', token);

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
        console.log('got response', response);
        if (response.error) {
          throw response.error;
        }

        return true;
      })
      .catch(err => {
        console.log('got error', err);
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
        console.log('got response', response);
        dispatch(setUser(response.user));
      });
  }
}

function signupWithEmail({ email, password, phoneNumber, username }) {
  return (dispatch) => {
    dispatch(startLogin());

    const url = `${SERVER_HOST}/users/create-user`;
    console.log('fetching url', url);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        phone: phoneNumber,
        username,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('got response', response);
        if (response.error) {
          throw response.error;
        }

        const { userToken } = response;
        dispatch(loginSuccess(userToken));
      })
      .catch(err => {
        console.log('got error', err);
        dispatch(loginFailure(err));
      })
      .finally(() => {
        dispatch(finishLogin());
      });
  }
}

export default {
  loginWithEmail,
  loginWithToken,
  signupWithEmail,
}