import { FINISH_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, START_LOGIN } from './actionTypes';
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

export default {
  loginWithEmail,
}