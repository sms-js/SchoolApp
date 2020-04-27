import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Class from '../screens/dashboard/Class/index';
import StudentInfo from '../screens/dashboard/Class/StudentInfo';
import TeacherInfo from '../screens/dashboard/Class/TeacherInfo';

const ClassStack = createStackNavigator({
  Class: {screen: Class, navigationOptions: {header: null}},
  StudentInfo: {screen: StudentInfo, navigationOptions: {header: null}},
  TeacherInfo: {screen: TeacherInfo, navigationOptions: {header: null}},
});

export default createAppContainer(ClassStack);
