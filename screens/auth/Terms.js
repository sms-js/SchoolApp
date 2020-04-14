/*import React, {useState} from 'react';
import {Text, ScrollView, WebView} from 'react-native';
import {fetchTerms} from '../../api/fetchTerms';

export default function Terms(props) {
  const [terms, set_terms] = useState('');
  fetchTerms()
    .then((res) => {
      set_terms(res);
    })
    .catch((error) => {});
  return (
    <ScrollView style={{margin: 15}}>
      <Text>{terms}</Text>
    </ScrollView>
  );
}*/
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import 'react-native-get-random-values';
import {fetchTerms} from '../../api/fetchTerms';

export default class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  render() {
    fetchTerms()
      .then((res) => {
        this.setState({
          content: res,
        });
      })
      .catch((error) => {});
    return (
      <WebView style={styles.container} source={{html: this.state.content}} />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const htmlContent =
  '<h1 style="color:red;"> Skptricks Blog </h1>' +
  '<h3> The Basics Of ES6 Generators - Javascript</h3>' +
  '<p> With ES6 generators, we have a different kind of function, which may be paused in the middle, one or many times, and resumed later, allowin... </p>' +
  '<img src="https://3.bp.blogspot.com/-XhR2CaeJE3M/W8oKAFPha_I/AAAAAAAACCs/MnKDQ_jtCjg8kgF9lirPAfa0CupLcsWhQCLcBGAs/s600/gene.png" alt="Image" width="90%" height="200" >' +
  '<h3> React Native Picker Spinner DropDown Menu List Example - Android</h3>' +
  '<p> In this tutorial, we are going to discuss how to create simple picker s pinner dropdown menu list in react native application . Picker Spi... </p>' +
  '<img src="https://4.bp.blogspot.com/-puNk3kY_CaQ/W8yOhWzPiOI/AAAAAAAACDU/VlQ9bzG3x6c_7Vfm8ENo2c3uQh1jvhd0ACLcBGAs/s600/picker.png" alt="Image" width="90%" height="200" >' +
  '<h3> Create Custom Snackbar Component Example In React Native- Android</h3>' +
  '<p> This tutorial explains how to create simple Snackbar component in react native application . Snackbars are just like Toast messages except ... </p>' +
  '<img src="https://2.bp.blogspot.com/-93jY0dxBGR4/W8NnVz92VSI/AAAAAAAACBc/q77WAtv-Xb0LGsSOBxGRrU1d1QXyYVT6ACLcBGAs/s600/snack.png" alt="Image" width="90%" height="200" >' +
  '<h3> React Native Simple Custom GridView Layout Example Android</h3>' +
  '<p> This tutorial explains how to create simple custom grid view in react native application.  Grid View that displays items in a two-dimension... </p>' +
  '<img src="https://1.bp.blogspot.com/-U6DxHFlg770/W7ECe9uy4rI/AAAAAAAAB-0/Mumx0xM2APQkq4ynVni17BEo1wK1tU-NgCLcBGAs/s600/grid.png" alt="Image" width="90%" height="200" >';
