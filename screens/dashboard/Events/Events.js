import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {
  fetchEventsForAll,
  fetchUserEvents,
  fetchEvents,
} from '../api/fetchEvents';
import {useAuth} from '../../../context/Authentication';

export default function Events(props) {
  const {user} = useAuth();
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await fetchEvents(user['role']);
    setEvents(res);
  };
  React.useEffect(() => {
    getEvents();
  }, []);

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
          Events
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <FlatList
          data={events}
          renderItem={({item}) => (
            <View
              style={{
                borderColor: 'lightblue',
                borderWidth: 1,
                margin: 5,
                padding: 10,
                flexDirection: 'row',
                borderRadius: 25,
              }}>
              <Text>{item.eventTitle}</Text>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'center'}}
                onPress={() => {
                  props.properties.navigation.navigate('HTMLView', {
                    content: item.eventDescription,
                  });
                }}>
                <Text>View Event</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
