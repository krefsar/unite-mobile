import React from 'react';

import storage from '../util/storage';

function unprotectedScreen(WrappedComponent) {
  return class extends React.Component {
    async componentDidMount() {
      const { navigation } = this.props;

      const token = await storage.getItem('user_token');

      if (token) {
        navigation.navigate('Events');
      }
    }

    async componentDidUpdate() {
      const { navigation } = this.props;

      const token = await storage.getItem('user_token');

      if (token) {
        navigation.navigate('Events');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default unprotectedScreen;
