import React from 'react';

class ProtectedScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.token && !this.props.token) {
      this.props.navigation.navigate('Login');
    }
  }
}

export default ProtectedScreen;