import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';
const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

const ChatCard = (props) => {
  const {
    chat,
    onPress,
  } = props;
  console.log('rendering chat', chat);

  const { _id: id, photoUrl = DEFAULT_PHOTO_URL, messages = [], name = 'New Chat' } = chat || {};
  const lastMessage = messages.length > 0 ? messages[0] : { message: 'No messages yet.' };

  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <View style={styles.photoContainer}>
        <Image source={{ uri: photoUrl }} style={styles.photo} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={styles.chatLastMessage}>{lastMessage.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
  },
  photoContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    overflow: 'hidden',
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  photo: {
    backgroundColor: colors.purple,
    height: 64,
    width: 64,
    resizeMode: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 2,
    paddingRight: 12,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatLastMessage: {
    fontSize: 12,
  },
});

ChatCard.propTypes = {
  onPress: PropTypes.func,
};

ChatCard.defaultProps = {
  onPress: () => {},
};

export default ChatCard;