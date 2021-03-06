import React, { useState, Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from "react-native";
import { fetchLogin } from "../api/login";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const userNameHandler = userName => {
    setUserName(userName);
  };

  const passwordHandler = password => {
    setPassword(password);
  };

  const RememberMeHandler = () => {
    setRememberMe(!rememberMe);
  };

  const loginhandler = () => {
    fetchLogin(userName, password)
      .then(res => {alert(res)})
      .catch(error => {});
  };

  return (
    <View
      style={{
        paddingTop: 50,
        alignContent: "center",
        height: "90%",
        alignItems: "center"
      }}
    >
      <View style={styles.view}>
        <TextInput placeholder="Email / Username" style={styles.textinput} onChangeText={userNameHandler} />

        <TextInput placeholder="Password" style={styles.textinput} onChangeText={passwordHandler} secureTextEntry={true} />

        <View style={{ flexDirection: "row" }}>
          <CheckBox title="remember_me" value={rememberMe} onValueChange={RememberMeHandler} />
          <Text style={{ textAlignVertical: "center" }}> Remember me</Text>
        </View>
        <Text style={{ margin: 0 }} />
        <Button title="Login" style={styles.button} onPress={loginhandler} />
        <Text style={{ margin: 0 }} />

        <TouchableOpacity style={styles.opacity} onPress={() => props.navigation.navigate("Terms")}>
          <Text>School Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opacity} onPress={() => props.navigation.navigate("RegisterTeacher")}>
          <Text>Register Teacher</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opacity} onPress={() => props.navigation.navigate("RegisterStudent")}>
          <Text>Register Student</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opacity} onPress={() => props.navigation.navigate("RegisterParent")}>
          <Text>Register Parent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opacity} onPress={() => props.navigation.navigate("Restore")}>
          <Text>Restore Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: "center",
    width: "90%"
  },
  textinput: {
    borderColor: "lightblue",
    borderWidth: 1,
    padding: 5,
    borderRadius: 0,
    margin: 10
  },
  button: {},
  opacity: {
    margin: 5,
    alignSelf: "center"
  }
});
