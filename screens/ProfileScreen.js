import { connect } from 'react-redux';
import { ExpoConfigView } from '@expo/samples';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../styles/colors';
import { getCurrentUser, invalidateUser } from '../redux/actions/auth';
import ProtectedScreen from './ProtectedScreen';

const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

class ProfileScreen extends ProtectedScreen {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  handleLogoutPress = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  renderProfilePicture() {
    const { user } = this.props;
    const { photoUrl = DEFAULT_PHOTO_URL } = user || {};

    return (
      <View style={styles.photoContainer}>
        <Image source={{ uri: photoUrl }} style={styles.photo} />
      </View>
    );
  }

  renderName() {
    const { user } = this.props;
    const { username } = user || {};

    return (
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{username}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <ScrollView style={styles.container}>
        {this.renderProfilePicture()}

        {this.renderName()}

        <View style={styles.statusContainer}>
        </View>

        <View style={styles.phoneContainer}>
        </View>

        <TouchableOpacity
          onPress={this.handleLogoutPress}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  console.log('state is', state);
  return {
    token: state.auth.token,
    user: state.auth.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad() { 
      dispatch(getCurrentUser());
    },

    logoutUser() {
      dispatch(invalidateUser());
    },
  };
}

const ConnectedProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default ConnectedProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  name: {
    color: 'black',
    fontSize: 24,
  },
  nameContainer: {
    alignItems: 'center',
  },
  photo: {
    backgroundColor: colors.purple,
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 56,
    height: 112,
    width: 112,
    resizeMode: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
  },
});

ProfileScreen.navigationOptions = {
  headerTitle: 'Profile',
};
