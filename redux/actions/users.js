import {
  AsyncStorage,
} from 'react-native';

import { ADD_USER, ADD_FRIENDS } from './actionTypes';
import { SERVER_HOST } from '../../config/config';
import { setUser } from './auth';
import { apiFetch, authenticatedFetch } from '../../util/api';

export function updateUser(updatedUser) {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('user_token');
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

function loadFriends(userId) {
  return (dispatch) => {
    console.log('load friends for user', userId);
    const url = `${SERVER_HOST}/graphql`;

    return authenticatedFetch(url, {
      method: 'POST',
      body: {
        query: `{
          friends(id: "${userId}") {
            id,
            username,
            status,
          }
        }`,
      },
    })
      .then(response => {
        const { data = {} } = response;
        dispatch(addFriends(data.friends || []));
      });
  };
}

function addFriends(friends) {
  return {
    type: ADD_FRIENDS,
    friends,
  };
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
  loadFriends,
}