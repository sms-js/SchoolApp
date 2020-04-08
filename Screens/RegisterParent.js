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
  FlatList,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Dropdown } from "react-native-material-dropdown";
import ClassesPicker from "../Components/ClassesPicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SwipeView from "react-native-swipeview";

export default function RegisterParent(props) {
  const [un, set_un] = useState("");
  const [eml, set_eml] = useState("");
  const [pw, set_pw] = useState("");
  const [fn, set_fn] = useState("");
  const [bd, set_bd] = useState("");
  const [g, set_g] = useState("");
  const [adr, set_adr] = useState("");
  const [pn, set_pn] = useState("");
  const [mn, set_mn] = useState("");
  const [p, set_p] = useState("");
  const [of, set_of] = useState("");

  const un_handler = (un) => {
    set_un(un);
  };

  const eml_handler = (eml) => {
    set_eml(eml);
  };

  const pw_handler = (pw) => {
    set_pw(pw);
  };

  const fn_handler = (fn) => {
    set_fn(fn);
  };

  const bd_handler = (bd) => {
    set_bd(bd);
  };

  const g_handler = (g) => {
    set_g(g);
    console.log(g);
  };

  const adr_handler = (adr) => {
    set_adr(adr);
  };

  const pn_handler = (pn) => {
    set_pn(pn);
  };

  const mn_handler = (mn) => {
    set_mn(mn);
  };

  const p_handler = (p) => {
    set_p(p);
  };

  const of_handler = (of) => {
    set_of(of);
  };

  const radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const registerhandler = () => {
    console.log(un);
    console.log(eml);
    console.log(pw);
    console.log(fn);
    console.log(bd);
    console.log(p);
    console.log(g);
    console.log(adr);
    console.log(pn);
    console.log(mn);
    console.log(of);

    fetch(
      "http://192.168.1.7/school/app/api/ParentRegistrationController.php",
      {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          view: "register_student",
          un: un,
          eml: eml,
          pw: pw,
          fn: fn,
          p: p,
          bd: bd,
          g: g,
          adr: adr,
          pn: pn,
          mn: mn,
          of: of,
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
        alert(error /*'Error !'*/);
        console.log(error);
      });
  };

  let values = [{ value: "Student1" }, { value: "Student2" }];
  let values1 = ["Student1", "Student2"];

  /*Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };*/
  /*Array.prototype.remove = function (key, value) {
      const index = this.findIndex(obj => obj[key] === value);
      return index >= 0 ? [
          ...this.slice(0, index),
          ...this.slice(index + 1)
      ] : this;
  };*/
  let remove = (ar, v) => {
    for (var i = 0; i < ar.length; i++) {
      if (ar[i].value == v) ar.splice(i, 1);
    }
  };

  return (
    <ScrollView
      style={{
        padding: 15,
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
        <View flexDirection="row">
          <TextInput
            placeholder="Day"
            style={styles.textinput}
            onChangeText={bd_handler}
          />
          <TextInput
            placeholder="Mounth"
            style={styles.textinput}
            onChangeText={bd_handler}
          />
          <TextInput
            placeholder="Yers"
            style={styles.textinput}
            onChangeText={bd_handler}
          />
        </View>

        <TextInput
          placeholder="Profession"
          style={styles.textinput}
          onChangeText={p_handler}
        />

        <View style={{ borderColor: "lightblue", borderWidth: 1, margin: 10 }}>
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

        <View
          style={{
            margin: 10,
            borderColor: "lightblue",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="Search Student"
              style={{
                height: 50,
                width: "60%",
                margin: 10,
                padding: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                width: "30%",
                padding: 15,
              }}
            >
              <Button
                title="Add"
                onPress={() => {
                  console.log(values);
                }}
              />
            </View>
          </View>

          <View
            style={{
              margin: 10,
              borderColor: "lightblue",
              borderWidth: 1,
            }}
          >
            <FlatList
              data={values}
              renderItem={({ item }) => (
                <SwipeView
                  disableSwipeToLeft={true}
                  renderVisibleContent={() => <Text>{item.value}</Text>}
                  onSwipedRight={() => {
                    remove(values, item.value);
                    console.log(values);
                  }}
                />
              )}
              keyExtractor={(item) => item.value}
            />
          </View>

          <View
            style={{
              width: "100%",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "5%" }} />
            <View
              style={{
                width: "40%",
              }}
            >
              <Button title="Remove All" onPress={() => {}} />
            </View>
            <View style={{ width: "10%" }} />
            <View
              style={{
                width: "40%",
              }}
            >
              <Button title="Remove" />
            </View>
          </View>
        </View>
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
