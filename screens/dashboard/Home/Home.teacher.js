import React from 'react';
import {Text, ScrollView, Button, View} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {useAuth} from '../../../context/Authentication';

export default function Home(props) {
  const {logout, user} = useAuth();

  return (
    <View>
      <Header
        style={{
          backgroundColor: '#9CD1EF',
          flexDirection: 'row',
        }}>
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
          Home
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Teacher</Text>
          <Text />
          <Text style={{alignSelf: 'center'}}>Home</Text>
          <Text />
          <Button
            title="Show my info"
            onPress={() => {
              console.log(user);
            }}
          />
          <Text />
          <Button
            title="Logout"
            onPress={() => {
              logout();
              //props.navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
