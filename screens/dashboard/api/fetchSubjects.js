import {BASE_URL} from '../../../utils/config';

export async function fetchSubject(subjectId) {
  try {
    const response = await fetch(BASE_URL + '/SubjectsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        id: subjectId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['subject']);
      //let subjectInfo = [{}];
      return responseJson['subject'];
    } else {
      //return 'error !';
      alert(responseJson['subject']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchSubjectTeacher(teachersIds) {
  try {
    const response = await fetch(BASE_URL + '/SubjectsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'subjectTeacher',
        id: teachersIds,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['teacher']);
      //let subjectInfo = [{}];
      return responseJson['teacher'];
    } else {
      //return 'error !';
      alert(responseJson['teacher']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchClassSubjects(classId) {
  try {
    const response = await fetch(BASE_URL + '/SubjectsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'class',
        id: classId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['subjects']);
      //let classSubjects = [{}];
      return responseJson['subjects'];
    } else {
      //return 'error !';
      alert(responseJson['subjects']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchTeacherSubjects(teacherId) {
  try {
    const response = await fetch(BASE_URL + '/SubjectsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'teacher',
        id: teacherId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['subjects']);
      //let teacherSubjects = [{}];
      return responseJson['subjects'];
    } else {
      //return 'error !';
      alert(responseJson['subjects']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchTeacherClassSubjects(teacherId, classId) {
  try {
    const response = await fetch(
      BASE_URL + '/SubjectsTeacherFilterController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'teacher',
          teacherId: teacherId,
          classId: classId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['subjects']);
      //let teacherSubjects = [{}];
      return responseJson['subjects'];
    } else {
      //return 'error !';
      alert(responseJson['subjects']['error']);
    }
  } catch (error) {
    return error;
  }
}
