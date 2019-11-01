import { AsyncStorage } from 'react-native';

async function saveItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('AsyncStorage set error:', error);
  }
}

async function getItem(key) {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (error) {
    console.log('AsyncStorage get error:', error);
  }
}

async function clearItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch(error) {
    console.log('AsyncStorage clear error:', error);
  }
}

export default {
  clearItem,
  getItem,
  saveItem,
};