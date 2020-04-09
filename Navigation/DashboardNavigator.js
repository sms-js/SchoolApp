import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Events from '../Dashboard Screens/Events';
import Home from '../Dashboard Screens/Home';
import Library from '../Dashboard Screens/Library';
import Media from '../Dashboard Screens/Media';
import Messages from '../Dashboard Screens/Messages';
import News from '../Dashboard Screens/News';
import Pages from '../Dashboard Screens/Pages';
import Transportation from '../Dashboard Screens/Transportation';


const dashboardNavigator = createDrawerNavigator({
    Home: {
        screen: Home
    },
    Events: {
        screen: Events
    },
    Media: {
        screen: Media
    },
    Messages: {
        screen: Messages
    },
    Library: {
        screen: Library
    },
    News: {
        screen: News
    },
    Pages: {
        screen: Pages
    },
    Transportation: {
        screen: Transportation
    }
});

export default createAppContainer(dashboardNavigator);