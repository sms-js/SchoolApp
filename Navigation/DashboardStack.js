import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Events from './EventsStack';
import Home from './HomeStack';
import Class from './ClassStack';
import Assignments from './AssignmentsStack';
import ClassSchedule from './ClassesScheduleStack';
import Subjects from './SubjectsStack';
import Attendance from './AttendanceStack';
import Library from '../screens/dashboard/Library';
import Exams from './ExamsStack';
import OnilneExams from './OnlineExamsStack';
import ExamMarks from './ExamMarksStack';
import Media from '../screens/dashboard/Media';
import Messages from '../screens/dashboard/Messages';
import News from './NewsStack';
import Pages from './PagesStack';
import GradeLevels from '../screens/dashboard/GradeLevels';
import Transportation from './TransportationStack';
import Payments from './PaymentsStack';
import Polls from '../screens/dashboard/Polls';
import Profile from '../screens/dashboard/Profile';
import NavigatorHeader from './navigatorHeader';

var dashboardNavigator = createDrawerNavigator(
  {
    Home,
    Class,
    ClassSchedule,
    Subjects,
    Attendance,
    Assignments,
    Exams,
    OnilneExams,
    ExamMarks,
    Events,
    Media,
    Messages,
    Library,
    News,
    Pages,
    GradeLevels,
    Transportation,
    Payments,
    Polls,
    Profile,
  },
  {
    contentComponent: (props) => <NavigatorHeader {...props} />,
  },
);

export default createAppContainer(dashboardNavigator);
