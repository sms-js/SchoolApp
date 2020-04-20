import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {fetchMessageSender} from '../screens/dashboard/api/fetchMessages';
import {server, defaultUserImageURL} from '../utils/config';

export default class Message extends Component {
  constructor(props) {
    super();
    this.state = {
      sender: [{}],
      dateSent: '',
      messageText: '',
      profilePictureUri: '',
    };
    if (this.state.sender) {
      if (props.item.fromId) {
        this.state.dateSent = props.item.dateSent;
        this.state.messageText = props.item.messageText;
        fetchMessageSender(props.item.fromId)
          .then(async (res) => {
            this.setState({sender: res});
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  }
  render() {
    if (this.state.sender[0]['photo'] === '') {
      this.state.profilePictureUri = defaultUserImageURL;
    } else {
      this.state.profilePictureUri =
        server + 'uploads/profile/' + this.state.sender[0]['photo'];
    }
    return (
      <View style={styles.message}>
        <View style={{width: '30%'}}>
          <Image
            style={styles.image}
            source={{
              uri: this.state.profilePictureUri,
            }}></Image>
          <Text style={styles.user}>{this.state.sender[0]['username']}</Text>
        </View>
        <View style={{marginLeft: 10, width: '65%'}}>
          <Text style={{flex: 1, alignSelf: 'flex-end'}}>
            {this.state.dateSent}
          </Text>
          <Text
            style={{
              flex: 1,
              alignSelf: 'flex-start',
            }}>
            {this.state.messageText}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 5,
    resizeMode: 'center',
  },
  user: {fontSize: 15},
});

/*import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {fetchMessageSender} from '../screens/dashboard/api/fetchMessages';
import {server} from '../utils/config';

export default function Message(props) {
  const [sender, setSender] = useState([{}]);
  if (sender) {
    if (props.item.fromId) {
      fetchMessageSender(props.item.fromId)
        .then(async (res) => {
          setSender(res);
        })
        .catch((error) => {
          alert(error);
        });
    }
    let profilePictureUri = '';
    if (sender[0]['photo'] === '') {
      profilePictureUri =
        'https://cdn.clipart.email/23d223de4bd3900b3c41fcd52b5ef3b1_avatar-circle-general-human-person-user-icon_512-512.png';
    } else {
      profilePictureUri = server + 'uploads/profile/' + sender[0]['photo'];
    }
    return (
      <View style={styles.message}>
        <View style={{width: '30%'}}>
          <Image
            style={styles.image}
            source={{
              uri: profilePictureUri,
            }}></Image>
          <Text style={styles.user}>{sender[0]['username']}</Text>
        </View>
        <View style={{marginLeft: 10, width: '65%'}}>
          <Text style={{flex: 1, alignSelf: 'flex-end'}}>
            {props.item.dateSent}
          </Text>
          <Text
            style={{
              flex: 1,
              alignSelf: 'flex-start',
            }}>
            {props.item.messageText}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
}*/
