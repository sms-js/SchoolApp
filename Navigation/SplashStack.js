import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Splash from '../screens/Splash';

const SplashStack = createStackNavigator({
  Splash,
});

export default createAppContainer(SplashStack);
