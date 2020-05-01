import {BASE_URL} from '../../../utils/config';

//////////////////////  Teacher
export async function fetchTeacherAssignments(teacherId) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsFilterController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'teacherid',
          id: teacherId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['teacher assignments']);
      //let teacherAssignments = [{}];
      return responseJson['teacher assignments'];
    } else {
      //return 'error !';
      alert(responseJson['teacher assignments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchClassTeacherAssignments(teacherId, classId) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsFilterTeacherController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'classid',
          uid: teacherId,
          id: classId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['teacher class assignments']);
      //let teacherClassAssignments = [{}];
      return responseJson['teacher class assignments'];
    } else {
      //return 'error !';
      alert(responseJson['teacher class assignments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchSubjectTeacherAssignments(teacherId, subjectId) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsFilterTeacherController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'subjectid',
          uid: teacherId,
          id: subjectId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['teacher subject assignments']);
      //let teacherSubjectAssignments = [{}];
      return responseJson['teacher subject assignments'];
    } else {
      //return 'error !';
      alert(responseJson['teacher subject assignments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function insertTeacherAssignments(
  classId,
  subjectId,
  teacherId,
  assignmentTitle,
  assignmentDescription,
  assignmentFile,
  assignmentDeadLine,
) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsInsertController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'insert',
          classId: classId,
          subjectId: subjectId,
          teacherId: teacherId,
          assignmentTitle: assignmentTitle,
          assignmentDescription: assignmentDescription,
          assignmentFile: assignmentFile,
          assignmentDeadLine: assignmentDeadLine,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['insert status']);
      //let teacherSubjectAssignments = [{}];
      return responseJson['nsert status'];
    } else {
      //return 'error !';
      alert(responseJson['nsert status']['error']);
    }
  } catch (error) {
    return error;
  }
}

////////////////    Student

export async function fetchStudentAssignments(classId) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsFilterController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'classid',
          id: classId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['class assignments']);
      //let studentAssignments = [{}];
      return responseJson['class assignments'];
    } else {
      //return 'error !';
      alert(responseJson['class assignments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchStudentSubjectAssignments(subjectId) {
  try {
    const response = await fetch(
      BASE_URL + '/AssignmentsFilterController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'subjectid',
          id: subjectId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['subject assignments']);
      //let teacherSubjectAssignments = [{}];
      return responseJson['subject assignments'];
    } else {
      //return 'error !';
      alert(responseJson['subject assignments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function clearAssignments() {
  try {
    const response = await fetch(BASE_URL + '/AssignmentsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'clear',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      alert(responseJson['delete status']);
    } else {
      //return 'error !';
      alert(responseJson['delete status']['error']);
    }
  } catch (error) {
    return error;
  }
}
