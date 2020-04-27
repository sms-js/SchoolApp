import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Attendance from '../screens/dashboard/Attendance/index';

const AttendanceStack = createStackNavigator({
  Attendance: {screen: Attendance, navigationOptions: {header: null}},
});

export default createAppContainer(AttendanceStack);
