import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import ClassesSchedule from '../screens/dashboard/ClassesSchedule/index';

const ClassesScheduleStack = createStackNavigator({
  ClassesSchedule: {
    screen: ClassesSchedule,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(ClassesScheduleStack);
