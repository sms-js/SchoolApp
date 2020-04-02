import React,{useState, Component} from 'react';
import { StyleSheet, Text, View ,TextInput,Button, CheckBox, TouchableOpacity} from 'react-native';
import LoginNavigator from './Navigation/LoginNavigator';
import Login from './Screens/Login';

export default class App extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <LoginNavigator/>
    );
  }
}

const styles = StyleSheet.create({
  view :{

  },
  textinput :{
    borderColor:'lightblue',
    borderWidth: 1,
    padding: 5,
    borderRadius: 0
  },
  button: {
  
  }
});


