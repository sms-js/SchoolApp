import { BASE_URL } from "../utils/config";

export async function fetchClassesCount() {
  try {
    const response = await fetch(BASE_URL + "/ClassesController.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        view: "count"
      })
    });
    //if (response.ok) {
      const responseJson = await response.json();
      return parseInt(responseJson["classes count"][0]["count(*)"]);
    /*}else{
      return('error !');
    }*/
  } catch (error) {
    return error;
  }
}