import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const ButtonCustom = (props) => {
  const Content = (
    <View style={[styles.button, {backgroundColor: props.color}]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
  return <TouchableOpacity onPress={props.onPress}>{Content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 5,
    width: 300,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ButtonCustom;
