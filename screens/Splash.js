import React from 'react';
import {StyleSheet} from 'react-native';

import {useAuth} from '../context/Authentication';

export default function SplashScreen({navigation}) {
  const {user} = useAuth();

  if (user) {
    switch (user?.role) {
      case 'user':
        navigation.navigate('Login');
        break;
      case 'student':
        navigation.navigate('Home');
        break;
      case 'parent':
        navigation.navigate('Home');
        break;
      default:
        navigation.navigate('Home');
        break;
    }
  } else {
    navigation.navigate('Login');
  }

  return null;
}

const styles = StyleSheet.create({});
