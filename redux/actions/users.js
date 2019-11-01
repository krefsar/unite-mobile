import {
  AsyncStorage,
} from 'react-native';

import { SERVER_HOST } from '../../config/config';
import { setUser } from './auth';

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