import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
//import Login from './Screens/Login';
import App from "../App";
import Terms from "../Screens/Terms";
import Login from "../Screens/Login";
import RegisterTeacher from "../Screens/RegisterTeacher";
import RegisterStudent from "../Screens/RegisterStudent";
import RegisterParent from "../Screens/RegisterParent";
//import RestorePassword from '../Screens/RestorePassword';

const login_navigator = createStackNavigator({
  //app: App,
  Login,
  Terms,
  RegisterTeacher,
  RegisterStudent,
  RegisterParent
  //Restore: RestorePassword
});
export default createAppContainer(login_navigator);
//export default login_navigator;

/*const LogNav = createAppContainer(login_navigator);

export default function LoginNavigator (){
    let server='http://192.168.1.5/';
  
        return(
         <LogNav server={server}/>
        );
    
}*/
