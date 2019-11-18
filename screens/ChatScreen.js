import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import chatActions from '../redux/actions/chat';
import ChatCard from '../components/ChatCard';
import colors from '../styles/colors';

class ChatScreen extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  renderChats() {
    const { chats } = this.props;
    console.log('got chats', chats);

    return chats.map(chat => <ChatCard key={chat._id} chat={chat} onPress={this.handleChatPress} />);
  };

  handleChatPress = (id) => {
    const { navigation } = this.props;

    console.log('pressed chat', id);
    navigation.navigate('Chatroom', { chatroomId: id });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderChats()}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const chatMap = state.chats.chats;
  const chats = Object.values(chatMap);

  return {
    chats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(chatActions.loadChats());
    },
  };
}

ChatScreen.navigationOptions = ({ navigation }) => ({
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

ChatScreen.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func,
};

ChatScreen.defaultProps = {
  chats: [],
  onLoad: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
