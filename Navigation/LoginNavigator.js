import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Terms from '../screens/auth/Terms';
import Login from '../screens/auth/Login';
import RegisterTeacher from '../screens/auth/RegisterTeacher';
import RegisterStudent from '../screens/auth/RegisterStudent';
import RegisterParent from '../screens/auth/RegisterParent';
import RestorePassword from '../screens/auth/RestorePassword';

const LoginNavigator = createStackNavigator({
  Login,
  Terms,
  RegisterTeacher,
  RegisterStudent,
  RegisterParent,
  RestorePassword,
});

export default createAppContainer(LoginNavigator);
