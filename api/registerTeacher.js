import { BASE_URL } from "../utils/config";

export async function registerTeacher(userName, email, password, fullName, birthDay, gender, adress, phoneNumber, mobileNumber) {
  try {
    const response = await fetch(BASE_URL + "/TeacherRegistrationController.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        view: 'register_teacher',
        userName: userName,
        email: email,
        password: password,
        fullName: fullName,
        birthDay: birthDay,
        gender: gender,
        adress: adress,
        phoneNumber: phoneNumber,
        mobileNumber: mobileNumber
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