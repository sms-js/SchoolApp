import React, {Component} from 'react';
import Navigator from './Navigation';
import {AuthProvider} from './context/Authentication';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    );
  }
}
