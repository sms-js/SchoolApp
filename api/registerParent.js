import {BASE_URL} from '../utils/config';

export async function registerParent(
  userName,
  email,
  password,
  fullName,
  profession,
  birthDay,
  gender,
  adress,
  phoneNumber,
  mobileNumber,
  parentOf,
) {
  try {
    const response = await fetch(
      BASE_URL + 'ParentRegistrationController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'register_parent',
          userName: userName,
          email: email,
          password: password,
          fullName: fullName,
          profession: profession,
          birthDay: birthDay,
          gender: gender,
          adress: adress,
          phoneNumber: phoneNumber,
          mobileNumber: mobileNumber,
          parentOf: parentOf,
        }),
      },
    );
    //if (response.ok) {
    const responseJson = await response.json();
    return responseJson['status'];
    /*}else{
          return('error !');
        }*/
  } catch (error) {
    return error;
  }
}
