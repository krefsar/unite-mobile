import {
  AsyncStorage,
} from 'react-native';

import { ADD_USER } from './actionTypes';
import { SERVER_HOST } from '../../config/config';
import { setUser } from './auth';
import { apiFetch, authenticatedFetch } from '../../util/api';

export function updateUser(updatedUser) {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    const url = `${SERVER_HOST}/users/${updatedUser._id}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user: updatedUser }),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setUser(response.user));
      });
  }
}

function loadUser(userId) {
  return (dispatch) => {
    const url = `${SERVER_HOST}/users/${userId}`;

    return apiFetch(url, {
      method: 'GET',
    })
      .then(response => {
        dispatch(addUser(response.user));
      });
  };
}

function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export default {
  loadUser,
}