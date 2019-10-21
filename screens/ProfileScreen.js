import { connect } from 'react-redux';
import { ExpoConfigView } from '@expo/samples';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../styles/colors';
import { invalidateUser } from '../redux/actions/auth';
import ProtectedScreen from './ProtectedScreen';

class ProfileScreen extends ProtectedScreen {
  handleLogoutPress = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleLogoutPress}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser() {
      dispatch(invalidateUser());
    },
  };
}

const ConnectedProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default ConnectedProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.blue,
    borderRadius: 8,
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    marginLeft: 56,
    marginRight: 56,
    marginTop: 32,
    paddingTop: 12,
    paddingBottom: 12,
  },
  logoutText: {
    color: 'white',
    fontSize: 24,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
