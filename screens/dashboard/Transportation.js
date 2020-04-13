import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {userInfo} from '../../utils/userInfo';
import {Header, Left, Right, Icon} from 'native-base';
import {fetchTransportations} from './api/fetchTransportations';

export default function Transportation(props) {
  const [Transportation, setTransportation] = useState('');

  return (
    <View>
      <Header
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
        }}>
        <Left style={{width: '15%'}}>
          <Icon
            name="menu"
            onPress={() => {
              props.navigation.openDrawer();
            }}
          />
        </Left>
        <Text
          style={{
            width: '70%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 25,
          }}>
          Transportation
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Transportation</Text>
          <Text />
          <Button
            title="Show transportations"
            onPress={() => {
              fetchTransportations();
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
    </View>
  );
}
