import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Pages from '../screens/dashboard/Pages/index';
import HTMLView from '../screens/dashboard/HTMLView';

const PagesStack = createStackNavigator({
  Pages: {screen: Pages, navigationOptions: {header: null}},
  HTMLView: {screen: HTMLView, navigationOptions: {header: null}},
});

export default createAppContainer(PagesStack);
