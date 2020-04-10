import React, {useState} from 'react';
import {Text, ScrollView, View} from 'react-native';

export default function Library(props) {
  const [Library, setLibrary] = useState('');

  return (
    <ScrollView style={{margin: 20}}>
      <View>
        <Text style={{alignSelf: 'center'}}>Library</Text>
      </View>
    </ScrollView>
  );
}
