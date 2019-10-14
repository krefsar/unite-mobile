import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../styles/colors';
import font from '../styles/font';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = text => {
    this.setState({
      email: text,
    });
  };

  handleLoginPress = () => {
  };

  handlePasswordChange = text => {
    this.setState({
      password: text,
    });
  };

  handleSignUpPress = () => {
  };

  render() {
    const { email, password } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <StatusBar backgroundColor={colors.purple} barStyle="light-content" />

        <Text style={styles.logo}>Unite</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputFieldLabel}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={this.handleEmailChange}
            returnKeyLabel="Done"
            returnKeyType="done"
            style={styles.inputField}
            value={email}
          />
        </View>

        <View style={[styles.inputContainer, styles.secondInputContainer]}>
          <Text style={styles.inputFieldLabel}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            onChangeText={this.handlePasswordChange}
            returnKeyLabel="Done"
            returnKeyType="done"
            secureTextEntry={true}
            style={styles.inputField}
            type="password"
            value={password}
          />
        </View>

        <TouchableOpacity
          onPress={this.handleLoginPress}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.handleSignUpPress}
          style={styles.signupButton}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  container: {
    backgroundColor: colors.purple,
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'flex-start',
    paddingLeft: 56,
    paddingRight: 56,
  },
  inputField: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 14,
    height: 48,
    paddingLeft: 12,
    paddingRight: 12,
  },
  inputFieldLabel: {
    color: 'white',
    fontSize: 24,
    marginBottom: 8,
    textTransform: 'lowercase',
  },
  loginButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.blue,
    borderRadius: 8,
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    marginLeft: 56,
    marginRight: 56,
    marginTop: 32,
    paddingTop: 12,
    paddingBottom: 12,
  },
  logo: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? font.family.logo_ios : font.family.logo_android,
    fontSize: font.size.logo,
    fontWeight: '400',
    marginBottom: 72,
    textTransform: 'lowercase',
  },
  secondInputContainer: {
    marginTop: 18,
  },
  signupButton: {
    alignSelf: 'center',
  },
  signupText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
});

LoginScreen.navigationOptions = {
  header: <View></View>,
};

export default LoginScreen;