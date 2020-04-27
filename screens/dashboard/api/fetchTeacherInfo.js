import {BASE_URL} from '../../../utils/config';

export async function fetchTeacherInfo(teacherId) {
  try {
    const response = await fetch(BASE_URL + '/TeacherInfoController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        teacherId: teacherId,
      }),
    });
    const responseJson = await response.json();

    if (response.ok) {
      //console.log(responseJson['teacher']);
      //alert(responseJson['class'][0]['classTeacher']);
      //let class = [{}];
      return responseJson['teacher'];
    } else {
      //return 'error !';
      alert(responseJson['teacher']['error']);
    }
  } catch (error) {
    return error;
  }
}
