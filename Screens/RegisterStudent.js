import React, { useState } from 'react';
import { StyleSheet, Text, CheckBox, View, ScrollView, TextInput, Button, Alert, Picker } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import ClassesPicker from '../Components/ClassesPicker';
import { registerStudent } from '../api/registerStudent'


export default function RegisterStudent(props) {


  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [rollingId, setRollingId] = useState('');
  const [classId, setClassId] = useState('');


  const userNameHandler = (userName) => {
    setUserName(userName);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const passwordHandler = (password) => {
    setPassword(password);
  };

  const fullNameHandler = (fullName) => {
    setFullName(fullName);
  };

  const birthDayHandler = (birthDay) => {
    setBirthDay(birthDay);
  };

  const genderHandler = (gender) => {
    setGender(gender);
  };

  const adressHandler = (adress) => {
    setAdress(adress);
  };

  const phoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const mobileNumberHandler = (mobileNumber) => {
    setMobileNumber(mobileNumber);
  };

  const rollingIdHandler = (rollingId) => {
    setRollingId(rollingId);
  };

  const classIdHandler = (classId) => {
    setClassId(classId);
  };



  const radio_props = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];


  const registerhandler = () => {
    registerStudent(userName, email, password, fullName, birthDay, rollingId, classId, gender, adress, phoneNumber, mobileNumber)
      .then(res => {
        if (res === 'New record created successfully') {
          Alert.alert(
            'Status',
            'Registered Successfully',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              { text: 'OK', onPress: () => props.navigation.navigate('Login') },
            ],
            { cancelable: false }
          )
        } else {
          console.log(res);
        }
      })
      .catch(error => { });

  };

  return (
    <ScrollView style={{
      padding: 10,
      height: '100%'
    }}>
      <View style={{ alignContent: 'center' }}>
        <TextInput placeholder="Username" style={styles.textinput} onChangeText={userNameHandler} />
        <TextInput placeholder="Email" style={styles.textinput} onChangeText={emailHandler} />
        <TextInput placeholder="Password" style={styles.textinput} onChangeText={passwordHandler} />
        <TextInput placeholder="Full name" style={styles.textinput} onChangeText={fullNameHandler} />
        <TextInput placeholder="Birthday" style={styles.textinput} onChangeText={birthDayHandler} />

        <TextInput placeholder="Rolling ID" style={styles.textinput} onChangeText={rollingIdHandler} />

        <ClassesPicker set_class={(value) => {
          classIdHandler(value);
        }} />

        <View style={{ borderColor: 'lightblue', borderWidth: 1, margin: 10 }}>
          <Text style={{ margin: -5 }} />
          <Text>Gender :</Text>
          <Text style={{ margin: -5 }} />
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {
              genderHandler(value);
            }}
          />
        </View>

        <TextInput placeholder="Adresse" style={styles.textinput} onChangeText={adressHandler} />
        <TextInput placeholder="Phone number" style={styles.textinput} onChangeText={phoneNumberHandler} />
        <TextInput placeholder="Mobile number" style={styles.textinput} onChangeText={mobileNumberHandler} />
        <Text style={{ margin: 0 }} />
        <Button title="Register" onPress={registerhandler} />
        <Text style={{ margin: 10 }} />


      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {},
  textinput: {
    borderColor: "lightblue",
    borderWidth: 1,
    padding: 5,
    borderRadius: 0,
    margin: 10
  },
  button: {}
});
