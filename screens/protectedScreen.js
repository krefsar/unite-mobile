import { connect } from 'react-redux';
import React from 'react';

import storage from '../util/storage';

function protectedScreen(WrappedComponent) {
  class ProtectedScreen extends React.Component {
    async componentDidMount() {
      const { authenticated, navigation } = this.props;

      if (!authenticated) {
        navigation.navigate('Login');
      }
    }

    async componentDidUpdate() {
      const { authenticated, navigation } = this.props;

      if (!authenticated) {
        navigation.navigate('Login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }

  const ConnectedProtectedScreen = connect(mapStateToProps)(ProtectedScreen);
  return ConnectedProtectedScreen;
}

export default protectedScreen;