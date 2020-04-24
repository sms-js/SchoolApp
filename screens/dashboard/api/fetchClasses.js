import {BASE_URL} from '../../../utils/config';

export async function fetchClass(classId) {
  try {
    const response = await fetch(BASE_URL + '/ClassesController2.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        id: classId,
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

export async function fetchTeacherClasses(teacherId) {
  try {
    const response = await fetch(BASE_URL + '/ClassesController2.php', {
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
      console.log(responseJson['classes']);
      //let classes = [{}];
      return responseJson['classes'];
    } else {
      //return 'error !';
      alert(responseJson['classes']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchClassTeacher(teacherId) {
  try {
    const response = await fetch(BASE_URL + '/ClassTeacherController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'teacher',
        teacherId: teacherId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['teachers']);
      //let classes = [{}];
      return responseJson['teachers'];
    } else {
      //return 'error !';
      alert(responseJson['teachers']['error']);
    }
  } catch (error) {
    return error;
  }
}
