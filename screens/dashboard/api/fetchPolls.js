import {BASE_URL} from '../../../utils/config';
import {userInfo} from '../../../utils/userInfo';

/*export async function fetchPollsForAll() {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
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
      console.log(responseJson['all polls']);
      //let allPolls = [{}];
      return responseJson['all polls'];
    } else {
      //return 'error !';
      alert(responseJson['all polls']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchUserPolls(role) {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: role,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson[role + ' polls']);
      //let userPolls = [{}];
      return responseJson[role + ' polls'];
    } else {
      //return 'error !';
      alert(responseJson[role + ' polls']['error']);
    }
  } catch (error) {
    return error;
  }
}*/
export async function fetchPolls(role) {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        role: role,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['polls']);
      //let allPolls = [{}];
      return responseJson['polls'];
    } else {
      //return 'error !';
      alert(responseJson['polls']['error']);
    }
  } catch (error) {
    return error;
  }
}
