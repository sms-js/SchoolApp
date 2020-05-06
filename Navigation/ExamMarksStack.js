import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import ExamMarks from '../screens/dashboard/ExamMarks/index';
import ControlExamMarks from '../screens/dashboard/ExamMarks/ControlExamMarks';

const ExamMarksStack = createStackNavigator({
  ExamMarks: {
    screen: ExamMarks,
    navigationOptions: {header: null},
  },
  ControlExamMarks: {
    screen: ControlExamMarks,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(ExamMarksStack);
