import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {
  fetchAllMessages,
  fetchSentMessages,
  fetchRecievedMessages,
} from './api/fetchMessages';
import {useAuth} from '../../context/Authentication';

export default function Messages(props) {
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
            fontSize: 25,
          }}>
          Messages
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Messages</Text>
          <Text />
          <Button
            title="Show my all messages"
            onPress={() => {
              fetchAllMessages(user['id']);
            }}
          />
          <Text />
          <Button
            title="Show my sent messages"
            onPress={() => {
              fetchSentMessages(user['id']);
            }}
          />
          <Text />
          <Button
            title="Show my recieved messages"
            onPress={() => {
              fetchRecievedMessages(user['id']);
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
