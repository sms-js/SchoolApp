import React, {useState} from 'react';
import {Text, ScrollView, Button} from 'react-native';

export default function Home(props) {
  const [Home, setHome] = useState('');

  return (
    <ScrollView style={{margin: 15}}>
      <Text>Home</Text>
      <Button
        title="Show my info"
        onPress={() => {
          console.log();
        }}
      />
      <Button
        title="Login Screen"
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
}
