import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native';

import authActions from '../redux/actions/auth';
import chatActions from '../redux/actions/chat';
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

  handleFriendPress = friendId => () => {
    const { currentUser, navigation, onChatSelect } = this.props;
    console.log('pressed friend', friendId, 'current user is', currentUser);
    onChatSelect(currentUser._id, friendId)
      .then(chatroomId => {
        console.log('navigate to', chatroomId);
        // navigation.navigate('Chatroom', { chatroomId });
      });
  };
  
  renderFriends() {
    const { friends } = this.props;

    return friends.map(friendId => {
      return (
        <TouchableOpacity key={friendId} onPress={this.handleFriendPress(friendId)}>
          <FriendCard friendId={friendId} />
        </TouchableOpacity>
      );
    });
  }

  renderContacts() {
    const { loadingContacts } = this.state;

    if (loadingContacts) {
      return (
        <ActivityIndicator style={styles.spinner} />
      );
    }

    return (
      <View style={styles.contactsContainer}>
        <Text style={styles.contactsPrompt}>You can import your phone contacts and see who's already on Unite.</Text>
        <View style={styles.contactsButtonContainer}>
          <Button title="Import Contacts" onPress={this.importContacts} style={styles.contactsButton} />
        </View>
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
  contactsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  contactsPrompt: {
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
  contactsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  contactsButton: {
  },
  spinner: {
    marginTop: 24,
    marginBottom: 24,
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
    loadContacts(phoneNumbers) {
      return dispatch(authActions.loadContacts(phoneNumbers));
    },
    
    onChatSelect(currentUserId, friendId) {
      return dispatch(chatActions.createChatroom([currentUserId, friendId]));
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