import {BASE_URL} from '../../../utils/config';

export async function fetchAttendance(classId, subjectId, studentId, date) {
  try {
    const response = await fetch(BASE_URL + '/AttendanceController3.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        classId: classId,
        subjectId: subjectId,
        studentId: studentId,
        date: date,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['attendance']);
      //let teacherAssignments = [{}];
      return responseJson['attendance'];
    } else {
      //return 'error !';
      alert(responseJson['attendance']['error']);
    }
  } catch (error) {
    return error;
  }
}
