import React, {useState} from 'react';
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
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import {fetchLogin} from '../../api/login';
import {fetchUserInfo} from '../../api/fetchUserInfo';
import {setUserInfo} from '../../utils/userInfo';
import {useAuth} from '../../context/Authentication';
import ButtomCustom from '../../Components/buttonCustom';

export default function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const userNameHandler = (userName) => {
    setUserName(userName);
  };

  const passwordHandler = (password) => {
    setPassword(password);
  };

  const RememberMeHandler = () => {
    setRememberMe(!rememberMe);
  };

  const loginhandler = () => {
    //setLoading(true);
    fetchLogin(userName, password)
      .then(async (res) => {
        await AsyncStorage.setItem(
          'accessToken',
          'example Axxcezsqdqspdkqsmdqsmdkqsomk',
        );
        await AsyncStorage.setItem('userName', userName);
        //setLoading(false);
        if (res == 'login successfully') {
          Alert.alert(
            'Login Status',
            res,
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {
                text: 'OK',
                onPress: () => {
                  login();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('Login Status', res);
        }
      })
      .catch((error) => {
        //setLoading(false);
        Alert.alert('Erreur', error.message);
      });
  };

  return (
    <ImageBackground
      source={require('../../img/login.png')}
      style={styles.container}>
      <View
        style={{
          paddingTop: 100,
          alignContent: 'center',
          height: '90%',
          alignItems: 'center',
        }}>
        <View style={styles.view}>
          <TextInput
            placeholder="Email / Username"
            style={styles.textinput}
            onChangeText={userNameHandler}
          />

          <TextInput
            placeholder="Password"
            style={styles.textinput}
            onChangeText={passwordHandler}
            secureTextEntry={true}
          />

          <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
            <CheckBox
              title="remember_me"
              value={rememberMe}
              onValueChange={RememberMeHandler}
            />
            <Text style={{textAlignVertical: 'center'}}> Remember me</Text>
          </View>
          <Text style={{margin: 0}} />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ButtomCustom text="Login" color="#3edb5b" onPress={loginhandler} />
          )}
          <Text style={{margin: 0}} />

          <TouchableOpacity
            style={styles.opacity}
            onPress={() => props.navigation.navigate('Terms')}>
            <Text>School Terms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => props.navigation.navigate('RegisterTeacher')}>
            <Text>Register Teacher</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opacity}
            onPress={() => props.navigation.navigate('RegisterStudent')}>
            <Text>Register Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opacity}
            onPress={() => props.navigation.navigate('RegisterParent')}>
            <Text>Register Parent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opacity}
            onPress={() => props.navigation.navigate('RestorePassword')}>
            <Text>Restore Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    width: '90%',
  },
  textinput: {
    borderColor: 'lightblue',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 10,
    width: 300,
  },
  button: {},
  opacity: {
    margin: 5,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
