import {BASE_URL} from '../../../utils/config';

export async function fetchStudentClass(studentId) {
  try {
    const response = await fetch(BASE_URL + '/StudentInfoController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'class',
        studentId: studentId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['class']);
      //alert(responseJson['class'][0]['classTeacher']);
      //let class = [{}];
      return responseJson['class'];
    } else {
      //return 'error !';
      alert(responseJson['class']['error']);
    }
  } catch (error) {
    return error;
  }
}
