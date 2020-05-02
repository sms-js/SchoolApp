import {BASE_URL} from '../../../utils/config';

export async function fetchAllPayments(studentId) {
  try {
    const response = await fetch(BASE_URL + '/PaymentsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
        studentId: studentId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['all payments']);
      //let allPolls = [{}];
      return responseJson['all payments'];
    } else {
      //return 'error !';
      alert(responseJson['all payments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchPaidPayments(studentId) {
  try {
    const response = await fetch(BASE_URL + '/PaymentsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'paid',
        studentId: studentId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['paid payments']);
      //let allPolls = [{}];
      return responseJson['paid payments'];
    } else {
      //return 'error !';
      alert(responseJson['paid payments']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchUnpaidPayments(studentId) {
  try {
    const response = await fetch(BASE_URL + '/PaymentsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'unpaid',
        studentId: studentId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['unpaid payments']);
      //let allPolls = [{}];
      return responseJson['unpaid payments'];
    } else {
      //return 'error !';
      alert(responseJson['unpaid payments']['error']);
    }
  } catch (error) {
    return error;
  }
}
