import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';
import React from 'react';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.attemptLogin();
  }

  attemptLogin = async () => {
    const { navigation } = this.props;

    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? 'Events' : 'Login');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingScreen;