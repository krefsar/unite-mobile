import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from '../navigation/AppNavigator';
import storage from '../util/storage';
import authActions from '../redux/actions/auth';

function handleLoadingError(error) {
  console.warn(error);
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('../assets/images/robot-dev.png'),
      require('../assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  async componentDidMount() {
    const { onLoad } = this.props;
    const token = await storage.getItem('user_token');
    console.log('calling on load with token', token);
    onLoad(token);
  }

  handleFinishLoading() {
    this.setState({
      loading: true,
    });
  }

  renderApp() {
    return (
      <AppNavigator />
    );
  }

  renderLoading() {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => this.handleFinishLoading()}
      />
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}	
        {loading ? this.renderLoading() : this.renderApp()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad(token) {
      dispatch(authActions.loadToken(token));
    },
  };
}

const ConnectedMainApp = connect(mapStateToProps, mapDispatchToProps)(MainApp);
export default ConnectedMainApp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});