import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Attendance from '../screens/dashboard/Attendance/index';
import ControlAttendance from '../screens/dashboard/Attendance/ControlAttendance';

const AttendanceStack = createStackNavigator({
  Attendance: {screen: Attendance, navigationOptions: {header: null}},
  ControlAttendance: {
    screen: ControlAttendance,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(AttendanceStack);
