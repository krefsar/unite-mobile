import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import userActions from '../redux/actions/users';
import colors from '../styles/colors';

const DEFAULT_PHOTO_URL = 'https://unite-mobile.s3.amazonaws.com/defaultuser.png';

class FriendCard extends React.Component {
  componentDidMount() {
    const { friendId, onLoad } = this.props;
    onLoad(friendId);
  }

  render() {
    const { friend } = this.props;
    const { photoUrl = DEFAULT_PHOTO_URL } = friend || {};

    return (
      <View style={styles.cardContainer}>
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
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendStatus: {
    color: colors.grayLight,
    fontSize: 12,
  },
});

function mapStateToProps(state, ownProps) {
  const { friendId } = ownProps;

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