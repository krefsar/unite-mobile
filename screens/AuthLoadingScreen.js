import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import { loginWithToken } from '../redux/actions/auth';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.attemptLogin();
  }

  attemptLogin = async () => {
    const { loadUser, navigation } = this.props;

    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      await loadUser({ token: userToken });
    }
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser({ token }) {
      dispatch(loginWithToken({ token }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);