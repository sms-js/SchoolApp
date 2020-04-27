import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Transportation from '../screens/dashboard/Transportation/index';

const TransportationStack = createStackNavigator({
  Transportation: {
    screen: Transportation,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(TransportationStack);
