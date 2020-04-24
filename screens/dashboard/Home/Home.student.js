import React from 'react';
import {Text, ScrollView, Button, View, Alert} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {useAuth} from '../../../context/Authentication';

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
            width: '50%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 25,
          }}>
          Home
        </Text>
        <Text
          style={{
            width: '35%',
            textAlignVertical: 'center',
            textAlign: 'right',
            fontSize: 12,
          }}>
          username: {user.userName}
        </Text>
        <Text style={{width: '0%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <View style={{height: 300, flexDirection: 'column', flex: 6}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 100,
                  width: 150,
                  backgroundColor: 'red',
                }}></View>
              <View
                style={{
                  height: 100,
                  width: 150,
                  backgroundColor: 'green',
                }}></View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  height: 100,
                  width: 150,
                  backgroundColor: 'blue',
                }}></View>
              <View
                style={{
                  height: 100,
                  width: 150,
                  backgroundColor: 'yellow',
                }}></View>
            </View>
          </View>
          <Button
            title="Show my info"
            onPress={() => {
              console.warn(user);
            }}
          />
          <Text />
          <Button
            title="Logout"
            onPress={() => {
              Alert.alert(
                'Logout Status',
                'Do u whant to get out ?',
                [
                  //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {text: 'NO', onPress: () => {}, style: 'cancel'},
                  {
                    text: 'YES',
                    onPress: () => {
                      logout();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
