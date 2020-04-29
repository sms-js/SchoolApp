import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import News from '../screens/dashboard/News/index';
import HTMLView from '../screens/dashboard/HTMLView';

const NewsStack = createStackNavigator({
  News: {screen: News, navigationOptions: {header: null}},
  HTMLView: {screen: HTMLView, navigationOptions: {header: null}},
});

export default createAppContainer(NewsStack);
