import { SERVER_HOST } from '../../config/config';
import { FINISH_CHAT_CREATION, LOAD_CHATROOMS, LOAD_CHAT, START_CHAT_CREATION } from './actionTypes';
import { authenticatedFetch } from '../../util/api';

function startCreation() {
  return {
    type: START_CHAT_CREATION,
  };
}

function finishCreation() {
  return {
    type: FINISH_CHAT_CREATION,
  };
}

function loadChatroom(chat) {
  return {
    type: LOAD_CHAT,
    chat,
  };
}

function loadChatrooms(chats) {
  return {
    type: LOAD_CHATROOMS,
    chats,
  };
}

function createChatroom(userIds) {
  return (dispatch) => {
    dispatch(startCreation());

    const url = `${SERVER_HOST}/chats/create`;
    return authenticatedFetch(url, {
      method: 'POST',
      body: {
        userIds,
      },
    })
      .then(response => {
        dispatch(loadChatroom(response.chat));
        return response.chat._id;
      })
      .finally(response => {
        dispatch(finishCreation());
      });
  };
}

function loadChats() {
  return (dispatch) => {
    dispatch(startCreation());

    const url = `${SERVER_HOST}/chats`;
    return authenticatedFetch(url, {
      method: 'GET',
    })
      .then(response => {
        dispatch(loadChatrooms(response.chats));
      })
      .finally(() => {
        dispatch(finishCreation());
      });
  };
}

export default {
  createChatroom,
  loadChats,
}
