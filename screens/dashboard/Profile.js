import React from 'react';
import {Text, ScrollView, Button, View} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {useAuth} from '../../context/Authentication';

export default function Home(props) {
  const {logout, user} = useAuth();

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
          Profile
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text />
          <Text style={{alignSelf: 'center'}}>My Profile</Text>
          <Text />
          <Button
            title="Show my info"
            onPress={() => {
              console.log(user);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
