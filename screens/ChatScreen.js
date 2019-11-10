import { connect } from 'react-redux';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import colors from '../styles/colors';
import userActions from '../redux/actions/users';
import FriendCard from '../components/FriendCard';

class ChatScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const ConnectedChatScreen = connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
export default ConnectedChatScreen;

ConnectedChatScreen.navigationOptions = ({ navigation }) => ({
  title: 'Chats',
  headerStyle: {
    backgroundColor: colors.purple,
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 24,
  },
  headerRight: (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewChat')}
      style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}
    >
      <Text style={{ color: colors.blue, fontSize: 14 }}>New Chat</Text>
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newChatButton: {
  },
  newChatText: {
    color: colors.blue,
    fontSize: 12,
  },
});
