import { ADD_USER, ADD_FRIENDS } from '../actions/actionTypes';

const initialState = {
  users: {},
  friends: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_FRIENDS:
      const friends = state.friends;

      action.friends.forEach(friend => {
        friends[friend.id] = friend;
      });

      return {
        ...state,
        friends,
      };

    case ADD_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user._id]: action.user,
        },
      };

    default:
      return state;
  }
}