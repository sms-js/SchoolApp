import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {userInfo} from '../../utils/userInfo';

export default function Messages(props) {
  const [Messages, setMessages] = useState('');

  return (
    <ScrollView style={{margin: 15}}>
      <Text>Messages</Text>
    </ScrollView>
  );
}
