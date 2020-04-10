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
//import userInfo from '../utils/userInfo';

var screens = {
  Home,
  Events,
  Media,
  Messages,
  Library,
  News,
  Pages,
  Transportation,
};
var dashboardNavigator = createDrawerNavigator(screens);

/*if (userInfo != undefined) {
  switch (userInfo[0]['role']) {
    case 'student':
      screens = {Home, Library};
      dashboardNavigator = createDrawerNavigator(screens);

      break;

    case 'teacher':
      screens = {Home, Transportation};
      dashboardNavigator = createDrawerNavigator(screens);
      break;

    case 'parent':
      screens = {Home, News};
      dashboardNavigator = createDrawerNavigator(screens);
      break;
  }
}*/

export default createAppContainer(dashboardNavigator);
