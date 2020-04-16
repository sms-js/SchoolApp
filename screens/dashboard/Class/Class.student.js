import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClass} from '../api/fetchClasses';
import {fetchDormitory} from '../api/fetchDormitory';
import {useAuth} from '../../../context/Authentication';

export default function Class(props) {
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
          Class
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Class</Text>
          <Text />
          <Button
            title="Show my class"
            onPress={() => {
              fetchClass(user['studentClass']);
            }}
          />
          <Text />
          <Button
            title="Show dormitory1 info"
            onPress={() => {
              fetchDormitory(1);
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
