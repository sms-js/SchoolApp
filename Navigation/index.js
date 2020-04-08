import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginNavigator from "./LoginNavigator";
import Application from "./Application";

export default createAppContainer(
  createSwitchNavigator(
    {
      LoginNavigator,
    },
    {
      initialRouteName: "LoginNavigator",
    }
  )
);
