import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
//import {fetch} from '../api/';
import {useAuth} from '../../../context/Authentication';
export default function PaymentInnovice(props) {
  const {user} = useAuth();

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
            fontSize: 20,
          }}>
          Payment Innovice
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Innovice</Text>

          <Text />
          <Button
            title={'Show Payment'}
            onPress={() => {
              console.log(props.navigation.state.params.payment);
            }}
          />
          <Text />
          <Button
            title="Back"
            onPress={() => {
              props.navigation.navigate('Payments');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
