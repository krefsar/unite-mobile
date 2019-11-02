import { connect } from 'react-redux';
import React from 'react';

import storage from '../util/storage';

function protectedScreen(WrappedComponent) {
  class ProtectedScreen extends React.Component {
    async componentDidMount() {
      const { authenticated, navigation } = this.props;

      console.log('protected mount, authenticated?', authenticated);
      if (!authenticated) {
        navigation.navigate('Login');
      }
    }

    async componentDidUpdate() {
      const { authenticated, navigation } = this.props;

      console.log('protected update, authenticated?', authenticated);
      if (!authenticated) {
        navigation.navigate('Login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapStateToProps(state) {
    console.log('protected state is', state);
    return {
      authenticated: state.auth.authenticated,
    };
  }

  const ConnectedProtectedScreen = connect(mapStateToProps)(ProtectedScreen);
  return ConnectedProtectedScreen;
}

export default protectedScreen;