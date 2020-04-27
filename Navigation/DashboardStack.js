import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Events from '../screens/dashboard/Events';
import Home from './HomeStack';
import Class from './ClassStack';
import Assignments from './AssignmentsStack';
import ClassSchedule from './ClassesScheduleStack';
import Subjects from './SubjectsStack';
import Library from '../screens/dashboard/Library';
import Exams from './ExamsStack';
import Media from '../screens/dashboard/Media';
import Messages from '../screens/dashboard/Messages';
import News from '../screens/dashboard/News';
import Pages from '../screens/dashboard/Pages';
import Transportation from './TransportationStack';
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
