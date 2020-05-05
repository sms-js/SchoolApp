import {BASE_URL} from '../../../utils/config';

export async function fetchExamMarks(classId, subjectId, studentId) {
  try {
    const response = await fetch(BASE_URL + '/ExamMarksController3.php', {
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
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['exam marks']);
      //let teacherAssignments = [{}];
      return responseJson['exam marks'];
    } else {
      //return 'error !';
      alert(responseJson['exam marks']['error']);
    }
  } catch (error) {
    return error;
  }
}
