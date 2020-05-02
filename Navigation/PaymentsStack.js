import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Payments from '../screens/dashboard/Payments/index';
import PaymentInnovice from '../screens/dashboard/Payments/PaymentInnovice';

const PaymentsStack = createStackNavigator({
  Payments: {screen: Payments, navigationOptions: {header: null}},
  PaymentInnovice: {screen: PaymentInnovice, navigationOptions: {header: null}},
});

export default createAppContainer(PaymentsStack);
