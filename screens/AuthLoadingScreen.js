import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import authActions from '../redux/actions/auth';
import storage from '../util/storage';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.attemptLogin();
  }

  attemptLogin = async () => {
    const { onLogin, navigation } = this.props;

    const token = await storage.getItem('user_token');
    if (token) {
      await onLogin(token);
      navigation.navigate('Chat');
    } else {
      navigation.navigate('Login');
    }
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
    onLogin(token) {
      dispatch(authActions.loadToken(token));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);