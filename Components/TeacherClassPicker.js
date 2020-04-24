import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import {fetchTeacherClasses} from '../screens/dashboard/api/fetchClasses';

export default class TeacherClassesPicker extends Component {
  constructor() {
    super();
    this.classesHandler();
    this.state = {classes: [], classesNames: []};
  }
  classesHandler() {
    var classesnames = [];
    fetchTeacherClasses(this.props.userId)
      .then(async (res) => {
        this.state.classes = res;
      })
      .catch((error) => {
        alert(error);
      });
    for (let i = 0; i < this.state.classes.length; i++) {
      classesnames.push({
        label: this.state.classes[i]['className'],
        value: i,
      });
    }
    this.state.classesNames = classesnames;
    this.setClasses(this.state.classes);
  }
  setClasses(value) {
    this.props.setClasses(value);
  }
  showMyClass(value) {
    this.props.showMyClass(value);
  }
  setClasse(value) {
    this.props.setClasse(value);
  }

  render() {
    return (
      <Dropdown
        label="My classes"
        data={this.state.classesNames}
        onChangeText={(value) => {
          this.showMyClass(value);
          this.setClasse(value);
        }}
      />
    );
  }
}
