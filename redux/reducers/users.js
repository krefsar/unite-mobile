import { ADD_USER } from '../actions/actionTypes';

const initialState = {
  users: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
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