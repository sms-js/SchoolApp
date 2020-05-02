import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
//import {fetch} from '../api/';
import {useAuth} from '../../../context/Authentication';
export default function Payments(props) {
  const {user} = useAuth();

  return (
    <View style={{flex: 1}}>
      <Header style={{backgroundColor: 'white', flexDirection: 'row'}}>
        <Left style={{width: '15%'}}>
          <Icon
            name="menu"
            onPress={() => {
              props.properties.navigation.openDrawer();
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
          Payments
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          No payments for teachers !
        </Text>
      </View>
    </View>
  );
}
