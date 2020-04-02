import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import React, { Component } from "react";
import { View, Text } from "react-native";

export default class GenderRadio extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  getInitialState() {
    return this.state.value;
  }

  render() {
    return (
      <View>
        <RadioForm
          radio_props={this.radio_props}
          initial={0}
          onPress={value => {
            this.setState({ value: value });
          }}
        />
      </View>
    );
  }
}
