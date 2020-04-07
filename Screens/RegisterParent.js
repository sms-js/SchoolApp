import React, { useState } from 'react';
import { StyleSheet, Text, CheckBox, View, ScrollView, TextInput, Button, Alert, FlatList } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import ClassesPicker from '../Components/ClassesPicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwipeView from 'react-native-swipeview';
import { fetchChild } from '../api/fetchChild';
//import { relationModal } from '../Components/relationModal';
//import Prompt from 'react-native-prompt';
import Dialog from "react-native-dialog";

//var values=[];
//var values=[{id: 1,value: 'Student1'},{id: 2,value: 'Student2'}];

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
  const [Parentof, setParentof] = useState([]);
  const [SearchedUserName, setSearchedUserName] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [parentRelation, setParentRelation] = useState([]);
  const [infoRelatio, setInfoRelation] = useState([]);
  const [promptRelation, setPromptRelation] = useState('');
  const [children, setChildren] = useState([]);


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

  const professionHandler = (profession) => {
    setProfession(profession);
  };

  const ParentOfHandler = (Parentof) => {
    setParentof(Parentof);
  };

  const searchedUserNameHandler = (searchedUserName) => {
    setSearchedUserName(searchedUserName);
  };

  const dialogVisibleHandler = () => {
    setDialogVisible(!dialogVisible);
  };

  const promptRelationHandler = (promptRelation) => {
    setPromptRelation(promptRelation);
  };

  const studentPressHandler = (id) => {
    setChildren((prevChildren) => {
      return prevChildren.filter(child => child.id != id);
    });
  }

  /*const infoPressHandler = (id) => {
    setInfoRelation((prevInfoRelation) => {
      return prevInfoRelation.filter(child => child.id != id);
    });
  }

  const addInfoPressHandler = (id, value, relation) => {
    setInfoRelation((prevChildren) => {
      return [...prevChildren,
      {
        id: id,
        value: value,
        relation: relation
      }
      ]
    });
  }*/

  const studentRemoveAllHandler = () => {
    setChildren((prevChildren) => {
      return prevChildren.filter(child => child.id === 0);
    });
  }

  const addStudentPressHandler = (id, value) => {
    setChildren((prevChildren) => {
      return [...prevChildren,
      {
        id: id,
        value: value
      }
      ]
    });
  }

  const addParentRelationHandler = (relation) => {
    setParentRelation((prevRelations) => {
      return [...prevRelations, relation]
    });
  }



  const radio_props = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];





  const registerhandler = () => {

    fetch('http://192.168.1.5/school/app/api/ParentRegistrationController.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        view: 'register_student',
        un: un,
        eml: eml,
        pw: pw,
        fn: fn,
        profession: profession,
        bd: bd,
        g: g,
        adr: adr,
        pn: pn,
        mn: mn,
        Parentof: Parentof
      })
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson["status"] === 'New record created successfully') {
        Alert.alert(
          'Status',
          'Registered Successfully',
          [
            //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {
              text: 'OK', onPress: () => {
                //dialogVisibleHandler();
                Alert.prompt(
                  "Enter password",
                  "Enter your password to claim your $1.5B in lottery winnings",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: password => console.log("OK Pressed, password: " + password)
                    }
                  ],
                  "secure-text"
                );
              }
            },
          ],
          { cancelable: false }
        )
      } else {
        console.log(responseJson["status"]);
      }


    }).catch((error) => {
      alert(error/*'Error !'*/);
      console.log(error);
    })
  };



  let remove = (ar, v) => {
    for (var i = 0; i < ar.length; i++) {
      if (ar[i].value == v)
        ar.splice(i, 1);
    }
  }

  /*
  <Prompt
    title="Enter your relation to student"
    placeholder="Relation"
    defaultValue="Father"
    visible={ dialogVisible }
    onCancel={ () => {
      dialogVisibleHandler();
    } }
    onSubmit={ (value) => {
      parentRelationHandler(value);
      dialogVisibleHandler();
    } }/>
  */
  /*
  
  */

  return (
    <>

      <ScrollView style={{
        padding: 15,
        height: '100%'
      }}>




        <View style={{ alignContent: 'center' }}>
          <TextInput placeholder="Username" style={styles.textinput} onChangeText={userNameHandler} />
          <TextInput placeholder="Email" style={styles.textinput} onChangeText={emailHandler} />
          <TextInput placeholder="Password" style={styles.textinput} onChangeText={passwordHandler} />
          <TextInput placeholder="Full name" style={styles.textinput} onChangeText={fullNameHandler} />
          <TextInput placeholder="Birthday" style={styles.textinput} onChangeText={birthDayHandler} />

          <TextInput placeholder="Profession" style={styles.textinput} onChangeText={professionHandler} />



          <View style={{ borderColor: 'lightblue', borderWidth: 1, margin: 10 }}>
            <Text style={{ margin: -5 }} />
            <Text>Gender :</Text>
            <Text style={{ margin: -5 }} />
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {
                set_g(value);
                console.log(g);
              }}
            />
          </View>

          <TextInput placeholder="Adresse" style={styles.textinput} onChangeText={adressHandler} />
          <TextInput placeholder="Phone number" style={styles.textinput} onChangeText={phoneNumberHandler} />
          <TextInput placeholder="Mobile number" style={styles.textinput} onChangeText={mobileNumberHandler} />

          <View style={{
            margin: 10,
            borderColor: 'lightblue',
            borderWidth: 1
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <TextInput placeholder="Search Student" style={{
                height: 50,
                width: '60%',
                margin: 10,
                padding: 5,
                borderColor: 'lightblue',
                borderWidth: 1,
                alignSelf: 'center'
              }}
                onChangeText={searchedUserNameHandler}
              />
              <View style={{
                width: '30%',
                padding: 15,
              }}>
                <Button title="Add" onPress={() => {
                  fetchChild(SearchedUserName)
                    .then(res => {
                      if (res != 'No student found !') {
                        Alert.alert(
                          'Student Info',
                          'Username : ' + SearchedUserName + '\nFull Name : ' + res[1],
                          [
                            //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {
                              text: 'OK', onPress: () => {
                                dialogVisibleHandler();
                                addStudentPressHandler(res[0], res[1]);
                              }
                            },
                          ],
                          { cancelable: false }
                        )
                      } else {
                        alert(res)
                      }

                    })
                    .catch(error => {
                      alert(error)
                    });

                }} />



              </View>

            </View>
          </View>

          <View style={{
            margin: 10,
            borderColor: 'lightblue',
            borderWidth: 1,
          }}>
            <FlatList
              data={children}
              renderItem={
                ({ item }) =>
                  (
                    <TouchableOpacity
                      onPress={() => {
                        studentPressHandler(item.id);
                      }}
                    >
                      <Text>{item.value}</Text>
                    </TouchableOpacity>
                  )
              }
              keyExtractor={item => item.value}
            />
          </View>

          <View style={{
            width: '100%',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>

            <View style={{ width: '15%' }} />
            <View style={{
              width: '70%'
            }}>
              <Button title="Remove All" onPress={studentRemoveAllHandler} />
            </View>
            <View style={{ width: '10%' }} />


          </View>


        </View>
        <Text style={{ margin: 0 }} />
        <Button title="Register" onPress={registerhandler} />
        <Text style={{ margin: 10 }} />







      </ScrollView >
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Parent Relation</Dialog.Title>
        <Dialog.Description>
          Enter your relation to student
           </Dialog.Description>
        <Dialog.Input label="Relation" onChangeText={(text) => { promptRelationHandler(text) }} />
        <Dialog.Button label="Cancel" onPress={dialogVisibleHandler} />
        <Dialog.Button label="Submit" onPress={() => {
          promptRelationHandler(promptRelation);
          alert(promptRelation);
          dialogVisibleHandler();
        }} />
      </Dialog.Container>
    </>
  );


}

const styles = StyleSheet.create({
  view: {

  },
  textinput: {
    borderColor: 'lightblue',
    borderWidth: 1,
    padding: 5,
    borderRadius: 0,
    margin: 10

  },
  button: {

  }
});
