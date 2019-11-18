import { FINISH_CHAT_CREATION, LOAD_CHAT, LOAD_CHATROOMS, START_CHAT_CREATION } from '../actions/actionTypes';

const initialState = {
  chats: {},
  loading: false,
};

export default function chats(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHAT:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chat._id]: action.chat,
        },
      };

    case LOAD_CHATROOMS: {
      const newChats = action.chats.reduce((mp, chat) => {
        return {
          ...mp,
          [chat._id]: chat,
        };
      }, {});

      return {
        ...state,
        chats: {
          ...state.chats,
          ...newChats,
        },
      };
    }

    case START_CHAT_CREATION:
      return {
        ...state,
        loading: true,
      };

    case FINISH_CHAT_CREATION:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
