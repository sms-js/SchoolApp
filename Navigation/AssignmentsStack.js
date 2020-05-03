import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Assignments from '../screens/dashboard/Assignments/index';
import AddAssignment from '../screens/dashboard/Assignments/AddAssignment';

const AssignmentsStack = createStackNavigator({
  Assignments: {screen: Assignments, navigationOptions: {header: null}},
  AddAssignment: {screen: AddAssignment, navigationOptions: {header: null}},
});

export default createAppContainer(AssignmentsStack);
