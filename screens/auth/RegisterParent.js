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
  FlatList,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchChild} from '../../api/fetchChild';
import {registerParent} from '../../api/registerParent';

export default function RegisterParent(props) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [Parentof, setParentof] = useState('');
  const [SearchedUserName, setSearchedUserName] = useState('');
  const [promptRelation, setPromptRelation] = useState('');
  const [children, setChildren] = useState([]);
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

  const adressHandler = (adress) => {
    setAdress(adress);
  };

  const phoneNumberHandler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const mobileNumberHandler = (mobileNumber) => {
    setMobileNumber(mobileNumber);
  };

  const professionHandler = (profession) => {
    setProfession(profession);
  };

  const ParentOfHandler = (Parentof) => {
    setParentof(Parentof);
  };

  const searchedUserNameHandler = (searchedUserName) => {
    setSearchedUserName(searchedUserName);
  };

  const promptRelationHandler = (promptRelation) => {
    setPromptRelation(promptRelation);
  };

  const studentPressHandler = (id) => {
    setChildren((prevChildren) => {
      return prevChildren.filter((child) => child.id != id);
    });
  };

  const studentRemoveAllHandler = () => {
    setChildren((prevChildren) => {
      return prevChildren.filter((child) => child.id === 0);
    });
  };

  const addStudentPressHandler = (id, value, relation) => {
    setChildren((prevChildren) => {
      return [
        ...prevChildren,
        {
          student: value,
          relation: relation,
          id: id,
        },
      ];
    });
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
    let a = '[';
    for (let i = 0; i < children.length; i++) {
      if (i === children.length - 1) {
        a =
          a +
          '{"student":"' +
          children[i]['student'] +
          '","relation":"' +
          children[i]['relation'] +
          '",' +
          '"id":"' +
          children[i]['id'] +
          '"}]';
      } else {
        a =
          a +
          '{"student":"' +
          children[i]['student'] +
          '","relation":"' +
          children[i]['relation'] +
          '",' +
          '"id":"' +
          children[i]['id'] +
          '"},';
      }
    }

    ParentOfHandler(a);
    console.log(Parentof);
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

    registerParent(
      userName,
      email,
      password,
      fullName,
      profession,
      birthDay,
      gender,
      adress,
      phoneNumber,
      mobileNumber,
      Parentof,
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
    <>
      <ScrollView
        style={{
          padding: 15,
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

          <TextInput
            placeholder="Profession"
            style={styles.textinput}
            onChangeText={professionHandler}
          />

          <View style={{borderColor: 'lightblue', borderWidth: 1, margin: 10}}>
            <Text style={{margin: -5}} />
            <Text>Gender :</Text>
            <Text style={{margin: -5}} />
            <RadioForm
              radio_props={radio_props}
              initial={0}
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

          <View
            style={{
              margin: 10,
              borderColor: 'lightblue',
              borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <TextInput
                placeholder="Search Student"
                style={{
                  height: 40,
                  width: '80%',
                  margin: 10,
                  padding: 5,
                  borderColor: 'lightblue',
                  borderWidth: 1,
                  alignSelf: 'center',
                }}
                onChangeText={searchedUserNameHandler}
              />
              <TextInput
                placeholder="Relation To Student"
                style={{
                  height: 40,
                  width: '80%',
                  margin: 10,
                  padding: 5,
                  borderColor: 'lightblue',
                  borderWidth: 1,
                  alignSelf: 'center',
                }}
                onChangeText={promptRelationHandler}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '15%'}} />
                <View
                  style={{
                    width: '70%',
                    padding: 15,
                  }}>
                  <Button
                    title="Add"
                    onPress={() => {
                      fetchChild(SearchedUserName)
                        .then((res) => {
                          if (res != 'No student found !') {
                            Alert.alert(
                              'Student Info',
                              'Username : ' +
                                SearchedUserName +
                                '\nFull Name : ' +
                                res[1],
                              [
                                //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                {
                                  text: 'Cancel',
                                  onPress: () => {},
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => {
                                    addStudentPressHandler(
                                      res[0],
                                      res[1],
                                      promptRelation,
                                    );
                                  },
                                },
                              ],
                              {cancelable: false},
                            );
                          } else {
                            alert(res);
                          }
                        })
                        .catch((error) => {
                          alert(error);
                        });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              margin: 10,
              borderColor: 'lightblue',
              borderWidth: 1,
            }}>
            <FlatList
              data={children}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    alignItems: 'center',
                    borderColor: 'lightblue',
                    borderWidth: 1,
                  }}>
                  <TouchableOpacity onPress={() => {}} style={{width: '100%'}}>
                    <Text>{item.student}</Text>
                  </TouchableOpacity>
                  <Text style={{width: '5%'}} />
                  <Text style={{width: '35%'}}>{item.relation}</Text>
                  <Text style={{width: '5%'}} />
                  <Button
                    title="remove"
                    onPress={() => {
                      studentPressHandler(item.id);
                    }}
                    style={{
                      margin: 5,
                    }}
                  />
                </View>
              )}
              keyExtractor={(item) => item.value}
            />
          </View>

          <View
            style={{
              width: '100%',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '15%'}} />
            <View
              style={{
                width: '70%',
              }}>
              <Button title="Remove All" onPress={studentRemoveAllHandler} />
            </View>
            <View style={{width: '10%'}} />
          </View>
        </View>
        <Text style={{margin: 0}} />
        <Button title="Register" onPress={AllValidate} />
        <Text style={{margin: 10}} />
      </ScrollView>
    </>
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
