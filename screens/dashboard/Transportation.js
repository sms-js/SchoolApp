import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {userInfo} from '../../utils/userInfo';

export default function Transportation(props) {
  const [Transportation, setTransportation] = useState('');

  return (
    <ScrollView style={{margin: 15}}>
      <Text>Transportation</Text>
    </ScrollView>
  );
}
