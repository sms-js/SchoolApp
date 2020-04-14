import React from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {useAuth} from '../context/Authentication';

export default function NavigatorHeader(props) {
  const {user} = useAuth();

  return (
    <ScrollView>
      <View style={styles.view}>
        <View style={styles.profile} />
        <Text style={styles.text}>{user['userName']}</Text>
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
  },
  text: {
    fontSize: 25,
    margin: 5,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    margin: 5,
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
