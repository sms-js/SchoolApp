import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginNavigator from "./LoginNavigator";
import DashboardNavigator from './DashboardNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginNavigator,
      DashboardNavigator
    },
    {
      initialRouteName: "LoginNavigator"
    }
  )
);
