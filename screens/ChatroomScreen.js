import { connect } from 'react-redux';
import React from 'react';
import io from 'socket.io-client';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import colors from '../styles/colors';
import Message from '../components/Message';

class ChatroomScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    };

    this.socket = null;
  }

  componentDidMount() {
    const { navigation, currentUser } = this.props;
    const { state: { params: { chatroomId } } } = navigation;
    console.log('connecting to socket for chat', chatroomId);
    this.socket = io.connect('http://192.168.50.155:3000');

    this.socket.on('connect', () => {
      console.log('connected!');
      this.socket.emit('room', chatroomId);
    });

    this.socket.on('messages', (data) => {
      console.log('incoming messages for user', currentUser, data);
      this.updateMessages(data);
    });
  }

  updateMessages(data) {
    this.setState({
      messages: data || [],
    });
  }

  renderMessages() {
    const { messages } = this.state;

    console.log('render messages', messages);
    return messages.map((message, index) => (
      <Message key={index} message={message.message} sender={message.sender} />
    ));
  }

  handleMessageChange = text => {
    this.setState({
      message: text,
    });
  };

  handleMessageSubmit = () => {
    const { navigation, currentUser } = this.props;
    const { state: { params: { chatroomId } } } = navigation;
    const { message } = this.state;
    console.log('submitting message', chatroomId, message);

    this.socket.emit('message', chatroomId, message, currentUser._id);
  };

  render() {
    const { navigation, chat } = this.props;
    const { state: { params: { chatroomId } } } = navigation;
    const { message } = this.state;
    console.log('this is chatroom', chatroomId);
    console.log('chat is', chat);

    return (
      <View style={styles.Container}>
        <View style={styles.MessagesContainer}>
          {this.renderMessages()}
        </View>

        <KeyboardAvoidingView enabled style={styles.InputContainer}>
          <TextInput style={styles.MessageInput} onChangeText={this.handleMessageChange} returnKeyLabel="Send" returnKeyType="done" value={message} />
          <TouchableOpacity onPress={this.handleMessageSubmit} style={styles.MessageSubmitButton}>
            <Text style={styles.SubmitText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.purple,
    flex: 1,
  },
  MessagesContainer: {
    flex: 1,
  },
  InputContainer: {
    flexDirection: 'row',
  },
  MessageInput: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  MessageSubmitButton: {
    backgroundColor: 'green',
    padding: 8,
  },
  SubmitText: {
    color: 'white',
  },
});

function mapStateToProps(state, ownProps) {
  const { navigation } = ownProps;
  const { state: { params: { chatroomId } } } = navigation;
  const currentUser = state.auth.currentUser || {};

  return {
    chat: state.chats.chats[chatroomId],
    currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const ConnectedChatroomScreen = connect(mapStateToProps, mapDispatchToProps)(ChatroomScreen);
export default ConnectedChatroomScreen;