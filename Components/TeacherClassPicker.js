import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import {fetchTeacherClasses} from '../screens/dashboard/api/fetchClasses';

export default class TeacherClassesPicker extends Component {
  constructor(props) {
    super(props);
    this.classesHandler.bind(this);
    this.state = {classes: [], classesNames: []};
  }
  componentDidMount() {
    this.classesHandler();
  }
  async classesHandler() {
    try {
      //var classesnames = [];
      const res = await fetchTeacherClasses(this.props.userId);
      this.setState(
        {
          classes: res.map((element) => {
            return {label: element.className, value: element.id};
          }),
        },
        () => {
          this.props.setClasses(this.state.classes);
        },
      );

      //this.state.classesNames = classesnames;
      //this.setClasses(this.state.classes);
    } catch (error) {
      alert(error);
    }
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
        data={this.state.classes}
        onChangeText={(value) => {
          this.showMyClass(value);
          this.setClasse(value);
        }}
      />
    );
  }
}
