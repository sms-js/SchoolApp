import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/dashboard/Events';
import Home from '../screens/dashboard/Home/index';
import Class from '../screens/dashboard/Class/index';
import Assignments from '../screens/dashboard/Assignments/index';
import ClassSchedule from '../screens/dashboard/ClassesSchedule/index';
import Subjects from '../screens/dashboard/Subjects/index';
import Library from '../screens/dashboard/Library';
import Exams from '../screens/dashboard/Exams';
import Media from '../screens/dashboard/Media';
import Messages from '../screens/dashboard/Messages';
import News from '../screens/dashboard/News';
import Pages from '../screens/dashboard/Pages';
import Transportation from '../screens/dashboard/Transportation';
import Polls from '../screens/dashboard/Polls';
import Profile from '../screens/dashboard/Profile';
import NavigatorHeader from './navigatorHeader';

var dashboardNavigator = createDrawerNavigator(
  {
    Home,
    Class,
    ClassSchedule,
    Subjects,
    Assignments,
    Exams,
    Events,
    Media,
    Messages,
    Library,
    News,
    Pages,
    Transportation,
    Polls,
    Profile,
  },
  {
    contentComponent: (props) => <NavigatorHeader {...props} />,
  },
);

export default createAppContainer(dashboardNavigator);
