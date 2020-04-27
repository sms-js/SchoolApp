import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Home from '../screens/dashboard/Home/index';

const HomeStack = createStackNavigator({
  Home: {screen: Home, navigationOptions: {header: null}},
});

export default createAppContainer(HomeStack);
