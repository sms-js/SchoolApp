import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

export default function RestorePassword(props) {
  const [userName, setUserName] = useState('');
  const [newPassword, setnewPassword] = useState('');

  const userNameHandler = (userName) => {
    setUserName(userName);
  };
  const newPasswordHandler = (newPassword) => {
    setnewPassword(newPassword);
  };

  return (
    <View>
      <View style={{height: '30%'}} />
      <View style={styles.view}>
        <TextInput
          placeholder="Username"
          onChangeText={userNameHandler}
          style={styles.textinput}
        />
        <TextInput
          placeholder="New Password"
          onChangeText={newPasswordHandler}
          style={styles.textinput}
        />
        <View style={{height: '10%'}} />
        <Button
          title="Restore"
          onPress={() => {
            alert('username : ' + userName + '\nnew password : ' + newPassword);
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    width: '90%',
  },
  textinput: {
    borderColor: 'lightblue',
    borderWidth: 1,
    padding: 5,
    borderRadius: 0,
    margin: 10,
  },
  button: {},
  opacity: {
    margin: 5,
    alignSelf: 'center',
  },
});
