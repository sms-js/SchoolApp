import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {
  componentDidMount() {
    this.animation.play();
    this.props;
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
          source={this.props.img}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    paddingTop: 0,
  },
});
