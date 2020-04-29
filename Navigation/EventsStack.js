import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Events from '../screens/dashboard/Events/index';
import HTMLView from '../screens/dashboard/HTMLView';

const EventsStack = createStackNavigator({
  Events: {screen: Events, navigationOptions: {header: null}},
  HTMLView: {screen: HTMLView, navigationOptions: {header: null}},
});

export default createAppContainer(EventsStack);
