import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginNavigator from './LoginStack';
import DashboardNavigator from './DashboardStack';
import Splash from './SplashStack';

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash,
      LoginNavigator,
      DashboardNavigator,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
