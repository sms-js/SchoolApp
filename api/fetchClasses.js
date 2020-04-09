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
    //if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
    /*}else{
      return('error !');
    }*/
  } catch (error) {
    return error;
  }
}
