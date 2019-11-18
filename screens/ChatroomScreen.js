import { connect } from 'react-redux';
import React from 'react';
import {
  View,
} from 'react-native';

import Message from '../components/Message';

class ChatroomScreen extends React.Component {
  renderMessages() {
    const { chat } = this.props;
    const { messages } = chat;

    return messages.map((message, index) => (
      <Message key={index} message={message.message} sender={message.sender} />
    ));
  }

  render() {
    const { navigation, chat } = this.props;
    const { state: { params: { chatroomId } } } = navigation;
    console.log('this is chatroom', chatroomId);
    console.log('chat is', chat);

    return (
      <View>
        {this.renderMessages()}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { navigation } = ownProps;
  const { state: { params: { chatroomId } } } = navigation;

  return {
    chat: state.chats.chats[chatroomId],
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const ConnectedChatroomScreen = connect(mapStateToProps, mapDispatchToProps)(ChatroomScreen);
export default ConnectedChatroomScreen;