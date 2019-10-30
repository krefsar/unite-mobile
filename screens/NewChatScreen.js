import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';

export default function NewChatScreen() {
  return (
    <ScrollView>
    </ScrollView>
  );
}

NewChatScreen.navigationOptions = ({ navigation }) => ({
  title: 'New Chat',
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat')}
      style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 12 }}
    >
      <Text style={{ color: colors.blue, fontSize: 14 }}>Cancel</Text>
    </TouchableOpacity>
  ),
  headerTitleStyle: {
    color: 'white',
    fontSize: 24, 
  },
  headerStyle: {
    backgroundColor: colors.purple,
  },
});