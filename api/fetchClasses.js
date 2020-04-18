import {BASE_URL} from '../utils/config';

export async function fetchClasses() {
  try {
    const response = await fetch(BASE_URL + '/ClassesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson['classes'];
    } else {
      alert(['classes']['error']);
    }
  } catch (error) {
    return error;
  }
}
