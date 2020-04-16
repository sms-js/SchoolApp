import {BASE_URL} from '../../../utils/config';

export async function fetchDormitory(dormitoryId) {
  try {
    const response = await fetch(BASE_URL + '/DormitoriesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        dormitoryId: dormitoryId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['dormitory']);
      //let dormitory = [{}];
      return responseJson['dormitory'];
    } else {
      //return 'error !';
      alert(responseJson['dormitory']['error']);
    }
  } catch (error) {
    return error;
  }
}
