import React, { Component } from "react";
import { CheckBox } from "react-native";
export default class Check extends Component {
  constructor() {
    super();
    this.state = {
      check: false
    };
  }
  rm_handler() {
    this.setState({
      check: !this.state.check
    });
  }
  render() {
    return <CheckBox value={this.state.check} onValueChange={this.rm_handler}></CheckBox>;
  }
}
