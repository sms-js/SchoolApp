import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import {fetchClassesCount} from '../api/fetchClassesCount';
import {fetchClasses} from '../api/fetchClasses';

let c = 0;
let classes_names = [];
let classes_ids = [];

export default class ClassesPicker extends Component {
  constructor() {
    super();
    this.classes_handler();
    this.state = {};
  }

  classes_handler() {
    fetchClassesCount()
      .then((res) => {
        c = res;
        this.setState({
          classes_count: c,
        });
      })
      .catch((error) => {});

    fetchClasses()
      .then((res) => {
        let str = '';
        let x = '';
        let y = '';
        for (let i = 0; i < this.state.classes_count; i++) {
          classes_names[i] = {value: res[i]['className']};
          classes_ids[i] = {value: parseInt(res[i]['id'])};
        }
        this.setState({
          classes_names: classes_names,
          classes_ids: classes_ids,
        });
      })
      .catch((error) => {});
  }
  set_class(value) {
    this.props.set_class(value);
  }

  render() {
    return (
      <Dropdown
        label="Class"
        data={classes_names}
        onAccessibilityAction={this.classes_handler}
        onChangeText={(value) => {
          this.setState({
            class:
              this.state.classes_names.map((e) => e.value).indexOf(value) + 1,
          });
          this.set_class(this.state.class);
        }}
      />
    );
  }
}
