import React from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTeacherAssignments,
  fetchClassTeacherAssignments,
  fetchSubjectTeacherAssignments,
  insertTeacherAssignments,
} from '../api/fetchAssignments';
import {useAuth} from '../../../context/Authentication';

export default function Library(props) {
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
          Library
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Library</Text>
          <Text />
          <Button
            title="Show my assignments"
            onPress={() => {
              fetchTeacherAssignments(user['id']);
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
