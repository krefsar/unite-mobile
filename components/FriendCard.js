import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import userActions from '../redux/actions/users';
import colors from '../styles/colors';

const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

class FriendCard extends React.Component {
  render() {
    const { friend } = this.props;
    console.log('render friend', friend);
    const { photoUrl = DEFAULT_PHOTO_URL } = friend || {};

    return (
      <View style={styles.container}>
        <View style={styles.cardLeft}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUrl }} style={styles.photo} />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.friendName}>{friend.username}</Text>
          <Text style={styles.friendStatus}>{friend.status}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
    flexDirection: 'row',
  },
  cardLeft: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  photoContainer: {
    alignItems: 'center',
    borderColor: colors.blue,
    borderRadius: 32,
    borderWidth: 2,
    height: 64,
    overflow: 'hidden',
    width: 64,
  },
  photo: {
    backgroundColor: colors.purple,
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  infoContainer: {
    marginLeft: 2,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '500',
  },
  friendStatus: {
    color: colors.grayLight,
    fontSize: 12,
  },
});

function mapStateToProps(state, ownProps) {
  const { friendId } = ownProps;

  console.log('friend id', friendId, 'state', state);
  return {
    friend: state.users.friends[friendId] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const ConnectedFriendCard  = connect(mapStateToProps, mapDispatchToProps)(FriendCard);
export default ConnectedFriendCard;