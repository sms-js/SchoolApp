import {BASE_URL} from '../../../utils/config';

export async function fetchClassesSchedule(classId) {
  try {
    const response = await fetch(BASE_URL + '/ClassesScheduleController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        classId: classId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['class schedule']);
      //let classSchedule = [{}];
      return responseJson['class schedule'];
    } else {
      //return 'error !';
      alert(responseJson['class schedule']['error']);
    }
  } catch (error) {
    return error;
  }
}
