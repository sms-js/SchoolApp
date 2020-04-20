import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {
  fetchAllMessages,
  fetchSentMessages,
  fetchRecievedMessages,
} from './api/fetchMessages';
import {useAuth} from '../../context/Authentication';
import {FlatList} from 'react-native-gesture-handler';
import Message from '../../Components/Message';

export default function Messages(props) {
  const {user} = useAuth();
  const [userName, setUserName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [date, setDate] = useState('');
  const [messages, setMessages] = useState([{}]);

  const userNameHandler = (username) => {
    setUserName(username);
  };
  const messageTextHandler = (text) => {
    setMessageText(text);
  };
  const dateHandler = (date) => {
    setDate(date);
  };

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
          Messages
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <TextInput
          style={styles.textinput}
          placeholder="User Name"
          onChangeText={userNameHandler}
        />
        <TextInput
          style={styles.msginput}
          placeholder="Message"
          onChangeText={messageTextHandler}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Date"
          onChangeText={dateHandler}
        />
        <Text />
        <Button title="Send Message" onPress={() => {}} />
        <Text />
        <Dropdown
          label="Show Messages"
          data={[
            {label: 'All Messages', value: 1},
            {label: 'Sent Messages', value: 2},
            {label: 'Recieved Messages', value: 3},
          ]}
          onChangeText={(value) => {
            switch (value) {
              case 1:
                fetchAllMessages(user['id'])
                  .then(async (res) => {
                    setMessages(res);
                  })
                  .catch((error) => {
                    alert(error);
                  });
                break;

              case 2:
                fetchSentMessages(user['id'])
                  .then(async (res) => {
                    setMessages(res);
                  })
                  .catch((error) => {
                    alert(error);
                  });
                break;

              case 3:
                fetchRecievedMessages(user['id'])
                  .then(async (res) => {
                    setMessages(res);
                  })
                  .catch((error) => {
                    alert(error);
                  });
                break;
            }
          }}
        />
        <FlatList
          style={{marginBottom: 50}}
          data={messages}
          renderItem={({item}) => <Message item={item} />}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 30,
    padding: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  textinput: {
    padding: 5,
    margin: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  msginput: {
    height: 100,
    padding: 5,
    margin: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  title: {fontSize: 20, marginBottom: 5},
  boldtitle: {alignSelf: 'center', fontSize: 25, marginBottom: 5},
});
/*
<View>
              <Text>{item.fromId}</Text>
              <Text>{item.messageText}</Text>
              <Text>{item.dateSent}</Text>
            </View>
*/
