import {BASE_URL} from '../utils/config';

export async function fetchUserInfo(userName) {
  try {
    const response = await fetch(BASE_URL + '/UserInfoController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'byinfo',
        userName: userName,
      }),
    });
    //if (response.ok) {
    const responseJson = await response.json();
    //console.log('responseJSON : ' + responseJson['user info'][0]);
    let role = responseJson['user info'][0]['role'];
    let info = [];
    switch (role) {
      case 'student':
        info = [
          {
            id: responseJson['user info'][0]['id'],
            userName: responseJson['user info'][0]['username'],
            email: responseJson['user info'][0]['email'],
            fullName: responseJson['user info'][0]['fullName'],
            role: responseJson['user info'][0]['role'],
            //activated: responseJson['user info'][0]['activated'],
            studentRollId: responseJson['user info'][0]['studentRollId'],
            birthDay: responseJson['user info'][0]['birthday'],
            gender: responseJson['user info'][0]['gender'],
            address: responseJson['user info'][0]['address'],
            phoneNumber: responseJson['user info'][0]['phoneNo'],
            mobileNumber: responseJson['user info'][0]['mobileNo'],
            studentClass: responseJson['user info'][0]['studentClass'],
            photo: responseJson['user info'][0]['photo'],
            isLeaderBoard: responseJson['user info'][0]['isLeaderBoard'],
            transport: responseJson['user info'][0]['transport'],
          },
        ];
        break;

      case 'teacher':
        info = [
          {
            id: responseJson['user info'][0]['id'],
            userName: responseJson['user info'][0]['username'],
            email: responseJson['user info'][0]['email'],
            fullName: responseJson['user info'][0]['fullName'],
            role: responseJson['user info'][0]['role'],
            //activated: responseJson['user info'][0]['activated'],
            birthDay: responseJson['user info'][0]['birthday'],
            gender: responseJson['user info'][0]['gender'],
            address: responseJson['user info'][0]['address'],
            phoneNumber: responseJson['user info'][0]['phoneNo'],
            mobileNumber: responseJson['user info'][0]['mobileNo'],
            photo: responseJson['user info'][0]['photo'],
            isLeaderBoard: responseJson['user info'][0]['isLeaderBoard'],
            transport: responseJson['user info'][0]['transport'],
          },
        ];
        break;

      case 'parent':
        info = [
          {
            id: responseJson['user info'][0]['id'],
            userName: responseJson['user info'][0]['username'],
            email: responseJson['user info'][0]['email'],
            fullName: responseJson['user info'][0]['fullName'],
            role: responseJson['user info'][0]['role'],
            parentProfession: responseJson['user info'][0]['parentProfession'],
            parentOf: responseJson['user info'][0]['parentOf'],
            //activated: responseJson['user info'][0]['activated'],
            birthDay: responseJson['user info'][0]['birthday'],
            gender: responseJson['user info'][0]['gender'],
            address: responseJson['user info'][0]['address'],
            phoneNumber: responseJson['user info'][0]['phoneNo'],
            mobileNumber: responseJson['user info'][0]['mobileNo'],
            photo: responseJson['user info'][0]['photo'],
            isLeaderBoard: responseJson['user info'][0]['isLeaderBoard'],
            transport: responseJson['user info'][0]['transport'],
          },
        ];
        break;
    }
    return info;
    //return responseJson;
    /*}else{
      return('error !');
    }*/
  } catch (error) {
    return error;
  }
}
