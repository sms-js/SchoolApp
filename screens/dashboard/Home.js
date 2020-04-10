import React, {useState} from 'react';
import {Text, ScrollView, Button, View} from 'react-native';
import {userInfo} from '../../utils/userInfo';
//import {Header, Left, Icon} from 'native-base';
export default function Home(props) {
  const [Home, setHome] = useState('');

  return (
    <ScrollView style={{margin: 20}}>
      <Text />
      <View>
        <Text style={{alignSelf: 'center'}}>Home</Text>
        <Text />
        <Button
          title="Show my info"
          onPress={() => {
            console.log(userInfo);
          }}
        />
        <Text />
        <Button
          title="Login Screen"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </View>
    </ScrollView>
  );
}
