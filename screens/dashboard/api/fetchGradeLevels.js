import {BASE_URL} from '../../../utils/config';

export async function fetchGradeLevels() {
  try {
    const response = await fetch(BASE_URL + '/GradeLevelsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['grade levels']);
      //let exams = [{}];
      return responseJson['grade levels'];
    } else {
      //return 'error !';
      alert(responseJson['grade levels']['error']);
    }
  } catch (error) {
    return error;
  }
}
