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

export async function fetchSubjectsAttendance(classId, studentId, date) {
  try {
    const response = await fetch(BASE_URL + '/AttendanceController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'subjects',
        classId: classId,
        value: studentId,
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

export async function fetchStudentsAttendance(classId, subjectId, date) {
  try {
    const response = await fetch(BASE_URL + '/AttendanceController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'students',
        classId: classId,
        value: subjectId,
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

export async function updateAttendance(
  id,
  classId,
  subjectId,
  studentId,
  date,
  status,
) {
  try {
    const response = await fetch(BASE_URL + '/AttendanceUpdateController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'update',
        id: id,
        classId: classId,
        subjectId: subjectId,
        studentId: studentId,
        date: date,
        status: status,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['update status']);
      return responseJson['update status'];
    } else {
      return responseJson['update status']['error'];
    }
  } catch (error) {
    return error;
  }
}

export async function insertAttendance(
  classId,
  subjectId,
  studentId,
  date,
  status,
) {
  try {
    const response = await fetch(BASE_URL + '/AttendanceInsertController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'insert',
        classId: classId,
        subjectId: subjectId,
        studentId: studentId,
        date: date,
        status: status,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['insert status']);
      return responseJson['insert status'];
    } else {
      return responseJson['insert status']['error'];
    }
  } catch (error) {
    return error;
  }
}
