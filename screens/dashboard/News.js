import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';

export default function News(props) {
  const [News, setNews] = useState('');

  return (
    <ScrollView style={{margin: 15}}>
      <Text>News</Text>
    </ScrollView>
  );
}
