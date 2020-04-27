import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';

export default function Subjects(props) {
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
          Subjects
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Subjects</Text>
          <Text />
          <Button
            title="Show islamblmrbt Subjects"
            onPress={() => {
              fetchClassSubjects(1);
            }}
          />
          <Text />
          <Button
            title="Login Screen"
            onPress={() => {
              props.properties.navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
