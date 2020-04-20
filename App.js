import React, {Component} from 'react';
import Navigator from './Navigation';
import {AuthProvider} from './context/Authentication';
import Loading from './Components/loading';

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
