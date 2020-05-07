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

export async function fetchSubjectsExamMarks(classId, studentId) {
  try {
    const response = await fetch(BASE_URL + '/ExamMarksController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'subjects',
        classId: classId,
        value: studentId,
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

export async function fetchStudentsExamMarks(classId, subjectId) {
  try {
    const response = await fetch(BASE_URL + '/ExamMarksController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'students',
        classId: classId,
        value: subjectId,
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

export async function insertExamMarks(
  examId,
  classId,
  subjectId,
  studentId,
  examMark,
  attendanceMark,
  markComments,
) {
  try {
    const response = await fetch(BASE_URL + '/ExamMarksInsertController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'insert',
        examId: examId,
        classId: classId,
        subjectId: subjectId,
        studentId: studentId,
        examMark: examMark,
        attendanceMark: attendanceMark,
        markComments: markComments,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['insert status']);
      //let teacherAssignments = [{}];
      return responseJson['insert status'];
    } else {
      //return 'error !';
      alert(responseJson['insert status']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function updateExamMarks(
  id,
  examMark,
  attendanceMark,
  markComments,
) {
  try {
    const response = await fetch(BASE_URL + '/ExamMarksUpdateController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'update',
        id: id,
        examMark: examMark,
        attendanceMark: attendanceMark,
        markComments: markComments,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['update status']);
      //let teacherAssignments = [{}];
      return responseJson['update status'];
    } else {
      //return 'error !';
      alert(responseJson['update status']['error']);
    }
  } catch (error) {
    return error;
  }
}
