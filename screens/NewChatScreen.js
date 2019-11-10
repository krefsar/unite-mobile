import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { View, Button, ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import authActions from '../redux/actions/auth';
import FriendCard from '../components/FriendCard';
import userActions from '../redux/actions/users';
import colors from '../styles/colors';

class NewChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingContacts: false,
    };
  }

  componentDidMount() {
    const { currentUser = {}, loadFriends } = this.props;
    loadFriends(currentUser._id);
  }

  componentDidUpdate(prevProps) {
    const { currentUser = {}, loadFriends } = this.props;
    const { currentUser: prevUser = {} } = prevProps;

    if (currentUser !== prevUser) {
      loadFriends(currentUser._id);
    }
  }

  importContacts = async () => {
    const { loadContacts } = this.props;

    this.setState({
      loadingContacts: true,
    });

    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      const phoneNumbers = data.reduce((acc, person) => {
        const numberObjs = person.phoneNumbers || [];
        const numbers = numberObjs.map(obj => obj.number);

        return acc.add(...numbers);
      }, new Set());
      await loadContacts([...phoneNumbers]);
      this.setState({
        loadingContacts: false,
      });
    } else {
      alert('Unite needs access to your contacts. Please enable contacts permissions and restart the app.');
    }
  };
  
  renderFriends() {
    const { friends } = this.props;

    console.log('friends', friends);
    return friends.map(friendId => {
      return (
        <FriendCard key={friendId} friendId={friendId} />
      );
    });
  }

  renderContacts() {
    const { loadingContacts } = this.state;

    if (loadingContacts) {
      return (
        <ActivityIndicator />
      );
    }

    return (
      <View style={styles.contactImportContainer}>
        <Text style={styles.contactImportText}>You can import your phone contacts to see who's already on Unite.</Text>
        <Button title="Import Contacts" onPress={this.importContacts} style={styles.contactImportButton} />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderFriends()}
        {this.renderContacts()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contactImportContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  contactImportText: {
    marginBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  const currentUser = state.auth.currentUser || {};
  const friends = currentUser.friends || [];

  return {
    currentUser,
    friends,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFriends(userId) {
      dispatch(userActions.loadFriends(userId));
    },

    loadContacts(phoneNumbers) {
      return dispatch(authActions.loadContacts(phoneNumbers));
    },
  };
}

const ConnectedNewChatScreen = connect(mapStateToProps, mapDispatchToProps)(NewChatScreen);
export default ConnectedNewChatScreen;

ConnectedNewChatScreen.navigationOptions = ({ navigation }) => ({
  title: 'New Chat',
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat')}
      style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 12 }}
    >
      <Text style={{ color: colors.blue, fontSize: 14 }}>Cancel</Text>
    </TouchableOpacity>
  ),
  headerTitleStyle: {
    color: 'white',
    fontSize: 24, 
  },
  headerStyle: {
    backgroundColor: colors.purple,
  },
});