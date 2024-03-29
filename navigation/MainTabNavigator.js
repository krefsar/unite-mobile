import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import EventsScreen from '../screens/EventsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatroomScreen from '../screens/ChatroomScreen';
import NewChatScreen from '../screens/NewChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewEventScreen from '../screens/NewEventScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const EventsStack = createStackNavigator(
  {
    Events: EventsScreen,
    NewEvent: NewEventScreen,
  },
  config
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-calendar'
          : 'md-calendar'
      }
    />
  ),
};

EventsStack.path = '';

const ChatStack = createStackNavigator(
  {
    Chat: ChatScreen,
    NewChat: NewChatScreen,
    Chatroom: ChatroomScreen,
  },
  config
);

ChatStack.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
  ),
};

ChatStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        title: 'Profile',
      }),
    },
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  EventsStack,
  ChatStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
