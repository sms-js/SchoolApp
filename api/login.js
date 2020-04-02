import { BASE_URL } from "../utils/config";

export async function fetchLogin(username, password) {
  try {
    const response = await fetch(BASE_URL + "/Usercontroller.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        view: "login",
        un: username,
        pw: password
      })
    });
    if (response.ok) {
      const responseJson = await response.json();
      //alert(responseJson["status"]);
      //console.log(responseJson["status"]);
      return responseJson["status"];
    }else{
      return('error !');
    }
  } catch (error) {
    alert(error);
    throw error;
  }
}
