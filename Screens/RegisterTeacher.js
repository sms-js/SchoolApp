import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  CheckBox,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
//import GenderRadio from '../Components/GenderRadio';
export default function RegisterTeacher(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState();
  const [adresse, setAdresse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const un_handler = (un) => {
    setUsername(un);
  };

  const eml_handler = (eml) => {
    setEmail(eml);
  };

  const pw_handler = (pw) => {
    setPassword(pw);
  };

  const fn_handler = (fn) => {
    setFullname(fn);
  };

  const bd_handler = (bd) => {
    setBirthday(bd);
  };

  const g_handler = (g) => {
    setGender(g);
    console.log(g);
  };

  const adr_handler = (adr) => {
    setAdresse(adr);
  };

  const pn_handler = (pn) => {
    setPhoneNumber(pn);
  };

  const mn_handler = (mn) => {
    setMobileNumber(mn);
  };

  const radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const registerhandler = () => {
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(fullname);
    console.log(birthday);
    console.log(gender);
    console.log(adresse);
    console.log(phoneNumber);
    console.log(mobileNumber);
    fetch(
      "http://192.168.1.7/school/app/api/TeacherRegistrationController.php",
      {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          view: "register_teacher",
          un: username,
          eml: email,
          pw: password,
          fn: fullname,
          bd: birthday,
          g: gender,
          adr: adresse,
          pn: phoneNumber,
          mn: mobileNumber,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson["status"] === "New record created successfully") {
          Alert.alert(
            "Status",
            "Registered Successfully",
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {
                text: "OK",
                onPress: () => console.log(props.navigation.navigate("Login")),
              },
            ],
            { cancelable: false }
          );
        } else {
          console.log(responseJson["status"]);
        }
      })
      .catch((error) => {
        alert("Error !");
        console.log(error);
      });
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        height: "100%",
      }}
    >
      <View style={{ alignContent: "center" }}>
        <TextInput
          placeholder="Username"
          style={styles.textinput}
          onChangeText={un_handler}
        />
        <TextInput
          placeholder="Email"
          style={styles.textinput}
          onChangeText={eml_handler}
        />
        <TextInput
          placeholder="Password"
          style={styles.textinput}
          onChangeText={pw_handler}
        />
        <TextInput
          placeholder="Full name"
          style={styles.textinput}
          onChangeText={fn_handler}
        />
        <TextInput
          placeholder="Birthday"
          style={styles.textinput}
          onChangeText={bd_handler}
        />

        <View style={{ borderColor: "lightblue", borderWidth: 1, margin: 10 }}>
          <Text style={{ margin: -5 }} />
          <Text>Gender :</Text>
          <Text style={{ margin: -5 }} />
          <RadioForm
            radio_props={radio_props}
            initial={"male"}
            onPress={(value) => {
              setGender(value);
              console.log(gender);
            }}
          />
        </View>

        <TextInput
          placeholder="Adresse"
          style={styles.textinput}
          onChangeText={adr_handler}
        />
        <TextInput
          placeholder="Phone number"
          style={styles.textinput}
          onChangeText={pn_handler}
        />
        <TextInput
          placeholder="Mobile number"
          style={styles.textinput}
          onChangeText={mn_handler}
        />
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
    margin: 10,
  },
  button: {},
});
