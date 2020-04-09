import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginNavigator from "./LoginNavigator";

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
