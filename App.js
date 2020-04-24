import React, {Component} from 'react';
import Navigator from './Navigation';
import {AuthProvider} from './context/Authentication';
import Loading from './Components/loading';
import ViewsComponent from './Components/ViewCustom';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      /*  <ViewsComponent color="black" />*/
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    );
  }
}
