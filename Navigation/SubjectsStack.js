import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Subjects from '../screens/dashboard/Subjects/index';

const SubjectsStack = createStackNavigator({
  Subjects: {screen: Subjects, navigationOptions: {header: null}},
});

export default createAppContainer(SubjectsStack);
