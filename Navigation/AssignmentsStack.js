import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Assignments from '../screens/dashboard/Assignments/index';

const AssignmentsStack = createStackNavigator({
  Assignments: {screen: Assignments, navigationOptions: {header: null}},
});

export default createAppContainer(AssignmentsStack);
