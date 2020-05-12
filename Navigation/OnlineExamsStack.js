import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import OnlineExams from '../screens/dashboard/OnlineExams/index';
import ControlOnlineExams from '../screens/dashboard/OnlineExams/ControlOnlineExams';
import TakeOnlineExam from '../screens/dashboard/OnlineExams/TakeOnlineExam';
import OnlineExamMark from '../screens/dashboard/OnlineExams/OnlineExamMark';
import AddOnlineExam from '../screens/dashboard/OnlineExams/AddOnlineExam';

const OnlineExamsStack = createStackNavigator({
  OnlineExams: {screen: OnlineExams, navigationOptions: {header: null}},
  ControlOnlineExams: {
    screen: ControlOnlineExams,
    navigationOptions: {header: null},
  },
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
});

export default createAppContainer(OnlineExamsStack);
