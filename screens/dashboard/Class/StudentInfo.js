import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchStudentParents} from '../api/fetchClasses';
export default function StudentInfo(props) {
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
      <ScrollView>
        <Text>{props.navigation.state.params.itemId}</Text>
        <Text>{props.navigation.state.params.otherParam}</Text>
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Class');
          }}
        />
      </ScrollView>
    </View>
  );
}
