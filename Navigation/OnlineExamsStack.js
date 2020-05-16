import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import OnlineExams from '../screens/dashboard/OnlineExams/index';
import EditOnlineExam from '../screens/dashboard/OnlineExams/EditOnlineExam';
import TakeOnlineExam from '../screens/dashboard/OnlineExams/TakeOnlineExam';
import OnlineExamMark from '../screens/dashboard/OnlineExams/OnlineExamMark';
import AddOnlineExam from '../screens/dashboard/OnlineExams/AddOnlineExam';
import OnlineExamMarks from '../screens/dashboard/OnlineExams/OnlineExamMarks';

const OnlineExamsStack = createStackNavigator({
  OnlineExams: {screen: OnlineExams, navigationOptions: {header: null}},
  TakeOnlineExam: {
    screen: TakeOnlineExam,
    navigationOptions: {header: null},
  },
  OnlineExamMark: {
    screen: OnlineExamMark,
    navigationOptions: {header: null},
  },
  AddOnlineExam: {
    screen: AddOnlineExam,
    navigationOptions: {header: null},
  },
  EditOnlineExam: {
    screen: EditOnlineExam,
    navigationOptions: {header: null},
  },
  OnlineExamMarks: {
    screen: OnlineExamMarks,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(OnlineExamsStack);
