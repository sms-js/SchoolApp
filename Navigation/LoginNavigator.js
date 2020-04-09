import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Terms from "../authentificationScreens/Terms";
import Login from "../authentificationScreens/Login";
import RegisterTeacher from "../authentificationScreens/RegisterTeacher";
import RegisterStudent from "../authentificationScreens/RegisterStudent";
import RegisterParent from "../authentificationScreens/RegisterParent";
import RestorePassword from "../authentificationScreens/RestorePassword";

const LoginNavigator = createStackNavigator({
  Login,
  Terms,
  RegisterTeacher,
  RegisterStudent,
  RegisterParent,
  RestorePassword
});
export default createAppContainer(LoginNavigator);
