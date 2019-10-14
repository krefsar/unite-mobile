import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator({
    Login: LoginStack,
    Main: MainTabNavigator,
  }, {
    initialRouteName: 'Login',
  })
);
