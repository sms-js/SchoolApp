import { BASE_URL } from "../utils/config";

export async function fetchLogin(userName, password) {
  try {
    const response = await fetch(BASE_URL + "/Usercontroller.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        view: "login",
        userName: userName,
        password: password
      })
    });
    //if (response.ok) {
    const responseJson = await response.json();
    return responseJson["status"];
    /*}else{
      return('error !');
    }*/
  } catch (error) {
    return error;
  }
}
