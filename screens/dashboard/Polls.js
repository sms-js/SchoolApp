import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {fetchPollsForAll, fetchUserPolls} from './api/fetchPolls';
import {userInfo} from '../../utils/userInfo';
export default function Polls(props) {
  const [Polls, setPolls] = useState('');

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
          Polls
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Polls</Text>
          <Text />
          <Button
            title="Show Polls for all"
            onPress={() => {
              fetchPollsForAll();
            }}
          />
          <Text />
          <Button
            title={'Show Polls for ' + userInfo[0]['role'] + 's'}
            onPress={() => {
              fetchUserPolls();
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
