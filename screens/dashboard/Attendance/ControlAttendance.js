import React from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
export default function ControlAttendance(props) {
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
          Control Attendance
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Text>Control Attendance</Text>
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Attendance');
          }}
        />
      </ScrollView>
    </View>
  );
}
