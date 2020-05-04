import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  CheckBox,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import {registerTeacher} from '../../api/registerTeacher';

export default function RegisterTeacher(props) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  //validation des insert
  const [userValidate, setUserValidate] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);
  const [passwordValidate, setPasswordValidate] = useState(true);
  const [nameValidate, setNameValidate] = useState(true);
  const [adresseValidate, setAdresseValidate] = useState(true);
  const [phoneNumValidate, setphoneNumValidate] = useState(true);
  const [mobileNumValidate, setmobileNumValidate] = useState(true);

  const Validate = (text, type) => {
    var alph = /^[A-Za-z]\w{5,15}$/;
    if (type == 'userName') {
      alph.test(text) ? setUserValidate(true) : setUserValidate(false);
      setUserName(text);
    }
    if (type == 'email') {
      alph = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      alph.test(text) ? setEmailValidate(true) : setEmailValidate(false);
      setEmail(text);
    }
    if (type == 'password') {
      alph = /^[A-Za-z]\w{7,30}$/;
      alph.test(text) ? setPasswordValidate(true) : setPasswordValidate(false);
      setPassword(text);
    }
    if (type == 'fullname') {
      alph = /^[a-zA-Z]+ [a-zA-Z]+$/;
      alph.test(text) ? setNameValidate(true) : setNameValidate(false);
      setFullName(text);
    }
    if (type == 'adresse') {
      alph = /^[0-9]+ [a-zA-Z]+$/;
      alph.test(text) ? setAdresseValidate(true) : setAdresseValidate(false);
      setAdress(text);
    }
    if (type == 'phoneNumber') {
      alph = /^[0-0]\d{9}$/;
      alph.test(text) ? setphoneNumValidate(true) : setphoneNumValidate(false);
      setPhoneNumber(text);
    }
    if (type == 'mobileNumber') {
      alph = /^[0-0]\d{9}$/;
      alph.test(text)
        ? setmobileNumValidate(true)
        : setmobileNumValidate(false);
      setMobileNumber(text);
    }
  };
  const birthDayHandler = (birthDay) => {
    setBirthDay(birthDay);
  };

  const genderHandler = (gender) => {
    setGender(gender);
  };

  const radio_props = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const AllValidate = () => {
    console.warn(
      userValidate +
        '/' +
        emailValidate +
        '/' +
        passwordValidate +
        '/' +
        nameValidate +
        '/' +
        adresseValidate +
        '/' +
        phoneNumValidate +
        '/' +
        mobileNumValidate,
    );
    console.warn(
      userName +
        '/' +
        email +
        '/' +
        password +
        '/' +
        fullName +
        '/' +
        birthDay +
        '/' +
        gender +
        '/' +
        adress +
        '/' +
        phoneNumber +
        '/' +
        mobileNumber +
        '/',
    );
    if (
      userValidate &&
      emailValidate &&
      passwordValidate &&
      nameValidate &&
      adresseValidate &&
      phoneNumValidate &&
      mobileNumValidate
    ) {
      registerhandler();
    } else {
      Alert.alert('information not validate');
    }
  };

  const registerhandler = () => {
    console.warn("i'm here");
    registerTeacher(
      userName,
      email,
      password,
      fullName,
      birthDay,
      gender,
      adress,
      phoneNumber,
      mobileNumber,
    )
      .then((res) => {
        if (res === 'New record created successfully') {
          Alert.alert(
            'Status',
            'Registered Successfully',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => props.navigation.navigate('Login')},
            ],
            {cancelable: false},
          );
        } else {
          console.log(res);
        }
      })
      .catch((error) => {});
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        height: '100%',
      }}>
      <View style={{alignContent: 'center'}}>
        <TextInput
          placeholder="Username"
          style={[styles.textinput, !userValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'userName')}
        />
        <TextInput
          placeholder="Email"
          style={[styles.textinput, !emailValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'email')}
        />
        <TextInput
          placeholder="Password"
          style={[styles.textinput, !passwordValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'password')}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Full name"
          style={[styles.textinput, !nameValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'fullname')}
        />
        <DatePicker
          style={{width: '97%'}}
          date={birthDay}
          mode="date"
          placeholder="select date"
          format="MM/DD/YYYY"
          minDate="01/01/1930"
          maxDate={
            new Date().getMonth() +
            1 +
            '/' +
            new Date().getDate() +
            '/' +
            new Date().getFullYear()
          }
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 8,
            },
            dateInput: {borderColor: 'lightblue', marginLeft: 50},
            // ... You can check the source to find the other keys.
          }}
          onDateChange={birthDayHandler}
        />

        <View style={{borderColor: 'lightblue', borderWidth: 1, margin: 10}}>
          <Text style={{margin: -5}} />
          <Text>Gender :</Text>
          <Text style={{margin: -5}} />
          <RadioForm
            radio_props={radio_props}
            initial={'male'}
            onPress={(value) => {
              genderHandler(value);
            }}
          />
        </View>

        <TextInput
          placeholder="Adresse"
          style={[styles.textinput, !adresseValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'adresse')}
        />
        <TextInput
          placeholder="Phone number"
          style={[styles.textinput, !phoneNumValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'phoneNumber')}
        />
        <TextInput
          placeholder="Mobile number"
          style={[styles.textinput, !mobileNumValidate ? styles.error : null]}
          onChangeText={(text) => Validate(text, 'mobileNumber')}
        />
        <Text style={{margin: 0}} />
        <Button title="Register" onPress={AllValidate} />
        <Text style={{margin: 10}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {},
  textinput: {
    borderColor: 'lightblue',
    borderWidth: 1,
    padding: 5,
    borderRadius: 0,
    margin: 10,
  },
  button: {},
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
