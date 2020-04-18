import React from 'react';
import {Text, ScrollView, View, StyleSheet, Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {useAuth} from '../context/Authentication';
import {server} from '../utils/config';

export default function NavigatorHeader(props) {
  const {user} = useAuth();
  let profilePictureUri = '';
  if (user['photo'] === '') {
    profilePictureUri =
      'https://cdn.clipart.email/23d223de4bd3900b3c41fcd52b5ef3b1_avatar-circle-general-human-person-user-icon_512-512.png';
    //server + 'uploads/profile/user.png';
  } else {
    profilePictureUri = server + 'uploads/profile/' + user['photo'];
  }
  return (
    <ScrollView>
      <View style={styles.view}>
        <Image
          style={styles.profile}
          source={{
            uri: profilePictureUri, //server + '/uploads/profile/' + user['photo'],
          }}
        />
        <Text style={styles.text}>{user['userName']}</Text>
        <Text style={{fontSize: 17.5, margin: 5}}>{user['fullName']}</Text>
      </View>
      <View>
        <DrawerNavigatorItems {...props} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    margin: 5,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
  },
});

/*import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import {DrawerNavigatorOptions} from 'react-navigation-drawer';

export default class NavigatorHeader extends Component {
  constructor(props) {
    super(props);
  }
  render(props) {
    return (
      <ScrollView>
        <View style={styles.view}>
          <View style={styles.profile} />
          <Text style={styles.text}>Islam Belmerabet</Text>
        </View>
        <View>
          <DrawerNavigatorOptions {...props} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'blue',
    margin: 5,
  },
  text: {
    fontSize: 25,
    margin: 5,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    margin: 5,
  },
});*/
