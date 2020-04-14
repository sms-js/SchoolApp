import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {fetchTerms} from '../../api/fetchTerms';

export default function Terms(props) {
  const [terms, set_terms] = useState('');
  fetchTerms()
    .then((res) => {
      set_terms(res);
    })
    .catch((error) => {});
  return (
    <ScrollView style={{margin: 15}}>
      <Text>{terms}</Text>
    </ScrollView>
  );
}
