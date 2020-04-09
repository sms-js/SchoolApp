import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/dashboard/Events';
import Home from '../screens/dashboard/Home';
import Library from '../screens/dashboard/Library';
import Media from '../screens/dashboard/Media';
import Messages from '../screens/dashboard/Messages';
import News from '../screens/dashboard/News';
import Pages from '../screens/dashboard/Pages';
import Transportation from '../screens/dashboard/Transportation';

const dashboardNavigator = createDrawerNavigator({
  Home,
  Events,
  Media,
  Messages,
  Library,
  News,
  Pages,
  Transportation,
});

export default createAppContainer(dashboardNavigator);
