import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import authActions from '../redux/actions/auth';
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

  async componentDidUpdate(prevProps) {
    if (this.props.token && !prevProps.token) {
      await AsyncStorage.setItem('userToken', this.props.token);
      this.props.navigation.navigate('Events');
    }
  }

  handleEmailChange = text => {
    this.setState({
      email: text,
    });
  };

  handleLoginPress = () => {
    const { onLoginSubmit } = this.props;
    const { email, password } = this.state;

    onLoginSubmit({ email, password });
  };

  handlePasswordChange = text => {
    this.setState({
      password: text,
    });
  };

  handleSignUpPress = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  renderLoginButton() {
    const { loading } = this.props;
    const { email, password } = this.state;

    const disabled = loading || (!email || !password);

    const buttonStyle = [styles.loginButton];
    if (disabled) {
      buttonStyle.push(styles.loginButtonDisabled);
    }

    return (
      <TouchableOpacity
      disabled={!!disabled}
      onPress={this.handleLoginPress}
      style={buttonStyle}
    >
        {loading ?
          <ActivityIndicator /> :
          <Text style={styles.buttonText}>Log In</Text>
        }
      </TouchableOpacity>
    );
  }

  render() {
    const { error } = this.props;
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

        {error ?
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View> :
          null
        }

        {this.renderLoginButton()}

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
  loginButtonDisabled: {
    backgroundColor: 'gray',
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

function mapStateToProps(state) {
  console.log('state is', state);
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginSubmit({ email, password }) {
      dispatch(authActions.loginWithEmail({ email, password }));
    }
  };
}

const ConnectedLoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default ConnectedLoginScreen;
