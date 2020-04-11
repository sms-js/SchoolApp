import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {fetchNewsForAll} from './api/fetchNewsForAll';
import {fetchUserNews} from './api/fetchUserNews';
import {userInfo} from '../../utils/userInfo';
export default function News(props) {
  const [News, setNews] = useState('');

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
          News
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>News</Text>
          <Text />
          <Button
            title="Show my info"
            onPress={() => {
              console.log(userInfo);
            }}
          />
          <Text />
          <Button
            title="Show news for all"
            onPress={() => {
              fetchNewsForAll();
            }}
          />
          <Text />
          <Button
            title={'Show info for ' + userInfo[0]['role'] + 's'}
            onPress={() => {
              fetchUserNews();
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
