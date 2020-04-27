import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {fetchPollsForAll, fetchUserPolls, fetchPolls} from './api/fetchPolls';
import {useAuth} from '../../context/Authentication';
export default function Polls(props) {
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
            title={'Show Polls' + user['role'] + 's'}
            onPress={() => {
              fetchPolls(user['role']);
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
