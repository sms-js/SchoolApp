import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';

export default function OnlineExams(props) {
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
          Online Exams
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20, marginBottom: 60}}>
        <Text>Online Exams Teacher</Text>
      </ScrollView>
    </View>
  );
}
