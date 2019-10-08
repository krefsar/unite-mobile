import React from 'react';
import { Text, View } from 'react-native';

class NewEventScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>New Event</Text>
      </View>
    );
  }
}

NewEventScreen.navigationOptions = {
  headerBackTitle: 'Cancel',
};

export default NewEventScreen;