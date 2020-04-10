import {BASE_URL} from '../../../utils/config';
import userInfo from '../../../utils/userInfo';

export async function fetchUserNews() {
  try {
    const response = await fetch(BASE_URL + '/NewsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: userInfo[0]['role'],
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
