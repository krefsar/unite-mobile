import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import userActions from '../redux/actions/users';
import colors from '../styles/colors';

const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

class FriendCard extends React.Component {
  componentDidMount() {
    const { friendId, onLoad } = this.props;
    console.log('mounting friendcard', friendId);
    onLoad(friendId);
  }

  render() {
    const { friend } = this.props;
    console.log('render friend', friend);
    const { photoUrl = DEFAULT_PHOTO_URL } = friend || {};

    return (
      <View>
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUrl }} style={styles.photo} />
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
  photoContainer: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
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
  infoContainer: {
  },
  friendName: {
    fontSize: 18,
  },
  friendStatus: {
    fontSize: 12,
  },
});

function mapStateToProps(state, ownProps) {
  const { friendId } = ownProps;

  console.log('friend id', friendId, 'state', state);
  return {
    friend: state.users.users[friendId] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad(friendId) {
      dispatch(userActions.loadUser(friendId));
    },
  };
}

const ConnectedFriendCard  = connect(mapStateToProps, mapDispatchToProps)(FriendCard);
export default ConnectedFriendCard;