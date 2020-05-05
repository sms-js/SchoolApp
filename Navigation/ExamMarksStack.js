import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import ExamMarks from '../screens/dashboard/ExamMarks/index';

const ExamMarksStack = createStackNavigator({
  ExamMarks: {
    screen: ExamMarks,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(ExamMarksStack);
