import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassesSchedule} from '../api/fetchClassesSchedule';
import {fetchSubject} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';

export default function ClassSchedule(props) {
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
          Class Schedule
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Class Schedule</Text>
          <Text />
          <Button
            title="Show my class schedule"
            onPress={() => {
              fetchClassesSchedule(user['studentClass']);
            }}
          />
          <Text />
          <Button
            title="Show subject1 info"
            onPress={() => {
              fetchSubject(1);
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
