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
  Picker
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Dropdown } from "react-native-material-dropdown";
import ClassesPicker from "../Components/ClassesPicker";

export default function RegisterStudent(props) {
  const [un, set_un] = useState("");
  const [eml, set_eml] = useState("");
  const [pw, set_pw] = useState("");
  const [fn, set_fn] = useState("");
  const [bd, set_bd] = useState("");
  const [g, set_g] = useState("");
  const [adr, set_adr] = useState("");
  const [pn, set_pn] = useState("");
  const [mn, set_mn] = useState("");
  const [ri, set_ri] = useState("");
  const [cl, set_cl] = useState("");

  const un_handler = un => {
    set_un(un);
  };

  const eml_handler = eml => {
    set_eml(eml);
  };

  const pw_handler = pw => {
    set_pw(pw);
  };

  const fn_handler = fn => {
    set_fn(fn);
  };

  const bd_handler = bd => {
    set_bd(bd);
  };

  const g_handler = g => {
    set_g(g);
    console.log(g);
  };

  const adr_handler = adr => {
    set_adr(adr);
  };

  const pn_handler = pn => {
    set_pn(pn);
  };

  const mn_handler = mn => {
    set_mn(mn);
  };

  const ri_handler = ri => {
    set_ri(ri);
  };

  const cl_handler = cl => {
    set_cl(cl);
  };

  const radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  const registerhandler = () => {
    console.log(un);
    console.log(eml);
    console.log(pw);
    console.log(fn);
    console.log(bd);
    console.log(ri);
    console.log(g);
    console.log(adr);
    console.log(pn);
    console.log(mn);
    console.log(cl);

    fetch(
      "http://192.168.1.7/school/app/api/StudentRegistrationController.php",
      {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          view: "register_student",
          un: un,
          eml: eml,
          pw: pw,
          fn: fn,
          ri: ri,
          bd: bd,
          g: g,
          adr: adr,
          pn: pn,
          mn: mn,
          cl: cl
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson["status"] === "New record created successfully") {
          Alert.alert(
            "Status",
            "Registered Successfully",
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {
                text: "OK",
                onPress: () => console.log(props.navigation.navigate("Login"))
              }
            ],
            { cancelable: false }
          );
        } else {
          console.log(responseJson["status"]);
        }
      })
      .catch(error => {
        alert(error /*'Error !'*/);
        console.log(error);
      });
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        height: "100%"
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
          set_class={value => {
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
            onPress={value => {
              set_g(value);
              console.log(g);
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
    margin: 10
  },
  button: {}
});
