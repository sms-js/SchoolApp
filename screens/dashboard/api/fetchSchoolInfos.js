import {BASE_URL} from '../../../utils/config';

export async function fetchSchoolInfos() {
  try {
    const response = await fetch(BASE_URL + '/SchoolInfoController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'payment',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['school payment info']);
      //let subjectInfo = [{}];
      return responseJson['school payment info'];
    } else {
      //return 'error !';
      alert(responseJson['school payment info']['error']);
    }
  } catch (error) {
    return error;
  }
}
