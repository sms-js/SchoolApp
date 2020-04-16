import {BASE_URL} from '../../../utils/config';

export async function fetchExams() {
  try {
    const response = await fetch(BASE_URL + '/ExamsController.php', {
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
      console.log(responseJson['exams']);
      //let exams = [{}];
      return responseJson['exams'];
    } else {
      //return 'error !';
      alert(responseJson['exams']['error']);
    }
  } catch (error) {
    return error;
  }
}
