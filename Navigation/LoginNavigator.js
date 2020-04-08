import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Terms from "../Screens/Terms";
import Login from "../Screens/Login";
import RegisterTeacher from "../Screens/RegisterTeacher";
import RegisterStudent from "../Screens/RegisterStudent";
import RegisterParent from "../Screens/RegisterParent";
// import RestorePassword from "../Screens/RestorePassword";

const LoginNavigator = createStackNavigator({
  Login,
  Terms,
  RegisterTeacher,
  RegisterStudent,
  RegisterParent,
  //RestorePassword
});

export default createAppContainer(LoginNavigator);
