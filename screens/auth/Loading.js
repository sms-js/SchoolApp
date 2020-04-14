import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  CheckBox,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  Image,
} from 'react-native';
import Logo from '../../img/Logo.png';

export default class LoadingScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      title: new Animated.Value(0),
      logo: new Animated.Value(0),
      opacity: new Animated.Value(0),
      loadingSpinner: false,
    };
  }

  /*componentDidMount() {
    const {logoAnim, titleAnim, opacityAnim} = this.state;
    Animated.parallel([
      Animated.spring(logoAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
      }).start(),

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
      }),
    ]);
  }*/
  render() {
    return (
      <View style={styles.container}>
        <Text style={{height: '5%'}} />
        <Text style={styles.title}>Scool Managment System</Text>
        <Image source={Logo} style={{height: '70%', alignSelf: 'center'}} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a302b',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#68786b',
    height: 50,
    width: '80%',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    paddingVertical: 12.5,
    borderRadius: 25,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
});
