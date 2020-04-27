import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Exams from '../screens/dashboard/Exams/index';

const ExamsStack = createStackNavigator({
  Exams: {screen: Exams, navigationOptions: {header: null}},
});

export default createAppContainer(ExamsStack);
