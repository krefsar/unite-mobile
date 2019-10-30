import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import colors from '../styles/colors';

export default function ChatScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

ChatScreen.navigationOptions = ({ navigation }) => ({
  title: 'Chats',
  headerStyle: {
    backgroundColor: colors.purple,
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 24,
  },
  headerRight: (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewChat')}
      style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 12 }}
    >
      <Text style={{ color: colors.blue, fontSize: 14 }}>New Chat</Text>
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  newChatButton: {
  },
  newChatText: {
    color: colors.blue,
    fontSize: 12,
  },
});
