import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import colors from '../styles/colors';
import { getCurrentUser, invalidateUser } from '../redux/actions/auth';
import ProtectedScreen from './ProtectedScreen';
import { updateUser } from '../redux/actions/users';

const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

class ProfileScreen extends ProtectedScreen {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      editingValue: null,
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  handlePhoneEditingEnd = () => {
    const { onPhoneUpdate, user } = this.props;
    const { editingValue } = this.state;

    onPhoneUpdate({ user, phone: editingValue });

    this.setState({
      editing: null,
      editingValue: null,
    });
  };

  handleStatusEditingEnd = () => {
    const { onStatusUpdate, user } = this.props;
    const { editingValue } = this.state;

    onStatusUpdate({ user, status: editingValue });

    this.setState({
      editing: null,
      editingValue: null,
    });
  };

  handleLogoutPress = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  handlePhoneEditPress = () => {
    const { user } = this.props;
    const { phone } = user || {};


    this.setState({
      editing: 'phone',
      editingValue: phone,
    }, () => {
      this.phoneEditInput.focus();
    });
  };

  handlePhoneChange = value => {
    this.setState({
      editingValue: value,
    });
  };

  handleStatusChange = value => {
    this.setState({
      editingValue: value,
    });
  };

  handleStatusEditPress = () => {
    const { user } = this.props;
    const { status } = user || {};

    this.setState({
      editing: 'status',
      editingValue: status,
    }, () => {
      this.statusEditInput.focus();
    });
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

  renderStatus() {
    const { user } = this.props;
    const { editing, editingValue } = this.state;
    const { status } = user || {};

    return (
      <View style={styles.statusContainer}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-megaphone' : 'md-megaphone'}
          size={32}
        />
        {editing === 'status' ?
          <TextInput
            ref={ref => this.statusEditInput = ref}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleStatusChange}
            returnKeyLabel="Done"
            returnKeyType="done"
            onEndEditing={this.handleEditingEnd}
            style={styles.statusText}
            value={editingValue}
          /> :
          <Text style={styles.statusText}>{status}</Text>
        }
        {editing === 'status' ?
          <TouchableOpacity
            onPress={this.handleStatusEditingEnd}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Done</Text>
          </TouchableOpacity> :
          <TouchableOpacity
            onPress={this.handleStatusEditPress}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }

  renderPhone() {
    const { user } = this.props;
    const { editing, editingValue } = this.state;
    const { phone } = user || {};

    return (
      <View style={styles.phoneContainer}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'}
          size={32}
        />
        {editing === 'phone' ?
          <TextInput
            ref={ref => this.phoneEditInput = ref}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handlePhoneChange}
            returnKeyLabel="Done"
            returnKeyType="done"
            onEndEditing={this.handlePhoneEditingEnd}
            style={styles.phoneText}
            value={editingValue}
          /> :
          <Text style={styles.phoneText}>{phone}</Text>
        }
        {editing === 'phone' ?
          <TouchableOpacity
            onPress={this.handleEditingEnd}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Done</Text>
          </TouchableOpacity> :
          <TouchableOpacity
            onPress={this.handlePhoneEditPress}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }

  render() {
    const { user } = this.props;
    console.log('user is', user);
    return (
      <ScrollView style={styles.container}>
        {this.renderProfilePicture()}
        {this.renderName()}

        {this.renderStatus()}
        {this.renderPhone()}

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

    onPhoneUpdate({ user, phone }) {
      dispatch(updateUser({ ...user, phone }));
    },

    onStatusUpdate({ user, status }) {
      dispatch(updateUser({ ...user, status }));
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
  editButtonText: {
    color: colors.blue,
    textTransform: 'uppercase',
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
    paddingBottom: 16,
  },
  phoneContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
  },
  phoneText: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
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
  statusContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
    paddingLeft: 24,
    paddingTop: 16,
    paddingRight: 24,
  },
  statusText: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

ProfileScreen.navigationOptions = {
  headerTitle: 'Profile',
};
