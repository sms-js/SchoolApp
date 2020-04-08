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
  Picker,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import ClassesPicker from "../Components/ClassesPicker";

export default function RegisterStudent(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [rolingID, setRolingID] = useState("");
  const [cl, set_cl] = useState("");

  const un_handler = (username) => {
    setUsername(username);
  };

  const eml_handler = (email) => {
    setEmail(email);
  };

  const pw_handler = (password) => {
    setPassword(password);
  };

  const fn_handler = (fullname) => {
    setFullname(fullname);
  };

  const bd_handler = (birthday) => {
    setBirthday(birthday);
  };

  const g_handler = (gender) => {
    setGender(gender);
    console.log(gender);
  };

  const adr_handler = (adresse) => {
    setAdresse(adresse);
  };

  const pn_handler = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const mn_handler = (mobileNumber) => {
    setMobileNumber(mobileNumber);
  };

  const ri_handler = (rolingID) => {
    setRolingID(rolingID);
  };

  const cl_handler = (cl) => {
    set_cl(cl);
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
    console.log(rolingID);
    console.log(gender);
    console.log(adresse);
    console.log(phoneNumber);
    console.log(mobileNumber);
    console.log(cl);

    fetch(
      "http://192.168.1.7/school/app/api/StudentRegistrationController.php",
      {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          view: "register_student",
          un: username,
          eml: email,
          pw: password,
          fn: fullname,
          ri: rolingID,
          bd: birthday,
          g: gender,
          adr: adresse,
          pn: phoneNumber,
          mn: mobileNumber,
          cl: cl,
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
          alert("je suis la !");
        }
      })
      .catch((error) => {
        alert(error /*'Error !'*/);
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

        <TextInput
          placeholder="Rolling ID"
          style={styles.textinput}
          onChangeText={ri_handler}
        />

        <ClassesPicker
          set_class={(value) => {
            cl_handler(value);
          }}
        />

        <View style={{ borderColor: "lightblue", borderWidth: 1, margin: 10 }}>
          <Text style={{ margin: -5 }} />
          <Text>Gender :</Text>
          <Text style={{ margin: -5 }} />
          <RadioForm
            radio_props={radio_props}
            initial={0}
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
