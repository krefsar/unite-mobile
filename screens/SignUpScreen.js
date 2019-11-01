import {
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

import authActions from '../redux/actions/auth';
import colors from '../styles/colors';
import font from '../styles/font';
import storage from '../util/storage';
import unprotectedScreen from './unprotectedScreen';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmedPassword: '',
      email: '',
      password: '',
      phoneNumber: '',
      username: '',
    };
  }

  handleConfirmPasswordChange = value => {
    this.setState({
      confirmedPassword: value,
    });
  };

  handleEmailChange = value => {
    this.setState({
      email: value,
    });
  };

  handleLoginPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  handlePasswordChange = value => {
    this.setState({
      password: value,
    });
  };

  handlePhoneChange = value => {
    this.setState({
      phoneNumber: value,
    });
  };

  handleSignUpPress = () => {
    const { signupWithEmail } = this.props;
    const { email, password, phoneNumber, username } = this.state;

    signupWithEmail({ email, password, phoneNumber, username });
  };

  handleUsernameChange = value => {
    this.setState({
      username: value,
    });
  };

  renderSignUpButton() {
    const { loading } = this.props;
    const { confirmedPassword, email, password, phoneNumber, username } = this.state;

    const disabled = loading || (!email || !password || !confirmedPassword || !phoneNumber || !username) || (password !== confirmedPassword);

    const buttonStyle = [styles.signupButton];
    if (disabled) {
      buttonStyle.push(styles.signupButtonDisabled);
    }

    return (
      <TouchableOpacity
      disabled={!!disabled}
      onPress={this.handleSignUpPress}
      style={buttonStyle}
    >
        {loading ?
          <ActivityIndicator /> :
          <Text style={styles.buttonText}>Sign Up</Text>
        }
      </TouchableOpacity>
    );
  }

  render() {
    const { error } = this.props;
    const { confirmedPassword, email, password, phoneNumber, username } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <ScrollView>
          <StatusBar backgroundColor={colors.purple} barStyle="light-content" />

          <Text style={styles.logo}>Unite</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputFieldLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={this.handleEmailChange}
              returnKeyLabel="Next"
              returnKeyType="next"
              style={styles.inputField}
              value={email}
            />
          </View>

          <View style={[styles.inputContainer, styles.secondInputContainer]}>
            <Text style={styles.inputFieldLabel}>Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleUsernameChange}
              returnKeyLabel="Next"
              returnKeyType="next"
              style={styles.inputField}
              value={username}
            />
          </View>

          <View style={[styles.inputContainer, styles.secondInputContainer]}>
            <Text style={styles.inputFieldLabel}>Phone Number</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              onChangeText={this.handlePhoneChange}
              returnKeyLabel="Next"
              returnKeyType="next"
              style={styles.inputField}
              value={phoneNumber}
            />
          </View>

          <View style={[styles.inputContainer, styles.secondInputContainer]}>
            <Text style={styles.inputFieldLabel}>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              onChangeText={this.handlePasswordChange}
              returnKeyLabel="Next"
              returnKeyType="next"
              secureTextEntry={true}
              style={styles.inputField}
              type="password"
              value={password}
            />
          </View>

          <View style={[styles.inputContainer, styles.secondInputContainer]}>
            <Text style={styles.inputFieldLabel}>Confirm Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              onChangeText={this.handleConfirmPasswordChange}
              returnKeyLabel="Done"
              returnKeyType="done"
              secureTextEntry={true}
              style={styles.inputField}
              type="password"
              value={confirmedPassword}
            />
          </View>

          {error ?
            <View key="signup" style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> :
            null
          }

          {this.renderSignUpButton()}

          <TouchableOpacity
            onPress={this.handleLoginPress}
            style={styles.loginButton}
          >
            <Text style={styles.signupText}>Log In with an existing account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupWithEmail({ email, password, phoneNumber, username }) {
      dispatch(authActions.signupWithEmail({ email, password, phoneNumber, username }));
    },
  };
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
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
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
    alignSelf: 'center',
    marginBottom: 32,
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
  signupButtonDisabled: {
    backgroundColor: 'gray',
  },
  signupText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
});

SignUpScreen.navigationOptions = {
  header: <View></View>,
};

const ConnectedSignUpScreen = connect(mapStateToProps, mapDispatchToProps)(unprotectedScreen(SignUpScreen));
export default ConnectedSignUpScreen;