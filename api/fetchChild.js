import { BASE_URL } from "../utils/config";

export async function fetchChild(userName) {
    try {
        const response = await fetch(BASE_URL + "/fetchLinkStudent.php", {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                view: "fetchStudent",
                userName: userName
            })
        });
        if (response.ok) {
            const responseJson = await response.json();
            return ([responseJson["user"][0]["id"], responseJson["user"][0]["fullName"]]);
            //console.log([responseJson["user"][0]["id"], responseJson["user"][0]["fullName"]]);
        } else {
            return ('No student found !');
            //console.log('No student found !');
        }
    } catch (error) {
        //return error;
    }
}