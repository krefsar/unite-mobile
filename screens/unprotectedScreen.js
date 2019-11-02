import { connect } from 'react-redux';
import React from 'react';

import storage from '../util/storage';

function unprotectedScreen(WrappedComponent) {
  class UnprotectedScreen extends React.Component {
    async componentDidMount() {
      const { authenticated, navigation } = this.props;

      console.log('unprotected mount, authenticated?', authenticated);
      if (authenticated) {
        navigation.navigate('Profile');
      }
    }

    async componentDidUpdate() {
      const { authenticated, navigation } = this.props;

      console.log('unprotected update, authenticated?', authenticated);
      if (authenticated) {
        navigation.navigate('Profile');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapStateToProps(state) {
    console.log('unprotected state is', state);
    return {
      authenticated: state.auth.authenticated,
    };
  }

  const ConnectedUnprotectedScreen = connect(mapStateToProps)(UnprotectedScreen);
  return ConnectedUnprotectedScreen;
}

export default unprotectedScreen;
