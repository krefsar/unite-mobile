import React from 'react';

import storage from '../util/storage';

function protectedScreen(WrappedComponent) {
  return class extends React.Component {
    async componentDidMount() {
      const { navigation } = this.props;

      const token = await storage.getItem('user_token');

      if (!token) {
        navigation.navigate('Login');
      }
    }

    async componentDidUpdate() {
      const { navigation } = this.props;

      const token = await storage.getItem('user_token');

      if (!token) {
        navigation.navigate('Login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default protectedScreen;